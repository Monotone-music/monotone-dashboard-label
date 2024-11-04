import useAuthStore from "@/store/useAuthStore";
import useLoadingStore from "@/store/useLoadingStore";
import { ReactNode, useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";


interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { token, user } = useAuthStore();
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(true); // Start loading indicator
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [setLoading]);

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to unauthorized if the user's role does not match the URL role or allowed roles
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
