import React from "react";
import MobileNav from "./MobileNav";
import MobileControls from "./MobileControls";
import { Outlet } from "react-router-dom";

export default function MobileApp({ popularData }) {
  return (
    <div className="MobileApp">
      <div>
        <Outlet context={popularData} />
      </div>
      <MobileControls />
      <MobileNav />
    </div>
  );
}
