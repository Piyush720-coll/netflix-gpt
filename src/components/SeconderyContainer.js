import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies?.NowPlayingMovies) return null;

  return (
    <div className=" -mt-64 relative z-20 ">
      <div className="bg-gradient-to-b from-transparent to-80% to-black">
        <MovieList
          title="Now Playing"
          movies={movies.NowPlayingMovies}
        />
      </div>
      <div className="bg-black">  
        <MovieList
          title="Top Rated"
          movies={movies.TopRatedMovies}
        />
        <MovieList
          title="Popular"
          movies={movies.PopularMovies}
        />
        <MovieList
          title="Upcoming Movies"
          movies={movies.UpcomingMovies}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
