import { ICurso, IEstudanteCurso, IProfessorCurso, IPessoa } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const listarCursosAtivos = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get<ICurso[]>("/cursos/ativos", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cursos ativos", error);
    return [];
  }
};

const criarCurso = async (curso: ICurso): Promise<ICurso | null> => {
  try {
    const response = await api.post<ICurso>("/cursos", curso, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar curso", error);
    return null;
  }
};

const entrarNoCurso = async (cursoId: number): Promise<IEstudanteCurso | null> => {
  try {
    const response = await api.post<IEstudanteCurso>(`/cursos/${cursoId}/entrar`, {}, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao entrar no curso", error);
    return null;
  }
};

const editarCurso = async (id: number, curso: ICurso): Promise<ICurso | null> => {
  try {
    const response = await api.put<ICurso>(`/cursos/${id}`, curso, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar curso", error);
    return null;
  }
};

const listarCursos = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get<ICurso[]>("/cursos", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar cursos", error);
    return [];
  }
};

const desativarCurso = async (id: number): Promise<ICurso | null> => {
  try {
    const response = await api.put<ICurso>(`/cursos/${id}/desativar`, {}, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao desativar curso", error);
    return null;
  }
};

const listarCursosSemProfessor = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get<ICurso[]>("/cursos/sem-professor", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar cursos sem professor", error);
    return [];
  }
};

const listarMeusCursos = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get<ICurso[]>("/cursos/meus-cursos", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar meus cursos", error);
    return [];
  }
};


const listarMeusCursosEstudante = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get<ICurso[]>("/cursos/meus-cursos_estudante", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar meus cursos", error);
    return [];
  }
};

const associarProfessorCurso = async (cursoId: number): Promise<IProfessorCurso | null> => {
  try {
    const response = await api.post<IProfessorCurso>(`/cursos/${cursoId}/associar-professor`, {}, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    return null;
  }
};



const desassociarProfessorCurso = async (cursoId: number): Promise<boolean> => {
  try {
    await api.delete(`/cursos/${cursoId}/desassociar-professor`, { headers: getAuthHeaders() });
    return true;
  } catch (error) {
    console.error("Erro ao desassociar professor do curso", error);
    return false;
  }
};

 export const listarAlunosDoCurso = async (cursoId: number): Promise<IPessoa[]> => {
  try {
    const response = await api.get<IPessoa[]>(`/cursos/${cursoId}/alunos`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar alunos do curso", error);
    return [];
  }
};

const CursoService = {
  listarCursosAtivos,
  criarCurso,
  entrarNoCurso,
  editarCurso,
  listarCursos,
  desativarCurso,
  listarCursosSemProfessor,
  listarMeusCursos,
  associarProfessorCurso,
  desassociarProfessorCurso,
  listarAlunosDoCurso,
  listarMeusCursosEstudante
};

export default CursoService;
