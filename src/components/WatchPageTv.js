// WatchTVShow.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TMDB_KEY } from "../utils/constrains";

export default function WatchTVShow() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTvShow = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_KEY}`
        );
        setTvShow(response.data);
      } catch (error) {
        console.error("Error fetching TV show:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShow();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </div>
    );

  if (!tvShow)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-xl">TV Show not found</p>
      </div>
    );

  const embedUrl = `https://vidsrcme.ru/embed/tv?tmdb=${id}`;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section with Poster Background */}
      <div
        className="relative h-[70vh] md:h-[80vh] flex items-end bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path || tvShow.poster_path})`,
        }}
      >
        <div className="bg-gradient-to-t from-black to-transparent w-full p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {tvShow.name}
          </h1>
          {tvShow.tagline && (
            <p className="italic text-gray-300 text-lg md:text-xl mb-2">
              {tvShow.tagline}
            </p>
          )}
          <p className="text-sm md:text-base max-w-3xl">{tvShow.overview}</p>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex justify-center items-center mt-8 px-4 md:px-20">
        <iframe
          src={embedUrl}
          title={tvShow.name}
          className="w-full md:w-[900px] h-[500px] md:h-[600px] rounded-xl shadow-2xl border border-gray-800"
          allowFullScreen
        ></iframe>
      </div>

      {/* Additional Info Section */}
      <div className="mt-12 px-6 md:px-20 pb-12">
        <h2 className="text-2xl font-semibold mb-4">TV Show Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <p>
            <span className="font-semibold">First Air Date:</span> {tvShow.first_air_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {tvShow.vote_average} / 10
          </p>
          <p>
            <span className="font-semibold">Genres:</span>{" "}
            {tvShow.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Number of Seasons:</span> {tvShow.number_of_seasons}
          </p>
          <p>
            <span className="font-semibold">Episode Runtime:</span>{" "}
            {tvShow.episode_run_time.length > 0
              ? tvShow.episode_run_time[0] + " minutes"
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
