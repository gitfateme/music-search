import React from "react";
import "./css/MobileSearch.scss";

export default function MobileSearch() {
  return (
    <div className="MobileSearch">
      <div className="search-form">
        <form>
          <input placeholder="Search..."></input>
        </form>
      </div>
      <div className="search-empty"></div>
    </div>
  );
}
