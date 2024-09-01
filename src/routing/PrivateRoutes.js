import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoutes;
