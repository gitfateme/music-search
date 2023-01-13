import React, { useState, useEffect } from "react";
import "./css/DesktopNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faCat,
  faMagnifyingGlass,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function DesktopNav() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState([]);

  const currentIndex = useSelector((state) => state.music.currentIndex);
  const music = useSelector(
    (state) => state.music.relatedPlaylist[currentIndex]
  );

  useEffect(() => {
    console.log(music);
  }, [music]);

  useEffect(() => {
    async function getMusic() {
      const res = await axios.get(
        `https://www.radiojavan.com/api2/search?query=${searchKeyword}`
      );
      setResult(res.data.mp3s);
    }
    const delayedSearch = setTimeout(() => {
      if (searchKeyword.length > 2) {
        getMusic();

        if (result) {
          setShowResults(true);
        }
      }
    }, 1000);

    return () => clearTimeout(delayedSearch);
  }, [searchKeyword, showResults, result]);

  return (
    <div className="DesktopNav">
      <div className="nav-menu">
        <div className="logo">
          <Link to={"/"}>
            <span> میوزیک</span>
            <FontAwesomeIcon icon={faCat} />
            <FontAwesomeIcon icon={faMusic} />
          </Link>
        </div>
        <form className="search-form">
          <input
            placeholder="جستجو..."
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="nav-item ">
            <FontAwesomeIcon icon={faHome} />
            <span>خانه</span>
          </div>
        </Link>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="nav-item">
            <FontAwesomeIcon icon={faMusic} />
            <span>جدید ترین ها</span>
          </div>
        </Link>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="nav-item">
            <FontAwesomeIcon icon={faCat} />
            <span>محبوب ترین ها</span>
          </div>
        </Link>
        <hr />
        {/* <div className="login-btns text-center">
          <button className="btn btn-secondary disabled me-1">ثبت نام</button>
          <button className="btn btn-secondary disabled">ورود </button>
        </div> */}
      </div>
      <div className="results-wrapper">
        <div
          className="results-background"
          style={{ display: showResults ? "block" : "none" }}
          onClick={() => setShowResults(false)}
        ></div>
        <div
          className="search-results"
          style={{ width: showResults ? "365px" : "0px" }}
        >
          <div
            className="search-results-inner"
            style={{ display: showResults ? "block" : "none" }}
          >
            <h3>نتایج جستجو</h3>
            <ul className="results-songs">
              {result
                ? result.map((item, index) => {
                    return (
                      <li key={index}>
                        <button>
                          <img src={item.thumbnail} alt={item.title} />
                          <div className="results-names">
                            <span className="results-song">{item.song}</span>
                            <span className="results-artist">
                              {item.artist}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
      {music === undefined ? (
        <div className="current-track d-none"></div>
      ) : (
        <div className="current-track">
          <Link to={music ? `/musics/${music.permlink}/${music.id}` : ""}>
            <img src={music.thumbnail} alt={music.song} />
          </Link>
          <div className="track-info">
            <span className="track-title">{music.song}</span>
            <span className="track-artist">{music.artist}</span>
          </div>
        </div>
      )}
    </div>
  );
}
