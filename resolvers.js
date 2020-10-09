const axios = require("axios");
const BASE_URL = "https://api.jikan.moe/v3";

const fetchAnime = async ({ id }) => await axios.get(`${BASE_URL}/anime/${id}`).then((res) => res.data);

const fetchTopAnimes = async () => await axios.get(`${BASE_URL}/top/anime`).then((res) => res.data.top);

const fetchCharacters = async ({ mal_id }) =>
  await axios.get(`${BASE_URL}/anime/${mal_id}/characters_staff`).then((res) => res.data.characters);

const fetchRecommendations = async ({ mal_id }) =>
  await axios.get(`${BASE_URL}/anime/${mal_id}/recommendations`).then((res) => res.data.recommendations);

const fetchGenre = async ({ id }) => await axios.get(`${BASE_URL}/genre/anime/${id}`).then((res) => res.data);

const searchAnime = async ({ query }) =>
  await axios.get(`${BASE_URL}/search/anime?q=${query}&limit=10`).then((res) => res.data.results);

const fetchUpcoming = async () =>
  await axios.get("https://api.jikan.moe/v3/top/anime/1/upcoming").then((res) => res.data.top);

module.exports = {
  fetchAnime,
  fetchTopAnimes,
  fetchCharacters,
  fetchRecommendations,
  fetchGenre,
  searchAnime,
  fetchUpcoming,
};
