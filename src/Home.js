import React from "react";
import DesktopHome from "./DesktopHome";
import MobileHome from "./MobileHome";
import useViewport from "./useViewPort";

export default function Home() {
  const { width } = useViewport();
  const breakpoint = 768;

  return width < breakpoint ? <MobileHome /> : <DesktopHome />;
}
