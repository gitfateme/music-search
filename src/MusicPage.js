import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/MusicPage.scss";
import MusicComponent from "./MusicComponent";

export default function MusicPage() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const { musicId } = useParams();

  useEffect(() => {
    document.title = `${music.artist} - ${music.song} - Meowzic.com`;
  });

  useEffect(() => {
    async function getMusic() {
      await axios
        // .get(`http://localhost:3000/musics/${musicId}`)
        .get(`https://www.radiojavan.com/api2/mp3?id=${musicId}`)
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
      <div className="MusicPage d-flex flex-column ">
        <MusicComponent music={music} />
      </div>
    );
  }
}
