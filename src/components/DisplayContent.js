import Header from "./Header";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MovieCard from "./MovieCart";

const DisplayMovies = () => {
  const movies = useSelector(
    (store) => store.movies?.NowPlayingMovies
  );

  // Fetch movies
  useNowPlayingMovies();

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      {/* Page Heading */}
      <div className="pt-32 px-10 pb-8">
        <h1 className="text-4xl font-bold mb-2">All Movies</h1>
        <p className="text-gray-400">
          Browse all currently playing movies
        </p>
      </div>

      {/* Grid Layout */}
      <div
        className="
          px-10 pb-20
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-6
        "
      >
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default DisplayMovies;
