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

export default function DesktopNav() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showResults, setShowResults] = useState(false);

  const currentIndex = useSelector((state) => state.music.currentIndex);
  const music = useSelector(
    (state) => state.music.relatedPlaylist[currentIndex]
  );

  const fakeResults = useSelector((state) => state.music.relatedPlaylist).slice(
    0,
    10
  );

  useEffect(() => {
    console.log(music);
  }, [music]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      console.log(searchKeyword);
    }, 1000);

    if (searchKeyword === "ok") {
      setShowResults(true);
    }
    console.log(showResults);

    return () => clearTimeout(delayedSearch);
  }, [searchKeyword, showResults]);

  // function toggleResults() {
  //   setShowResults(!showResults);
  // }
  return (
    <div className="DesktopNav">
      <div className="nav-menu">
        <div className="logo">
          <Link to={"/"}>
            <FontAwesomeIcon icon={faCat} />
            <FontAwesomeIcon icon={faMusic} />
            <span> Miusic</span>
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
        <div className="login-btns text-center">
          <button className="btn btn-secondary disabled me-1">ثبت نام</button>
          <button className="btn btn-secondary disabled">ورود </button>
        </div>
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
              {fakeResults.map((item, index) => {
                return (
                  <li key={index}>
                    <button>
                      <img src={item.thumbnail} alt={item.title} />
                      <div className="results-names">
                        <span className="results-song">{item.song}</span>
                        <span className="results-artist">{item.artist}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
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
