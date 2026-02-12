import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TMDB_KEY } from "../utils/constrains";
import {
  Play,
  Star,
  Calendar,
  Clock,
  ChevronLeft,
  Info,
} from "lucide-react";

export default function WatchMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(true);


  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH MOVIE ---------------- */
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}`
        );
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);

    
  useEffect(() => {
    let timeout;

    const handleMouseMove = () => {
      setShowNav(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowNav(false);
      }, 2000); // hide after 2 seconds
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);



  if (loading)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse">
        LOADING CINEMA...
      </div>
    );

  if (!movie)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Movie not found
      </div>
    );

  const embedUrl = `https://vidsrcme.ru/embed/movie?tmdb=${id}`;

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-sans">

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md transition-all duration-500
      ${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
        <button
          onClick={() => navigate(-1)}
          className="hover:scale-110 transition-transform bg-white/10 p-2 rounded-full"
        >
          <ChevronLeft size={26} />
        </button>
        <span className="text-xs tracking-[0.3em] uppercase opacity-50">
          Movie Streaming
        </span>
        <div className="w-8"></div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative h-[80vh] w-full overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-top scale-110 animate-slowZoom"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${
              movie.backdrop_path || movie.poster_path
            })`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-black/20" />

        <div className="relative h-full flex flex-col justify-end px-6 md:px-20 pb-20 max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={14} fill="currentColor" />
              <span className="font-bold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tight 
          bg-gradient-to-r from-white via-gray-200 to-gray-500 
          bg-clip-text text-transparent 
          drop-shadow-[0_0_25px_rgba(255,0,0,0.5)] mb-6">
            {movie.title}
          </h1>

          <p className="max-w-2xl text-gray-300 mb-8 line-clamp-3">
            {movie.overview}
          </p>

          <button
            onClick={() =>
              document.getElementById("player").scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold 
            hover:bg-red-600 hover:text-white hover:scale-105 
            transition-all duration-300 w-fit"
          >
            <Play size={20} /> WATCH NOW
          </button>
        </div>
      </div>

      {/* VIDEO PLAYER */}
      <div id="player" className="px-4 md:px-20 mt-16">
        <div className="max-w-6xl mx-auto relative group">

          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-700"></div>

          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <iframe
              src={embedUrl}
              title="Movie Player"
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* MOVIE DETAILS */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 mt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-10">

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info size={20} className="text-red-600" />
                Storyline
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-4">
                Genres
              </h3>
              <div className="flex flex-wrap gap-3">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="bg-white/5 px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-xl space-y-6">

            <h3 className="text-xl font-bold mb-4">Details</h3>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={16} />
                Release
              </div>
              <span>{movie.release_date}</span>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock size={16} />
                Runtime
              </div>
              <span>{movie.runtime} min</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Rating</span>
              <span className="text-yellow-400 font-bold">
                {movie.vote_average} / 10
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
