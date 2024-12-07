import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    console.log("No token found, redirecting to login...");
    return <Navigate to="/" />;
  }

  if (adminOnly && (!user || !user.isAdmin)) {
    console.log("User is not an admin, redirecting...");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
