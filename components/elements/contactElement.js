import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom
import { useData } from "../../context/dataContext";

export default function ContactElement({ data }) {
  const router = useRouter();
  const { students, createChatRoom } = useData();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (students?.length > 0) {
      students.map((s, i) => {
        if (s.id === data.studentId) {
          setStudent(s);
        }
      });
    }
  }, [data, students]);

  const handleClick = () => {
    createChatRoom(data.id).then((ref) => {
      router.push(`chats/chat?id=${ref}`);
    });
  };

  return (
    <div className={`teacher ${student?.color}`} onClick={handleClick}>
      <div className="flex">
        <div className="avatar">
          <div className={`${student?.color}`}>
            <img src={`https://api.lorem.space/image/face?hash=3274`} alt="" />
          </div>
        </div>
        <div className="content">
          <h2>{data.name}</h2>
          <h3>
            {student?.name} {data.subject} Teacher
          </h3>
        </div>
      </div>
    </div>
  );
}
