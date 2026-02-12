import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TMDB_KEY } from "../utils/constrains";
import {
  Play,
  Star,
  ChevronLeft,
  Info,
  List,
} from "lucide-react";

export default function WatchTVShow() {
  const { id } = useParams();
  const navigate = useNavigate();

    const [showNav, setShowNav] = useState(true);
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  /* ---------------- FETCH MAIN SHOW ---------------- */
  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_KEY}`
        );
        setTvShow(res.data);
        setActiveSeason(1);
        setActiveEpisode(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShow();
    window.scrollTo(0, 0);
  }, [id]);

  /* ---------------- FETCH SEASON ---------------- */
  useEffect(() => {
    if (!tvShow) return;

    const fetchSeasonDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${activeSeason}?api_key=${TMDB_KEY}`
        );
        setEpisodes(res.data.episodes || []);
      } catch (err) {
        console.error("Error fetching episodes", err);
      }
    };

    fetchSeasonDetails();
  }, [id, activeSeason, tvShow]);

    
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

  if (!tvShow)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Show not found
      </div>
    );

  const embedUrl = `https://vidsrcme.ru/embed/tv?tmdb=${id}&s=${activeSeason}&e=${activeEpisode}`;

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-sans">

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 flex justify-between items-center p-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md transition-all duration-500
      ${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
        <button
          onClick={() => navigate(-2)}
          className="hover:scale-110 transition-transform bg-white/10 p-2 rounded-full"
        >
          <ChevronLeft size={26} />
        </button>
        <span className="text-xs tracking-[0.3em] uppercase opacity-50">
          Streaming Now
        </span>
        <div className="w-8"></div>
      </nav>

      {/* HERO */}
      <div className="relative h-[80vh] w-full overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-top scale-110 animate-slowZoom"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-black/20" />

        <div className="relative h-full flex flex-col justify-end px-6 md:px-20 pb-20 max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={14} fill="currentColor" />
              <span className="font-bold">
                {tvShow.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tight 
          bg-gradient-to-r from-white via-gray-200 to-gray-500 
          bg-clip-text text-transparent 
          drop-shadow-[0_0_25px_rgba(255,0,0,0.5)] mb-6">
            {tvShow.name}
          </h1>

          <p className="max-w-2xl text-gray-300 mb-8 line-clamp-3">
            {tvShow.overview}
          </p>

          <button
            onClick={() =>
              document.getElementById("player").scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold 
            hover:bg-red-600 hover:text-white hover:scale-105 
            transition-all duration-300 w-fit"
          >
            <Play size={20} /> WATCH S{activeSeason}:E{activeEpisode}
          </button>
        </div>
      </div>

      {/* PLAYER */}
      <div id="player" className="px-4 md:px-20 mt-16">
        <div className="max-w-6xl mx-auto relative group">

          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-700"></div>

          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <iframe
              src={embedUrl}
              title="TV Player"
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 mt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* EPISODES */}
          <div className="lg:col-span-2">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <List className="text-red-600" /> Episodes
              </h2>

              <select
                value={activeSeason}
                onChange={(e) => {
                  setActiveSeason(Number(e.target.value));
                  setActiveEpisode(1);
                }}
                className="bg-zinc-900 border border-white/20 px-4 py-2 rounded-lg"
              >
                {[...Array(tvShow.number_of_seasons)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Season {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">

              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => setActiveEpisode(ep.episode_number)}
                  className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                    activeEpisode === ep.episode_number
                      ? "bg-red-600/10 border-red-600"
                      : "bg-zinc-900/40 border-transparent hover:bg-zinc-800"
                  }`}
                >
                  <div className="w-32 h-20 bg-zinc-800 rounded-lg overflow-hidden">
                    {ep.still_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <span className="text-xs text-red-500 font-bold uppercase">
                      Episode {ep.episode_number}
                    </span>
                    <h4 className="font-bold">{ep.name}</h4>
                    <p className="text-gray-500 text-sm line-clamp-1">
                      {ep.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-xl space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Info size={18} /> Details
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">First Air Date</span>
                <span>{tvShow.first_air_date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Seasons</span>
                <span className="text-red-500 font-bold">
                  {tvShow.number_of_seasons}
                </span>
              </div>

              <div>
                <span className="text-gray-500">Genres</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tvShow.genres.map((g) => (
                    <span
                      key={g.id}
                      className="bg-white/5 px-3 py-1 rounded-full text-xs"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
