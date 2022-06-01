import Title from "../elements/title";

export default function Reminders() {
  return (
    <section className="reminder__sec">
      <Title title="Reminders" />
      <p className="text-gray-400 text-sm">
        This area show reminders. Scroll right to see more.
      </p>
      <div className="reminders no-scroll">
        <div className="reminder">
          <div className="content">
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
            <p>Swimming Classes - Carry swimming attire</p>
            <span>Class Reminder</span>
          </div>
          <div className="def">
            <div className="type">
              <span>Urgent</span>
              <div className="absolute -right-0.5">
                <div className="absolute blur -inset-0.5 bg-red-500 bg-opacity-75 animate-pulse rounded-full" />
                <div className="relative h-10 w-2 bg-red-500 rounded-full" />
              </div>
            </div>
            <div className="date">
              <span>May</span>
              <span>25</span>
            </div>
          </div>
        </div>
        <div className="reminder">
          <div className="content">
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
            <p>Swimming Classes - Carry swimming attire</p>
            <span>Class Reminder</span>
          </div>
          <div className="def">
            <div className="type">
              <span>Urgent</span>
              <div className="absolute -right-0.5">
                <div className="absolute blur -inset-0.5 bg-red-500 bg-opacity-75 animate-pulse rounded-full" />
                <div className="relative h-10 w-2 bg-red-500 rounded-full" />
              </div>
            </div>
            <div className="date">
              <span>May</span>
              <span>25</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
