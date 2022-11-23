import React from "react";
import useViewport from "./useViewPort";
import { Link, useOutletContext } from "react-router-dom";

export function TopResults() {
  const { width } = useViewport();
  const breakpoint = 768;
  const data = useOutletContext()[1];
  return width < breakpoint ? (
    <div>
      <div className="nav-container">
        <nav className="tab-nav">
          <Link className="tab-link active" to="/search">
            Top Results
          </Link>
          <Link className="tab-link" to="/search/artists">
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
        <div>
          {data ? (
            <ul>
              {data.map((item, index) => {
                return <li key={index}>{item.title}</li>;
              })}
            </ul>
          ) : null}
        </div>
      </section>
    </div>
  ) : (
    <>gooz</>
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
    <>gooz</>
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
    <>gooz</>
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
    <>gooz</>
  );
}
