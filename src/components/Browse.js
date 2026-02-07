import Header from './Header';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from './MainContainer.js';
import SeconderyContainer from './SeconderyContainer.js';
import usePopularMovies from '../hooks/usePopularMovies.js';
import useTopRatedMovies from '../hooks/TopRatedMovies.js';
import useUpcomingMovies from '../hooks/useUpcomingMovies.js';

const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SeconderyContainer />

    </div>
  )
}

export default Browse;