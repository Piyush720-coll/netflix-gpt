// useTvShows.js
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constrains";
import { useDispatch } from "react-redux";
import { addTvShows } from "../utils/moviesSlice"; // make sure this exists in your slice

const useTvShows = () => {
  const dispatch = useDispatch();

  const getTvShows = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
        API_OPTIONS
      );

      const json = await data.json();
      dispatch(addTvShows(json.results)); // dispatch to TV shows slice
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    getTvShows();
  }, [dispatch]);
};

export default useTvShows;
