import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MusicPlayerPage() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { musicId } = useParams();
  const navigate = useNavigate();

  async function getMusic() {
    await axios
      .get(`http://localhost:3000/musics/${musicId}`)
      .then((res) => {
        setMusic(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setNotFound(true);
      });
  }

  useEffect(() => {
    getMusic();
  }, [loading]);

  useEffect(() => {
    if (notFound) {
      navigate("/");
    }
  }, [notFound]);

  if (loading) {
    return <>loading</>;
  } else {
    return (
      <div className="MusicPlayerPage">
        <h1>{music.title}</h1>
        <h2>{music.artist}</h2>
        <img src={music.thumbnail}></img>
        <br />
        <audio controls>
          <source src={music.lq_link} />
        </audio>
        <p>{music.lyric}</p>
      </div>
    );
  }
}
