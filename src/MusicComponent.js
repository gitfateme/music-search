import "./css/MusicComponent.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentMusic, setRelatedPlaylist } from "./app/musicSlice";
import Trending from "./Trending";

export default function MusicComponent({ music }) {
  const dispatch = useDispatch();

  console.log(music);

  function handleClick(e) {
    e.preventDefault();
    dispatch(setCurrentMusic(music));
    dispatch(setRelatedPlaylist(music));
  }
  return (
    <div className="MusicComponent">
      <div className="container text-center">
        <div className="row">
          <div className="col-12 col-xl-6 order-xl-2 music-info">
            <h1 className="mb-3">
              {music.artist} - {music.song}
            </h1>
            <div className="img-container">
              <img
                src={music.photo}
                alt={music.title}
                className="img-fluid"
              ></img>
            </div>
            <div className="btns-row py-3">
              <a
                download
                href={music.hq_link}
                className="btn btn-secondary mx-3"
              >
                دانلود
              </a>
              <button onClick={handleClick} className="btn btn-success">
                پخش آهنگ
              </button>
            </div>
            <span className="explicit">
              {music.explicit === "false" ? null : (
                <span className="d-block mb-3">❌حاوی کلمات رکیک❌</span>
              )}
            </span>
            <p>
              {music.lyric ? (
                <span className="d-block my-3"> متن آهنگ</span>
              ) : null}
              {music.lyric ? <hr /> : null}
              {music.lyric.split("\n").map((string) => {
                return (
                  <span>
                    {string} <br />
                  </span>
                );
              })}
            </p>
            <hr />
          </div>
          <div className="col-12 col-xl-4">
            <Trending related={JSON.parse(music.related)} />
          </div>
        </div>
      </div>
    </div>
  );
}
