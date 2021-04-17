import { useQuery } from "@apollo/client";
import { Box, Chip, makeStyles, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimeGrid from "../components/AnimeGrid";
import { allGenres } from "../constants/constants";
import { GET_ANIME_BY_GENRE } from "../graphql/queries";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";

const useStyles = makeStyles((theme) => ({
  genre: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const GenreAnimes = (props) => {
  const classes = useStyles();
  const genreId = props.match.params.id;
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_ANIME_BY_GENRE, {
    variables: { id: parseInt(genreId), page },
  });

  const handlePageChange = (e, page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [genreId]);

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Box mb={10}>
        <Typography variant="h4">Anime by Genre</Typography>
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gridGap={15}
        >
          {allGenres.map((genre) => (
            <Link to={`/animes/genre/${genre.id}`} key={genre.id}>
              <Chip
                label={genre.genre}
                variant={
                  genre.id === parseInt(genreId) ? "default" : "outlined"
                }
                className={classes.genre}
              />
            </Link>
          ))}
        </Box>
      </Box>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box mb={4} display="flex" justifyContent="center">
            <Pagination
              count={10}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </Box>

          <AnimeGrid title={data.genre.genre_name} data={data.genre.anime} />

          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={10}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </Box>
          {/* {ending < 100 && (
            <Box my={4} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => showMore()}
              >
                LOAD MORE
              </Button>
            </Box>
          )} */}
        </>
      )}
    </>
  );
};

export default GenreAnimes;
