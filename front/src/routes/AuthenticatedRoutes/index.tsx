import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "@/service/AuthService";
import { NavBar } from "@/components/NavBar";

export function AuthenticatedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
