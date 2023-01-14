import React, { useEffect, useRef } from "react";
import "./css/DesktopControls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import useAudioPlayer from "./useAudioPlayer";
import { useSelector, useDispatch } from "react-redux";
import { goNext, goPrev } from "./app/musicSlice";

export default function DesktopControls() {
  const dispatch = useDispatch();

  const {
    playing,
    setPlaying,
    curTime,
    duration,
    setClickedTime,
    setCurTime,
    vol,
    setVol,
  } = useAudioPlayer();

  const currentIndex = useSelector((state) => state.music.currentIndex);
  const music = useSelector(
    (state) => state.music.relatedPlaylist[currentIndex]
  );

  const audioRef = useRef();

  const curPercentage = (curTime / duration) * 100;
  const curVolPercentage = vol * 100;

  useEffect(() => {
    if (curPercentage >= 100) {
      setPlaying(false);
      setCurTime(0);
    }
  }, [curPercentage, setPlaying, setCurTime]);

  useEffect(() => {
    setPlaying(true);
    setVol(audioRef.current.volume);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
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
  function handleVolClcik(e) {
    if (vol > 0) {
      setVol(0);
    } else if (vol === 0) {
      setVol(0.5);
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
          <source src={music ? music.lq_link : null} />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <button className="back" onClick={(e) => dispatch(goPrev())}>
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
        <button className="next" onClick={(e) => dispatch(goNext())}>
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
      <div className="vol">
        <div>
          <button className="vol-btn" onClick={(e) => handleVolClcik()}>
            {vol === 0 ? (
              <FontAwesomeIcon icon={faVolumeMute} />
            ) : (
              <FontAwesomeIcon icon={faVolumeHigh} />
            )}
          </button>
        </div>
        <div className="vol-bar" onMouseDown={(e) => handleVolDrag(e)}>
          <div className="vol-bar-progress">
            <div
              className="vol-bar-colored"
              style={{ width: `${curVolPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
