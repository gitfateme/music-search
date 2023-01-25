import React from "react";
import "./css/LoadingSpinner.scss";

export default function LoadingSpinner({ size, thickness }) {
  return (
    <div
      className="spin"
      style={{
        width: size,
        height: size,
        borderWidth: `${thickness ? thickness : "5px"}`,
      }}
    ></div>
  );
}
