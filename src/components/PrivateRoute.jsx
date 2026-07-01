import { Navigate } from "react-router-dom";
import { useAuthValue } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthValue();

  if (user === undefined) {
    return <p>Carregando...</p>;
  }

  return user ? children : <Navigate to="/blog" />;
};

export default PrivateRoute;
