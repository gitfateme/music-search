import React from "react";
import MobileSearch from "./MobileSearch";
import useViewport from "./useViewPort";

export default function Search() {
  const { width } = useViewport();
  const breakpoint = 768;

  return width < breakpoint ? <MobileSearch /> : <MobileSearch />;
}
