const API_KEY = process.env.API_KEY;

export default {
  cities: {
    title: "Cities",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  nature: {
    title: "Nature",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  culture: {
    title: "Culture",
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  crypto: {
    title: "Crypto",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
};
