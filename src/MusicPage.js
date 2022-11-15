import "./css/MusicPage.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentMusic } from "./app/musicSlice";

export default function MusicPage({ music }) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${music.artist} - ${music.song} - GoozAhang.com`;
  });

  function handleClick(e) {
    e.preventDefault();
    dispatch(setCurrentMusic(music));
  }
  return (
    <div className="MusicPage">
      <div className="container text-center">
        <h1 className="mb-3">
          {music.artist} - {music.song}
        </h1>
        <div className="img-container">
          <img src={music.photo} alt={music.title} className="img-fluid"></img>
        </div>
        <div className="btns-row py-3">
          <a download href={music.hq_link} className="btn btn-secondary mx-3">
            دانلود
          </a>
          <button onClick={handleClick} className="btn btn-secondary">
            پخش آهنگ
          </button>
        </div>
        <p>{music.lyric}</p>
      </div>
    </div>
  );
}
