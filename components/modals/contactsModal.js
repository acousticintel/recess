import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//context
import { useData } from "../../context/dataContext";
//custom
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import ContactElement from "../elements/contactElement";

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
  const { teachers } = useData();

  useEffect(() => {
    //console.log(teachers);
  }, [teachers]);

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
              {teachers?.length &&
                teachers.map((t, i) => (
                  <ContactElement key={i} data={t} />
                ))}
            </section>
          </div>
        </label>
      </label>
    </div>
  );
}
