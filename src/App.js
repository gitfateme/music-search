import React, { useState, useEffect } from "react";
import DesktopHome from "./DesktopApp";
import MobileApp from "./MobileApp";
import useViewport from "./useViewPort";
import axios from "axios";

export default function App() {
  const { width } = useViewport();
  const breakpoint = 768;

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //for server but im trying api rn
  // async function getData() {
  //   // const res = await axios.get("http://localhost:3000/trendings");
  //   // setTrending(res.data);
  //   // console.log(
  //   //   await axios
  //   //     .get("https://www.radiojavan.com/api2/browse_items?v2")
  //   //     .then((r) => console.log(r.data.sections[2].items))
  //   //     .catch((e) => console.log(e))
  //   // );
  // }

  async function getData() {
    const res = await axios.get(
      "https://www.radiojavan.com/api2/browse_items?"
    );
    setData(res.data);
  }

  return width < breakpoint ? (
    <MobileApp data={data} />
  ) : (
    <DesktopHome data={data} />
  );
}
