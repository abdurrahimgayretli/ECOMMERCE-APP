import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ admin }) => {
  const { loggedIn, user } = useAuth();

  if (admin && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
