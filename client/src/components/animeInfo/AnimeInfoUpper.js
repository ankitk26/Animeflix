import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import SnackBar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ADD_ANIME, GET_ANIME } from "../../queries/queries";

const AnimeInfoUpper = ({ anime }) => {
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
    airing_period,
  } = anime;

  const [open, setOpen] = useState(false);

  const [addAnime] = useMutation(ADD_ANIME, { refetchQueries: [{ query: GET_ANIME, variables: { id: mal_id } }] });

  const addToWatchlist = async () => {
    await addAnime({
      variables: { animeInput: { mal_id, title, title_english, image_url, airing_period, score } },
    });
    setOpen(true);
  };

  return (
    <div className="anime_info_upper">
      {/* Anime Image */}
      <div className="anime_info_image_wrapper">
        <img src={image_url} alt="anime poster" className="anime_info_image" />
      </div>

      {/* Anime Info */}
      <div>
        {/* Anime title */}
        <h1>{title}</h1>
        <div className="basic_info_1">
          {title_english !== title && <span>{title_english}</span>}
          <span>{type}</span>
        </div>

        <div className="basic_info_2">
          {premiered && <span className="gray_text">{premiered}</span>}
          {rating && rating !== "None" && <span className="gray_text rating">{rating}</span>}
          {duration && duration !== "Unknown" && <span className="gray_text">{duration}</span>}
        </div>

        {/* Anime genres */}
        <div className="anime_genre">
          {genres.map((genre) => (
            <Link to={`/animes/genre/${genre.mal_id}`} key={genre.mal_id}>
              <span>{genre.name}</span>
            </Link>
          ))}
        </div>

        {/* Anime Stats */}
        <div className="anime_info_stats">
          <div>
            <i className="fas fa-film fa-2x"></i>
            <p className="light">Episodes</p>
            <p>{episodes !== null ? episodes : "N/A"}</p>
          </div>
          <div>
            <i className="fas fa-star fa-2x"></i>
            <p className="light">Score</p>
            <p>{score !== null ? score : "N/A"}</p>
          </div>
        </div>

        {/* Other info */}
        <div className="anime_other_info">
          <div>
            Studios:{" "}
            {studios.map((studio) => (
              <Link to={`/studio/${studio.mal_id}`} key={studio.mal_id}>
                {studio.name}
              </Link>
            ))}
          </div>
          <div>
            Original Run: <span>{airing_period}</span>
          </div>
        </div>

        <div className="buttons">
          {inWatchlist ? (
            <button>Added to watchlist</button>
          ) : (
            <button className="not_added" onClick={() => addToWatchlist()}>
              Add to Watchlist
            </button>
          )}
        </div>

        <SnackBar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Anime added to watchlist"
          key={"bottom center"}
          action={
            <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </div>
  );
};

export default AnimeInfoUpper;
