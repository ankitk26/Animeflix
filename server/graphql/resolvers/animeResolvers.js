const Anime = require("../../models/anime");

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
  fetchPictures,
} = require("../../api_calls");

const { AuthenticationError } = require("apollo-server-errors");

module.exports = {
  Query: {
    anime: (_, { id }) => fetchAnime(id),
    genre: (_, { id, page }) => fetchGenre(id, page),
    studio: (_, { id }) => fetchStudios(id),
    search: (_, { query }) => searchAnime(query),
    upcoming: () => fetchUpcoming(),
    topAnime: () => fetchTopAnimes(),
    airing: () => fetchAiring(),

    getWatchList: async (_, __, { req }) => {
      if (!req.user) {
        throw new AuthenticationError("Login to see watchlist");
      }
      let watchListItems = await Anime.find({ user: req.user });
      return watchListItems;
    },
  },

  Anime: {
    characters: ({ mal_id }) => fetchCharacters(mal_id),
    pictures: async ({ mal_id }) => {
      const pictures = await fetchPictures(mal_id);
      const length = pictures?.length;
      return pictures.splice(0, length / 2);
    },
    recommendations: ({ mal_id }) => fetchRecommendations(mal_id),
    airing_period: ({ aired }) => aired?.string,

    inWatchlist: async ({ mal_id }, _, { req }) => {
      if (!req.user) {
        return false;
      }

      const anime = await Anime.findOne({
        $and: [{ mal_id, user: req.user }],
      });
      if (anime) {
        return true;
      }
      return false;
    },
  },

  Genres: {
    genre_name: (parent) => parent.mal_url.name,
  },

  Studio: {
    studio_name: (parent) => parent.meta.name,
  },

  Mutation: {
    addAnime: async (_, { animeInput }, { req }) => {
      if (!req.user) {
        throw new AuthenticationError("Login to add items to watchlist");
      }

      const anime = await Anime.findOne({
        $and: [{ mal_id: animeInput.mal_id }, { user: req.user }],
      });
      if (anime) {
        throw new Error("Anime already added to watchlist");
      }
      let animeData = new Anime({ ...animeInput, user: req.user });
      return animeData.save();
    },

    removeAnime: async (_, { id }, { req }) => {
      if (!req.user) {
        throw new AuthenticationError("Can remove items after logging in");
      }
      const anime = await Anime.findOne({
        $and: [{ _id: id }, { user: req.user }],
      });

      if (!anime) {
        throw new AuthenticationError("Unauthorized user");
      }

      return await anime.delete();
    },
  },
};
