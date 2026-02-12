import Header from "./Header";
import { useSelector } from "react-redux";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCart";

const Movies = () => {
  useMovies();

  const movies = useSelector((store) => store.movies.movies);

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">

      <Header />

      {/* Background Glow Effect */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-red-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>

      {/* Page Heading */}
      <div className="pt-32 px-10 pb-10 relative z-10">
        <h1 className="text-5xl font-extrabold mb-1 pb-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Trending Movies 🎬
        </h1>

        <p className="text-gray-400 text-lg max-w-xl">
          Discover the most popular and trending movies of the day.
        </p>

        <div className="mt-4 h-1 w-24 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Grid Container */}
      <div
        className="
          px-10 pb-24 relative z-10
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-8
          transition-all duration-500
        "
      >
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="transform transition duration-300 hover:scale-110 hover:z-20"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
