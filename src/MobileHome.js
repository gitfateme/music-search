import React, { useState, useEffect } from "react";
import "./css/MobileHome.scss";
import axios from "axios";

export default function MobileHome() {
  const [popularData, setPopularData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(popularData);
  }, [popularData]);

  async function getData() {
    const res = await axios.get("http://localhost:3000/trendings");
    setPopularData(res.data.slice(0, 10));
  }

  return (
    <div className="MobileHome">
      <div className="mobile-home-container">
        <h2>Popular Tracks</h2>
        <ul>
          {popularData.map((data, index) => {
            return (
              <li key={index}>
                <span className="song-span">{data.song}</span>
                <span className="artist-span">{data.artist}</span>
                <button>...</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
