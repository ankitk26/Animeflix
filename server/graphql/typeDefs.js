const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    anime(id: Int): Anime
    topAnime: [DisplayAnime]
    genre(id: Int): Genres
    upcoming: [DisplayAnime]
    studio(id: Int): Studio
    airing: [DisplayAnime]
    search(query: String): [DisplayAnime]
    getWatchList: [WatchListAnime]
    getAnime(mal_id: Int!): Boolean
  }

  type Anime {
    mal_id: Int
    image_url: String
    trailer_url: String
    episodes: Int
    title: String
    duration: String
    title_english: String
    premiered: String
    synopsis: String
    score: Float
    type: String
    rating: String
    studios: [Genre]
    airing_period: String
    genres: [Genre]
    characters: [DisplayAnime]
    recommendations: [DisplayAnime]
    inWatchlist: Boolean
  }

  type Genre {
    mal_id: Int
    name: String
  }

  type Genres {
    genre_name: String
    anime: [DisplayAnime]
  }

  type Studio {
    studio_name: String
    anime: [DisplayAnime]
  }

  type DisplayAnime {
    mal_id: Int
    image_url: String
    title: String
    name: String
  }

  scalar Date

  type WatchListAnime {
    _id: ID
    mal_id: Int
    image_url: String
    watched: Boolean
    title: String
    title_english: String
    score: Float
    airing_period: String
    createdAt: Date
    updatedAt: Date
  }

  input WatchListInput {
    mal_id: Int!
    title: String!
    title_english: String
    image_url: String
    airing_period: String
    score: Float
  }

  type Mutation {
    addAnime(animeInput: WatchListInput): WatchListAnime
    removeAnime(id: ID): WatchListAnime
  }
`;
