import { useMutation } from "@apollo/client";
import { Box, Button, Drawer } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DrawerContents from "../components/header/DrawerContents";
import SearchForm from "../components/header/SearchForm";
import { useAuth } from "../context/AuthContext";
import { LOGOUT } from "../graphql/queries";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor:
      theme.palette.type === "dark" ? "#1e1e1f" : theme.palette.primary.main,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    letterSpacing: "2px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleIcon: {
    color: theme.palette.common.white,
  },
  navlinks: {
    padding: "0 1rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
}));

const Header = () => {
  const classes = useStyles();

  const anchor = "left";
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const { loadUser, user, authLoading, logout } = useAuth();

  const [logoutServer, { data }] = useMutation(LOGOUT, {
    update: () => {
      console.log("Logging out");
      console.log(data);
      logout();
      history.push("/login");
    },
  });

  React.useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [user, authLoading]);

  const toggleDrawer = (anchor, open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setIsOpen(open);
  };

  const handleLogout = () => {
    logoutServer();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={isOpen}
            onClose={toggleDrawer(anchor, false)}
          >
            <DrawerContents anchor={anchor} toggleDrawer={toggleDrawer} />
          </Drawer>

          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/">Animeflix</Link>
          </Typography>

          <Box display="flex" alignItems="center" gridGap={16}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <SearchForm />
            </div>

            <div className={classes.navlinks}>
              {!user ? (
                <>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Register</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Typography>Welcome {user.name}</Typography>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
