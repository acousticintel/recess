import dynamic from "next/dynamic";
import { withRouter } from "next/router";
//custom packs
const BiHomeSmile = dynamic(
  async () => (await import("react-icons/bi")).BiHomeSmile
);
const BiHistory = dynamic(
  async () => (await import("react-icons/bi")).BiHistory
);
const BiHelpCircle = dynamic(
  async () => (await import("react-icons/bi")).BiHelpCircle
);
const RiChatSmile2Fill = dynamic(
  async () => (await import("react-icons/ri")).RiChatSmile2Fill
);
const IoHappySharp = dynamic(
  async () => (await import("react-icons/io5")).IoHappySharp
);

const NavTab = dynamic(() => import("../elements/navTab"));

function BottomNav({router }) {
  if (router.pathname.indexOf("/auth/") === 0 || router.pathname === "/landing") {
    return null;
  } else {
    return (
      <div className="bottom__nav__cont">
        <div className="bottom__nav">
          <NavTab
            icon={<IoHappySharp size="1.5rem" />}
            href="/calendar"
            text={"calendar"}
          />
          <NavTab icon={<BiHomeSmile size="1.5rem" />} href="/" text={"home"} />
          <NavTab
            icon={<RiChatSmile2Fill size="1.5rem" />}
            href="/chats"
            text={"Chats"}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(BottomNav);
