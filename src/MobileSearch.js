import React, { useState } from "react";
import "./css/MobileSearch.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

export default function MobileSearch() {
  const [keyword, setKeyword] = useState();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function getMusic() {
    const res = await axios.get("http://localhost:3000/musics", {
      params: {
        searchKeyword: keyword,
      },
    });
    console.log(res);
    setResult(res.data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/search");
    getMusic().catch((err) => {
      console.log(err.response.status);
      setResult(null);
    });
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
      <div className="search-empty d-none">
        <div className="search-icon-wrapper">
          <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className="search-empty-texts">
          <span className="empty-top-span">Search Goozic</span>
          <span className="empty-bot-span">
            Find goozoos, algooz, goozics, and more chos.
          </span>
        </div>
      </div>
      <div className="search-results-container">
        <Outlet context={[keyword, result]} />
      </div>
    </div>
  );
}
