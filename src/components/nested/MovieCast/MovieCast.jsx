import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCreditsById } from "../../../services/api";
import { Blocks } from "react-loader-spinner";
import s from "./MovieCast.module.css";

function MovieCast() {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      const { cast } = await fetchCreditsById(movieId);

      setCast(cast);
    };

    fetchCast();
  }, [movieId]);

  return (
    <>
      {!cast ? (
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
        <ul className={s.list}>
          {cast.map((actor) => (
            <li key={actor.id} className={s.item}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
                alt={actor.name}
                width={200}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieCast;
