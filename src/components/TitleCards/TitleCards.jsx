import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "./TitleCards.css"
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODE1MGI2YWU2ODY2Zjg0NWU4OTE0MjAyOWEwY2Q0ZSIsIm5iZiI6MTc3NTY3ODY2Mi41NzYsInN1YiI6IjY5ZDZiNGM2YzkxOWJlZjdlOGNjMGFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.caZSXzegGaspq20K_iHHhQ8-nJ45aTZ-yH5hScolD14'
    }
  };

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel);

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    }
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
