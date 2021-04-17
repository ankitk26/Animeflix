import { useQuery } from "@apollo/client";
import React from "react";
import AnimeGrid from "../components/AnimeGrid";
import { SEARCH_ANIMES } from "../graphql/queries";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";

const SearchResults = (props) => {
  const query = props.match.params.query;
  const { loading, error, data } = useQuery(SEARCH_ANIMES, {
    variables: { search: query },
  });

  if (error) {
    return <ErrorMessage />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <AnimeGrid title={`Search results for "${query}"`} data={data.search} />
  );
};

export default SearchResults;
