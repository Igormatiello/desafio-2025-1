import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { HomePage } from "@/pages/HomePage";
import CursosPage from "@/pages/CursosPage/ListagemCursosPage";
import ListagemCursosSemProfessor from "@/pages/CursosPage/ListagemCursosSemProfessorPage";
import MeusCursosProfessor from "@/pages/CursosPage/ListagemMeusCursosProfessorPage";
import CursosEstudantePage from "@/pages/CursosPage/ListagemCursosEstudantePage";

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
        <Route path="/cursos_livres" element={<ListagemCursosSemProfessor />} />
        <Route path="/meus_cursos_professor" element={<MeusCursosProfessor />} />
        <Route path="/meus_cursos_estudante" element={<CursosEstudantePage />} />

        


      </Route>
    </Routes>
  );
}
