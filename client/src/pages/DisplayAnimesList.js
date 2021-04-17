import { useQuery } from "@apollo/client";
import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import AnimeGrid from "../components/AnimeGrid";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";
import { getHeading, getQuery } from "../utils/utils";

const Home = ({ type }) => {
  const [ending, setEnding] = useState(32);
  const { loading, error, data } = useQuery(getQuery(type));

  const showMore = () => setEnding((prev) => prev + 30);

  const getDisplayItems = (type) => {
    switch (type) {
      case "top_rated":
        return data.topAnime.slice(0, ending);
      case "upcoming":
        return data.upcoming;
      default:
        return data.airing;
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <AnimeGrid title={getHeading(type)} data={getDisplayItems(type)} />

      {type === "top_rated" && ending < 50 && (
        <Box my={4} display="flex" justifyContent="center">
          <Button color="primary" variant="outlined" onClick={() => showMore()}>
            LOAD MORE
          </Button>
        </Box>
      )}
    </>
  );
};

export default Home;
