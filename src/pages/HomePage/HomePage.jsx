import { Blocks } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import s from "./HomePage.module.css";

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
          <ul className={s.list}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default HomePage;
