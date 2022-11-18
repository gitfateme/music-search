import React from "react";
import "./css/MobileNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMusic,
  faRankingStar,
  faHouse,
  faUser,
  faM,
} from "@fortawesome/free-solid-svg-icons";

export default function MobileNav() {
  return (
    <div className="MobileNav">
      <nav className="d-flex justify-content-around">
        <div className="mobilenav-item">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <span className="mobilenav-text">Home</span>
        </div>
        <div className="mobilenav-item">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faRankingStar} />
          </div>
          <span className="mobilenav-text">Top 50</span>
        </div>
        <div className="mobilenav-item">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <span className="mobilenav-text">Search</span>
        </div>
        <div className="mobilenav-item">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faMusic} />
          </div>
          <span className="mobilenav-text">Your Music</span>
        </div>
        <div className="mobilenav-item">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span className="mobilenav-text">Account</span>
        </div>
      </nav>
    </div>
  );
}
