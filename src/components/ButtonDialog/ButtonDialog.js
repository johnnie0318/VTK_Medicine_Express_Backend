import React from "react";
import "./Button.css";

const ButtonDialog = (props) => {
  return (
    <button className="button-dialog" {...props}>
      {props.children}
    </button>
  );
};

export default ButtonDialog;
