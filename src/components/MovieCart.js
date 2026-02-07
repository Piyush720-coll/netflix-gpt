import { IMG_CDN } from "../utils/constrains";

const MovieCart = ({ movie }) => {
  if (!movie?.poster_path) return null;

  return (
    <div className="min-w-[150px] overflow-hidden py-4 hover:scale-110 transition-transform duration-300">
      <img
        src={ IMG_CDN + movie.poster_path }
        alt={movie.title}
        className="rounded-lg"
      />
      
    </div>
  );
};

export default MovieCart;
