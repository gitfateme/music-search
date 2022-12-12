import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./css/Trending.scss";
import axios from "axios";
import { setCurrentMusic, setRelatedPlaylist } from "./app/musicSlice";

export default function Trending({ related }) {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  async function setMusic(music) {
    await axios
      .get(`http://localhost:3000/musics/${music.id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setCurrentMusic(res.data));
        dispatch(setRelatedPlaylist(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getData() {
    const res = await axios.get("http://localhost:3000/trendings");
    setData(res.data);
    // console.log(res);
  }
  return (
    <div className="Trending">
      <div className="container">
        <h2>آهنگ های مربوط</h2>

        <ul className="searched-list text-light row">
          {related.map((item, index) => {
            return (
              <li key={index} className="searched-list-item col-12 col-md-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMusic(item);
                  }}
                  className="d-flex"
                >
                  <div>
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div>
                    <span>{`${item.artist} - ${item.song}`}</span>
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
