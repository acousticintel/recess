import Link from "next/link";
import { useEffect, useState } from "react";
//custom pack
import { motion } from "framer-motion";
//custom
import Title from "../elements/title";
import { useData } from "../../context/dataContext";
import Kid from "./kid";

const mainVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
    },
  },
};

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.75,
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
};

export default function KidsSection() {
  const { students, getSchoolWithId } = useData();
  const [kids, setKids] = useState([]);

  useEffect(() => {
    let ks = [...students];
    ks.map((k) => {
      getSchoolWithId(k.schoolId).then((sch) => {
        k.school = sch.name;
      });
    });
    if (ks !== students) {
      setKids(ks);
    }
  }, [students]);

  return (
    <section className="kids__sec">
      <div className="pl-8">
        <Title title="Kids" light />
      </div>
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="kids__list no-scroll"
      >
        {kids.map((k, i) => (
          <Link href={`child/${i}`} key={i}>
            <Kid data={k}/>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
