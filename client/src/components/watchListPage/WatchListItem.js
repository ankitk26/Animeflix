import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import React from "react";
import { Link } from "react-router-dom";
import MarkCompleteButton from "./MarkCompleteButton";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    maxWidth: 345,
  },
  media: {
    width: "100%",
    objectFit: "contain",
    // paddingTop: "100%",
  },
  poster: {
    width: "80%",
  },
}));

const WatchListItem = ({ anime }) => {
  const classes = useStyles();

  return (
    <Grid item container xs={12} alignItems="center" className={classes.item}>
      <Grid item xs={12} md={2}>
        <img
          src={anime.image_url}
          alt={anime.title}
          className={classes.poster}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Link to={`/anime/${anime.mal_id}`}>
          <Typography variant="h5">{anime.title}</Typography>
        </Link>
        <Typography variant="subtitle2" color="textSecondary">
          {anime.title_english !== anime.title && anime.title_english}
        </Typography>
        <Box display="flex" mt={2} alignItems="center" gridGap={10}>
          <StarIcon color="secondary" />
          <Typography variant="body2" component="p">
            {anime.score}
          </Typography>
        </Box>
        <Box mt={2}>
          <MarkCompleteButton title={anime.title} id={anime._id} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default WatchListItem;
