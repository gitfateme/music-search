import { useState, useEffect } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();
  const [vol, setVol] = useState(1);

  useEffect(() => {
    const audio = document.getElementById("audio");

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    audio.volume = vol;

    const setAudioTime = () => setCurTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [setClickedTime, clickedTime, curTime, playing, vol]);
  return {
    curTime,
    setCurTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    vol,
    setVol,
  };
}

export default useAudioPlayer;
