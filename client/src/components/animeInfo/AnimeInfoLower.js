import React from "react";
import { Link } from "react-router-dom";

const AnimeInfoLower = ({ anime }) => {
  const { synopsis, recommendations, characters } = anime;

  return (
    <div className="anime_info_lower">
      <div className="anime_synopsis">
        <h2>Synopsis</h2>
        <p className="anime_synopsis">{synopsis}</p>
      </div>
      <hr />
      <div className="anime_characters_wrapper">
        <h2>Characters</h2>
        <div className="anime_characters">
          {characters.map((character) => (
            <div key={character.mal_id} className="anime_character">
              <img src={character.image_url} alt={character.name} className="character_image" />
              <span>{character.name}</span>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="anime_recommendations_wrapper">
        <h2>More Anime TV and Movies</h2>
        <div className="anime_recommendations">
          {recommendations.slice(0, 20).map((recommendation) => (
            <div key={recommendation.image_url} className="anime_item_wrapper">
              <Link to={`/anime/${recommendation.mal_id}`} className="anime_item_main">
                <div className="anime_image">
                  <img src={recommendation.image_url} alt={recommendation.title} />
                </div>
                <span>{recommendation.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoLower;
