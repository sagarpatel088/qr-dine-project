import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("admin");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;