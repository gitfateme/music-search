import React, { useEffect, useRef } from "react";
import "./css/MusicPlayerBar.scss";
import { useSelector } from "react-redux";
import useAudioPlayer from "./useAudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

export default function MusicPlayerBar() {
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    vol,
    setVol,
  } = useAudioPlayer();

  const music = useSelector((state) => state.music.data);
  const audioRef = useRef();
  const curPercentage = (curTime / duration) * 100;

  const curVolPercentage = vol * 100;

  useEffect(() => {
    setPlaying(true);
    setVol(audioRef.current.volume);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
      console.log(music);
    }
  }, [music, setPlaying, setVol]);

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

  function setClickedVol(e) {
    const clickPositionInPage = e.pageX;
    const volBar = document.querySelector(".vol-bar-progress");
    const barStart = volBar.getBoundingClientRect().left + window.scrollX;
    const barWidth = volBar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const volPerPixel = 1 / barWidth;
    const newVol = volPerPixel * clickPositionInBar;
    if (newVol < 0.05) {
      setVol(0);
    } else if (newVol > 0.95) {
      setVol(1);
    } else {
      setVol(newVol);
    }
  }

  function handleVolDrag(e) {
    document.addEventListener("mousemove", setClickedVol);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", setClickedVol);
    });
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

  function handleVolClcik(e) {
    if (vol > 0) {
      setVol(0);
    } else if (vol === 0) {
      setVol(0.5);
    }
  }

  return (
    <div className={`MusicPlayerBar py-1 ${music.id ? "" : "d-none"}`}>
      <div>
        <audio id="audio" ref={audioRef}>
          <source src={music.lq_link} />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div className=" controls pt-2 ">
          <div className="control-btns d-flex">
            <div>
              <span> {`${music.artist} - ${music.song}`}</span>
            </div>
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
                style={{ left: `${curPercentage - 1}%` }}
              ></span>
              <div
                className="bar-played"
                style={{ width: `${curPercentage + 1}%` }}
              ></div>
            </div>
            <span className="bar-time">
              {music.link ? formatDuration(duration) : "00:00"}
            </span>
          </div>
          <div className="btns-row d-flex flex-row w-100 justify-content-center">
            {playing ? (
              <div>
                <button
                  className="player-btn"
                  onClick={() => {
                    console.log("pause btn clicked");
                    setPlaying(false);
                  }}
                >
                  <FontAwesomeIcon icon={faPause} />
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="player-btn"
                  onClick={() => {
                    console.log("play btn clicked");
                    if (music.link) {
                      setPlaying(true);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              </div>
            )}
            <div>
              <button className=" vol-btn" onClick={(e) => handleVolClcik()}>
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            </div>
            <div className="vol-bar">
              <div
                className="vol-bar-progress"
                onMouseDown={(e) => handleVolDrag(e)}
              >
                <div
                  className="vol-bar-colored"
                  style={{ width: `${curVolPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// https://codesandbox.io/s/custom-audio-player-with-react-hooks-forked-3tzy5i?file=/src/Bar.js
