const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSchema = new Schema(
  {
    mal_id: Number,
    title: String,
    image_url: String,
    title_english: String,
    score: Number,
    airing_period: String,
    watched: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = Anime = mongoose.model("animes", AnimeSchema);
