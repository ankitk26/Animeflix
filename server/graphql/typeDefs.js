const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    anime(id: Int): Anime
    genre(id: Int, page: Int): Genres
    studio(id: Int): Studio
    getAnime(mal_id: Int!): Boolean
    search(query: String): [AnimeItem]
    topAnime: [AnimeItem]
    upcoming: [AnimeItem]
    airing: [AnimeItem]
    getWatchList: [WatchListAnime]
    me: User
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
    characters: [Character]
    pictures: [String]
    recommendations: [AnimeItem]
    inWatchlist: Boolean
  }

  type Genre {
    mal_id: Int
    name: String
  }

  type Genres {
    genre_name: String
    anime: [AnimeItem]
  }

  type Studio {
    studio_name: String
    anime: [AnimeItem]
  }

  type Character {
    mal_id: Int
    image_url: String
    name: String
  }

  type AnimeItem {
    mal_id: Int
    image_url: String
    title: String
  }

  scalar Date

  type WatchListAnime {
    _id: ID
    mal_id: Int
    title: String
    title_english: String
    image_url: String
    score: Float
    watched: Boolean
    createdAt: Date
    updatedAt: Date
    user: ID!
  }

  input WatchListInput {
    mal_id: Int!
    title: String!
    title_english: String
    image_url: String
    score: Float
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  input RegisterInput {
    email: String!
    name: String!
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    addAnime(animeInput: WatchListInput): WatchListAnime
    removeAnime(id: ID): WatchListAnime
    login(email: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    logout: Boolean!
  }
`;
