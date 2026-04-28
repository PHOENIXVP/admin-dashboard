import { Navigate, Outlet } from "react-router-dom";
import useLocal from "../hooks/useLocal";

const ProtectedRoute = () => {
  const [currentUser, setCurrentUser] = useLocal("currentUser", null);

  console.log("PR", currentUser);

  if (!currentUser) {
    console.log("You are not authorised user");
    return <Navigate to="/" replace />;
  }
  if (currentUser?.userType) {
    return <Navigate to={`${currentUser?.userType}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
