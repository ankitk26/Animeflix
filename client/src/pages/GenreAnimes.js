import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import AnimeItem from "../components/AnimeItem";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";
import { GET_ANIMES_BY_GENRE } from "../queries/queries";

const GenreAnimes = (props) => {
  const genreId = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ANIMES_BY_GENRE, {
    variables: { id: parseInt(genreId) },
  });

  // Upper limit of displayed anime
  const [ending, setEnding] = useState(50);

  const showMore = () => setEnding((prev) => prev + 50);

  return (
    <div className="top_animes_section">
      {error && <ErrorMessage />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Display all anime of selected genre */}
          <h1 className="top_heading">{data.genre.genre_name}</h1>
          <div className="top_animes_list">
            {data.genre.anime.slice(0, ending).map((anime) => (
              <AnimeItem key={anime.mal_id} anime={anime} />
            ))}
          </div>

          {/* Load more button */}
          {ending < 100 && (
            <div className="show_btn_wrapper">
              <button onClick={() => showMore()} className="show_more_btn">
                LOAD MORE
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenreAnimes;
