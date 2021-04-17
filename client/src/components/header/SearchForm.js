import { InputBase, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchForm = () => {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const history = useHistory();

  const handleChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputBase
        value={search}
        placeholder="Search Anime"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={handleChange}
        inputProps={{ "aria-label": "search" }}
      />
    </form>
  );
};

export default SearchForm;
