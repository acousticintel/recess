import dynamic from "next/dynamic";
//custom
import { motion } from "framer-motion";
//custom pack
import Title from "../elements/title";
const DynamicLordIcon = dynamic(() => import("../elements/lordIcon"), {
  ssr: false,
});

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
    opacity:1,
  },
  show: {
    opacity:1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function News() {
  return (
    <motion.section
      variants={mainVar}
      className="news__sec"
    >
      <Title title="News" />
      <motion.p variants={riseVar} className="text-gray-400 text-sm">
        This area show important/urgent messages
      </motion.p>
      <motion.div variants={contVar} className="incidents">
        <motion.div variants={riseVar} className="incident">
          <div className="icon">
            <DynamicLordIcon src="/assets/info.json" />
          </div>
          <div className="content info">
            <div>
              <h6>Attire</h6>
              <p>Student has swimming tomorrow.</p>
            </div>
            <div className="child">
              <div className="avatar">
                <div>
                  <img
                    src={`https://api.lorem.space/image/face?hash=327${0}`}
                    alt=""
                  />
                </div>
              </div>
              <h1>Jane Doe</h1>
            </div>
          </div>
        </motion.div>
        <motion.div variants={riseVar} className="incident">
          <div className="icon">
            <DynamicLordIcon src="/assets/warn.json" />
          </div>
          <div className="content warn">
            <div>
              <h6>Transport</h6>
              <p>Bus may be late by 15 min.</p>
            </div>
            <div className="child">
              <div className="avatar mb-3">
                <div className="w-8 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2">
                  <img
                    src={`https://api.lorem.space/image/face?hash=327${0}`}
                    alt=""
                  />
                </div>
              </div>
              <h1>Jane Doe</h1>
            </div>
          </div>
        </motion.div>
        <motion.div variants={riseVar} className="incident">
          <div className="icon">
            <DynamicLordIcon src="/assets/error.json" />
          </div>
          <div className="content urg">
            <div>
              <h6>Attendance</h6>
              <p>Student isnt in Class today.</p>
            </div>
            <div className="child">
              <div className="avatar mb-3">
                <div className="w-8 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2">
                  <img
                    src={`https://api.lorem.space/image/face?hash=327${0}`}
                    alt=""
                  />
                </div>
              </div>
              <h1>Jane Doe</h1>
            </div>
          </div>
        </motion.div>
        <motion.div variants={riseVar} className="incident">
          <div className="icon">
            <DynamicLordIcon src="/assets/good.json" />
          </div>
          <div className="content good">
            <div>
              <h6>Transport</h6>
              <p>Bus was fixed. It will be on time today.</p>
            </div>
            <div className="child">
              <div className="avatar mb-3">
                <div className="w-8 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2">
                  <img
                    src={`https://api.lorem.space/image/face?hash=327${0}`}
                    alt=""
                  />
                </div>
              </div>
              <h1>Jane Doe</h1>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
