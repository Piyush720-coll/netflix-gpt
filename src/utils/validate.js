const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRules = {
  minLength: 8,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  number: /[0-9]/,
  specialChar: /[!@#$%^&*]/,
};

export const validateAuthData = ({
  email,
  password,
  fullName = "",
  isSignIn,
}) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  const trimmedEmail = email.trim();

  if (!emailRegex.test(trimmedEmail)) {
    return "Enter a valid email address";
  }

  // 🔐 Password checks
  if (password.length < passwordRules.minLength) {
    return "Password must be at least 8 characters";
  }

  if (!passwordRules.upperCase.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!passwordRules.lowerCase.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!passwordRules.number.test(password)) {
    return "Password must contain at least one number";
  }

  if (!passwordRules.specialChar.test(password)) {
    return "Password must contain at least one special character";
  }

  // 🧑‍💼 Sign Up–only validation
  if (!isSignIn) {
    if (!fullName.trim()) {
      return "Full name is required";
    }

    if (fullName.trim().length < 3) {
      return "Full name must be at least 3 characters";
    }
  }

  return null; // ✅ all good
};
