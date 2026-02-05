import Header from './Header';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from './MainContainer.js';
import SeconderyContainer from './SeconderyContainer.js';

const Browse = () => {

  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SeconderyContainer />

    </div>
  )
}

export default Browse;