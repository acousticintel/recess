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
    //console.log(teachers);
  }, [teachers]);

  useEffect(() => {
    createUser();
    getStudents();
    getChats();
  }, [db, session]);

  useEffect(() => {
    if (students.length > 0) {
      getAllDiaries();
      getAllTeachers();
    }
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
          let id = doc.id;
          tmp.push({ ...doc.data(), id });
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
    let promises = [];
    students.forEach(async (student) => {
      let p = getDiaries(student.schoolId, student.classId);
      promises.push(p);
    });

    Promise.all(promises).then((results) => {
      let tmp = [];
      results.forEach((r) => {
        tmp.push(...r);
      });

      if (tmp !== diaries) {
        setDiaries(tmp);
      }
    });
  }

  async function getTeachers(schoolId, classId, studentId) {
    return new Promise((resolve, reject) => {
      try {
        const q = query(
          collection(db, `teachers`),
          where("schoolId", "==", `${schoolId}`),
          where("classId", "==", `${classId}`),
          orderBy("name", "desc")
        );
        onSnapshot(q, (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), studentId, id: doc.id });
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

  async function getAllTeachers() {
    let promises = [];
    students.forEach(async (student) => {
      let p = getTeachers(student.schoolId, student.classId, student.id);
      promises.push(p);
    });

    Promise.all(promises).then((results) => {
      let tmp = [];
      results.forEach((r) => {
        tmp.push(...r);
      });
      if (tmp !== teachers) {
        setTeachers(tmp);
      }
    });
  }

  async function getSchoolWithId(id) {
    const docRef = doc(db, "schools", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
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
          let other = chat?.participants.filter(function (value, index, arr) {
            return value !== session?.user?.uid;
          });

          let part = await getParticipantWithId(other[0]);
          tmp.push({ id: doc.id, participant: part, ...chat });
        });

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

  async function createChatRoom(participant) {
    return new Promise(async (resolve, reject) => {
      console.log(participant);
      try {
        if (session?.user) {
          const docRef = await addDoc(collection(db, `chatrooms`), {
            participants: [session?.user?.uid, participant],
          });

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
    teachers,
    diaries,
    chats,
    messages,

    getMessages,
    sendMessage,
    createChatRoom,

    getSchoolWithId,
    getParticipantWithId,
  };
}
