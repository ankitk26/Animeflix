import { useQuery } from "@apollo/client";
import React from "react";
import AnimeInfoLower from "../components/animeInfo/AnimeInfoLower";
import AnimeInfoUpper from "../components/animeInfo/AnimeInfoUpper";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";
import { GET_ANIME } from "../queries/queries";

const AnimeInfo = (props) => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ANIME, {
    variables: { id: parseInt(id) },
  });

  return (
    <>
      {error && <ErrorMessage />}
      {loading ? (
        <Spinner />
      ) : (
        data && (
          <div className="anime_info_wrapper">
            <AnimeInfoUpper anime={data.anime} />
            <AnimeInfoLower anime={data.anime} />
          </div>
        )
      )}
    </>
  );
};

export default AnimeInfo;
