import Image from "next/image";
import dynamic from "next/dynamic";
//custom packs
import { motion } from "framer-motion";
//dynamic
const MdOutlineSchool = dynamic(
  async () => (await import("react-icons/md")).MdOutlineSchool
);

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: .5,
      staggerChildren: 0.15,
    },
  },
};

const scaleVar = {
  hide: {
    y: -5,
    opacity: 0,
    scale: 0.95,
  },
  show: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const slideVar = {
  hide: {
    opacity: 0,
    x: -5,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Title({ title, light }) {
  return (
    <motion.div
      variants={contVar}
      className="flex relative max-w-fit"
    >
      {light ? (
        <motion.div
          variants={scaleVar}
          className="absolute -bottom-1 -left-3 text-white"
        >
          <MdOutlineSchool size="2em" />
        </motion.div>
      ) : (
        <motion.div
          variants={scaleVar}
          className="absolute -bottom-0.5 -left-3 text-slate-900"
        >
          <MdOutlineSchool size="2em" />
        </motion.div>
      )}
      <motion.span
        variants={slideVar}
        className={`text-xl font-semibold capitalize ml-7 ${
          light ? "text-white" : "text-slate-900"
        } `}
      >
        {title}
      </motion.span>
    </motion.div>
  );
}
