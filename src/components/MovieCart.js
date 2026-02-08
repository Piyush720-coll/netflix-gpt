import { useNavigate } from "react-router-dom";
import { IMG_CDN } from "../utils/constrains";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie?.poster_path || !movie?.id) return null;

  const handleNavigate = () => {
    navigate(`/watch/${movie.id}`, { state: { movie } });
  };

  return (
    <div
      className="min-w-[150px] overflow-hidden py-5 hover:scale-110 transition-transform duration-300 cursor-pointer"
      onClick={handleNavigate}
    >
      <img
        src={IMG_CDN + movie.poster_path}
        alt={movie.title || "Movie Poster"}
        className="rounded-lg w-full h-auto object-cover"
      />
    </div>
  );
};

export default MovieCard;
