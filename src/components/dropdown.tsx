import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { deleteCondominio } from "@/services/condominio.service";
import { toast } from "sonner";

interface DropdownProps {
    id_condominio: number;
	onDeleteSuccess: (id: number) => void;
}

const Dropdown = ({ id_condominio, onDeleteSuccess}: DropdownProps) => {
    
    const deleteCondominioFunc = async () => {
        try {
            await deleteCondominio(id_condominio);
            onDeleteSuccess(id_condominio);
            toast.success("Condomínio excluído com sucesso!");
        } catch (err) {
			console.log(err)
            toast.error("Erro ao excluir condomínio.");
        }
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton text-gray-500">
                    <SlOptionsVertical />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[120px] bg-white rounded-md p-[5px] border shadow"
                    sideOffset={5}
                >
                    <DropdownMenu.Item
                        className="text-sm flex items-center rounded-sm h-[25px] mb-[5px] p-[10px] cursor-pointer outline-none hover:bg-gray-100"
                    >
                        Editar
                        <div className="ml-auto pl-[20px]">
                            <MdEdit />
                        </div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="text-sm text-red-500 flex items-center rounded-sm h-[25px] p-[10px] cursor-pointer outline-none hover:bg-gray-100"
                        onClick={deleteCondominioFunc}
                    >
                        Excluir
                        <div className="ml-auto pl-[20px]">
                            <BiTrash />
                        </div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Dropdown;