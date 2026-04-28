import { Navigate, Outlet } from "react-router-dom";
import useLocal from "../hooks/useLocal";

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocal("currentUser", null);

  console.log("PR", currentUser);

  if (!currentUser) {
    console.log("You are not authorised user");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
