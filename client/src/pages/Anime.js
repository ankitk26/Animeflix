import React from "react";
import { useQuery } from "@apollo/client";
import AnimeInfo from "../components/AnimeInfo";
import Spinner from "../layouts/Spinner";
import { GET_ANIME } from "../queries/queries";

const Anime = (props) => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ANIME, { variables: { id: parseInt(id) } });

  return (
    <div>
      {error && <p>Error ! Please check your interent connection</p>}
      {loading ? <Spinner /> : <AnimeInfo anime={data.anime} />}
    </div>
  );
};

export default Anime;
