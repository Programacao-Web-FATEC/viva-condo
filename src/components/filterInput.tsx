import { IconType } from "react-icons";

interface filterInputProps {
    placeholder: string;
    Icon: IconType;
    filtroTabela: string;
    setFiltroTabela: React.Dispatch<React.SetStateAction<string>>;
}

export function FilterTableInput({placeholder, Icon, filtroTabela, setFiltroTabela} : filterInputProps){
    return (
         <label htmlFor="filterTable" className="relative">
                {<Icon className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />}

                <input
                    type="text"
                    name="filterTable"
                    id="filterTable"
                    placeholder= {placeholder}
                    onChange={(e) => {setFiltroTabela(e.target.value.toLowerCase())}}
                    className="h-[40px] w-full pl-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </label>
    )
}