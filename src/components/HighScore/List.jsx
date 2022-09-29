import React from "react";

const List = (props) => {
  return (
    <ul className="list">
      <li className="list-item">
        <span> {props.name}</span>
        <span> {props.score}</span>
      </li>
    </ul>
  );
};

export default List;
