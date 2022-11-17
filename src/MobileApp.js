import React from "react";
import MobileNav from "./MobileNav";
import MobileControls from "./MobileControls";
import { Outlet } from "react-router-dom";

export default function MobileApp() {
  return (
    <div className="MobileApp">
      <div>
        <Outlet />
      </div>
      <MobileControls />
      <MobileNav />
    </div>
  );
}
