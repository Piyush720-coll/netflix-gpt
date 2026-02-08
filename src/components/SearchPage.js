import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import SearchMovie from "../utils/SearchMovie";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ initialize navigate

  const initialResults = location.state?.results || [];

  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search movies
  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await SearchMovie(searchText.trim());
      if (results && results.length > 0) {
        setMovies(results);
      } else {
        setMovies([]);
        setError("No movies found");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to Watch page
  const handleNavigate = (movie) => {
    navigate(`/watch/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="p-8 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center tracking-wide">
        Search Movies
      </h1>

      {/* Search input */}
      <div className="flex gap-3 max-w-xl mx-auto mb-12">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter movie name..."
          className="flex-1 p-3 rounded-lg text-black font-medium focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-md"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform duration-300"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-white text-center text-lg animate-pulse">Loading...</p>}
      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {/* Movies grid */}
      {movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => handleNavigate(movie)} // ✅ pass movie here
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gray-700 flex items-center justify-center text-white text-lg">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-white font-bold text-lg truncate">{movie.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Release: {movie.release_date || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No movies message */}
      {movies.length === 0 && !loading && !error && (
        <p className="text-gray-400 text-center mt-16 text-lg">
          No movies to display. Try searching above!
        </p>
      )}
    </div>
  );
};

export default SearchPage;
