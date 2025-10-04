"use client"

import { useEffect, useState } from "react"
import { TableCondominio } from "@/services/condominio.service";
import { MdEdit } from "react-icons/md";

export default function ListaCondominios() {
    const [condominios, setCondominios] = useState<TableCondominio>();
    const [loading, setLoading] = useState(true);

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
        <div className="p-6 max-w-full">
            <div className="mb-4 flex items-center justify-between gap-4">
                <h1 className="text-xl font-semibold">Condomínios</h1>
            </div>

            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
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
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Cidade
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                UF
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Tipo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-4 py-3 text-center text-lg text-gray-700" colSpan={7}>
                                    Carregando condomínios ...
                                </td>
                            </tr>
                        </tbody>
                    ) : condominios?.error ? (
                        <tbody className="divide-y divide-gray-200 bg-red-200">
                            <tr>
                                <td className="px-4 py-3 text-center text-lg text-red-700" colSpan={7}>
                                    Erro: {condominios?.error}
                                </td> 
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {condominios?.count == 0 ? (
                                <tr>
                                    <td className="px-4 py-3 text-lg text-gray-700" colSpan={7}>
                                        Nenhum condomínio encontrado.
                                    </td> 
                                </tr>
                            ) : (
                                condominios?.data.map((condominio, index) => (
                                    <tr key={condominio.id_condominio} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {String(index + 1)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {condominio.nome_condominio}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {condominio.endereco_condominio}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {condominio.cidade_condominio}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {condominio.uf_condominio}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {condominio.tipo_condominio}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-black">
                                            <button
                                                type="button"
                                                onClick={() => console.log(condominio.id_condominio)}
                                            >
                                                <MdEdit />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}