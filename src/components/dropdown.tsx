import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";

interface dropdownProps {
	setIdCondominio: React.Dispatch<React.SetStateAction<number>>;
	id_condominio: number;
	onDeleteSuccess: (id: number) => void;
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
	name: string;
    onEdit?: () => void;
}

const Dropdown = ({ setOpenDialog, setName, name, setIdCondominio, id_condominio, onDeleteSuccess, onEdit }: dropdownProps) => {

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
                        onClick={() => { if (onEdit) onEdit(); }}
                        className="text-sm flex items-center rounded-sm h-[25px] mb-[5px] p-[10px] cursor-pointer outline-none hover:bg-gray-100"
                    >
                        Editar
                        <div className="ml-auto pl-[20px]">
                            <MdEdit />
                        </div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
						onClick={() => {
							setOpenDialog(true);
							setName(name);
							setIdCondominio(id_condominio);
						}}
						className="text-sm text-red-500 flex items-center rounded-sm h-[30px] p-[10px] relative cursor-pointer outline-none hover:bg-gray-100"
					>
						Excluir <div className="ml-auto pl-[20px]"><BiTrash /></div>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Dropdown;