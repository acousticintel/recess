import { useState, useEffect } from "react";
//custom pack
import { motion } from "framer-motion";
//custom
import { useData } from "../../context/dataContext";

const slideVar = {
  hide: {
    opacity: 0,
    x: 100,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Kid({ data }) {
  const { getSchoolWithId } = useData();
  const [school, setSchool] = useState({});

  useEffect(() => {
    getSchoolWithId(data.schoolId).then((sch) => {
      setSchool(sch);
    });
  }, [data]);

  return (
    <motion.div variants={slideVar} className="child">
      <div className={`kid ${data.color}`}>
        <div className="avatar">
          <div className="">
            <img src={`https://api.lorem.space/image/face?hash=$7654`} alt=""/>
          </div>
        </div>
        <h1>{data.name}</h1>
        <h2>{school.name}</h2>
      </div>
      <div className="status">
        <div className="indicator" />
        <span>{data.status}</span>
      </div>
    </motion.div>
  );
}
