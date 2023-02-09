import React from "react";
import "./css/MobileNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="MobileNav">
      <nav className="d-flex justify-content-around">
        <Link to="/">
          <div className="mobilenav-item">
            <div className="mobilenav-icon">
              <FontAwesomeIcon icon={faHouse} />
            </div>
            <span className="mobilenav-text">Home</span>
          </div>
        </Link>
        {/* <div className="mobilenav-item  mobilenav-disabled">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faRankingStar} />
          </div>
          <span className="mobilenav-text">Top 50</span>
        </div> */}
        <Link to="/search">
          <div className="mobilenav-item">
            <div className="mobilenav-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <span className="mobilenav-text">Search</span>
          </div>
        </Link>
        {/* <div className="mobilenav-item  mobilenav-disabled">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faMusic} />
          </div>
          <span className="mobilenav-text">Your Music</span>
        </div>
        <div className="mobilenav-item  mobilenav-disabled">
          <div className="mobilenav-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span className="mobilenav-text">Account</span>
        </div> */}
      </nav>
    </div>
  );
}
