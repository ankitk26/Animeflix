import { useQuery } from "@apollo/client";
import React from "react";
import AnimeInfoLower from "../components/animeInfo/AnimeInfoLower";
import AnimeInfoUpper from "../components/animeInfo/AnimeInfoUpper";
import { GET_ANIME_BY_ID } from "../graphql/queries";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";

const AnimeInfo = (props) => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: parseInt(id) },
    fetchPolicy: "no-cache",
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
