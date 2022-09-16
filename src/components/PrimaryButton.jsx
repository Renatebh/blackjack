import React from "react";

const PrimaryButton = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

export default PrimaryButton;
