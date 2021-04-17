import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import Characters from "./Characters";
import Gallery from "./Gallery";
import Recommendations from "./Recommendations";

const AnimeInfoLower = ({ anime }) => {
  const { synopsis, recommendations, characters, pictures } = anime;

  return (
    <Box mt={4}>
      {/* Synopsis */}
      <Box pb={3}>
        <Typography variant="h4">Synopsis</Typography>
        <Box mt={1}>
          <Typography variant="body1" color="textSecondary">
            {synopsis}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Characters */}
      {characters.length && <Characters characters={characters} />}

      {/* Gallery */}
      {pictures.length && <Gallery pictures={pictures} />}

      {/* Recommendations */}
      {recommendations.length && (
        <Recommendations recommendations={recommendations} />
      )}
    </Box>
  );
};

export default AnimeInfoLower;
