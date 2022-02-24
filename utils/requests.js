const API_KEY = process.env.API_KEY;

export default {
  fetchTrending: {
    title: "Trending",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchCityView: {
    title: "Cities",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchProverbs: {
    title: "Quotes",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchGaming: {
    title: "Gaming",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchCryptoEd: {
    title: "Crypto",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
};
