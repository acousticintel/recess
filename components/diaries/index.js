import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";
//custom
import Title from "../elements/title";
import { useData } from "../../context/dataContext";
import Entry from "./entry";

//dynamic
const FaCheckCircle = dynamic(
  async () => (await import("react-icons/fa")).FaCheckCircle
);
const FaRegCheckCircle = dynamic(
  async () => (await import("react-icons/fa")).FaRegCheckCircle
);
const BsBook = dynamic(async () => (await import("react-icons/bs")).BsBook);
const RiPagesLine = dynamic(
  async () => (await import("react-icons/ri")).RiPagesLine
);
const VscTools = dynamic(
  async () => (await import("react-icons/vsc")).VscTools
);
const RiShoppingBasket2Line = dynamic(
  async () => (await import("react-icons/ri")).RiShoppingBasket2Line
);

export default function Diaries() {
  const { diaries } = useData();

  return (
    <section className="diaries">
      <Title title="Todays Assignments" />
      <div className="mt-6">
        {diaries &&
          diaries.length > 0 &&
          diaries.map((e, i) => {
            return <Entry key={i} data={e} />;
          })}
      </div>
    </section>
  );
}
