import React from "react";
import Diaries from "../components/diaries";
import Title from "../components/elements/title";
import Reminders from "../components/reminders";

export default function Calendar() {
  const days = ["s", "m", "t", "w", "t", "f", "s"];
  return (
    <div className="calendar__page">
      <h1>Calendar</h1>
      <div className="calendar">
        <h4>22 May</h4>
        <div className="dates">
          {days.map((d, i) => (
            <div key={i} className={`${i == 3 && "selected"}`}>
              <span>s</span>
              <h5>21</h5>
            </div>
          ))}
        </div>
      </div>
      <Title title="Reminders" />
      <Reminders />
      <Title title="Reminders" light/>
      <Diaries />
    </div>
  );
}
