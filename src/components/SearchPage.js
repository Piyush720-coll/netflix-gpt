import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchMovie from "../utils/SearchMovie";
import { Search, Film, Star, Calendar, PlayCircle } from "lucide-react";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.results) {
      setMovies(location.state.results);
    }
  }, [location.state]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await SearchMovie(searchText.trim());
      const results = data?.results || data || [];
      setMovies(results);

      if (results.length === 0) {
        setError("No titles found matching that search.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ✅ UPDATED NAVIGATION LOGIC
   * Movie: /watch/ID
   * TV Show: /watch/tv/ID
   */
  const handleNavigate = (item) => {
    const isTV = item.media_type === "tv" || !!item.first_air_date;
    
    if (isTV) {
      // Matches: http://localhost:3000/watch/tv/270444
      navigate(`/watch/tv/${item.id}`);
    } else {
      // Matches: http://localhost:3000/watch/1168190
      navigate(`/watch/${item.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-purple-900/20 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Search Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tighter uppercase italic">
            Discover
          </h1>
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mt-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
              <Search className="ml-5 text-gray-500" size={24} />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search movies or TV shows..."
                className="w-full p-5 bg-transparent outline-none text-lg"
              />
              <button type="submit" className="mr-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                Search
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Grid Display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
          {movies.map((movie) => {
            const isTV = movie.media_type === "tv" || !!movie.first_air_date;
            const title = movie.title || movie.name || "Untitled";
            const year = (movie.release_date || movie.first_air_date || "").split("-")[0] || "N/A";

            return (
              <div key={movie.id} className="group cursor-pointer" onClick={() => handleNavigate(movie)}>
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-purple-500/50">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 italic">
                      <Film size={40} className="opacity-20 mb-2" />
                      <span className="text-xs">No Poster</span>
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  {movie.vote_average > 0 && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                      <Star size={12} className="text-yellow-500" fill="currentColor" />
                      <span className="text-[10px] font-bold">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-bold text-gray-100 group-hover:text-purple-400 transition truncate">{title}</h2>
                  <div className="flex items-center justify-between mt-1 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    <span>{year}</span>
                    <span className="border border-gray-800 px-1.5 py-0.5 rounded bg-zinc-900">
                      {isTV ? "TV" : "Movie"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;