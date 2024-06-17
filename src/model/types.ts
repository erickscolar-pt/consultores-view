export interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

export interface Projeto {
    id: number;
    nome: string;
    descricao: string;
    status: string;
    clienteId: number;
}

export interface Tarefa {
    id?: number;
    nome: string;
    descricao: string;
    status: string;
    projetoId: number;
    dataInicio?: string;
    dataFim?: string;
  }
  