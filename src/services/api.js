import axios from "axios";

const API_KEY = "886b1ec34314561f539c32b4a0a90ad8";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODZiMWVjMzQzMTQ1NjFmNTM5YzMyYjRhMGE5MGFkOCIsInN1YiI6IjY2M2RmZGFhMzA0MmYzNWJlM2ZiM2ExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CNdAbURoaI-ySCNF9PXjIgWbqetrAPZ1inNhduGPO4o";

axios.defaults.baseURL = "https://api.themoviedb.org/";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export const fetchMoviesByQuery = (query) => {
  axios.get("3/search/movie", {
    params: {
      api_key: API_KEY,
      query,
    },
  });
};
