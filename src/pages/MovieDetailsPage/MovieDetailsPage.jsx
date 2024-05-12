import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Blocks } from "react-loader-spinner";
import { fetchMoviesById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const locationRef = useRef(location.state || "/");

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await fetchMoviesById(movieId);

      setMovie(movieData);
    };

    fetchMovie();
  }, [movieId]);

  const getUserScore = (value) => {
    const userScore = Math.round(value * 10);

    return userScore;
  };

  return (
    <>
      {!movie ? (
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
          <button
            className={s.button}
            onClick={() => navigate(locationRef.current)}
          >
            Go back
          </button>
          <div className={s.img_wrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
              width={300}
            />
            <div className={s.content_wrapper}>
              <h2>{`${movie.original_title} (${movie.release_date.slice(
                0,
                4
              )})`}</h2>
              <p>{`User score: ${getUserScore(movie.vote_average)}%`}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul className={s.genres_list}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>Additional information</p>
          <ul className={s.information_list}>
            <Link to={`/movies/${movieId}/cast`} state={location.state}>
              Cast
            </Link>
            <Link to={`/movies/${movieId}/reviews`} state={location.state}>
              Reviews
            </Link>
          </ul>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default MovieDetailsPage;
