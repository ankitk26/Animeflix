import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import React from "react";

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    margin: theme.spacing(4),
  },
  progress: {
    color:
      theme.palette.type === "light"
        ? theme.palette.secondary.dark
        : theme.palette.secondary.main,
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <Container className={classes.progressWrapper}>
      <CircularProgress className={classes.progress} />
    </Container>
  );
};

export default Spinner;
