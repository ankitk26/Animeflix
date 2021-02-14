import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import AnimeItem from "../components/AnimeItem";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";

import { FETCH_UPCOMING, TOP_ANIMES, FETCH_AIRING } from "../queries/queries";
import { allGenres } from "../constants/constants";

const Home = ({ type }) => {
  // Upper limit of total displayed anime
  const [ending, setEnding] = useState(10);

  const { loading, error, data } = useQuery(
    type === "topRated"
      ? TOP_ANIMES
      : type === "upcoming"
      ? FETCH_UPCOMING
      : FETCH_AIRING
  );

  // Increment upper limit
  const showMore = () => setEnding((prev) => prev + 10);

  console.log(data);

  return (
    <div className="top_animes_section">
      <h1 className="top_heading">
        {type === "topRated"
          ? "Top Rated Anime"
          : type === "upcoming"
          ? "Upcoming Anime"
          : "Airing Anime"}
      </h1>

      {error && <ErrorMessage />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Display all anime */}
          <div className="top_animes_list">
            {type === "topRated"
              ? data.topAnimes
                  .slice(0, ending)
                  .map((anime) => (
                    <AnimeItem key={anime.mal_id} anime={anime} />
                  ))
              : type === "upcoming"
              ? data.upcoming.map((anime) => (
                  <AnimeItem key={anime.mal_id} anime={anime} />
                ))
              : data.airing.map((anime) => (
                  <AnimeItem key={anime.mal_id} anime={anime} />
                ))}
          </div>

          {type === "topRated" && (
            <>
              {/* Load more button */}
              {ending < 50 && (
                <div className="show_btn_wrapper">
                  <button onClick={() => showMore()} className="show_more_btn">
                    LOAD MORE
                  </button>
                </div>
              )}

              {/* Display anime by genre */}
              <div style={{ marginTop: "2rem" }}>
                <h1>Anime by Genre</h1>
                <div className="anime_genre" style={{ marginTop: "2rem" }}>
                  {allGenres.map((genre) => (
                    <Link to={`/animes/genre/${genre.id}`} key={genre.id}>
                      <span>{genre.genre}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
