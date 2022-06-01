import Image from "next/image";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

import ImageLoader from "../elements/imageLoader";
import { useData } from "../../context/dataContext";
//custom
const BiLeftArrow = dynamic(
  async () => (await import("react-icons/bi")).BiLeftArrow
);
const FaRegUserCircle = dynamic(
  async () => (await import("react-icons/bi")).FaRegUserCircle
);

const contVar = {
  closed: {
    y: -10,
    scale: 0.95,
    opacity: 0,
  },
  open: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.5,
      staggerChildren: 0.15,
    },
  },
};

const childVar = {
  closed: {
    scale: 0.95,
    opacity: 0,
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

function Navbar({ router }) {
  const { data: session, status } = useSession();
  const { teachers } = useData();

  const handleClick = (e) => {
    e.preventDefault();
    router.back();
  };

  if (router.pathname.indexOf("/auth/") === 0) {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-white min-w-full h-20 pt-6"
      >
        <motion.div variants={childVar} className="flex items-center">
          <div className="relative w-6 h-8 mr-2">
            <Image src="/assets/logo.png" alt="logo" layout="fill" />
          </div>
          <span
            className="flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out mb-0.5"
          >
            RECESS
          </span>
        </motion.div>
      </motion.nav>
    );
  } else if (router.pathname.indexOf("/chats/") === 0) {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-white min-w-full h-20 pt-6"
      >
        <motion.button
          variants={childVar}
          className="btn btn-ghost btn-circle"
          onClick={handleClick}
        >
          <BiLeftArrow size="1.5em" />
        </motion.button>
        <motion.div variants={childVar} className="flex items-center">
          <div className="avatar mr-5 relative">
            <div className="w-16 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=92310" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-medium">teacher</h1>
            <h2 className="text-xs text-gray-400">Child1</h2>
            <h2 className="text-xs text-gray-400">Riara Mathematics Teacher</h2>
          </div>
        </motion.div>
        <motion.div variants={childVar} className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            {session?.user ? (
              <div className="avatar relative">
                <div className="w-9 rounded-full">
                  <img src={session.user.image} alt="" />
                </div>
              </div>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleClick}
              >
                <FaRegUserCircle size="2em" />
              </button>
            )}
          </label>

          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-white font-semibold bg-sky-600 rounded-box w-52"
            onClick={signOut}
          >
            <li>
              <a>Sign Out</a>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    );
  } else {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-white min-w-full h-20 pt-6"
      >
        <motion.button
          variants={childVar}
          className="btn btn-ghost btn-circle"
          onClick={handleClick}
        >
          <BiLeftArrow size="1.5em" />
        </motion.button>
        <motion.span variants={childVar} className="uppercase font-medium">
          {router.pathname === "/" ? "home" : router.pathname.slice(1)}
        </motion.span>
        <motion.div variants={childVar} className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            {session?.user ? (
              <div className="avatar relative">
                <div className="w-9 rounded-full">
                  <img src={session.user.image} alt="" />
                </div>
              </div>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleClick}
              >
                <FaRegUserCircle size="2em" />
              </button>
            )}
          </label>

          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow font-semibold bg-sky-600 rounded-box w-52"
            onClick={signOut}
          >
            <li>
              <a>Sign Out</a>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    );
  }
}

export default withRouter(Navbar);
