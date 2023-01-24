import React, { useState, useEffect } from "react";
import "./css/MobileSearch.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function MobileSearch() {
  const [keyword, setKeyword] = useState();
  const [searchedKeyword, setSearchedKeyword] = useState();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMusic() {
      const res = await axios.get(
        `https://www.radiojavan.com/api2/search?query=${keyword}`
      );
      setResult(res.data);
      setSearchedKeyword(keyword);
      setLoading(false);
      if (res.data.lyrics.length > 0 && res.data.mp3s.length < 1) {
        navigate("/search/lyrics");
      }
    }
    const delayedSearch = setTimeout(() => {
      if (keyword.length > 2 && keyword !== searchedKeyword) {
        setResult(null);
        setLoading(true);
        getMusic();
      }
    }, 1500);

    return () => clearTimeout(delayedSearch);
  }, [keyword, result, searchedKeyword, navigate]);

  async function getMusic() {
    // const res = await axios.get("http://localhost:3000/musics", {
    //   params: {
    //     searchKeyword: keyword,
    //   },
    // });
    // console.log(res);
    // setError(null);
    // setResult(res.data);
    const res = await axios.get(
      `https://www.radiojavan.com/api2/search?query=${keyword}`
    );

    if (res.data === {} || res.data.top === []) {
      setError(true);
    } else {
      setResult(res.data);
      setLoading(false);
      if (res.data.lyrics.length > 0 && res.data.mp3s.length < 1) {
        console.log(res.data);
        navigate("/search/lyrics");
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchedKeyword(keyword);
    getMusic();
    navigate("/search");
    setResult(null);
    setLoading(true);
  }

  return (
    <div className="MobileSearch">
      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
        </form>
      </div>
      <div className={`search-empty ${result ? "d-none" : ""}`}>
        <div className="search-icon-wrapper">
          <div className="search-icon">
            {loading ? (
              <LoadingSpinner size={"40px"} />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            )}
          </div>
        </div>
        <div className="search-empty-texts">
          <span className="empty-top-span">
            {error ? "No results" : "Search Meowsic"}
          </span>
          <span className="empty-bot-span">Find musics, lyrics and more .</span>
        </div>
      </div>
      <div className={`search-results-container ${result ? "" : "d-none"}`}>
        {result != null ? (
          result.mp3s.length < 1 &&
          result.lyrics.length < 1 &&
          result !== {} ? (
            <p className="text-center">چیزی پیدا نشد</p>
          ) : (
            <Outlet context={[keyword, result, searchedKeyword]} />
          )
        ) : null}
      </div>
    </div>
  );
}
