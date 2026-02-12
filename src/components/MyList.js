// pages/MyList.js
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IMG_CDN } from "../utils/constrains";
import Header from "../components/Header";

const MyList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeFirestore;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribeFirestore = onSnapshot(
          collection(db, "users", user.uid, "myList"),
          (snapshot) => {
            const savedMovies = snapshot.docs.map((doc) => doc.data());
            setMovies(savedMovies);
          }
        );
      } else {
        setMovies([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">

      <Header />

      {/* Glow Effects */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-red-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <div className="pt-32 px-10 pb-10 relative z-10">
        <h1 className="text-5xl font-extrabold mb-1 pb-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          My List ❤️
        </h1>

        <p className="text-gray-400 text-lg max-w-xl">
          Your saved movies collection.
        </p>

        <div className="mt-4 h-1 w-24 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></div>
      </div>

      {movies.length === 0 ? (
        <div className="relative z-10 px-10 text-gray-400 text-lg">
          You haven't saved anything yet.
        </div>
      ) : (
        <div
          className="
            px-10 pb-24 relative z-10
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            xl:grid-cols-6 
            gap-8
          "
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/watch/${movie.id}`)}
              className="group relative cursor-pointer transition duration-300 hover:scale-105"
            >
              {/* Poster */}
              <img
                src={IMG_CDN + movie.poster_path}
                alt={movie.title}
                className="rounded-xl w-full object-cover shadow-lg"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl flex flex-col justify-end p-4">
                <h3 className="text-sm font-bold">{movie.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {movie.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
