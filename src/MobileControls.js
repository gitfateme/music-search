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
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import useAudioPlayer from "./useAudioPlayer";
import { goNext, goPrev } from "./app/musicSlice";

export default function MobileControls() {
  const { curTime, duration, playing, setPlaying, setClickedTime } =
    useAudioPlayer();

  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.music.currentIndex);
  const music = useSelector(
    (state) => state.music.relatedPlaylist[currentIndex]
  );

  const audioRef = useRef();

  const curPercentage = (curTime / duration) * 100;

  useEffect(() => {
    if (curPercentage >= 100) {
      dispatch(goNext());
    }
  }, [curPercentage, dispatch]);

  useEffect(() => {
    if (playing) {
      navigator.mediaSession.setActionHandler("pause", () => {
        setPlaying(false);
      });
    } else {
      navigator.mediaSession.setActionHandler("play", () => {
        setPlaying(true);
      });
    }
  }, [playing, setPlaying]);

  useEffect(() => {
    setPlaying(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
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
        <source src={music ? music.lq_link : null} />
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
            <Link to={music ? `/musics/${music.permlink}/${music.id}` : ""}>
              <FontAwesomeIcon icon={faChevronUp} />
            </Link>
          </div>
        </div>
        <div className="track-info">
          <span className="title">{music ? music.song : null}</span>
          <span className="artist">{music ? music.artist : null}</span>
        </div>
        <div className="playback-controls">
          <button
            className="back"
            onClick={(e) => {
              dispatch(goPrev());
            }}
          >
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
                if (music) {
                  setPlaying(true);
                }
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}

          <button
            className="forward"
            onClick={(e) => {
              dispatch(goNext());
            }}
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
      </div>
    </div>
  );
}
