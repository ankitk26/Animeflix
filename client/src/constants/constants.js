// All the genres
const genres = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Demetia",
  "Demons",
  "Mystery",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Game",
  "Hentai",
  "Historical",
  "Horror",
  "Kids",
  "Magic",
  "Martial Arts",
  "Mecha",
  "Music",
  "Parody",
  "Samurai",
  "Romance",
  "School",
  "Sci-fi",
  "Shoujo",
  "Shoujo Ai",
  "Shounen",
  "Shounen Ai",
  "Space",
  "Sports",
  "Super Power",
  "Vampire",
  "Yaoi",
  "Yuri",
  "Harem",
  "Slice of Life",
  "Supernatural",
  "Military",
  "Police",
  "Psychological",
  "Thriller",
  "Seinen",
  "Josei",
];

export const allGenres = genres.map((genre, index) => ({
  id: index + 1,
  genre,
}));