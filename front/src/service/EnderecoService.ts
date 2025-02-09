import { EnderecoDTO } from "@/commons/interfaces";
import { api } from "@/lib/axios";

// Função para obter os cabeçalhos de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Função para listar todos os endereços
const listarEnderecos = async (): Promise<EnderecoDTO | null> => {
  try {
    const response = await api.get<EnderecoDTO>("/pessoa/enderecos", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar endereços", error);
    return null;
  }
};

// Função para salvar ou editar um endereço
const salvarOuEditarEndereco = async (enderecoDTO: EnderecoDTO): Promise<string | null> => {
  try {
    const response = await api.post<string>("/pessoa/endereco", enderecoDTO, { headers: getAuthHeaders() })
    ;
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar ou editar o endereço", error);
    return null;
  }
};


// Serviço completo
const EnderecoService = {
  listarEnderecos,
  salvarOuEditarEndereco,
};

export default EnderecoService;
