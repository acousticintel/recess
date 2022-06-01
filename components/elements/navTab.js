import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";

const contVar = {
  hide: { opacity: 1 },
  show: { opacity: 1 },
};

const revealVar = {
  normal: {
    scale: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
  show: {
    scale: 1.4,
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
};

const iconVar = {
  normal: {
    color: "#f3f4f6",
    backgroundColor: "#22d3ee",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
  show: {
    color: "#fff",
    backgroundColor: "#38bdf8",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
};

const textVar = {
  normal: {
    y: 0,
    color: "#e5e7eb",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
  show: {
    y: 5,
    color: "#fff",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
};

export default function NavTab({ icon, href, text }) {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    if (router.pathname === href) {
      controls.set("show");
    } else {
      controls.set("normal");
    }
  }, [router, controls, href]);

  return (
    <div className="w-full">
      {
        href && <Link href={href}>
        <motion.a variants={contVar} animate={controls} className="selected">
          <motion.div variants={revealVar} className="icon__cont__out">
            <motion.div variants={iconVar} className="icon__cont__in">
              {icon}
            </motion.div>
          </motion.div>
          <motion.span variants={textVar}>{text}</motion.span>
        </motion.a>
      </Link>
      }
    </div>
  );
}
