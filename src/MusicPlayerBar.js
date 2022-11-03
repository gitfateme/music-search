import React, { useEffect, useRef } from "react";
import "./css/MusicPlayerBar.scss";
import { useSelector } from "react-redux";

export default function MusicPlayerBar() {
  const music = useSelector((state) => state.music.data);
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [music]);
  return (
    <div className="MusicPlayerBar text-center">
      <audio controls ref={audioRef} className="py-1">
        <source src={music.lq_link} />
      </audio>
      <p></p>
    </div>
  );
}
