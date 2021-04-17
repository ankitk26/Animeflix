import { FETCH_AIRING, FETCH_UPCOMING, TOP_ANIME } from "../graphql/queries";

export const dateFormatter = (inputDate) => {
  let date = new Date(inputDate);
  return date.toDateString();
};

export const getQuery = (type) => {
  switch (type) {
    case "top_rated":
      return TOP_ANIME;
    case "upcoming":
      return FETCH_UPCOMING;
    default:
      return FETCH_AIRING;
  }
};

export const getHeading = (type) => {
  switch (type) {
    case "top_rated":
      return "Top Rated Anime";
    case "upcoming":
      return "Upcoming Anime";
    default:
      return "Airing Anime";
  }
};
