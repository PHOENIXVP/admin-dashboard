import { Navigate, useMatches } from "react-router-dom";
import useLocal from "../hooks/useLocal";

type MatchType = {
  handle?: {
    [key: string]: unknown;
    roles?: string[];
  };
};

// const ProtectedRoute = ({ children, allowedRole = [] }) => {
const ProtectedRoute = ({ children }) => {
  const [currentUser] = useLocal("currentUser", null);
  const matches = useMatches() as MatchType[];

  const allowedRole = matches[matches.length - 1]?.handle?.roles;

  console.log(currentUser?.userType, matches, allowedRole);

  if (!currentUser) {
    console.log("You are not authorised user");
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRole?.length > 0 &&
    currentUser?.userType &&
    !allowedRole.includes(currentUser.userType.toLowerCase())
  ) {
    console.log("You are not authorised to go to this page");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
