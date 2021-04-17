import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import React, { useState } from "react";
import { GET_WATCHLIST, REMOVE_ANIME } from "../../graphql/queries";

const MarkCompleteButton = ({ title, id }) => {
  const [open, setOpen] = useState(false);

  const [removeAnime] = useMutation(REMOVE_ANIME, {
    refetchQueries: [{ query: GET_WATCHLIST }],
  });

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
      <Button
        variant="contained"
        color="primary"
        startIcon={<BookmarkIcon />}
        onClick={handleClickOpen}
      >
        Remove from watchlist
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={`alert-dialog-title-${id}`}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id={`alert-dialog-title-${id}`}
        >{`Remove ${title} from the watchlist?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="textPrimary">
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

export default MarkCompleteButton;
