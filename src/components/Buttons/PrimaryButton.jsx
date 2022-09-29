import React from "react";

const PrimaryButton = (props) => {
  return (
    <div>
      <button onClick={props.onClick} disabled={props.disableBtn}>
        {props.text}{" "}
      </button>
    </div>
  );
};

export default PrimaryButton;
