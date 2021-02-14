import React from "react";
import { Link } from "react-router-dom";

const AnimeItem = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime_item_wrapper">
      <div className="anime_image">
        <img src={anime.image_url} alt={anime.title} />
      </div>
      <span>{anime.title}</span>
    </Link>
  );
};

export default AnimeItem;
