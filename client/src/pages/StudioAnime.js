import { useQuery } from "@apollo/client";
import React from "react";
import AnimeItem from "../components/AnimeItem";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";
import { GET_ANIME_OF_STUDIO } from "../queries/queries";

const StudioAnime = (props) => {
  const genreId = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ANIME_OF_STUDIO, {
    variables: { id: parseInt(genreId) },
  });

  return (
    <div className="top_animes_section">
      {error && <ErrorMessage />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* All anime of selected studio */}
          <h1 className="top_heading">{data.studio.studio_name}</h1>
          <div className="top_animes_list">
            {data.studio.anime.map((anime) => (
              <AnimeItem key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudioAnime;
