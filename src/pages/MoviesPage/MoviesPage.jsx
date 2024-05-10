import { fetchMoviesByQuery } from "../../services/api";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const handleSubmit = (event) => {
    event.preventDefault();

    fetchMoviesByQuery(event.target.elements.search.value);

    event.target.reset();
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <input className={s.input} type="text" name="search" />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default MoviesPage;
