import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MovieList;
