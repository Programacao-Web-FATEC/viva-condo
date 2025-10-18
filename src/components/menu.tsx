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

interface SideBarItems {
    label: string;
    href: string;
    icon: ReactNode;
}

export function MenuSideBar({ children }: SideBarProps) {
    const supabase = createClient();
    const route = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          console.log(route);
          if (session?.user) {
            setShowMenu(true);
          } else {
            setShowMenu(false);
          }
        };
        checkSession();
    }, [route]);

    const routes: SideBarItems[] = [
        {
            label: 'Condomínios',
            href: '/condominios',
            icon: <BsHousesFill size={20} />
        },
        {
            label: 'Usuários',
            href: '/usuarios',
            icon: <FaUser size={20} />
        }
    ]

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
                    <nav className="flex-1 text-gray-500">
                        {routes.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`${item.href === route ? `bg-blue-100 text-blue-700` : `` } flex items-center mb-3 px-4 py-2 rounded-md  text-lg hover:bg-blue-100 hover:text-blue-700`}
                            >
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                            </Link>
                        ))}
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