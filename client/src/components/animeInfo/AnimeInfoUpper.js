import React from "react";
import { Link } from "react-router-dom";

const AnimeInfoUpper = ({ anime }) => {
  const {
    title,
    image_url,
    episodes,
    title_english,
    score,
    premiered,
    genres,
    studios,
    type,
    rating,
    duration,
    airing_period,
  } = anime;

  return (
    <div className="anime_info_upper">
      {/* Anime Image */}
      <div className="anime_info_image_wrapper">
        <img src={image_url} alt="anime poster" className="anime_info_image" />
      </div>

      {/* Anime Info */}
      <div>
        {/* Anime title */}
        <h1>{title}</h1>
        <div className="basic_info_1">
          {title_english !== title && <span>{title_english}</span>}
          <span>{type}</span>
        </div>

        <div className="basic_info_2">
          {premiered && <span className="gray_text">{premiered}</span>}
          {rating && <span className="gray_text rating">{rating}</span>}
          {duration && <span className="gray_text">{duration}</span>}
        </div>

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
            <p>{episodes !== null ? episodes : "N/A"}</p>
          </div>
          <div>
            <i className="fas fa-star fa-2x"></i>
            <p className="light">Score</p>
            <p>{score !== null ? score : "N/A"}</p>
          </div>
        </div>

        {/* Other info */}
        <div className="anime_other_info">
          <div>
            Studios:{" "}
            {studios.map((studio) => (
              <Link to={`/studio/${studio.mal_id}`} key={studio.mal_id}>
                {studio.name}
              </Link>
            ))}
          </div>
          <div>
            Original Run: <span>{airing_period}</span>
          </div>
        </div>

        <div className="buttons">
          <button>Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoUpper;
