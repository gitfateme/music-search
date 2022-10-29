import React from "react";
import { Link } from "react-router-dom";

export default function ItemsList(props) {
  const data = props.data;
  if (props.data == [] || !props.data || props.data[0] == undefined) {
    return <></>;
  } else {
    return (
      <div className="ItemsList">
        <ul className="list-group">
          {data.map((data, index) => {
            return (
              <li key={index} className="list-group-item">
                <Link to={`/musics/${data._id}`}>{data.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
