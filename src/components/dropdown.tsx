import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";

interface dropdownProps {
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
	name: string;
}

const Dropdown = ({ setOpenDialog, setName, name }: dropdownProps) => {

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild className="text-gray-500">
				<button className="IconButton">
					<SlOptionsVertical />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className="min-w-[120px] bg-white rounded-md p-[5px] border" sideOffset={5}>
					<DropdownMenu.Item className="text-sm flex items-center rounded-sm h-[30px] mb-[5px] p-[10px] relative cursor-pointer outline-none hover:bg-gray-100">
						Editar <div className="ml-auto pl-[20px]"><MdEdit /></div>
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onClick={() => {
							setOpenDialog(true);
							setName(name);
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