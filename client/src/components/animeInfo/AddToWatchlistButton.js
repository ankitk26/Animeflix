import { useMutation } from "@apollo/client";
import { Box, Button, IconButton } from "@material-ui/core";
import SnackBar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { ADD_ANIME } from "../../graphql/queries";

const AddToWatchlistButton = ({ btnProps }) => {
  const {
    inWatchlist,
    mal_id,
    title,
    title_english,
    image_url,
    score,
  } = btnProps;

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);

  const [addAnime] = useMutation(ADD_ANIME, {
    variables: {
      animeInput: { mal_id, title, title_english, image_url, score },
    },
    update: (_, result) => {
      console.log(result.data);
      setOpen(true);
    },
    onError: (err) => {
      setError(err.graphQLErrors[0].message);
      setErrorOpen(true);
    },
  });

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  const addToWatchlist = async () => {
    addAnime();
  };

  return (
    <>
      <Box className="buttons" mt={4}>
        {inWatchlist ? (
          <Button color="primary" variant="contained">
            Added to watchlist
          </Button>
        ) : (
          <>
            <Button
              color="primary"
              variant="contained"
              className="not_added"
              onClick={() => addToWatchlist()}
            >
              Add to Watchlist
            </Button>
            <SnackBar
              open={errorOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                action={
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => setErrorOpen(false)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
                {error}
              </MuiAlert>
            </SnackBar>
          </>
        )}
      </Box>

      <SnackBar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Anime added to watchlist"
        key={"bottom center"}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default AddToWatchlistButton;
