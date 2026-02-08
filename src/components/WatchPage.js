import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TMDB_KEY } from "../utils/constrains";

export default function WatchMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      const API_KEY = TMDB_KEY;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </div>
    );

  if (!movie)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-xl">Movie not found</p>
      </div>
    );

  const embedUrl = `https://vidsrcme.ru/embed/movie?tmdb=${id}`;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section with Poster Background */}
      <div
        className="relative h-[70vh] md:h-[80vh] flex items-end bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
        }}
      >
        <div className="bg-gradient-to-t from-black to-transparent w-full p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="italic text-gray-300 text-lg md:text-xl mb-2">
              {movie.tagline}
            </p>
          )}
          <p className="text-sm md:text-base max-w-3xl">{movie.overview}</p>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex justify-center items-center mt-8 px-4 md:px-20">
        <iframe
          src={embedUrl}
          title={movie.title}
          className="w-full md:w-[900px] h-[500px] md:h-[600px] rounded-xl shadow-2xl border border-gray-800"
          allowFullScreen
        ></iframe>
      </div>

      {/* Additional Info Section */}
      <div className="mt-12 px-6 md:px-20 pb-12">
        <h2 className="text-2xl font-semibold mb-4">Movie Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <p>
            <span className="font-semibold">Release Date:</span> {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {movie.vote_average} / 10
          </p>
          <p>
            <span className="font-semibold">Genres:</span>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Runtime:</span> {movie.runtime} minutes
          </p>
        </div>
      </div>
    </div>
  );
}
