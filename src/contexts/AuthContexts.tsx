import { createContext, ReactNode } from 'react';
import { api } from '../services/apiClient';
import { Cliente, Projeto, Tarefa } from '@/model/types';

type AuthContextData = {
  getClientes: () => Promise<Cliente[]>;
  getProjetos: () => Promise<Projeto[]>;
  getTarefas: () => Promise<Tarefa[]>;
  createTarefa: (tarefa: Tarefa) => Promise<Tarefa>;
  updateTarefa: (tarefa: Tarefa) => Promise<Tarefa>;
  updateProjetoStatus: (id: number, projeto: Projeto) => Promise<Projeto>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContexts = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  async function getClientes() {
    const response = await api.get('/clientes');
    return response.data as Cliente[];
  }

  async function getProjetos() {
    const response = await api.get('/projetos');
    return response.data as Projeto[];
  }

  async function getTarefas() {
    const response = await api.get('/atividades');
    return response.data as Tarefa[];
  }

  async function createTarefa(tarefa: Tarefa) {
    const response = await api.post('/atividades', tarefa);
    return response.data as Tarefa;
  }

  async function updateTarefa(tarefa: Tarefa) {
    const response = await api.put(`/atividades/${tarefa.id}`, tarefa);
    return response.data as Tarefa;
  }

  async function updateProjetoStatus(id: number, projeto: Projeto) {
    const response = await api.put(`/projetos/${id}/status`, projeto);
    return response.data as Projeto;
  }

  return (
    <AuthContexts.Provider value={{ getClientes, getProjetos, getTarefas, createTarefa, updateTarefa, updateProjetoStatus }}>
      {children}
    </AuthContexts.Provider>
  );
}
