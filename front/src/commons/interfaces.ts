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

