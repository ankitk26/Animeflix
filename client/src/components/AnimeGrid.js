import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AnimeItem from "./AnimeItem";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
}));

const AnimeGrid = ({ title, data }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.heading} gutterBottom>
        {title}
      </Typography>

      <Grid container spacing={2} className={classes.root}>
        {data.map((anime) => (
          <AnimeItem key={anime.mal_id} anime={anime} />
        ))}
      </Grid>
    </>
  );
};

export default AnimeGrid;
