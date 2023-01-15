import React from "react";
import MobileNav from "./MobileNav";
import MobileControls from "./MobileControls";
import { Outlet } from "react-router-dom";

export default function MobileApp({ data }) {
  return (
    <div className="MobileApp">
      <div style={{ height: "calc(100vh - 140px)", overflow: "auto" }}>
        <Outlet context={data} />
      </div>
      <MobileControls />
      <MobileNav />
    </div>
  );
}
