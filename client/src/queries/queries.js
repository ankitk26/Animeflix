const { gql } = require("@apollo/client");

export const TOP_ANIMES = gql`
  query TopAnimesQuery {
    topAnimes {
      mal_id
      image_url
      title
    }
  }
`;

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
      premiered
      aired {
        from
      }
      score
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

export const GET_ANIMES_BY_GENRE = gql`
  query GetAnimesByGenreQuery($id: Int!) {
    genre(id: $id) {
      mal_url {
        name
      }
      anime {
        mal_id
        title
        image_url
      }
    }
  }
`;

export const SEARCH_ANIMES = gql`
  query SearchAnimesQuery($search: String!) {
    search(query: $search) {
      mal_id
      image_url
      title
    }
  }
`;

export const FETCH_UPCOMING = gql`
  query FetchUpcomingQuery {
    upcoming {
      mal_id
      image_url
      title
    }
  }
`;
