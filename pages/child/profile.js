import dynamic from "next/dynamic";
//custom
const DynamicLordIcon = dynamic(() => import("../../components/elements/lordIcon"), {
  ssr: false,
});

export default function ChildProfile() {
  return (
    <main className="profile__page">
      <section className="user">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://api.lorem.space/image/face?hash=92310" alt=""/>
          </div>
        </div>
        <h1>Child 1</h1>
        <h2>Riara School</h2>
      </section>
      <section className="button__sec">
        <div>
          <div className="bg-pink-100">
            <DynamicLordIcon src="/assets/heart.json" />
          </div>
          <span>My Health</span>
        </div>
        <div>
          <div className="bg-green-100">
            <DynamicLordIcon src="/assets/gallery.json" />
          </div>
          <span>My Work</span>
        </div>
        <div>
          <div className="bg-blue-100">
            <DynamicLordIcon src="/assets/time.json" />
          </div>
          <span>Calender</span>
        </div>
        <div>
          <div className="bg-yellow-100">
            <DynamicLordIcon src="/assets/book.json" />
          </div>
          <span>Assignments</span>
        </div>
      </section>
    </main>
  );
}
