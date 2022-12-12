import React from "react";
import "./css/DesktopNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faWind,
  faMagnifyingGlass,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DesktopNav() {
  const music = useSelector((state) => state.music.data);
  console.log(music.title);
  return (
    <div className="DesktopNav">
      <div className="nav-menu">
        <div className="logo">
          <Link to={"/"}>
            <FontAwesomeIcon icon={faMusic} />
            <FontAwesomeIcon icon={faWind} />
            <span> Goozic</span>
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
            <span>خانه</span>
          </div>
        </Link>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="nav-item">
            <FontAwesomeIcon icon={faWind} />
            <span>خانه</span>
          </div>
        </Link>
        <hr />
        <div className="login-btns text-center">
          <button className="btn btn-secondary disabled me-1">ثبت نام</button>
          <button className="btn btn-secondary disabled">ورود </button>
        </div>
      </div>
      <div className={`current-track ${music ? "" : "d-none"}`}></div>
    </div>
  );
}
