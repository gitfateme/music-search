import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="HomePage text-center container border py-5">
      <h1>جستجوگر آهنگ</h1>
      <p>میتونی بخشی از آهنگ مورد علاقه ات رو وارد کنی و پیداش کنی</p>
      <form>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <input className="form-control text-end" />
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
    </div>
  );
}
