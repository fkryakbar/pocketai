import Link from "next/link";
import { signOutUser } from "@/utils/Authentication";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/AuthContext";
import ThemeToggler from "./ThemeToggler";

export default function SidebarMenu() {
    const router = useRouter()
    const { userData } = useAuth()
    return (
        <div className=" sticky top-0">
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <h1 className="text-4xl font-bold text-blue-500">
                        Pocket AI
                    </h1>
                </Link>
                <ThemeToggler />
            </div>
            <h3 className="font-semibold text-slate-600 dark:text-slate-300">{userData.name}</h3>
            <div className="flex flex-col gap-2 mt-5 pl-2">
                <Link href={'/assistant'}>
                    <div className={`p-2 rounded hover:dark:bg-slate-900 hover:bg-slate-100 font-bold flex gap-2 items-center ${router.isReady && router.asPath == '/assistant' ? 'dark:bg-slate-900 bg-slate-100' : null}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        Assistant
                    </div>
                </Link>
                <Link href={'/translate'}>
                    <div className={`p-2 rounded hover:dark:bg-slate-900 hover:bg-slate-100 font-bold flex gap-2 items-center ${router.isReady && router.asPath == '/translate' ? 'dark:bg-slate-900 bg-slate-100' : null}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                        </svg>
                        Translate
                    </div>
                </Link>
                <Link href={'/grammar'}>
                    <div className={`p-2 rounded hover:dark:bg-slate-900 hover:bg-slate-100 font-bold flex gap-2 items-center ${router.isReady && router.asPath == '/grammar' ? 'dark:bg-slate-900 bg-slate-100' : null}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Grammar Checker
                    </div>
                </Link>
                <Link href={'/rephrase'}>
                    <div className={`p-2 rounded hover:dark:bg-slate-900 hover:bg-slate-100 font-bold flex gap-2 items-center ${router.isReady && router.asPath == '/rephrase' ? 'dark:bg-slate-900 bg-slate-100' : null}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                        Rephrase
                    </div>
                </Link>
                <Link href={'/math'}>
                    <div className={`p-2 rounded hover:dark:bg-slate-900 hover:bg-slate-100 font-bold flex gap-2 items-center ${router.isReady && router.asPath == '/math' ? 'dark:bg-slate-900 bg-slate-100' : null}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                        </svg>
                        Math Solver
                    </div>
                </Link>
            </div>
            <div className="mt-5">
                <button onClick={e => { signOutUser(router) }} className="p-2 rounded hover:dark:bg-slate-900 hover:bg-slate-100 font-bold text-red-500 w-full text-left flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    )
}