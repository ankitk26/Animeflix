import React from "react";
import { useQuery } from "@apollo/client";

import AnimeItem from "../components/AnimeItem";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";

import { SEARCH_ANIMES } from "../queries/queries";

const SearchResults = (props) => {
  const query = props.match.params.query;
  const { loading, error, data } = useQuery(SEARCH_ANIMES, {
    variables: { search: query },
  });

  return (
    <div className="top_animes_section">
      <h1 className="top_heading">Search Results for "{query}"</h1>

      {error && <ErrorMessage />}

      {loading ? (
        <Spinner />
      ) : (
        // Search results
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
