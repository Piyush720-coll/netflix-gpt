import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());   // ✅ clear redux
      navigate("/");            // ✅ go to login
    } catch (error) {
      console.error(error);
      navigate("/");            // ❌ don't go to /error
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full px-10 py-4
      bg-gradient-to-b from-black/90 to-transparent
      flex justify-between items-center z-40"
    >
      {/* Logo */}
      <img
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
        className="w-32 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate("/browse")}
      />

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-3">
          <img
            alt="usericon"
            src={
              user.photoURL ||
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
            className="w-10 h-10 rounded-md border border-gray-500 cursor-pointer hover:scale-110 transition-transform"
          />

          <button
            onClick={handleSignOut}
            className="text-white text-sm font-semibold hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
