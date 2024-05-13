import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../services/api";
import { Blocks } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (!isSubmitted && searchQuery !== null) {
      const fetchMovies = async () => {
        try {
          setIsError(false);

          setIsLoading(true);

          const moviesData = await fetchMoviesByQuery(searchQuery);

          setMovies(moviesData);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMovies();
    }
  }, [isSubmitted, searchQuery]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      setIsError(false);

      if (event.target.elements.search.value.trim() === "") {
        toast.error("Field can't be empty!");

        event.target.reset();

        return;
      }

      setMovies([]);

      setIsSubmitted(true);

      setIsLoading(true);

      const moviesData = await fetchMoviesByQuery(
        event.target.elements.search.value.trim()
      );

      setMovies(moviesData);

      setSearchParams({ query: event.target.elements.search.value.trim() });

      event.target.reset();
    } catch (error) {
      setIsError(true);
      console.log(1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <form className={s.form} onSubmit={handleSubmit}>
          <input className={s.input} type="text" name="search" />
          <button className={s.button} type="submit">
            Search
          </button>
        </form>
        {isLoading && (
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        )}
        {movies.length !== 0 && <MovieList movies={movies} />}
        {isError && <ErrorMessage />}
      </div>
    </>
  );
}

export default MoviesPage;
