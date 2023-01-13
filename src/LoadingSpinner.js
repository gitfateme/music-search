import React from "react";
import "./css/LoadingSpinner.scss";

export default function LoadingSpinner({ size }) {
  return <div className="spin" style={{ width: size, height: size }}></div>;
}
