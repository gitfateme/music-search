import React from "react";

export default function ItemsList(props) {
  const data = props.data;
  if (props.data == [] || !props.data || props.data[0] == undefined) {
    return <></>;
  } else {
    console.log(data);

    return (
      <div className="ItemsList">
        <ul>
          {data.map((data, index) => {
            return <li key={index}>{data.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}
