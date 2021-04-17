const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeSchema = new Schema(
  {
    mal_id: Number,
    title: String,
    image_url: String,
    title_english: String,
    score: Number,
    watched: { type: Boolean, default: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = Anime = mongoose.model("animes", animeSchema);
