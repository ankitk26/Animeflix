const { gql } = require("apollo-server-express");

const {
  fetchAnime,
  fetchCharacters,
  fetchRecommendations,
  fetchGenre,
  fetchUpcoming,
  fetchStudios,
  fetchTopAnimes,
  fetchAiring,
  searchAnime,
} = require("./api_calls");

const typeDefs = gql`
  type Query {
    anime(id: Int): Anime
    topAnime: [DisplayAnime]
    genre(id: Int): Genres
    upcoming: [DisplayAnime]
    studio(id: Int): Studio
    airing: [DisplayAnime]
    search(query: String): [DisplayAnime]
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
`;

// resolvers
const resolvers = {
  Query: {
    anime: (_, args) => fetchAnime(args),
    topAnime: () => fetchTopAnimes(),
    genre: (_, args) => fetchGenre(args),
    upcoming: () => fetchUpcoming(),
    studio: (_, { id }) => fetchStudios(id),
    airing: () => fetchAiring(),
    search: (_, { query }) => searchAnime(query),
  },

  Anime: {
    characters: (parent) => fetchCharacters(parent),
    recommendations: (parent) => fetchRecommendations(parent),
    airing_period: (parent) => parent.aired.string,
  },

  Genres: {
    genre_name: (parent) => parent.mal_url.name,
  },

  Studio: {
    studio_name: (parent) => parent.meta.name,
  },
};

module.exports = { typeDefs, resolvers };
