const { gql } = require("@apollo/client");

// Queries

// Get all top rated anime
export const TOP_ANIME = gql`
  query TopAnimeQuery {
    topAnime {
      mal_id
      image_url
      title
    }
  }
`;

// Get information about the anime selected
export const GET_ANIME = gql`
  query GetAnimeQuery($id: Int!) {
    anime(id: $id) {
      mal_id
      image_url
      trailer_url
      episodes
      title
      title_english
      duration
      rating
      synopsis
      type
      studios {
        mal_id
        name
      }
      premiered
      airing_period
      score
      inWatchlist
      genres {
        mal_id
        name
      }
      characters {
        mal_id
        image_url
        name
      }
      recommendations {
        mal_id
        image_url
        title
      }
    }
  }
`;

// Get all the anime of selected genre
export const GET_ANIMES_BY_GENRE = gql`
  query GetAnimesByGenreQuery($id: Int!) {
    genre(id: $id) {
      genre_name
      anime {
        mal_id
        image_url
        title
      }
    }
  }
`;

// Get all anime of selected studio
export const GET_ANIME_OF_STUDIO = gql`
  query GetAnimeByStudio($id: Int!) {
    studio(id: $id) {
      studio_name
      anime {
        mal_id
        image_url
        title
      }
    }
  }
`;

// Search results of query
export const SEARCH_ANIMES = gql`
  query SearchAnimesQuery($search: String!) {
    search(query: $search) {
      mal_id
      image_url
      title
    }
  }
`;

// Get upcoming anime
export const FETCH_UPCOMING = gql`
  query FetchUpcomingQuery {
    upcoming {
      mal_id
      image_url
      title
    }
  }
`;

// Get airing anime
export const FETCH_AIRING = gql`
  query FetchUpcomingQuery {
    airing {
      mal_id
      image_url
      title
    }
  }
`;

export const GET_WATCHLIST = gql`
  query GetWatchlist {
    getWatchList {
      _id
      mal_id
      watched
      title
      image_url
      airing_period
      score
      createdAt
      title_english
    }
  }
`;

// Mutations

// Add anime to watchlist
export const ADD_ANIME = gql`
  mutation AddAnime($animeInput: WatchListInput) {
    addAnime(animeInput: $animeInput) {
      _id
      mal_id
      title
      title_english
      image_url
      createdAt
      updatedAt
    }
  }
`;

// Remove an anime from the watchlist
export const REMOVE_ANIME = gql`
  mutation RemoveAnime($id: ID) {
    removeAnime(id: $id) {
      _id
      mal_id
      title
    }
  }
`;
