import dynamic from "next/dynamic";
import { withRouter } from "next/router";
//custom packs
const FaHome = dynamic(async () => (await import("react-icons/fa")).FaHome);
const FaCalendarWeek = dynamic(
  async () => (await import("react-icons/fa")).FaCalendarWeek
);
const RiChatSmile3Fill = dynamic(
  async () => (await import("react-icons/ri")).RiChatSmile3Fill
);

const NavTab = dynamic(() => import("../elements/navTab"));

function BottomNav({ router }) {
  if (
    router.pathname.indexOf("/auth/") === 0 ||
    router.pathname === "/landing"
  ) {
    return null;
  } else {
    return (
      <div className="bottom__nav__cont">
        <div className="bottom__nav">
          <NavTab
            icon={<FaCalendarWeek size="1.5rem" />}
            href="/calendar"
            text={"calendar"}
          />
          <NavTab icon={<FaHome size="1.5rem" />} href="/" text={"home"} />
          <NavTab
            icon={<RiChatSmile3Fill size="1.5rem" />}
            href="/chats"
            text={"Chats"}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(BottomNav);
