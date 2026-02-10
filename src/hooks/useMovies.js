import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constrains";
import { useDispatch } from "react-redux";
import { addMovies } from "../utils/moviesSlice";

const useMovies = () => {
  const dispatch = useDispatch();

  const getMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();

    dispatch(addMovies(json.results));
  };

  useEffect(() => {
    getMovies();
  }, [dispatch]);
};

export default useMovies;
