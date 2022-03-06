const API_KEY = process.env.API_KEY;

export default {
  fetchCities: {
    title: "Cities",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchNature: {
    title: "Nature",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchCulture: {
    title: "Culture",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchCrypto: {
    title: "Crypto",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
};
