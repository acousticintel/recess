import dynamic from "next/dynamic";
import { useEffect } from "react";
//custom
import ChatElement from "../../components/elements/chatElement";
import { useData } from "../../context/dataContext";

const BiMessageAltAdd = dynamic(
  async () => (await import("react-icons/bi")).BiMessageAltAdd
);

export default function Chat() {
  const { chats } = useData();

  (() => {
    console.log(chats);
  }, [chats]);

  return (
    <div className="chats__page">
      <section className="chats__sec">
        <h1>Recent Chats</h1>
        <div className="chats__list">
          {chats?.length > 0 &&
            chats.map((c, i) => <ChatElement key={i} data={c} />)}
        </div>
      </section>
      <label
        htmlFor="contacts_modal"
        className=" modal-button btn btn-circle btn-primary btn-md fixed right-5 bottom-28"
      >
        <BiMessageAltAdd size="2rem" />
      </label>
    </div>
  );
}
