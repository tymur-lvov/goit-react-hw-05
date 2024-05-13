import { Blocks } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await fetchTrendingMovies();

      setMovies(moviesData);
    };

    fetchMovies();
  }, []);

  return (
    <>
      {movies.length === 0 ? (
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      ) : (
        <div className="container">
          <h2>Trending today</h2>
          <MovieList movies={movies} />
        </div>
      )}
    </>
  );
}

export default HomePage;
