import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { LOGO, USER_AVATER } from "../utils/constrains";
import { toggleGptSearchView } from "../utils/gptSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchMovie from "../utils/SearchMovie";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );

        // ✅ Only redirect if currently on login page
        if (location.pathname === "/") {
          navigate("/browse");
        }

      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSearchClick = async () => {
    if (searchText.trim()) {
      const results = await SearchMovie(searchText.trim());
      navigate(
        `/search?query=${encodeURIComponent(searchText.trim())}`,
        { state: { results } }
      );
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full px-10 py-5 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-center z-40">
      
      {/* Left Section: Logo + Navigation */}
      <div className="flex items-center gap-10 px-20 scale-[1.32]">
        <img
          src={LOGO}
          alt="Netflix Logo"
          className="w-32 cursor-pointer scale-125 hover:scale-[1.3] transition-transform"
          onClick={() => navigate("/browse")}
        />

        {user && (
          <div className="flex gap-8 text-white text-sm font-medium tracking-wide">
            <p
              onClick={() => navigate("/browse")}
              className={`relative cursor-pointer transition-all duration-300 
                hover:text-white hover:scale-105
                ${
                  location.pathname === "/browse"
                    ? "text-white after:w-full"
                    : "text-gray-300"
                }
                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:h-[2px] after:bg-red-600 after:w-0 
                after:transition-all after:duration-300 
                hover:after:w-full
              `}
            >
              Home
            </p>

            <p
              onClick={() => navigate("/movies")}
              className={`relative cursor-pointer transition-all duration-300 
                hover:text-white hover:scale-105
                ${
                  location.pathname === "/movies"
                    ? "text-white after:w-full"
                    : "text-gray-300"
                }
                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:h-[2px] after:bg-red-600 after:w-0 
                after:transition-all after:duration-300 
                hover:after:w-full
              `}
            >
              Movies
            </p>

            <p
              onClick={() => navigate("/tv")}
              className={`relative cursor-pointer transition-all duration-300 
                hover:text-white hover:scale-105
                ${
                  location.pathname === "/tv"
                    ? "text-white after:w-full"
                    : "text-gray-300"
                }
                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:h-[2px] after:bg-red-600 after:w-0 
                after:transition-all after:duration-300 
                hover:after:w-full
              `}
            >
              TV Shows
            </p>

            <p
              onClick={() => navigate("/mylist")}
              className={`relative cursor-pointer transition-all duration-300 
                hover:text-white hover:scale-105
                ${
                  location.pathname === "/mylist"
                    ? "text-white after:w-full"
                    : "text-gray-300"
                }
                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:h-[2px] after:bg-red-600 after:w-0 
                after:transition-all after:duration-300 
                hover:after:w-full
              `}
            >
              My List
            </p>
          </div>
        )}
      </div>  {/* ✅ THIS WAS MISSING */}

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-3">
          <p className="text-white text-2xl font-semibold tracking-wide max-w-[120px] truncate">
            {user.displayName || "User"}
          </p>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center bg-gray-800 rounded-full pl-3 pr-2 transition-all duration-300 ${
                searchOpen ? "w-64" : "w-10"
              }`}
              onMouseEnter={() => setSearchOpen(true)}
              onMouseLeave={() => !searchText && setSearchOpen(false)}
            >
              <MagnifyingGlassIcon className="w-5 h-10 text-gray-400" />
              {searchOpen && (
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search movies..."
                  className="ml-2 bg-transparent outline-none text-white w-full placeholder-gray-400"
                  autoFocus
                />
              )}
            </div>

            <button
              onClick={handleSearchClick}
              className="px-3 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
            >
              🔍
            </button>
          </div>

          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "🚀 GPT Search"}
          </button>

          <img
            alt="user avatar"
            src={user.photoURL || USER_AVATER}
            className="w-9 h-9 rounded-md border border-gray-500 cursor-pointer hover:scale-110 transition-transform"
          />

          <button
            onClick={handleSignOut}
            className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold transition-all duration-300 hover:bg-red-700 active:scale-95"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};


export default Header;
