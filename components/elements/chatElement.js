import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
//custom packs
import { formatDistance } from "date-fns";
//custom
import { useData } from "../../context/dataContext";

export default function ChatElement({ data }) {
  const router = useRouter();
  const { setSelected } = useData();
  const [part, setPart] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (data?.lastTime) {
      let timestamp = data.lastTime;
      const now = new Date();
      const tmp = new Date(timestamp.seconds * 1000);

      const t = formatDistance(now, tmp);
      if (t) setTime(t);
    }
  }, [data]);

  const handleClick = () => {
    router.push(`chats/chat?id=${data.id}`)
  };

  return (
    <div className="chat" onClick={handleClick}>
      <div className="avatar">
        <div className="w-16 rounded-full shadow-md">
          <img src={`https://api.lorem.space/image/face?hash=3175`} alt=""/>
        </div>
      </div>
      <div className="content">
        <span>{data?.participant.name}</span>
        <p className="text-gray-400 text-sm  ">{data?.lastMessage}</p>
      </div>
      <span>{time}</span>
    </div>
  );
}
