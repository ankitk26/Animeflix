import React from "react";
import { useQuery } from "@apollo/client";
import AnimeItem from "../components/AnimeItem";
import Spinner from "../layouts/Spinner";
import { FETCH_UPCOMING, TOP_ANIMES } from "../queries/queries";

const Home = ({ type }) => {
  const { loading, error, data } = useQuery(type === "topRated" ? TOP_ANIMES : FETCH_UPCOMING);

  return (
    <div className="top_animes_section">
      <h1>{type === "topRated" ? "Top Rated Animes" : "Upcoming Animes"}</h1>
      {error && <p>Error ! Try refreshing page</p>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="top_animes_list">
          {type === "topRated"
            ? data.topAnimes.map((anime) => <AnimeItem key={anime.mal_id} anime={anime} />)
            : data.upcoming.map((anime) => <AnimeItem key={anime.mal_id} anime={anime} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
