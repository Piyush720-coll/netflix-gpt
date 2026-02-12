// components/MovieCard.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { IMG_CDN } from "../utils/constrains";
import { Bookmark } from "lucide-react";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Proper auth listener (reactive)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Firestore listener
  useEffect(() => {
    if (!user || !movie?.id) return;

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid, "myList", movie.id.toString()),
      (docSnap) => {
        setSaved(docSnap.exists());
      }
    );

    return () => unsubscribe();
  }, [user, movie?.id]);

  const toggleSave = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login first");
      return;
    }

    const ref = doc(db, "users", user.uid, "myList", movie.id.toString());

    try {
      if (saved) {
        await deleteDoc(ref);
      } else {
        await setDoc(ref, {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          overview: movie.overview || "",   // ✅ ADD THIS
          savedAt: Date.now(),
        });

      }
    } catch (error) {
      console.error("Error updating My List:", error);
    }
  };

  if (!movie?.poster_path) return null;

  return (
    <div
      className="relative group min-w-[150px] py-5 
                 hover:scale-110 transition-transform duration-300 
                 cursor-pointer"
      onClick={() => navigate(`/watch/${movie.id}`)}
    >
      {/* Poster */}
      <img
        src={IMG_CDN + movie.poster_path}
        alt=""
        className="rounded-lg w-full object-cover"
      />

      {/* Save Icon */}
      <div
        onClick={toggleSave}
        className={`absolute top-3 right-3 
                    p-2.5 rounded-full backdrop-blur-md
                    transition-all duration-300 ease-in-out
                    opacity-0 group-hover:opacity-100
                    hover:scale-110 active:scale-95
                    ${
                      saved
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/50 opacity-100"
                        : "bg-black/70 text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40"
                    }`}
      >
        <Bookmark
          size={18}
          fill={saved ? "white" : "none"}
          className="transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default MovieCard;

