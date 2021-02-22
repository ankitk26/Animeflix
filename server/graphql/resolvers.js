const Anime = require("../models/Anime");

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
} = require("../api_calls");

// resolvers
module.exports = {
  Query: {
    anime: (_, { id }) => fetchAnime(id),
    genre: (_, { id }) => fetchGenre(id),
    studio: (_, { id }) => fetchStudios(id),
    search: (_, { query }) => searchAnime(query),
    upcoming: () => fetchUpcoming(),
    topAnime: () => fetchTopAnimes(),
    airing: () => fetchAiring(),
    getWatchList: async () => {
      let watchListItems = await Anime.find();
      return watchListItems;
    },
  },

  Anime: {
    characters: (parent) => fetchCharacters(parent),
    recommendations: (parent) => fetchRecommendations(parent),
    airing_period: (parent) => parent.aired.string,
    inWatchlist: async (parent) => {
      let documentExists = await Anime.exists({ mal_id: parent.mal_id });
      return documentExists;
    },
  },

  Genres: {
    genre_name: (parent) => parent.mal_url.name,
  },

  Studio: {
    studio_name: (parent) => parent.meta.name,
  },

  Mutation: {
    addAnime: async (_, { animeInput }) => {
      let doesExist = await Anime.exists({ mal_id: animeInput.mal_id });
      if (!doesExist) {
        let animeData = new Anime(animeInput);
        return animeData.save();
      }
    },
    removeAnime: async (_, { id }) => {
      let animeDocument = await Anime.findByIdAndDelete(id);
      return animeDocument;
    },
  },
};
