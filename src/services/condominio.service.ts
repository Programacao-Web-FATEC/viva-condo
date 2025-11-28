import { createClient } from "@/utils/supabase/client";

export interface ICondominio {
    id_condominio: number;
    id_administradora: number;
    nome_condominio: string;
    endereco_condominio: string;
    cidade_condominio: string;
    uf_condominio: string;
    tipo_condominio: string;
    created_at: string
}

export interface TableCondominio {
    error: string;
    success: boolean;
    count: number;
    data: ICondominio[];
}

export async function getCondominios() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("condominio").select("*").order("id_condominio");

    if (error) throw new Error(error.message);
    return data ?? [];    
}

export async function deleteCondominio(id:number) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("condominio").delete().eq('id_condominio',id)

    if (error) throw new Error(error.message);
    return data ?? [];    

}

export async function createCondominio(payload: Omit<ICondominio, 'id_condominio' | 'created_at'>) {
    const supabase = await createClient();
    const { data, error } = await supabase.from('condominio').insert([payload]).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export async function updateCondominio(id:number, payload: Partial<ICondominio>) {
    const supabase = await createClient();
    const { data, error } = await supabase.from('condominio').update(payload).eq('id_condominio', id).select().single();
    if (error) throw new Error(error.message);
    return data;
}