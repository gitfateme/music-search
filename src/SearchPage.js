import React, { useState } from "react";
import "./css/SearchPage.scss";
import axios from "axios";
import Pagination from "./MusicSearchPagination";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  async function getMusic() {
    const res = await axios.get("http://localhost:3000/musics", {
      params: {
        test: keyword,
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
    <div className="HomePage text-center container">
      <div className=" border py-5">
        <p>میتونی بخشی از آهنگ مورد علاقه ات رو وارد کنی و پیداش کنی</p>
        <form method="get" onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <input
                onChange={handleChange}
                className="form-control text-end"
              />
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-md-2">
              <button className="btn btn-primary w-100" type="submit">
                جستجو
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <ItemsList data={result} /> */}
      <Pagination data={result} />
    </div>
  );
}
