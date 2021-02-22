import React from "react";
import DeleteAnimeButton from "./DeleteAnimeButton";

const WatchListItem = ({ anime, id }) => {
  return (
    <div className="watchlist_item">
      <div>
        <img src={anime.image_url} alt={`${anime.title} poster`} />
      </div>
      <div className="watchlist_item_info">
        <h2>{anime.title}</h2>
        <h4 style={{ fontSize: "0.8em" }}>{anime.title_english !== anime.title && anime.title_english}</h4>
        <h4 style={{ fontSize: "0.9em", marginTop: "0.5rem" }}>{anime.airing_period}</h4>
        {anime.score && (
          <div>
            <i className="fas fa-star" style={{ color: "yellow" }} />
            <span>{anime.score}</span>
          </div>
        )}
        <DeleteAnimeButton id={id} mal_id={anime.mal_id} title={anime.title} />
      </div>
    </div>
  );
};

export default WatchListItem;
