import Header from "./Header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // import Link for navigation
import useTvShows from "../hooks/useTvShows";
import MovieCard from "./MovieCart"; // reuse MovieCard component

const TVShows = () => {
  // Fetch trending TV shows
  useTvShows();

  // Get TV shows from Redux
  const tvShows = useSelector((store) => store.movies.tvShows);

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      <Header />

      {/* Background Glow Effect */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-red-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>

      {/* Page Heading */}
      <div className="pt-32 px-10 pb-10 relative z-10">
        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">
          Trending TV Shows 📺
        </h1>

        <p className="text-gray-400 text-lg max-w-xl">
          Discover the most popular and trending TV shows of the day.
        </p>

        <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
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
        {tvShows?.map((show) => (
          <Link
            key={show.id}
            to={`/watch/tv/${show.id}`} // route to WatchTVShow page
            className="transform transition duration-300 hover:scale-110 hover:z-20"
          >
            <MovieCard movie={show} /> {/* reuse MovieCard for TV shows */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
