import { ICursoAula, ICursoPresenca, IEstudanteCurso } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const registrarPresenca = async (presenca: ICursoPresenca): Promise<ICursoPresenca | null> => {
  try {
    const response = await api.post<ICursoPresenca>("/presencas", presenca, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar presença", error);
    return null;
  }
};

const listarPresencas = async (cursoAulaId: number, estudanteId: number): Promise<ICursoPresenca[]> => {
  try {
    const response = await api.get<ICursoPresenca[]>(`/presencas/${cursoAulaId}/${estudanteId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar presenças", error);
    return [];
  }
};

const editarPresenca = async (id: number, presenca: ICursoPresenca): Promise<ICursoPresenca | null> => {
  try {
    const response = await api.put<ICursoPresenca>(`/presencas/${id}`, presenca, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar presença", error);
    return null;
  }
};
const lancarPresencas = async (cursoAulaId: number, estudantesIds: number[]): Promise<boolean> => {
  try {
    console.log(cursoAulaId);
    await api.post(
      "/presencas/lancar", 
      estudantesIds, // enviar diretamente a lista no corpo
      { 
        params: { cursoAulaId }, // passar cursoAulaId como parâmetro de consulta
        headers: getAuthHeaders()
      }
    );
    return true;
  } catch (error) {
    console.error("Erro ao lançar presenças", error);
    return false;
  }
};


const listarAlunosPresentesNoCursoAula = async (cursoAulaId: number): Promise<IEstudanteCurso[]> => {
  try {
    const response = await api.get<IEstudanteCurso[]>(`/presencas/curso-aula/${cursoAulaId}/alunos-presentes`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar alunos presentes", error);
    return [];
  }
};

const listarAulasDoCurso = async (cursoId: number): Promise<ICursoAula[]> => {
  try {
    const response = await api.get<ICursoAula[]>(`/presencas/curso/${cursoId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar aulas do curso", error);
    return [];
  }
};

const listarMinhasPresencasNoCurso = async (cursoId: number): Promise<Date[]> => {
  try {
    const response = await api.get<Date[]>(`/presencas/curso/${cursoId}/minhas-presencas`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar minhas presenças", error);
    return [];
  }
};

const lancarCursoAula = async (cursoAula: ICursoAula): Promise<ICursoAula | null> => {
    try {
      const response = await api.post<ICursoAula>("/presencas/curso-aula", cursoAula, { headers: getAuthHeaders() });
      console.log(cursoAula);
      return response.data;
    } catch (error) {
      console.error("Erro ao lançar curso aula", error);
      return null;
    }
  };


export {
  registrarPresenca,
  listarPresencas,
  editarPresenca,
  lancarPresencas,
  listarAlunosPresentesNoCursoAula,
  listarAulasDoCurso,
  listarMinhasPresencasNoCurso,
  lancarCursoAula
};
