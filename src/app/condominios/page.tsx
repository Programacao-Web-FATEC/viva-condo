"use client"

import { useEffect, useState } from "react"
import { TableCondominio } from "@/services/condominio.service";
import { FilterTableInput } from "@/components/filterInput";
import { FaSearch } from "react-icons/fa";
import Dropdown from "@/components/dropdown";
import CondominioModal from "@/components/condominioModal";
import ConfirmDialog from "@/components/confirmDialog";

export default function ListaCondominios() {
    const [condominios, setCondominios] = useState<TableCondominio>();
    const [filtroTabela, setFiltroTabela] = useState("");
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState("");
    const [idCondominio, setIdCondominio] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<any | null>(null);

    const tabelaFiltrada = condominios?.data.filter((value) => {
        return value.nome_condominio.toLowerCase().includes(filtroTabela) ||
        value.endereco_condominio.toLowerCase().includes(filtroTabela) ||
        value.cidade_condominio.toLowerCase().includes(filtroTabela) ||
        value.uf_condominio.toLowerCase().includes(filtroTabela) ||
        value.tipo_condominio.toLowerCase().includes(filtroTabela)
    })

    const removerItemLocal = (id: number) => {
    setCondominios((prev) => {
        if (!prev) return prev;
        return {
            ...prev,
            data: prev.data.filter((c) => c.id_condominio !== id),
            count: prev.count - 1
        };
    });
};
    useEffect(() => {
        const buscarCondominios = async () => {
            try {
                const response = await fetch("/api/condominios", { cache: "no-store" });
                const { data, success, count, error } = await response.json();
                console.log(data);
                setCondominios({ data, success, count, error});
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        buscarCondominios();
    }, []);

    return (
        <div className="px-6 py-4 max-w-full">
            <div className="mb-2">
                <div>
                    <h1 className="text-2xl font-semibold">Condomínios</h1>
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex-1 flex items-center">
                    <FilterTableInput 
                        placeholder={"Pesquisar condomínios"} 
                        Icon={FaSearch}
                        filtroTabela={filtroTabela} 
                        setFiltroTabela={setFiltroTabela}
                    />
                </div>
                <div>
                    <button onClick={() => { setEditing(null); setModalOpen(true); }} className="bg-[#0F4C4C] text-white px-4 py-2 rounded-md shadow-sm hover:brightness-95">
                        Novo condomínio
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto max-h-[85vh] overflow-y-auto relative">
                <table className="w-full table-fixed divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-20">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">
                                #
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Nome
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Endereço
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-40">
                                Cidade
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">
                                UF
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-32">
                                Tipo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-20">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-4 py-8 text-center text-lg text-gray-700" colSpan={7}>
                                    Carregando condomínios ...
                                </td>
                            </tr>
                        </tbody>
                    ) : condominios?.error ? (
                        <tbody className="divide-y divide-gray-200 bg-red-50">
                            <tr>
                                <td className="px-4 py-6 text-center text-lg text-red-700" colSpan={7}>
                                    Erro: {condominios?.error}
                                </td> 
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {tabelaFiltrada?.length == 0 ? (
                                <tr>
                                    <td className="px-4 py-6 text-lg text-gray-700" colSpan={7}>
                                        Nenhum condomínio encontrado.
                                    </td> 
                                </tr>
                            ) : (
                                tabelaFiltrada?.map((condominio, index) => (
                                    <tr key={condominio.id_condominio} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {String(index + 1)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-medium max-w-[260px] truncate">
                                            {condominio.nome_condominio}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 max-w-[420px] truncate">
                                            {condominio.endereco_condominio}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-40">
                                            {condominio.cidade_condominio}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-12">
                                            {condominio.uf_condominio}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-32">
                                            {condominio.tipo_condominio}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-black w-20">
                                            <Dropdown 
                                                setOpenDialog={setOpenDialog} 
                                                setName={setName} 
                                                name={condominio.nome_condominio} 
                                                setIdCondominio={setIdCondominio}
                                                id_condominio={condominio.id_condominio}
                                                onDeleteSuccess={removerItemLocal}
                                                onEdit={() => { setEditing(condominio); setModalOpen(true); }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    )}
                </table>
                </div>
            </div>
            <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} name={name} id_condominio={idCondominio} onDeleteSuccess={removerItemLocal} />
            <CondominioModal open={modalOpen} setOpen={setModalOpen} initial={editing ?? undefined} onSuccess={(item) => {
                if (!item) return;
                setCondominios((prev) => {
                     if (!prev) return prev;
                    const exists = prev.data.find((d) => d.id_condominio === (item as any).id_condominio);
                    if (exists) {
                        return { ...prev, data: prev.data.map((d) => d.id_condominio === (item as any).id_condominio ? (item as any) : d) };
                    }
                    return { ...prev, data: [item as any, ...prev.data], count: prev.count + 1 };
                });
            }} />
        </div>
    )
}