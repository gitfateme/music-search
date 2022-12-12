import React, { useEffect, useRef } from "react";
import "./css/DesktopControls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
import useAudioPlayer from "./useAudioPlayer";
import { useSelector } from "react-redux";

export default function DesktopControls() {
  const { playing, setPlaying, curTime, duration, setClickedTime } =
    useAudioPlayer();
  const music = useSelector((state) => state.music.data);
  const audioRef = useRef();

  const curPercentage = (curTime / duration) * 100;

  useEffect(() => {
    setPlaying(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [music, setPlaying]);

  function formatDuration(duration) {
    let time = Math.ceil(duration);
    let hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (hours >= 1) {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar-progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function onTimeUpdate(time) {
    setClickedTime(time);
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));
    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
      setPlaying(false);
    };

    document.addEventListener("mousemove", updateTimeOnMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className="DesktopControls">
      <div className="main-controls">
        <audio id="audio" ref={audioRef}>
          <source src={music.lq_link} />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <button className="back">
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        {playing ? (
          <button
            className="pause"
            onClick={() => {
              setPlaying(false);
            }}
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button
            className="play"
            onClick={() => {
              if (music.link) {
                setPlaying(true);
              }
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        <button className="next">
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>
      <div className="bar">
        <span className="bar-time">{formatDuration(curTime)}</span>
        <div
          className="bar-progress"
          onMouseDown={(e) => handleTimeDrag(e)}
          onMouseUp={() => setPlaying(true)}
        >
          <span
            className="bar-progress-knob"
            style={{ left: `${curPercentage}%` }}
          ></span>
          <div
            className="bar-played"
            style={{ width: `${curPercentage}%` }}
          ></div>
        </div>
        <span className="bar-time">{formatDuration(duration)}</span>
      </div>
    </div>
  );
}
