import React from "react";
import "./css/ItemsList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { setCurrentMusic, setRelatedPlaylist } from "./app/musicSlice";
import useViewport from "./useViewPort";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ItemsList({ data, playlist, trendingData }) {
  const { width } = useViewport();
  const breakpoint = 768;
  const dispatch = useDispatch();

  async function setMusic(music) {
    await axios
      .get(`https://www.radiojavan.com/api2/mp3?id=${music.id}`)
      .then((r) => {
        dispatch(setCurrentMusic(r.data));
        if (playlist === "trending") {
          const data = {
            ...r.data,
            related: trendingData.filter((data) => data.id !== music.id),
          };
          dispatch(setRelatedPlaylist(data));
        } else {
          dispatch(setRelatedPlaylist(r.data));
        }
      });
    // dispatch(setCurrentMusic(music));
    // dispatch(setRelatedPlaylist(music));
  }
  function formatDuration(duration) {
    let time = Math.ceil(duration);
    let hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (minutes < 10) {
      minutes = `${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (hours >= 1) {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }

  return width < breakpoint ? (
    <div className="ItemsList-mobile">
      <ul>
        {data.map((data, index) => {
          return (
            <li key={index}>
              <button onClick={(e) => setMusic(data)} className="main-btn">
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
  ) : (
    <div className="ItemsList-desktop">
      <table>
        <thead>
          <tr>
            <th className="number-column">#</th>
            <th className="like-column"></th>
            <th className="title-column">آهنگ</th>
            <th className="options-column"></th>
            <th className="artist-column">خواننده</th>
            <th className="duration-column">
              <FontAwesomeIcon icon={faClock} />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return (
              <tr key={index}>
                <td className="number-column">
                  <span className="number-span">{index + 1}</span>
                  <button onClick={(e) => setMusic(data)} className="play-btn">
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </button>
                </td>
                <td className="like-column">
                  <button>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </td>
                <td className="title-column">
                  <Link to={`/musics/${data.permlink}/${data.id}`}>
                    <img src={data.thumbnail} alt={data.song} />
                    <span>{data.song}</span>
                  </Link>
                </td>
                <td className="options-column">
                  <button>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                </td>
                <td className="artist-column">
                  <span>{data.artist}</span>
                </td>
                <td className="duration-column">
                  {formatDuration(data.duration)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
