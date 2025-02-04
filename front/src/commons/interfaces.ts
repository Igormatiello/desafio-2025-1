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

