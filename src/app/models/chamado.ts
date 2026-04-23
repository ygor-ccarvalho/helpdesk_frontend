export interface Chamado{
    id?: number;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: string;
    status: string;
    titulo: string;
    descricao: string;
    tecnico: number;
    cliente: number;
    nomeCliente: string;
    nomeTecnico: string;
}