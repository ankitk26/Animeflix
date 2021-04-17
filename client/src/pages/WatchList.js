import { useQuery } from "@apollo/client";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import WatchListItem from "../components/watchListPage/WatchListItem";
import { GET_WATCHLIST } from "../graphql/queries";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
  },
}));

const WatchList = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_WATCHLIST, {
    fetchPolicy: "network-only",
  });

  const emptyWatchlist = (
    <Box mt={3}>
      <Typography variant="body1" color="textSecondary">
        No items in watchlist
      </Typography>
    </Box>
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error.graphQLErrors[0].message} />;
  }

  return (
    <div className="top_animes_section">
      <Typography variant="h4" className="top_heading">
        Your Watchlist
      </Typography>

      {data &&
        (data.getWatchList.length === 0 ? (
          emptyWatchlist
        ) : (
          <Grid container spacing={5} className={classes.root}>
            {data.getWatchList.map((anime) => (
              <WatchListItem key={anime.mal_id} anime={anime} />
            ))}
          </Grid>
        ))}
    </div>
  );
};

export default WatchList;
