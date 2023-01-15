import React from "react";
import { Outlet } from "react-router-dom";
import DesktopControls from "./DesktopControls";
import DesktopNav from "./DesktopNav";

export default function DesktopApp({ data }) {
  return (
    <div className="DesktopApp">
      <DesktopNav />
      <div
        style={{
          marginRight: "220px",
          height: "calc(100vh - 65px)",
          overflow: "auto",
        }}
      >
        <Outlet context={data} />
      </div>
      <DesktopControls />
    </div>
  );
}
