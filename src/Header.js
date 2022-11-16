import React from "react";
import "./css/Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="Header">
      <div className="container h-100">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo ">
            <Link to="/">
              <span>GoozAhang</span>
            </Link>
          </div>
          <div>
            <div className="search-btn">
              <Link to="/search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
