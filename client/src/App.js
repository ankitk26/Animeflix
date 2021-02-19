import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/css/source.css";
import Header from "./layouts/Header";
import AnimeInfo from "./pages/AnimeInfo";
import DisplayAnimesList from "./pages/DisplayAnimesList";
import GenreAnimes from "./pages/GenreAnimes";
import SearchResults from "./pages/SearchResults";
import StudioAnime from "./pages/StudioAnime";

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
          <Route exact path="/" render={(props) => <DisplayAnimesList type="top_rated" {...props} />} />
          <Route path="/animes/genre/:id" component={GenreAnimes} />
          <Route path="/studio/:id" component={StudioAnime} />
          <Route path="/anime/:id" component={AnimeInfo} />
          <Route path="/search/:query" component={SearchResults} />
          <Route path="/upcoming" render={(props) => <DisplayAnimesList type="upcoming" {...props} />} />
          <Route path="/airing" render={(props) => <DisplayAnimesList type="airing" {...props} />} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
