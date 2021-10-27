const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_name: { type: String, default: null, unique: true },
  movie_desc: { type: String, default: null },
  img: { type: String },
  duration: {type:String}
});

module.exports = mongoose.model("movie", movieSchema);