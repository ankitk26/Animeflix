import React from "react";
import { useQuery } from "@apollo/client";
import AnimeItem from "../components/AnimeItem";
import Spinner from "../layouts/Spinner";
import { SEARCH_ANIMES } from "../queries/queries";

const SearchResults = (props) => {
  const query = props.match.params.query;
  const { loading, error, data } = useQuery(SEARCH_ANIMES, { variables: { search: query } });

  return (
    <div className="top_animes_section">
      <h1>Search Results for "{query}"</h1>
      {error && <p>Error ! Try refreshing page</p>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="top_animes_list">
          {data.search.map((anime) => (
            <AnimeItem key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
