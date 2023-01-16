import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/MusicPage.scss";
// import MusicComponent from "./MusicComponent";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMusic, setRelatedPlaylist } from "./app/musicSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import ItemsList from "./ItemsList";

export default function MusicPage() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch();
  const musicData = useSelector((state) => state.music.data);
  const navigate = useNavigate();
  const { musicId } = useParams();

  useEffect(() => {
    document.title = `${music.artist} - ${music.song} - Meowzic.com`;
  }, [music]);

  useEffect(() => {
    async function getMusic() {
      await axios
        // .get(`http://localhost:3000/musics/${musicId}`)
        .get(`https://www.radiojavan.com/api2/mp3?id=${musicId}`)
        .then((res) => {
          setMusic(res.data);
          if (musicData.length < 1) {
            dispatch(setCurrentMusic(res.data));
            dispatch(setRelatedPlaylist(res.data));
          }
        })
        .catch((err) => {
          setNotFound(true);
        });
      setLoading(false);
    }
    getMusic();
  }, [musicId, loading, dispatch, musicData]);

  useEffect(() => {
    if (notFound) {
      navigate("/");
    }
  }, [notFound, navigate]);

  function handlePlay(e) {
    e.preventDefault();
    dispatch(setCurrentMusic(music));
    dispatch(setRelatedPlaylist(music));
  }

  if (loading) {
    return (
      <div className="text-center">
        <LoadingSpinner size={"40px"} />
      </div>
    );
  } else {
    return (
      <div className="MusicPage ">
        <div className="container">
          <div className="row flex-row-reverse text-center text-xl-end">
            <div className="col-12 col-xl-3">
              <div className="music-img">
                <img src={music.photo} alt={music.title}></img>
              </div>
            </div>
            <div className="col-12 col-xl-9 music-info">
              <div>
                {music.song_farsi ? (
                  <h1>{music.song_farsi}</h1>
                ) : (
                  <h1>{music.song}</h1>
                )}
                {music.artist_farsi ? (
                  <h2>{music.artist_farsi}</h2>
                ) : (
                  <h2>{music.artist}</h2>
                )}
              </div>
              <div className="music-btns row flex-row-reverse justify-content-center justify-content-xl-start">
                <button
                  className="music-btn music-play-btn col-6 col-sm-4 col-md-3 col-lg-2 ms-2 ms-sm-5"
                  onClick={handlePlay}
                >
                  پخش آهنگ <FontAwesomeIcon icon={faPlay} />
                </button>
                <a
                  className="music-btn other-btn col-6 col-sm-4 col-md-3 col-lg-2 ms-2"
                  download
                  href={music.link}
                >
                  دانلود <FontAwesomeIcon icon={faDownload} />
                </a>
                <button className="music-btn other-btn col-6 col-sm-4 col-md-3 col-lg-2 ms-2">
                  اشتراک گزاری <FontAwesomeIcon icon={faShare} />
                </button>
              </div>
            </div>
            {/* <MusicComponent music={music} /> */}
          </div>
          <div className="row text-center mt-5">
            {music.lyric ? (
              <span className="d-block my-3"> متن آهنگ</span>
            ) : null}
            {music.lyric ? <hr /> : null}
            {music.lyric
              ? music.lyric.split("\n").map((string, index) => {
                  return (
                    <span key={index}>
                      {string} <br />
                    </span>
                  );
                })
              : null}
          </div>
          <div className="row related-list mt-5">
            <hr />
            <h4 className="text-center"> آهنگ های مربوط </h4>
            <ItemsList data={music.related} />
          </div>
        </div>
      </div>
    );
  }
}
