import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/api";
import { Blocks } from "react-loader-spinner";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

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
      {!movies ? (
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
        <>
          <ul className={s.list}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default MoviesPage;
