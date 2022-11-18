import React, { useState } from "react";
import "./css/MobileHome.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

export default function MobileHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const popularData = useOutletContext();

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > 4) {
      newIndex = 5 - 1;
    }
    setActiveIndex(newIndex);
    setActiveIndex(newIndex);
  };

  return (
    <div className="MobileHome">
      <div className="mobile-home-container">
        <div className="popular-tracks-container">
          <div className="heading-2 d-flex">
            <h2>Popular Tracks</h2>
            <span className="h2-icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
          <ul>
            {popularData.map((data, index) => {
              return (
                <li key={index}>
                  <span className="song-span">{data.song}</span>
                  <span className="artist-span">{data.artist}</span>
                  <button>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="new-releases-container mt-5">
          <div className="heading-2 d-flex">
            <h2>New Releases</h2>
            <span className="h2-icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
            <div className="carousel-controls">
              <button
                onClick={() => {
                  updateIndex(activeIndex - 1);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() => {
                  updateIndex(activeIndex + 1);
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          <div className="mobilehome-carousel">
            <div
              className="mobilehome-carousel-inner"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {popularData.map((data, index) => {
                return (
                  <div key={index} className="mobilehome-carousel-item">
                    <div className="img-container">
                      <img
                        src={data.photo_240}
                        alt={data.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="item-texts">
                      <span className="title-text">{data.song}</span>
                      <span className="artist-text">{data.artist}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0
