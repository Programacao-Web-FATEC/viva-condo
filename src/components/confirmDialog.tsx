import * as React from "react";
import { AlertDialog } from "radix-ui";
import { GoAlert, GoAlertFill } from "react-icons/go";

interface dialogProps {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
}

const ConfirmDialog = ({ openDialog, setOpenDialog, name }: dialogProps) => (
	<AlertDialog.Root onOpenChange={setOpenDialog} open={openDialog}>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
			<AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[60vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow text-center">
				<div className="rounded-[100%] w-16 h-16 bg-red-600 mb-2 pb-1 flex justify-center items-center mx-auto">
                    <GoAlert className="text-white" size={36} />
                </div>
                <AlertDialog.Title className="m-0 text-[17px] font-medium">
					Excluir Condomínio
				</AlertDialog.Title>
				<AlertDialog.Description className="mb-2 mt-[15px] text-[15px] leading-normal">
					Tem certeza que seja excluir o condomínio {name}?
				</AlertDialog.Description>
                <AlertDialog.Description  className="mb-5 mt-[5px] text-[15px] leading-normal text-red-600">
                    Todos os moradores vinculados a este condomínio também serão excluídos. Está ação não poderá ser desfeita.
                </AlertDialog.Description>
				<div className="flex justify-center gap-[10px]">
					<AlertDialog.Cancel asChild>
						<button className="inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] border border-color-black font-medium leading-none outline-none outline-offset-1 select-none">
							Cancelar
						</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className="inline-flex h-[35px] w-full items-center justify-center rounded bg-red-500 px-[15px] font-medium leading-none text-white outline-none outline-offset-1 hover:bg-red-400 select-none">
							Excluir
						</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default ConfirmDialog;
