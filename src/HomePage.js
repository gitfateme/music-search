import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSearchedItem } from "./app/searchItemSlice";

import ItemsList from "./itemsList";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  const dispatch = useDispatch();

  async function getMusic() {
    const res = await axios.get("http://localhost:3000/musics", {
      params: {
        test: keyword,
      },
    });
    console.log(res);
    setResult(res.data);
    dispatch(setSearchedItem(res.data));
  }

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMusic();
  }

  return (
    <div className="HomePage text-center container">
      <div className=" border py-5">
        <h1>آهنگیاب</h1>
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
      <ItemsList data={result} />
    </div>
  );
}
