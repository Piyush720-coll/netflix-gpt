import Header from './Header';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from './MainContainer.js';
import SeconderyContainer from './SeconderyContainer.js';
import usePopularMovies from '../hooks/usePopularMovies.js';
import useTopRatedMovies from '../hooks/TopRatedMovies.js';
import useUpcomingMovies from '../hooks/useUpcomingMovies.js';
import GptSearch from './GptSearch.js';
import { useSelector } from 'react-redux';

const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (<GptSearch />) : (
        <>
        <MainContainer />
        <SeconderyContainer />
        </>
        )}

    </div>
  )
}

export default Browse;