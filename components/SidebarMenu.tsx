import Link from "next/link";
import { signOutUser } from "@/utils/Authentication";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/AuthContext";

export default function SidebarMenu() {
    const router = useRouter()
    const { userData } = useAuth()
    return (
        <>
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <h1 className="text-4xl font-bold text-blue-500">
                        Pocket AI
                    </h1>
                </Link>
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
        </>
    )
}