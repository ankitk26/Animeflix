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

const Characters = ({ characters }) => {
  const classes = useStyles();
  return (
    <>
      <Box pb={6} my={4}>
        <Typography variant="h4">Characters</Typography>
        <Grid
          container
          spacing={3}
          justify="center"
          className={classes.anime_characters}
        >
          {characters.map((character) => (
            <Grid
              item
              xs={6}
              md={1}
              component={Paper}
              key={character.mal_id}
              className={classes.anime_character}
            >
              <img
                src={character.image_url}
                alt={character.name}
                className={classes.character_image}
              />
              <Box mt={1}>
                <Typography variant="subtitle2" align="center">
                  {character.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default Characters;
