import React, { useRef, useState, useEffect } from "react";
import "./css/MobileControls.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronUp,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
// import { useSelector } from "react-redux";
// import useAudioPlayer from "./useAudioPlayer";

export default function MobileControls() {
  const [playing, setPlaying] = useState(false);
  // const {
  //   curTime,
  //   duration,
  //   playing,
  //   setPlaying,
  //   setClickedTime,
  //   vol,
  //   setVol,
  // } = useAudioPlayer();

  // const music = useSelector((state) => state.music.data);
  const guzic =
    "https://host2.media-rj.com/media/mp3/mp3-hls/109850-6c42592db63c0de/file-96k.m3u8";
  const audioRef = useRef();

  // const curPercentage = (curTime / duration) * 100;

  // const curVolPercentage = vol * 100;

  // useEffect(() => {
  //   console.log(playing);
  // setPlaying(true);
  // setVol(audioRef.current.volume);

  // if (audioRef.current) {
  //   audioRef.current.pause();
  //   audioRef.current.load();
  //   audioRef.current.play();
  // console.log(music);
  //   }
  // }, [setPlaying, playing]);

  // function formatDuration(duration) {
  //   let time = Math.ceil(duration);
  //   let hours = Math.floor(time / 3600);
  //   time = time - hours * 3600;
  //   let minutes = Math.floor(time / 60);
  //   let seconds = time - minutes * 60;
  //   if (minutes < 10) {
  //     minutes = `0${minutes}`;
  //   }
  //   if (seconds < 10) {
  //     seconds = `0${seconds}`;
  //   }
  //   if (hours >= 1) {
  //     return `${hours}:${minutes}:${seconds}`;
  //   } else {
  //     return `${minutes}:${seconds}`;
  //   }
  // }

  // function calcClickedTime(e) {
  //   const clickPositionInPage = e.pageX;
  //   const bar = document.querySelector(".bar-progress");
  //   const barStart = bar.getBoundingClientRect().left + window.scrollX;
  //   const barWidth = bar.offsetWidth;
  //   const clickPositionInBar = clickPositionInPage - barStart;
  //   const timePerPixel = duration / barWidth;
  //   return timePerPixel * clickPositionInBar;
  // }

  // function setClickedVol(e) {
  //   const clickPositionInPage = e.pageX;
  //   const volBar = document.querySelector(".vol-bar-progress");
  //   const barStart = volBar.getBoundingClientRect().left + window.scrollX;
  //   const barWidth = volBar.offsetWidth;
  //   const clickPositionInBar = clickPositionInPage - barStart;
  //   const volPerPixel = 1 / barWidth;
  //   const newVol = volPerPixel * clickPositionInBar;
  //   if (newVol < 0.05) {
  //     setVol(0);
  //   } else if (newVol > 0.95) {
  //     setVol(1);
  //   } else {
  //     setVol(newVol);
  //   }
  // }

  // function handleVolDrag(e) {
  //   document.addEventListener("mousemove", setClickedVol);
  //   document.addEventListener("mouseup", () => {
  //     document.removeEventListener("mousemove", setClickedVol);
  //   });
  // }
  // function onTimeUpdate(time) {
  //   setClickedTime(time);
  // }

  // function handleTimeDrag(e) {
  //   onTimeUpdate(calcClickedTime(e));
  //   const updateTimeOnMove = (eMove) => {
  //     onTimeUpdate(calcClickedTime(eMove));
  //     setPlaying(false);
  //   };

  //   document.addEventListener("mousemove", updateTimeOnMove);
  //   document.addEventListener("mouseup", () => {
  //     document.removeEventListener("mousemove", updateTimeOnMove);
  //   });
  // }

  // function handleVolClcik(e) {
  //   if (vol > 0) {
  //     setVol(0);
  //   } else if (vol === 0) {
  //     setVol(0.5);
  //   }
  // }

  return (
    <div className="MobileControls">
      <audio id="audio" ref={audioRef}>
        <source src="https://host2.media-rj.com/media/mp3/mp3-256/109852-76849e1bbaded5f.mp3" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className="bar-row">
        <div className="bar">
          <div className="bar-progress" style={{ width: "33%" }}></div>
        </div>
      </div>
      <div className="controls-row">
        <div className="expand-container">
          <div className="expand-icon">
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        </div>
        <div className="track-info">
          <span className="title">Roye To Hassasam asdasdas</span>
          <span className="artist">Vahid Moradpour</span>
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
                audioRef.current.pause();
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
                if (guzic) {
                  setPlaying(true);
                  audioRef.current.pause();
                  audioRef.current.load();
                  audioRef.currentTime = 0;
                  audioRef.current.play();
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
