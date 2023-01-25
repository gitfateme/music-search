import React from "react";
import "./css/ResultsComponent.scss";
import useViewport from "./useViewPort";
import { Link, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setCurrentMusic, setRelatedPlaylist } from "./app/musicSlice";
import axios from "axios";

export function TopResults() {
  const dispatch = useDispatch();

  async function setMusic(music) {
    await axios
      .get(`https://www.radiojavan.com/api2/mp3?id=${music.id}`)
      .then((r) => {
        console.log(r.data.song);
        dispatch(setCurrentMusic(r.data));
        dispatch(setRelatedPlaylist(r.data));
      });
  }

  // function getHighlightedText(text, highlight) {
  //   const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  //   return (
  //     <span>
  //       {parts.map((part) =>
  //         part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part
  //       )}
  //     </span>
  //   );
  // }

  // const { width } = useViewport();
  // const breakpoint = 768;
  const data = useOutletContext()[1];
  // const keyword = useOutletContext()[2];
  // return width < breakpoint ? (
  return (
    <div>
      <div className="nav-container">
        <nav className="tab-nav">
          <Link className="tab-link active" to="/search">
            آهنگ ها
          </Link>
          <Link className="tab-link " to="/search/lyrics">
            متن آهنگ
          </Link>
          {/* <Link className="tab-link" to="/search/artists">
          Artists
        </Link>
        <Link className="tab-link" to="/search/songs">
          Songs
        </Link>
        <Link className="tab-link" to="/search/albums">
          Albums
        </Link> */}
        </nav>
      </div>
      <section className="tabs">
        <div className="mobile-top-results">
          {data && data !== null ? (
            <ul>
              {data.mp3s.map((data, index) => {
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
          ) : null}
        </div>
      </section>
    </div>
  );
  // ) : (
  //   <>something went wrong here in top results component</>
  // );
}

export function LyricsResults() {
  const data = useOutletContext()[1];
  console.log(data);
  const dispatch = useDispatch();
  async function setMusic(music) {
    await axios
      .get(`https://www.radiojavan.com/api2/mp3?id=${music.id}`)
      .then((r) => {
        console.log(r.data.song);
        dispatch(setCurrentMusic(r.data));
        dispatch(setRelatedPlaylist(r.data));
      });
  }

  console.log("lyrics results component rendered");
  return (
    <div>
      <div className="nav-container">
        <nav className="tab-nav">
          <Link className="tab-link " to="/search">
            آهنگ ها
          </Link>
          <Link className="tab-link active" to="/search/lyrics">
            متن آهنگ
          </Link>
        </nav>
      </div>
      <section className="tabs">
        <div className="mobile-top-results">
          {data && data !== null ? (
            <ul>
              {data.lyrics.map((data, index) => {
                return (
                  <li key={index} style={{ height: "100px" }}>
                    <button
                      onClick={(e) => setMusic(data)}
                      style={{ height: "80px" }}
                    >
                      <span className="song-span">{data.song}</span>
                      <span className="artist-span">{data.artist}</span>
                      <span className="artist-span">
                        "{data.lyric_snippet}"
                      </span>
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
          ) : null}
        </div>
      </section>
    </div>
  );
}

export function SongsResults() {
  const { width } = useViewport();
  const breakpoint = 768;
  const keyword = useOutletContext()[0];

  console.log(keyword);

  return width < breakpoint ? (
    <div>
      <div className="nav-container">
        <nav className="tab-nav">
          <Link className="tab-link " to="/search">
            Top Results
          </Link>
          <Link className="tab-link " to="/search/artists">
            Artists
          </Link>
          <Link className="tab-link active" to="/search/songs">
            Songs
          </Link>
          <Link className="tab-link" to="/search/albums">
            Albums
          </Link>
        </nav>
      </div>
      <section className="tabs">
        <div>Songs Component</div>
      </section>
    </div>
  ) : (
    <>test</>
  );
}

export function AlbumsResults() {
  const { width } = useViewport();
  const breakpoint = 768;

  return width < breakpoint ? (
    <div>
      <div className="nav-container">
        <nav className="tab-nav">
          <Link className="tab-link " to="/search">
            Top Results
          </Link>
          <Link className="tab-link " to="/search/artists">
            Artists
          </Link>
          <Link className="tab-link " to="/search/songs">
            Songs
          </Link>
          <Link className="tab-link active" to="/search/albums">
            Albums
          </Link>
        </nav>
      </div>
      <section className="tabs">
        <div>Albums Component</div>
      </section>
    </div>
  ) : (
    <>test</>
  );
}
