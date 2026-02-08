import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (!user) {
    // Redirect to login if not signed in
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
