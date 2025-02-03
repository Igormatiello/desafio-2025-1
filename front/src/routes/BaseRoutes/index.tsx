import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { HomePage } from "@/pages/HomePage";
import CursosPage from "@/pages/CursosPage/ListagemCursosPage";

export function BaseRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<UserSignupPage />} />

      {/* Private Routes */}
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cursos" element={<CursosPage />} />
      </Route>
    </Routes>
  );
}
