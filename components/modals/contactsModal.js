import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//context
import { useData } from "../../context/dataContext";
//custom
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

const slideVar = {
  hide: {
    x: "200%",
    opacity: 1,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.25,
      type: "spring",
      mass: 0.8,
      damping: 10,
      staggerChildren: 0.25,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function ContactsModal() {
  const [panel, setPanel] = useState("prod");
  //const { teachers } = useData();

  useEffect(() => {}, []);

  const studentColors = {
    studentId1: "purple",
    studentId2: "red",
  };

  const getColor = (studentId) => {
    return studentColors[studentId];
  };

  const teachers = [
    {
      name: "Jane Doe",
      subject: "Class",
      studentId: "studentId1",
    },
    {
      name: "Jane Doe",
      subject: "Mathematics",
      studentId: "studentId1",
    },
    {
      name: "John Doe",
      subject: "English",
      studentId: "studentId2",
    },
    {
      name: "Mark Doe",
      subject: "Swahili",
      studentId: "studentId2",
    },
    {
      name: "Jane Doe",
      subject: "Geography",
      studentId: "studentId1",
    },
    {
      name: "Jane Doe",
      subject: "History",
      studentId: "studentId2",
    },
  ];

  return (
    <div>
      <input type="checkbox" id="contacts_modal" className="modal-toggle" />
      <label
        htmlFor="contacts_modal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative bg-white no-scroll" htmlFor="">
          <label
            htmlFor="contacts_modal"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="contacts__modal">
            <h1>Click on Contacts to start the Chat</h1>
            <section className="contacts__list custom-scroll">
              {teachers.map((t, i) => (
                <div className={`teacher ${getColor(t.studentId)}`} key={i}>
                  <div className="flex">
                    <div className="avatar">
                      <div className={`${getColor(t.studentId)}`}>
                        <img
                          src={`https://api.lorem.space/image/face?hash=327${i}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="content">
                      <h2>{t.name}</h2>
                      <h3>
                        {t.studentId} s {t.subject} Teacher
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </label>
      </label>
    </div>
  );
}
