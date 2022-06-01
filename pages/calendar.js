import React from "react";
import Diaries from "../components/diaries";
import Title from "../components/elements/title";

export default function Calendar() {
  const days = ["s", "m", "t", "w", "t", "f", "s"];
  return (
    <div className="calendar__page">
      <h1>Calendar</h1>
      <div className="calendar">
        <h4>22 May</h4>
        <div className="dates">
          {days.map((d, i) => (
            <div key={i} className={`indicator ${i == 3 && "selected"}`}>
              {(i == 3 || i == 1) && (
                <span className="indicator-item indicator-bottom indicator-center badge badge-primary"></span>
              )}
              <div className="grid place-items-center py-2">
                <span>{d}</span>
                <h5>21</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Title title="Diaries" light />
      <Diaries />
    </div>
  );
}
