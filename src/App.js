import React from "react";
import DesktopHome from "./DesktopHome";
import MobileApp from "./MobileApp";
import useViewport from "./useViewPort";

export default function App() {
  const { width } = useViewport();
  const breakpoint = 768;

  return width < breakpoint ? <MobileApp /> : <DesktopHome />;
}
