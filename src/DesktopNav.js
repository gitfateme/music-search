import React from "react";
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
  const currentIndex = useSelector((state) => state.music.currentIndex);
  const music = useSelector(
    (state) => state.music.relatedPlaylist[currentIndex]
  );

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
          <input placeholder="جستجو..." />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="nav-item active">
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
      {music === undefined ? (
        <div className="current-track d-none"></div>
      ) : (
        <div className="current-track">
          <Link to={music ? `/musics/${music.permlink}/${music.id}` : ""}>
            <img src={music.thumbnail} alt={music.song} />
          </Link>
          <div className="track-info">
            <span className="track-title">{music.title}</span>
            <span className="track-artist">{music.artist}</span>
          </div>
        </div>
      )}
    </div>
  );
}
