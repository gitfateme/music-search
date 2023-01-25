import React from "react";
import MobileSearch from "./MobileSearch";
import DesktopSearch from "./DesktopSearch";
import useViewport from "./useViewPort";

export default function Search() {
  const { width } = useViewport();
  const breakpoint = 768;

  return width < breakpoint ? <MobileSearch /> : <DesktopSearch />;
}
