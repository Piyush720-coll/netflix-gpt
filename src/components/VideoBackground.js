import { useState } from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

export const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  const [loaded, setLoaded] = useState(false);

  useMovieTrailer(movieId);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Loader to hide thumbnail */}
      {!loaded && (
        <div className="absolute inset-0 bg-black z-20 animate-pulse"></div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <iframe
        className="w-full h-full scale-150"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}&modestbranding=1&rel=0`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
