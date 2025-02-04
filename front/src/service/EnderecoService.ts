import { EnderecoDTO, PessoaEndereco } from "@/commons/interfaces";
import { api } from "@/lib/axios";

// Função para obter os cabeçalhos de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Função para listar todos os endereços
const listarEnderecos = async (): Promise<PessoaEndereco[]> => {
  try {
    const response = await api.get<PessoaEndereco[]>("/pessoa/enderecos", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar endereços", error);
    return [];
  }
};

// Função para salvar ou editar um endereço
const salvarOuEditarEndereco = async (enderecoDTO: EnderecoDTO): Promise<string | null> => {
  try {
    const response = await api.post<string>("/pessoa/endereco", enderecoDTO, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar ou editar o endereço", error);
    return null;
  }
};

// Exemplo de função para listar os endereços por ID, se necessário
const listarEnderecoPorId = async (id: number): Promise<EnderecoDTO | null> => {
  try {
    const response = await api.get<EnderecoDTO>(`/pessoa/enderecos/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar o endereço por ID", error);
    return null;
  }
};

// Serviço completo
const EnderecoService = {
  listarEnderecos,
  salvarOuEditarEndereco,
  listarEnderecoPorId,
};

export default EnderecoService;
