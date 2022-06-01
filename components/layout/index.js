import Head from "next/head";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import ContactsModal from "../modals/contactsModal";
import WorkModal from "../modals/workModal";
//custom
const Banner = dynamic(() => import("./banner"));
const BottomNav = dynamic(() => import("./bottomNav"));

const variants = {
  hide: { opacity: 1 },
  enter: { opacity: 1 },
};

export default function Layout({ children, path }) {
  //console.log(router.route)
  return (
    <>
      <Head>
        <title>Recess. Enhance Communication.</title>
      </Head>
      <div className="page__gradient"/>
      <Banner />
      <ContactsModal />
      <WorkModal />
      <AnimatePresence
        exitBeforeEnter
        initial="hide"
        //onExitComplete={() => console.log("done")}
      >
        <motion.main
          key={path}
          initial="hide"
          animate="enter"
          exit="hide"
          variants={variants}
          transition={{ type: "easeInOut", duration: 0.25 }}
          className="page-content"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </>
  );
}
