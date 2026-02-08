import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { LOGO, USER_AVATER } from "../utils/constrains";
import { toggleGptSearchView } from "../utils/gptSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchMovie from "../utils/SearchMovie";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // ❌ no manual dispatch here
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

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSearchClick = async () => {
    if (searchText.trim()) {
      const results = await SearchMovie(searchText.trim());
      console.log("Search results:", results);
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`, { state: { results } });
      // You can dispatch results to Redux or show them in a component
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full px-10 py-4 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-center z-40">
      {/* Logo */}
      <img
        src={LOGO}
        alt="Netflix Logo"
        className="w-32 cursor-pointer scale-125 hover:scale-[1.3] transition-transform"
        onClick={() => navigate("/browse")}
      />

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-3">
          <p className=" text-white text-2xl font-semibold tracking-wide max-w-[120px] truncate ">
            {user.displayName || "User"}
          </p>

          {/* Search Bar */}
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

            {/* Small Search Button */}
            <button
              onClick={handleSearchClick}
              className="px-3 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
            >
              🔍
            </button>
          </div>

          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 active:scale-95"
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
            className="relative px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.7)] active:scale-95"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
