import {
  Box,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  anime_characters: {
    maxWidth: "100%",
    marginTop: theme.spacing(2),
    gap: theme.spacing(4),
  },
  anime_character: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  character_image: {
    width: "100%",
    margin: "0 auto",
    objectFit: "contain",
  },
}));

const Gallery = ({ pictures }) => {
  const classes = useStyles();
  return (
    <>
      <Box pb={6} my={4}>
        <Typography variant="h4">Gallery</Typography>
        <Grid
          container
          spacing={5}
          justify="center"
          className={classes.anime_characters}
        >
          {pictures.map((picture, index) => (
            <Grid
              item
              xs={6}
              md={2}
              component={Paper}
              key={index}
              className={classes.anime_character}
            >
              <img
                src={picture}
                alt={`pic_${picture}_${index}`}
                className={classes.character_image}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default Gallery;
