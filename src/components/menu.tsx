"use client"

import Link from "next/link"
import { ElementType, ReactNode, useEffect, useState } from "react"
import { BsHousesFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

interface SideBarProps {
    children: ReactNode
}

interface SideBarItems {
    label: string;
    href: string;
    icon: ElementType<{
        className?: string;
    }>;
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
            icon: BsHousesFill
        },
        {
            label: 'Usuários',
            href: '/usuarios',
            icon: FaUser
        }
    ]

    const logOut = async () => {
        await supabase.auth.signOut();
    }

    return (
        <div className="flex min-h-screen">
            {showMenu ? (
                <aside className="flex flex-col w-[250px] bg-[#0b3e3e] border-r border-white/10">
                    <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                        <div className="w-12 h-12 rounded-full bg-[#0F4C4C] flex items-center justify-center ring-2 ring-white/10">
                            <img src="/Viva Condo Logo 2.png" alt="logo" className="w-8 h-8 rounded-full" />
                        </div>
                        <div>
                            <span className="text-lg font-bold text-white">Viva Condo</span>
                            <div className="text-sm text-white/70">Gestão simplificada</div>
                        </div>
                    </div>
                    <nav className="flex-1 text-white/90 px-2">
                        {routes.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center mx-2 my-2 px-4 py-3 rounded-md text-base transition-colors duration-150 ${item.href === route ? 'bg-[#0F4C4C] text-white shadow-md' : 'text-white/80 hover:bg-white/5 hover:text-white'}`}
                            >
                                {<item.icon size={20} className="text-current" />}
                                <span className="ml-3 font-medium">{item.label}</span>
                            </Link>
                        ))}
                        <hr className="my-3 border-white/10" />
                        <Link
                            key={"logout"}
                            href={"/"}
                            onClick={logOut}
                            className="flex items-center mx-2 mt-3 px-4 py-3 rounded-md text-base text-white/80 hover:bg-white/5"
                        >
                            <BiLogOut size={20} />
                            <span className="ml-3">Sair</span>
                        </Link>
                    </nav>
                </aside>
            ) : (
                <div/>
            )}
            <main className="flex-1 p-2">
                {children}
            </main>
        </div>
    )
}