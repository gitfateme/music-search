import React, { useState, useEffect } from "react";
import "./css/MobileHome.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsis,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setCurrentMusic, setRelatedPlaylist } from "./app/musicSlice";
import axios from "axios";
import useViewport from "./useViewPort";

export default function MobileHome() {
  const { width } = useViewport();

  const [activeIndex, setActiveIndex] = useState(0);
  const [popularData, setPopularData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {
    if (width > 1200) {
      setItemsPerPage(5);
    } else if (width > 992) {
      setItemsPerPage(4);
    } else if (width > 576) {
      setItemsPerPage(3);
    } else if (width < 576) {
      setItemsPerPage(2);
    }
    console.log(itemsPerPage);
  }, [width, itemsPerPage]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(popularData);
  }, [popularData]);

  async function getData() {
    const res = await axios.get("http://localhost:3000/trendings");
    setPopularData(res.data);
  }

  const dispatch = useDispatch();
  const dataLength = popularData.length;

  const updateCarouselIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > dataLength - 1) {
      newIndex = dataLength - 1;
    }
    setActiveIndex(newIndex);
    setActiveIndex(newIndex);
  };

  function setMusic(music) {
    dispatch(setCurrentMusic(music));
    dispatch(setRelatedPlaylist(music));
  }

  return (
    <div
      className="MobileHome"
      style={{
        height: width > 700 ? "calc(100vh - 65px)" : "calc(100vh - 140px)",
      }}
    >
      <div className="mobile-home-container container-md">
        <div className="popular-tracks-container ">
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
                  <button onClick={(e) => setMusic(data)}>
                    <span className="song-span">{data.song}</span>
                    <span className="artist-span">{data.artist}</span>
                  </button>
                  <button
                    className="options-btn"
                    onClick={(e) => console.log("...")}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="new-releases-container mt-4">
          <div className="heading-2 d-flex">
            <h2>New Releases</h2>
            <span className="h2-icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
            <div className="carousel-controls">
              <button
                onClick={() => {
                  updateCarouselIndex(activeIndex - 1);
                }}
                disabled={activeIndex === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() => {
                  updateCarouselIndex(activeIndex + 1);
                }}
                disabled={activeIndex >= dataLength / itemsPerPage - 1}
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
                    <button
                      onClick={(e) => {
                        setMusic(data);
                      }}
                    >
                      <div className="img-container">
                        <img
                          src={data.thumbnail}
                          alt={data.title}
                          className="img-fluid"
                        />
                        <div className="img-container-hover">
                          <div className="hover-icon">
                            <FontAwesomeIcon icon={faPlay} />
                          </div>
                        </div>
                      </div>
                    </button>
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
        <div className="popular-albums-container mt-4">
          <div className="heading-2 d-flex">
            <h2>Popular Albums</h2>
            <span className="h2-icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
          <div className="popular-albums-items-container">
            {popularData.map((data, index) => {
              return (
                <div key={index} className="popular-albums-item">
                  <button
                    onClick={(e) => {
                      setMusic(data);
                    }}
                  >
                    <div className="img-container">
                      <img
                        src={data.thumbnail}
                        alt={data.title}
                        className="img-fluid"
                      />
                      <div className="img-container-hover">
                        <div className="hover-icon">
                          <FontAwesomeIcon icon={faPlay} />
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="item-texts">
                    <span className="title-text">{data.song}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
