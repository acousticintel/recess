import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from "@firebase/firestore";

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  const { data: session, status } = useSession();
  //hold app states
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const onSetSide = (val) => setSide(val);

  //useEffect(() => { }, []);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  useEffect(() => {
    createUser();
    getStudents();
    getChats();
  }, [db, session]);

  useEffect(() => {
    getAllDiaries();
    getAllTeachers();
  }, [students]);

  async function createUser() {
    if (status !== "loading" && session?.user) {
      const docRef = doc(db, "users", session.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "users", session.user.uid), {
          name: session.user.name,
          email: session.user.email,
        });
      }
    }
  }

  async function getStudents() {
    if (session?.user?.uid) {
      const q = query(
        collection(db, "students"),
        where("parentId", "==", session.user.uid),
        orderBy("name", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        const tmp = [];
        snapshot.forEach((doc) => {
          tmp.push(doc.data());
        });

        if (tmp !== students) {
          setStudents(tmp);
        }
      });
    }
  }

  async function getDiaries(schoolId, classId) {
    return new Promise((resolve, reject) => {
      try {
        const q = query(
          collection(db, `schools/${schoolId}/classes/${classId}/diaries`)
          //where("timestamp", "==", session?.user.uid),
        );

        onSnapshot(q, (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), schoolId, classId });
          });
          if (tmp.length > 0) {
            resolve(tmp);
          }
        });
      } catch (error) {
        console.warn(error);
        reject(error);
      }
    });
  }

  async function getAllDiaries() {
    if (students.length > 0) {
      let promises = [];
      students.forEach(async (student) => {
        let p = getDiaries(student.schoolId, student.classId);
        promises.push(p);
      });

      Promise.all(promises).then((results) => {
        setDiaries(...results);
      });
    }
  }

  async function getTeachers(schoolId, classId, studentId) {
    if (session?.user) {
      const q = query(
        collection(db, `school/${schoolId}/${classId}"`),
        where("schoolId", "==", schoolId),
        where("classId", "==", classId),
        orderBy("name", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        const tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({ ...doc.data(), studentId });
        });
        if (tmp !== teachers) {
          return tmp;
        }
      });
    }
  }

  async function getAllTeachers() {
    if (students.length > 0) {
      students.forEach(async (student) => {
        let teach = await getTeachers(
          student.schoolId,
          student.classId,
          student.Id
        );
        if (teach !== teachers) {
          setTeachers(teach);
        }
      });
    }
  }

  async function getSchoolWithId(id) {
    const docRef = doc(db, "schools", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  }

  async function getStudent(schoolId, classId) {
    return new Promise((resolve, reject) => {
      function checkStudent(stu) {
        if (stu.schoolId == schoolId && stu.classId == classId) {
          return stu;
        }
      }

      const result = students.filter(checkStudent);
      if (result.length === 1) {
        resolve(result[0]);
      } else if (result.length > 1) {
        reject("Student not found");
      } else if (result.length > 1) {
        reject("Student more than 1");
      } else {
        reject("Unknown");
      }
    });
  }

  async function getChats() {
    if (session?.user) {
      const q = query(
        collection(db, "chatrooms"),
        where("participants", "array-contains", session?.user.uid)
      );
      return onSnapshot(q, (snapshot) => {
        let tmp = [];
        snapshot.forEach(async (doc) => {
          let chat = doc.data();
          let part = await getParticipantWithId(chat?.participants[0]);
          tmp.push({ id: doc.id, participant: part, ...chat });
        });

        console.log(tmp);
        if (tmp !== chats) {
          setChats(tmp);
        }
      });
    }
  }

  async function getMessages(chatId) {
    const q = query(
      collection(db, `chatrooms/${chatId}/messages`),
      orderBy("timestamp", "asc")
    );

    return onSnapshot(q, (snapshot) => {
      const tmp = [];
      snapshot.forEach((doc) => {
        tmp.push(doc.data());
      });
      
      if (tmp !== messages) {
        setMessages(tmp);
      }
    });
  }

  async function sendMessage(chatId, text) {
    return new Promise(async (resolve, reject) => {
      try {
        if (session?.user) {
          const docRef = await addDoc(
            collection(db, `chatrooms/${chatId}/messages`),
            {
              sender: session.user?.uid,
              message: text,
              timestamp: serverTimestamp(),
            }
          );

          if (docRef) {
            resolve(docRef);
          }
        } else {
          reject("Permission denied");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getParticipantWithId(id) {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "users", `${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve(docSnap.data());
      }
    });
  }

  return {
    students,
    diaries,
    chats,
    messages,
    getStudent,
    getMessages,
    sendMessage,
    getSchoolWithId,
    getParticipantWithId,
  };
}
