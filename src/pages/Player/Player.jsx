import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODE1MGI2YWU2ODY2Zjg0NWU4OTE0MjAyOWEwY2Q0ZSIsIm5iZiI6MTc3NTY3ODY2Mi41NzYsInN1YiI6IjY5ZDZiNGM2YzkxOWJlZjdlOGNjMGFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.caZSXzegGaspq20K_iHHhQ8-nJ45aTZ-yH5hScolD14'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, []);

  return (
    apiData ?
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />
      <iframe
        id="my-iframe"
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0">
      </iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
    :
    <div className="player">
      <h2>Oops! Something went wrong</h2>
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />
    </div>
  );
}

export default Player
