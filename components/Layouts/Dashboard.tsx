import Head from "next/head";
import { ReactNode, useState } from "react";
import { signOutUser } from "@/utils/Authentication";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NextLink, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import SidebarMenu from "../SidebarMenu";

export default function Layout({ children, title }: { children: ReactNode, title: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()
    return <>
        <Head>
            <title>{title}</title>
            <meta name="description" content='Intelligence That Fits in Your Pocket' />
        </Head>
        <Navbar className="lg:hidden" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <h1 className="text-2xl font-bold text-blue-500">
                        Pocket AI
                    </h1>
                </NavbarBrand>
            </NavbarContent>
            <NavbarMenu>
                <SidebarMenu />
            </NavbarMenu>
        </Navbar>
        <div className="lg:flex gap-5 lg:w-[70%] w-[100%] lg:mx-auto lg:mt-20 px-5">
            <div className="lg:basis-[20%] lg:block hidden relative">
                <SidebarMenu />
            </div>
            <div className="lg:basis-[80%] basis-[100%] flex flex-col">
                {children}
            </div>
        </div>

    </>
}