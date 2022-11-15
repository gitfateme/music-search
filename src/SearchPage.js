import React, { useState } from "react";
import "./css/SearchPage.scss";
import axios from "axios";
import MusicSearchPagination from "./MusicSearchPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  async function getMusic() {
    const res = await axios.get("http://localhost:3000/musics", {
      params: {
        searchKeyword: keyword,
      },
    });
    console.log(res);
    setResult(res.data);
  }

  function handleChange(e) {
    console.log(e.target.value);
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMusic();
  }

  return (
    <div className="SearchPage ">
      <div className="py-3 form-container container">
        <form method="get" onSubmit={handleSubmit}>
          <div className="search-icon text-danger">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            onChange={handleChange}
            className="form-control text-end w-md-50 search-input border-danger bg-dark text-light"
          />
          <button className="btn btn-danger search-btn" type="submit">
            جستجو
          </button>
        </form>
      </div>
      <MusicSearchPagination data={result} />
    </div>
  );
}
