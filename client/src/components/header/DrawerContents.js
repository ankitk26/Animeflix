import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/constants";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    height: "100%",
    "& > *": {
      fontSize: "2rem",
    },
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
}));

const DrawerContents = ({ anchor, toggleDrawer }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navLinks.map((navLink) => (
          <NavLink
            exact
            to={navLink.to}
            key={navLink.text}
            activeClassName={classes.activeLink}
          >
            <ListItem button>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">{navLink.text}</Typography>
                }
                inset
              />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
};

export default DrawerContents;
