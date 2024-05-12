import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../services/api";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery !== null) {
      const fetchMovies = async () => {
        const moviesData = await fetchMoviesByQuery(searchQuery);

        setMovies(moviesData);
      };
      fetchMovies();
    }
  }, [searchQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const moviesData = await fetchMoviesByQuery(
      event.target.elements.search.value
    );

    setMovies(moviesData);

    setSearchParams({ query: event.target.elements.search.value });

    event.target.reset();
  };

  return (
    <div className="container">
      <form className={s.form} onSubmit={handleSubmit}>
        <input className={s.input} type="text" name="search" />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      {movies !== null && (
        <>
          <ul className={s.list}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={`/movies/${movie.id}`}
                  state={`/movies?query=${searchQuery}`}
                >
                  {movie.original_title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default MoviesPage;
