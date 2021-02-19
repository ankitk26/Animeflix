import React from "react";
import AnimeItem from "../AnimeItem";

const AnimeInfoLower = ({ anime }) => {
  const { synopsis, recommendations, characters } = anime;

  return (
    <div className="anime_info_lower">
      {/* Synopsis */}
      <div className="anime_synopsis">
        <h2>Synopsis</h2>
        <p className="anime_synopsis">{synopsis}</p>
      </div>

      <hr />

      {/* Characters section */}
      {characters.length > 0 && (
        <>
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
        </>
      )}

      {/* Recommendations section */}
      {recommendations.length > 0 && (
        <div className="anime_recommendations_wrapper">
          <h2 className="top_heading">More Anime TV and Movies</h2>
          <div className="anime_recommendations">
            {recommendations.slice(0, 20).map((recommendation) => (
              <AnimeItem key={recommendation.image_url} anime={recommendation} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeInfoLower;
