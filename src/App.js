import React, { useState, useEffect } from "react";
import DesktopHome from "./DesktopHome";
import MobileApp from "./MobileApp";
import useViewport from "./useViewPort";
import axios from "axios";

export default function App() {
  const [popularData, setPopularData] = useState([]);
  const { width } = useViewport();
  const breakpoint = 768;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(popularData);
  }, [popularData]);

  async function getData() {
    const res = await axios.get("http://localhost:3000/trendings");
    setPopularData(res.data);
  }

  return width < breakpoint ? (
    <MobileApp popularData={popularData} />
  ) : (
    <DesktopHome />
  );
}
