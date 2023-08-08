import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, user }: any) => {
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
