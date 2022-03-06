const API_KEY = process.env.API_KEY;

export default {
  fetchGaming: {
    title: "Cities",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchTrending: {
    title: "Culture",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchCityView: {
    title: "Nature",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchProverbs: {
    title: "Crypto",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
};
