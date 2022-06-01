import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//custom packs
import { useSession } from "next-auth/react";
//custom
import { useData } from "../../context/dataContext";
//dynamic
const AiOutlineSend = dynamic(
  async () => (await import("react-icons/ai")).AiOutlineSend
);

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const { getMessages, sendMessage, messages } = useData();
  const { data: session, status } = useSession();

  const [text, setText] = useState("");

  useEffect(() => {
    getMessages(id);
  }, [id, getMessages]);

  useEffect(() => {
    //console.log(text.length);
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    if (text.length > 0) {
      sendMessage(id, text).catch((err) => console.log(err));
    }
  };

  const cluster = (i) => {
    if (i > 0 && i < messages.length - 1) {
      if (
        messages[i].sender === session?.user?.uid &&
        messages[i - 1].sender === session?.user?.uid
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="chat__page">
      <div className="background">
        <section className="messages">
          {messages?.length > 0 &&
            messages.map((m, i) => (
              <div
                key={i}
                className={`message ${
                  m.sender === session?.user?.uid ? "right" : "left"
                } 
                ${cluster(i) && "cluster"}
                ${i === messages.length - 1 && "last"}`}
              >
                <div className="content">
                  <p>{m.message}</p>
                  <span>{m.time}</span>
                </div>
              </div>
            ))}
        </section>
        <section className="w-full flex ">
          <input
            type="text"
            placeholder="Type here"
            onChange={handleChange}
            className="input input-bordered input-primary focus:bg-white w-full"
          />
          <button
            onClick={handleClick}
            className="btn btn-primary btn-circle ml-2"
          >
            <AiOutlineSend size="2em" />
          </button>
        </section>
      </div>
    </div>
  );
}
