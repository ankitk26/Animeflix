import React from "react";
import { Link } from "react-router-dom";

const AnimeInfoUpper = ({ anime }) => {
  const { title, image_url, episodes, title_english, score, premiered, genres, type, rating, duration, aired } = anime;

  return (
    <div className="anime_info_upper">
      {/* Anime Image */}
      <div className="anime_info_image_wrapper">
        <img src={image_url} alt={title} className="anime_info_image" />
      </div>
      {/* Anime Info */}
      <div>
        <h1>{title}</h1>
        {title_english !== title && <p className="english_title">{title_english}</p>}
        {/* Anime genres */}
        <div className="anime_genre">
          {genres.map((genre) => (
            <Link to={`/animes/genre/${genre.mal_id}`} key={genre.mal_id}>
              <span>{genre.name}</span>
            </Link>
          ))}
        </div>
        {/* Anime Stats */}
        <div className="anime_info_stats">
          <div>
            <i className="fas fa-film fa-2x"></i>
            <p className="light">Episodes</p>
            <p>{episodes}</p>
          </div>
          <div>
            <i className="fas fa-star fa-2x"></i>
            <p className="light">Score</p>
            <p>{score}</p>
          </div>
          {type === "TV" && (
            <div>
              <i className="fas fa-calendar fa-2x"></i>
              <p className="light">Premiered</p>
              <p>{premiered}</p>
            </div>
          )}
        </div>
        <div className="anime_other_info">
          <div>
            Type: <span>{type}</span>
          </div>
          <div>
            Rating: <span>{rating}</span>
          </div>
          <div>
            Duration: <span>{duration}</span>
          </div>
          {aired.from !== null && (
            <div>
              Release Date: <span>{aired.from}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoUpper;
