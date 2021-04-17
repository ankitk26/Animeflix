import { useQuery } from "@apollo/client";
import React from "react";
import AnimeGrid from "../components/AnimeGrid";
import { GET_ANIME_BY_STUDIO } from "../graphql/queries";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";

const StudioAnime = (props) => {
  const genreId = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ANIME_BY_STUDIO, {
    variables: { id: parseInt(genreId) },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return <AnimeGrid title={data.studio.studio_name} data={data.studio.anime} />;
};

export default StudioAnime;
