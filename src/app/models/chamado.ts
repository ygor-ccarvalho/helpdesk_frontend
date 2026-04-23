export interface Chamado{
    id?: number;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: number;
    status: number;
    titulo: string;
    descricao: string;
    tecnico: number;
    cliente: number;
    nomeCliente: string;
    nomeTecnico: string;
}