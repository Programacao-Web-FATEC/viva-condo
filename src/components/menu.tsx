"use client"

import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"
import { BsHousesFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface SideBarProps {
    children: ReactNode
}

export function MenuSideBar({ children }: SideBarProps) {
    const supabase = createClient();
    const route = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setShowMenu(true);
          } else {
            setShowMenu(false);
          }
        };
        checkSession();
      }, [route]);

    const logOut = async () => {
        await supabase.auth.signOut();
    }

    return (
        <div className="flex min-h-screen">
            {showMenu ? (
                <aside className="flex flex-col w-[250px] border-r border-color-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-lg font-semibold text-gray-500">
                            Viva Condo
                        </span>
                    </div>
                    <nav className="mt-4 flex-1 text-gray-500">
                        <Link
                            key={"condominio"}
                            href={"/condominios"}
                            className="flex items-center px-4 py-2 rounded-lg text-lg hover:bg-blue-100 hover:text-blue-700"
                        >
                            <BsHousesFill size={20} />
                            <span className="ml-3">Condomínios</span>
                        </Link>
                        <Link
                            key={"usuarios"}
                            href={"/usuarios"}
                            className="flex items-center mt-3 px-4 py-2 rounded-md text-lg hover:bg-blue-100 hover:text-blue-700"
                        >
                            <FaUser size={20} />
                            <span className="ml-3">Usuários</span>
                        </Link>
                        <hr className="w-[90%] mt-3 bg-gray-500" />
                        <Link
                            key={"logout"}
                            href={"/"}
                            onClick={logOut}
                            className="flex items-center mt-3 px-4 py-2 rounded-md text-lg hover:bg-blue-100 hover:text-blue-700"
                        >
                            <BiLogOut size={20} />
                            <span className="ml-3">Sair</span>
                        </Link>
                    </nav>
                </aside>
            ) : (
                <div></div>
            )}
            <main className="flex-1 p-2">
                {children}
            </main>
        </div>
    )
}