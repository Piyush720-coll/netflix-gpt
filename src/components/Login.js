import { useRef, useState } from "react";
import Header from "./Header";
import { validateAuthData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_URL, USER_AVATER } from "../utils/constrains";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = validateAuthData({
      email: email.current.value,
      password: password.current.value,
      fullName: fullName.current?.value || "",
      photoURL: USER_AVATER,
      isSignIn: isSignInForm,
    });

    setErrorMessage(message);
    if (message) return;

    try {
      // ---------- SIGN UP ----------
      if (!isSignInForm) {
        await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        await updateProfile(auth.currentUser, {
          displayName: fullName.current.value,
          photoURL: USER_AVATER,
        });
      }
      // ---------- SIGN IN ----------
      else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        await updateProfile(auth.currentUser, {
          displayName: fullName.current.value,
          photoURL: USER_AVATER,
        });
      }
    } catch (error) {
      setErrorMessage(error.code + " - " + error.message);
    }
  };

  const toggleSignInForm = () => {
    setErrorMessage(null);
    setIsSignInForm((prev) => !prev);

    email.current.value = "";
    password.current.value = "";
    if (fullName.current) fullName.current.value = "";
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="relative z-30">
        <Header />
      </div>

      <img
        src={BG_URL}
        alt="Netflix Banner"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={handleSubmit}
        className="absolute z-20 top-1/2 left-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 bg-black/80 p-8 rounded-lg shadow-2xl"
      >
        <h1 className="text-white text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        <div className="flex flex-col gap-4">
          {!isSignInForm && (
            <input
              ref={fullName}
              type="text"
              placeholder="Full Name"
              className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-red-600"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email address"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded font-semibold transition-transform hover:scale-[1.02]"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="mt-6 text-gray-400 text-sm text-center">
          {isSignInForm
            ? "New to Netflix?"
            : "Already have an account?"}{" "}
          <span
            onClick={toggleSignInForm}
            className="text-white cursor-pointer hover:underline"
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
