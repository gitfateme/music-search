import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./css/Trending.scss";
import axios from "axios";
import { setCurrentMusic } from "./app/musicSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

export default function Trending() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  function setMusic(music) {
    dispatch(setCurrentMusic(music));
    console.log(music);
  }

  async function getData() {
    const res = await axios.get("http://localhost:3000/trendings");
    setData(res.data);
    console.log(res);
  }
  return (
    <div className="Trending">
      <div className="container">
        <h2>پر طرفدار های امروز</h2>

        <ul className="searched-list text-light row">
          {data.map((item, index) => {
            return (
              <li key={index} className="searched-list-item col-12 col-md-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMusic(item);
                  }}
                  className="d-flex"
                >
                  <div className="play-icon me-3 mt-2">
                    <FontAwesomeIcon icon={faPlayCircle} />
                  </div>
                  <div>
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div>
                    <span>
                      {index + 1} - {item.title}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
