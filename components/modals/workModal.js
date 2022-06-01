import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
//custom
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
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
const FiHelpCircle = dynamic(
  async () => (await import("react-icons/fi")).FiHelpCircle
);
const RiShoppingBasket2Line = dynamic(
  async () => (await import("react-icons/ri")).RiShoppingBasket2Line
);

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

export default function WorkModal() {
  const [panel, setPanel] = useState("prod");

  useEffect(() => {}, []);

  return (
    <div>
      <input type="checkbox" id="work_modal" className="modal-toggle" />
      <label
        htmlFor="work_modal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative bg-white no-scroll" htmlFor="">
          <label
            htmlFor="work_modal"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="work__modal">
            <div className="heading">
              <h1>Assignment Details</h1>
              <div className="child">
                <h1
                >
                  Jane Doe
                </h1>
                <div className="avatar mr-3">
                  <div className="w-8 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2">
                    <img
                      src={`https://api.lorem.space/image/face?hash=327${0}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <h2>Mathematic Assignment</h2>
            <div className="details">
              <div className="item">
                <div>
                  <BsBook size="2em" /> <span>Book</span>
                </div>
                <span>Primary Maths</span>
              </div>
              <div className="item">
                <div className="flex items-center">
                  <RiPagesLine size="2em" /> <span>Page</span>
                </div>
                <span>24</span>
              </div>
              <div className="item">
                <div className="flex items-center">
                  <BsBook size="2em" /> <span>Exercise</span>
                </div>
                <span>4a 1-20</span>
              </div>
            </div>
            <div className="button__sec">
              <button>
                Help
                <FiHelpCircle size="1.5em" />
              </button>
              <button>
                Done
                <label className="swap swap-rotate">
                  <input type="checkbox" />
                  <FaCheckCircle size="1.5em" className="swap-on" />
                  <FaRegCheckCircle size="1.5em" className="swap-off" />
                </label>
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}
