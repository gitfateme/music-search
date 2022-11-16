import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import "./css/MusicSearchPagination.scss";

export default function MusicSearchPagination(props) {
  const items = props.data;
  const itemsPerPage = 7;
  const [pagesCount, setPagesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [leftDots, setLeftDots] = useState(true);
  const [rightDots, setRightDots] = useState(true);
  const [range, setRange] = useState([2, 3, 4]);

  const getRange = useCallback(() => {
    if (pagesCount <= 5) {
      setRange(
        Array.from({ length: pagesCount }, (x, i) => i + 1).slice(1, -1)
      );
    } else if (currentPage === 1) {
      setRange([currentPage + 1, currentPage + 2, currentPage + 3]);
    } else if (currentPage === 2) {
      setRange([currentPage, currentPage + 1, currentPage + 2]);
    } else if (currentPage === pagesCount) {
      setRange([currentPage - 2, currentPage - 1]);
    } else if (currentPage === pagesCount - 1) {
      setRange([currentPage - 2, currentPage - 1, currentPage]);
    } else {
      setRange([currentPage - 1, currentPage, currentPage + 1]);
    }
  }, [currentPage, pagesCount]);

  const shouldShowRightDots = useCallback(() => {
    if (pagesCount <= 5 || currentPage > pagesCount - 3) {
      setRightDots(false);
    } else {
      setRightDots(true);
    }
  }, [currentPage, pagesCount]);

  const shouldShowLeftDots = useCallback(() => {
    if (pagesCount <= 5 || currentPage < 4) {
      setLeftDots(false);
    } else {
      setLeftDots(true);
    }
  }, [currentPage, pagesCount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  useEffect(() => {
    shouldShowRightDots();
    shouldShowLeftDots();
    getRange();
    setPagesCount(Math.ceil(items.length / itemsPerPage));
    let newItems = items.slice(
      currentPage * itemsPerPage - itemsPerPage,
      currentPage * itemsPerPage
    );
    setCurrentItems(newItems);
  }, [
    itemsPerPage,
    currentPage,
    items,
    getRange,
    shouldShowLeftDots,
    shouldShowRightDots,
  ]);

  function nextPage(e) {
    e.preventDefault();
    if (currentPage < pagesCount) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage(e) {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  if (currentItems === [] || !currentItems || currentItems[0] === undefined) {
    return <></>;
  } else {
    return (
      <div className="ItemsList mt-0 mb-3 container">
        <h2>نتایج جستجو</h2>
        <ul className="searched-list text-light">
          {currentItems.map((item, index) => {
            return (
              <li key={index} className="searched-list-item">
                <Link to={`/musics/${item.permlink}/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                  {`${item.artist} - ${item.song}`}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className={` justify-content-center ${
            pagesCount < 2 ? "d-none" : "d-flex"
          }`}
        >
          <nav aria-label="music page navigation">
            <ul className="pagination">
              <li className="page-item arrow-btn">
                <a
                  onClick={prevPage}
                  className="page-link"
                  href="/"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                  }}
                  className="page-link"
                  href="/"
                >
                  1
                </a>
              </li>
              <li className={`page-item disabled ${leftDots ? "" : "d-none"}`}>
                <a className="page-link" href="/">
                  ...
                </a>
              </li>
              {range.map((num, index) => {
                return (
                  <li
                    className={`page-item ${
                      currentPage === num ? "active" : ""
                    }`}
                    key={index}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(num);
                      }}
                      className="page-link"
                      href="/"
                    >
                      {num}
                    </a>
                  </li>
                );
              })}
              <li className={`page-item disabled ${rightDots ? "" : "d-none"}`}>
                <a className="page-link" href="/">
                  ...
                </a>
              </li>
              <li
                className={`page-item ${
                  currentPage === pagesCount ? "active" : ""
                }`}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(pagesCount);
                  }}
                  className="page-link"
                  href="/"
                >
                  {pagesCount}
                </a>
              </li>
              <li className="page-item">
                <a
                  onClick={nextPage}
                  className="page-link arrow-btn"
                  href="/"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
