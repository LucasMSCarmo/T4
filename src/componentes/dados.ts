export type Endereco = {
    id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
}

export type Telefone = {
    id: number;
    ddd: string;
    numero: string;
}

export type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    email: string | null;
    endereco: Endereco;
    telefones: Telefone[];
}

export type Pet = { id: number; nome: string; tipo: string; raca: string; genero: string; }
export type Produto = { id: number; nome: string; preco: number; tipo: string; }
export type Servico = { id: number; nome: string; preco: number; tipo: string; }

export const produtos: Produto[] = [];
export const servicos: Servico[] = [];