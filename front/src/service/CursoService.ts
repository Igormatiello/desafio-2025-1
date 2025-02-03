import { ICurso } from "@/commons/interfaces";
import { api } from "@/lib/axios";


const listarCursosAtivos = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get<ICurso[]>("/cursos/ativos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cursos ativos", error);
    return [];
  }
};

const CursoService = {
  listarCursosAtivos,
};

export default CursoService;