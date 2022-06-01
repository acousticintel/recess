import { useEffect, useState } from "react";
import { useData } from "../../context/dataContext";

export default function Entry({ data }) {
  const { getStudent } = useData();
  const [student, setStudent] = useState({});

  useEffect(() => {
    getStudent(data.schoolId, data.classId).then((stu) => {
      setStudent(stu);
    });
  }, [data, getStudent]);

  return (
    <div className={`diary__entry ${student?.color ? student.color : "red"}`}>
      <div className="student">
        <div className="avatar">
          <div className={data.stuColor}>
            <img src={`https://api.lorem.space/image/face?hash=327${0}`} alt=""/>
          </div>
        </div>
        <h1>{student?.name}</h1>
      </div>
      <h2>{`${data.subject} Diary Entries`}</h2>
      {data.type === "exe" && (
        <h3>{`${data.book}, PG ${data.page}, Ex ${data.exercise}`}</h3>
      )}
      {data.type === "craft" && <h3>{`${data.craft}`}</h3>}
      <label htmlFor="work_modal" className="modal-button">
        More Info
      </label>
    </div>
  );
}
