import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIMES_BY_GENRE } from "../queries/queries";
import Spinner from "../layouts/Spinner";
import AnimeItem from "../components/AnimeItem";

const GenreAnimes = (props) => {
  const [showMore, setShowMore] = useState(false);

  const genreId = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ANIMES_BY_GENRE, { variables: { id: parseInt(genreId) } });
  return (
    <div className="top_animes_section">
      {error && <p>Error ! Try refreshing page</p>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>{data.genre.mal_url.name}</h1>
          <div className="top_animes_list">
            {data.genre.anime.slice(0, 50).map((anime) => (
              <AnimeItem key={anime.mal_id} anime={anime} />
            ))}
          </div>
          <div className="show_btn_wrapper">
            <button
              onClick={() => setShowMore(true)}
              style={{ display: showMore ? "none" : "block" }}
              className="show_more_btn"
            >
              LOAD MORE
            </button>
          </div>
          <div className="top_animes_list">
            {showMore && data.genre.anime.slice(50, 100).map((anime) => <AnimeItem key={anime.mal_id} anime={anime} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default GenreAnimes;
