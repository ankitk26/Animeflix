import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./assets/css/source.css";
import Anime from "./pages/Anime";
import DisplayAnimesList from "./pages/DisplayAnimesList";
import GenreAnimes from "./pages/GenreAnimes";
import Header from "./layouts/Header";
import SearchResults from "./pages/SearchResults";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => <DisplayAnimesList type="topRated" {...props} />} />
          <Route path="/animes/genre/:id" component={GenreAnimes} />
          <Route path="/anime/:id" component={Anime} />
          <Route path="/search/:query" component={SearchResults} />
          <Route path="/upcoming" render={(props) => <DisplayAnimesList type="upcoming" {...props} />} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
