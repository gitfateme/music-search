import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/AppMusic.scss";
import MusicPage from "./MusicPage";
import MusicPlayerBar from "./MusicPlayerBar";
import SearchPage from "./SearchPage";

export default function AppMusic() {
  const { musicId } = useParams();

  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getMusic() {
      await axios
        .get(`http://localhost:3000/musics/${musicId}`)
        .then((res) => {
          setMusic(res.data);
        })
        .catch((err) => {
          setNotFound(true);
        });
      setLoading(false);
    }
    getMusic();
  }, [musicId, loading]);

  useEffect(() => {
    if (notFound) {
      navigate("/");
    }
  }, [notFound, navigate]);

  if (loading) {
    return <>loading</>;
  } else {
    return (
      <div className="AppMusic">
        <div className="not-music-bar">
          <MusicPage music={music} />
          <SearchPage />
        </div>
        <MusicPlayerBar />
      </div>
    );
  }
}
