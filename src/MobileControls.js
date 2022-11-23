import React, { useRef, useEffect } from "react";
import "./css/MobileControls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronUp,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import useAudioPlayer from "./useAudioPlayer";

export default function MobileControls() {
  const { curTime, duration, playing, setPlaying, setClickedTime } =
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
      console.log(music);
    }
  }, [setPlaying, music]);

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
    <div className="MobileControls">
      <audio id="audio" ref={audioRef}>
        <source src={music.lq_link} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className="bar-row">
        <div className="bar">
          <div
            className="bar-progress"
            onMouseDown={(e) => handleTimeDrag(e)}
            onMouseUp={() => setPlaying(true)}
          >
            <div
              className="bar-played"
              style={{ width: `${curPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="controls-row">
        <div className="expand-container">
          <div className="expand-icon">
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        </div>
        <div className="track-info">
          <span className="title">{music.song}</span>
          <span className="artist">{music.artist}</span>
        </div>
        <div className="playback-controls">
          <button className="back">
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          {playing ? (
            <button
              className="pause"
              onClick={() => {
                console.log("pause btn clicked");
                setPlaying(false);
              }}
            >
              <FontAwesomeIcon icon={faPause} />
            </button>
          ) : (
            <button
              className="play"
              onClick={() => {
                console.log("play btn clicked");
                if (music) {
                  setPlaying(true);
                }
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}

          <button className="forward">
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
      </div>
    </div>
  );
}
