const animeResolvers = require("./animeResolvers");
const userResolvers = require("./userResolvers");

// resolvers
module.exports = {
  Query: {
    ...animeResolvers.Query,
    ...userResolvers.Query,
  },

  Anime: {
    ...animeResolvers.Anime,
  },

  Genres: {
    ...animeResolvers.Genres,
  },

  Studio: {
    ...animeResolvers.Studio,
  },

  Mutation: {
    ...animeResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
