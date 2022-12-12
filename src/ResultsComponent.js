import React from "react";
import "./css/ResultsComponent.scss";
import useViewport from "./useViewPort";
import { Link, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setCurrentMusic, setRelatedPlaylist } from "./app/musicSlice";

export function TopResults() {
  const dispatch = useDispatch();
  function setMusic(music) {
    dispatch(setCurrentMusic(music));
    dispatch(setRelatedPlaylist(music));
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

  const { width } = useViewport();
  const breakpoint = 768;
  const data = useOutletContext()[1];
  // const keyword = useOutletContext()[2];
  return width < breakpoint ? (
    <div>
      <div className="nav-container">
        <nav className="tab-nav">
          <Link className="tab-link active" to="/search">
            Top Results
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
          {data ? (
            <ul>
              {data.map((data, index) => {
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
  ) : (
    <>test</>
  );
}

export function ArtistsReults() {
  const { width } = useViewport();
  const breakpoint = 768;

  console.log("artists results component rendered");
  return width < breakpoint ? (
    <div>
      <div className="nav-container">
        <nav className="tab-nav">
          <Link className="tab-link " to="/search">
            Top Results
          </Link>
          <Link className="tab-link active" to="/search/artists">
            Artists
          </Link>
          <Link className="tab-link" to="/search/songs">
            Songs
          </Link>
          <Link className="tab-link" to="/search/albums">
            Albums
          </Link>
        </nav>
      </div>
      <section className="tabs">
        <div>Artists Component</div>
      </section>
    </div>
  ) : (
    <>test</>
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
