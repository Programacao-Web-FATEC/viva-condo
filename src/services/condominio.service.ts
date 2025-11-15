import { createClient } from "@/utils/supabase/client";
import { createAdminClient } from "@/utils/supabase/client";

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

export async function createCondominio(newCondominio:ICondominio) {
    try{

        const supabase = await createAdminClient();
        const {data, error} = await supabase.from('condominio').insert([newCondominio]).select()

        console.log('Condominio Criado com Sucesso:', data);
        return data;
    } catch(error){
        console.error("Erro ao criar Condominio", error);
            return null;

    }

}