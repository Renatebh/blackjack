import React from "react";
import "./button.css";

const PrimaryButton = (props) => {
  return (
    <div>
      <button
        className="primary-btn"
        onClick={props.onClick}
        disabled={props.disableBtn}
      >
        {props.text}{" "}
      </button>
    </div>
  );
};

export default PrimaryButton;
