import {
  Box,
  Button,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";
import MovieIcon from "@material-ui/icons/Movie";
import YouTubeIcon from "@material-ui/icons/YouTube";
import React from "react";
import { Link } from "react-router-dom";
import AddToWatchlistButton from "./AddToWatchlistButton";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  imageWrapper: {
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  thumbnail: {
    width: "100%",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      textAlign: "center",
    },
  },
  altTitle: {
    gap: theme.spacing(4),
  },
  animeType: {
    padding: "2px 6px",
    borderRadius: "999px",
  },
  premieredRow: {
    gap: theme.spacing(3),
  },
  genre: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  icon: {
    fontSize: theme.spacing(4),
  },
  snackbar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const AnimeInfoUpper = ({ anime }) => {
  const classes = useStyles();

  const {
    mal_id,
    title,
    image_url,
    episodes,
    title_english,
    score,
    premiered,
    genres,
    studios,
    type,
    rating,
    duration,
    inWatchlist,
    trailer_url,
    airing_period,
  } = anime;

  return (
    <Grid
      container
      spacing={6}
      alignItems="flex-start"
      className={classes.root}
    >
      {/* Anime Image */}
      <Grid item xs={12} md={4} className={classes.imageWrapper}>
        <img
          src={image_url}
          alt={`${title} - anime poster `}
          className={classes.thumbnail}
        />
      </Grid>

      {/* Anime Info */}
      <Grid item xs={12} md={8}>
        {/* Anime title */}
        <Typography variant="h4">{title}</Typography>

        <Box
          display="flex"
          alignItems="center"
          mt={1}
          className={classes.altTitle}
        >
          {title_english !== title && title_english && (
            <Typography variant="h6">{title_english}</Typography>
          )}
          <Typography color="secondary" variant="h6">
            {type}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          mt={2}
          mb={4}
          className={classes.premieredRow}
        >
          {premiered && (
            <Typography variant="body2" className="gray_text">
              {premiered}
            </Typography>
          )}
          {duration && duration !== "Unknown" && (
            <Typography variant="body2" className="gray_text">
              {duration}
            </Typography>
          )}
          {rating && rating !== "None" && (
            <Typography color="secondary" variant="body2">
              {rating}
            </Typography>
          )}
        </Box>

        {/* Anime genres */}
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          my={2}
          gridGap={32}
          className={classes.anime_genre}
        >
          {genres.map((genre) => (
            <Link to={`/animes/genre/${genre.mal_id}`} key={genre.mal_id}>
              <Chip
                className={classes.genre}
                variant="outlined"
                label={genre.name}
              />
            </Link>
          ))}
        </Box>

        {/* Anime Stats */}
        <Box
          display="flex"
          alignItems="center"
          my={5}
          gridGap={64}
          className="anime_info_stats"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gridGap={16}
          >
            <MovieIcon className={classes.icon} />
            <Typography variant="body1">Episodes</Typography>
            <Typography variant="body2">
              {episodes !== null ? episodes : "N/A"}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gridGap={16}
          >
            <GradeIcon className={classes.icon} />
            <Typography variant="body1">Score</Typography>
            <Typography variant="body2">
              {score !== null ? score : "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Other info */}
        <Box
          display="flex"
          flexDirection="column"
          gridGap={16}
          className="anime_other_info"
        >
          <Box display="flex" alignItems="center" gridGap={16}>
            <Typography>Studios</Typography>
            <Box display="flex" alignItems="center" gridGap={32}>
              {studios.map((studio) => (
                <Link to={`/studio/${studio.mal_id}`} key={studio.mal_id}>
                  <Typography color="secondary" variant="button">
                    {studio.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gridGap={10}>
            <Typography variant="body1">Original Run</Typography>
            <Typography variant="body2">{airing_period}</Typography>
          </Box>
        </Box>

        {trailer_url && (
          <Box mt={4}>
            <a target="_blank" href={trailer_url} rel="noreferrer">
              <Button startIcon={<YouTubeIcon />}>Watch trailer</Button>
            </a>
          </Box>
        )}

        <AddToWatchlistButton
          btnProps={{
            inWatchlist,
            mal_id,
            title,
            title_english,
            image_url,
            score,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AnimeInfoUpper;
