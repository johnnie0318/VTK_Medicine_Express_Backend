import React from "react";
import "./tabs/style.css";

const Label = ({ item, showNumbers, isSelected, onChange, index }) => {
  return (
    <div
      className={isSelected ? "selectedTab" : "offTab"}
      onClick={() => onChange(index)}
    >
      <div className="corner"></div>
      <div className="center font-weight-bold">
        {item.name}{" "}
        {showNumbers && (
          <span>
            ({item.itemsShowed}/{item.itemsShowedOutOf})
          </span>
        )}
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Label;
