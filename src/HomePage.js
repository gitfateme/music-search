import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [src, setSrc] = useState("");

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMusic();
  }

  async function getMusic() {
    const res = await axios.get("http://localhost:3000/musics", {
      params: {
        test: keyword,
      },
    });
    console.log(res);
  }

  return (
    <div className="HomePage text-center container border py-5">
      <h1>جستجوگر آهنگ</h1>
      <p>میتونی بخشی از آهنگ مورد علاقه ات رو وارد کنی و پیداش کنی</p>
      <form method="get" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <input onChange={handleChange} className="form-control text-end" />
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
      <Link to={`/gorbe`}>router test link</Link>
      <img className="d-block" src={src} />
    </div>
  );
}
