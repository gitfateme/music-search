import "./css/MusicPage.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentMusic } from "./app/musicSlice";

export default function MusicPage({ music }) {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(setCurrentMusic(music));
  }
  return (
    <div className="MusicPage">
      <div className="container text-center">
        <h1>{music.title}</h1>
        <h2>{music.artist}</h2>
        <div className="img-container">
          <img src={music.photo} alt={music.title} className="img-fluid"></img>
        </div>
        <br />
        <p>{music.lyric}</p>
        <a download href={music.hq_link} className="btn btn-secondary">
          دانلود
        </a>
        <button onClick={handleClick} className="btn btn-secondary">
          پخش آهنگ
        </button>
      </div>
    </div>
  );
}
