import React from "react";
import { Link } from "react-router-dom";

const AnimeItem = ({ anime }) => {
  return (
    <div className="anime_item_wrapper">
      <Link to={`/anime/${anime.mal_id}`} className="anime_item_main">
        <div className="anime_image">
          <img src={anime.image_url} alt={anime.title} />
        </div>
        <span>{anime.title}</span>
      </Link>
    </div>
  );
};

export default AnimeItem;
