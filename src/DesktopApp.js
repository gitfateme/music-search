import React from "react";
import { Outlet } from "react-router-dom";
import "./css/DesktopApp.scss";
import DesktopControls from "./DesktopControls";
import DesktopNav from "./DesktopNav";

export default function DesktopApp() {
  return (
    <div className="DesktopApp" style={{ marginBottom: "65px" }}>
      <DesktopNav />
      <div style={{ marginRight: "220px" }}>
        <Outlet />
      </div>
      <DesktopControls />
    </div>
  );
}
