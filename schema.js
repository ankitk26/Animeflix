const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } = require("graphql");

const {
  fetchGenre,
  fetchAnime,
  fetchCharacters,
  fetchRecommendations,
  fetchTopAnimes,
  fetchUpcoming,
  searchAnime,
} = require("./resolvers");

const AnimeType = new GraphQLObjectType({
  name: "AnimeType",
  fields: () => ({
    mal_id: { type: GraphQLInt },
    image_url: { type: GraphQLString },
    trailer_url: { type: GraphQLString },
    episodes: { type: GraphQLInt },
    title: { type: GraphQLString },
    duration: { type: GraphQLString },
    title_english: { type: GraphQLString },
    premiered: { type: GraphQLString },
    synopsis: { type: GraphQLString },
    score: { type: GraphQLFloat },
    type: { type: GraphQLString },
    rating: { type: GraphQLString },
    aired: {
      type: new GraphQLObjectType({
        name: "Aired",
        fields: () => ({
          from: { type: GraphQLString },
        }),
      }),
    },
    genres: { type: new GraphQLList(GenreType) },
    characters: {
      type: new GraphQLList(DisplayAnimesType),
      resolve: (parent) => fetchCharacters(parent),
    },
    recommendations: {
      type: new GraphQLList(DisplayAnimesType),
      resolve: (parent) => fetchRecommendations(parent),
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: "GenreType",
  fields: () => ({
    mal_id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

const GenresType = new GraphQLObjectType({
  name: "GenresType",
  fields: () => ({
    mal_url: {
      type: new GraphQLObjectType({
        name: "GenreNameType",
        fields: () => ({
          name: { type: GraphQLString },
        }),
      }),
    },
    anime: {
      type: new GraphQLList(DisplayAnimesType),
    },
  }),
});

const DisplayAnimesType = new GraphQLObjectType({
  name: "DisplayAnimesType",
  fields: () => ({
    mal_id: { type: GraphQLInt },
    image_url: { type: GraphQLString },
    title: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    anime: {
      type: AnimeType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => fetchAnime(args),
    },
    topAnimes: {
      type: new GraphQLList(DisplayAnimesType),
      resolve: fetchTopAnimes,
    },
    genre: {
      type: GenresType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => fetchGenre(args),
    },
    search: {
      type: new GraphQLList(DisplayAnimesType),
      args: { query: { type: GraphQLString } },
      resolve: (parent, args) => searchAnime(args),
    },
    upcoming: {
      type: new GraphQLList(DisplayAnimesType),
      resolve: () => fetchUpcoming(),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
