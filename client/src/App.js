import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  Container,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./layouts/Header";
import AnimeInfo from "./pages/AnimeInfo";
import DisplayAnimesList from "./pages/DisplayAnimesList";
import GenreAnimes from "./pages/GenreAnimes";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import Signup from "./pages/Signup";
import StudioAnime from "./pages/StudioAnime";
import WatchList from "./pages/WatchList";
import theme from "./theme";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Switch>
              <>
                <Container className={classes.root}>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <DisplayAnimesList type="top_rated" {...props} />
                    )}
                  />
                  <Route path="/animes/genre/:id" component={GenreAnimes} />
                  <Route path="/studio/:id" component={StudioAnime} />
                  <Route path="/anime/:id" component={AnimeInfo} />
                  <Route path="/search/:query" component={SearchResults} />
                  <Route
                    path="/upcoming"
                    render={(props) => (
                      <DisplayAnimesList type="upcoming" {...props} />
                    )}
                  />
                  <Route
                    path="/airing"
                    render={(props) => (
                      <DisplayAnimesList type="airing" {...props} />
                    )}
                  />
                  <Route path="/watchlist" component={WatchList} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                </Container>
              </>
            </Switch>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
