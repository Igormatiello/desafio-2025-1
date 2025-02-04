import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { HomePage } from "@/pages/HomePage";
import CursosPage from "@/pages/CursosPage/ListagemCursosPage";
import ListagemCursosSemProfessor from "@/pages/CursosPage/ListagemCursosSemProfessorPage";
import MeusCursosProfessor from "@/pages/CursosPage/ListagemMeusCursosProfessorPage";
import CursosEstudantePage from "@/pages/CursosPage/ListagemCursosEstudantePage";
import MeusAlunosCursosProfessor from "@/pages/CursosPage/ListagemAlunosDoCursoPage";
import MeusDadosUsuario from "@/pages/MeusDadosPage/DadosDeUserPessoaPage";
import MeusEnderecos from "@/pages/MeusDadosPage/MeuEnderecoPage";

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
        <Route path="/alunos/:id" element={<MeusAlunosCursosProfessor />} />
        <Route path="/meus_dados" element={<MeusDadosUsuario />} />
        <Route path="/endereco" element={<MeusEnderecos />} />


        


      </Route>
    </Routes>
  );
}
