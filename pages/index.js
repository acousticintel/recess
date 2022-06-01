import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
//custom pack
import { useSession } from "next-auth/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
//custom func
import { AuthGuard } from "../components/elements/authGuard";
//custom
import Title from "../components/elements/title";
import ImageLoader from "../components/elements/imageLoader";
import Diaries from "../components/diaries";
import KidsSection from "../components/kids";
import Reminders from "../components/reminders";
import News from "../components/News";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: .15,
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

export default function Profile() {
  const router = useRouter();
  const pageControl = useAnimation();
  const [pageRef, pageInView] = useInView();
  const { data: session } = useSession();

  useEffect(() => {
    Loaded();
  }, []);

  //start animation when in view
  useEffect(() => {
    if (pageInView) {
      pageControl.start("show");
    }
  }, [pageControl, pageInView]);

  function Loaded() {
    var element = document.getElementById("loader");
    if (element) {
      element.classList.add("loaded");
    }
  }

  const handleFaqClick = (e) => {
    e.preventDefault();
    router.push("/faq");
  };

  return (
    <AuthGuard>
      <motion.div
        className="index__page"
        variants={contVar}
        initial="hide"
        ref={pageRef}
        animate={pageControl}
      >
        <motion.div variants={riseVar} className="welcome__tag">
          {session?.user && (
            <div className="relative h-10 w-10 mr-2 rounded-full overflow-hidden">
              <ImageLoader src={session.user.image} alt="pp" />
            </div>
          )}
          <div>
            <span>Welcome</span>
            <h4>{session?.user.name}</h4>
          </div>
        </motion.div>
        <KidsSection />
        <News />
        <Reminders />
        <Diaries />
      </motion.div>
    </AuthGuard>
  );
}
