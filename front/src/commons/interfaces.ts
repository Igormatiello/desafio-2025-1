export interface IUserSignup {
  displayName: string;
  username: string;
  password: string;
  email: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}


export interface ICriarPessoaDTO {
  username: string;
  password: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  tipo: string;
  ativo: boolean;
}

export interface ICurso {
  id: number;
  nome: string;
  assunto: string;
  encontros: number;
  status: string;
}

export interface IEstudanteCurso {
  id: number;
  estudante: IPessoa;
  curso: ICurso;
}

// Interface para ProfessorCurso
export interface IProfessorCurso {
  id: number;
  professor: IPessoa;
  curso: ICurso;
}

// Interface para Pessoa
export interface IPessoa {
  id: number;
  cpf: string;
  ativo: boolean;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
}

export interface EnderecoDTO {
  id?: number; // O id pode ser opcional no front-end, caso esteja sendo gerado automaticamente no back-end
  cidade: string;
  cep: string;
  rua: string;
  numero: number;
}

export interface PessoaEndereco{
  endereco: EnderecoDTO;
  pessoa: IPessoa;
}

export interface ICursoAula {
  id: number;
  cursoId: number;
  titulo: string;
  descricao?: string;
  data: string; // Mantemos como string no formato "YYYY-MM-DD"
}


export interface ICursoPresenca {
  id: number;
  estudanteId: number;
  aulaId: number;
  presente: boolean;
  dataRegistro: string; // formato ISO 8601
}

export interface IEstudanteCurso {
  id: number;
  estudanteId: number;
  cursoId: number;
  dataInicio: string;
  dataFim?: string; // pode ser undefined se o curso ainda estiver em andamento
  status: "ativo" | "concluido" | "cancelado";
}

