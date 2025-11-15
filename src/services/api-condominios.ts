import { createCondominio } from "./condominio.service";

export interface ICondominio {
    id_condominio: string;
    nome_condominio: string;
    endereco_condominio: string;
    cidade_condominio: string;
    uf_condominio: string;
    tipo_condominio: string;
    created_at: string;
    id_cliente: number;
}

export const getCondominios = async () => {
    const response = await fetch('http://raw.githubusercontent.com/vagner107/viva-condo/refs/heads/main/src/app/condominios/api_condominio.json');

    return await response.json();
}



