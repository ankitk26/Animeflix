import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    width: "80%",
    margin: "1rem auto",
    maxWidth: "100%",
  },
  media: {
    objectFit: "contain",
  },
}));

const AnimeItem = ({ anime }) => {
  const classes = useStyles();

  return (
    <Grid item xs={6} md={3} className={classes.item}>
      <Card className={classes.root} elevation={0}>
        <Link to={`/anime/${anime.mal_id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={classes.media}
              image={anime.image_url}
              title={anime.title}
            />
            <CardContent>
              <Typography component="h2" variant="subtitle2" align="center">
                {anime.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
};

export default AnimeItem;
