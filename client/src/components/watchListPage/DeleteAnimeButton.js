import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { GET_WATCHLIST, REMOVE_ANIME } from "../../queries/queries";

const DeleteAnimeButton = ({ id, mal_id, title }) => {
  const [open, setOpen] = useState(false);

  const [removeAnime] = useMutation(REMOVE_ANIME, { refetchQueries: [{ query: GET_WATCHLIST }] });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveAnime = async () => {
    try {
      await removeAnime({ variables: { id } });
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <>
      <button className="isWatched" onClick={handleClickOpen}>
        <i className="fas fa-check-square" style={{ color: "#fff", backgroundColor: "#272727" }} />
        <span>REMOVE FROM WATCHLIST</span>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={`alert-dialog-title-${mal_id}`}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id={`alert-dialog-title-${mal_id}`}>{`Remove ${title} from the watchlist?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveAnime} color="secondary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAnimeButton;
