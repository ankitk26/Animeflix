import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import AnimeItem from "../AnimeItem";

const Recommendations = ({ recommendations }) => {
  return (
    <Box my={4}>
      <Typography variant="h4">More Anime TV and Movies</Typography>
      <Box mt={2}>
        <Grid container spacing={5} justify="center" alignItems="center">
          {recommendations.slice(0, 32).map((recommendation) => (
            <AnimeItem key={recommendation.image_url} anime={recommendation} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Recommendations;
