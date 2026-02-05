import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, USER_AVATER } from "../utils/constrains";
import HeaderShimmer from "./HeaderShimmer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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

  if (!user) return <HeaderShimmer />;

  return (
    <div
      className="absolute top-0 left-0 w-full px-10 py-4
      bg-gradient-to-b from-black/90 to-transparent
      flex justify-between items-center z-40"
    >
      {/* Logo */}
      <img
        src={LOGO}
        alt="Netflix Logo"
        className="w-32 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate("/browse")}
      />

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-3">
          <p
            className="
              text-white text-2xl font-semibold
              tracking-wide
              max-w-[120px] truncate
            "
          >
            {user.displayName || "User"}
          </p>

          <img
            alt="user avatar"
            src={user.photoURL || USER_AVATER}
            className="w-10 h-10 rounded-md border border-gray-500
            cursor-pointer hover:scale-110 transition-transform"
          />

          <button
            onClick={handleSignOut}
            className="text-white text-sm font-semibold
            hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
