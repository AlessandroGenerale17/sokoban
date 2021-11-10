import React from "react";

export default function Cell(props) {
  const { cellType } = props;

  const displayCellAs = (cellType) => {
    switch (cellType) {
      case "wall":
        return "black";
      case "player":
        return "red";
      case "empty":
        return "white";
      case "box":
        return "brown";
      default:
        return;
    }
  };

  const background = displayCellAs(cellType);
  return (
    <div
      style={{
        width: "10vw",
        height: "10vw",
        border: "1px solid black",
        backgroundColor: background,
      }}
    ></div>
  );
}
