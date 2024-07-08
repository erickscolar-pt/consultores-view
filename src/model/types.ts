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
    clienteNome: string;
}

export interface Tarefa {
    id?: number;
    nome: string;
    descricao: string;
    status: string;
    projetoId: number;
    clienteNome?: string;
    dataInicio?: string;
    dataFim?: string;
}

export interface AddressZipCode {
    city:string;
    cityId:string;
    complement:string;
    district:string;
    districtId:string;
    ibgeId:string;
    state:string;
    stateIbgeId:any;
    stateShortname:string;
    street:string;
    zipcode:string;
}
