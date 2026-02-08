import { useSelector } from "react-redux";
import { VideoTitle } from "./VideoTitle";
import { VideoBackground } from "./VideoBackground";
import VideoShimmer from "./VideoShimmer";

const MainContainer = () => {
  const movies = useSelector(store => store.movies?.NowPlayingMovies);

  if (!movies) return <VideoShimmer />;

  const mainMovie = movies[0];
  const { id } = mainMovie;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoTitle movie={mainMovie}/>
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
