export default function ChatLoading() {
    return <>
        <div className="mb-3 hover:bg-slate-100 dark:hover:bg-slate-900 py-3 px-2 rounded">
            <div className={`mb-1 flex items-center gap-2 text-blue-500`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="capitalize font-semibold lg:text-lg text-base">
                    assistant
                </p>
            </div>
            <div className="ml-[32px] animate-pulse h-5 rounded bg-slate-200 dark:bg-slate-800 mb-2"></div>
            <div className="ml-[32px] animate-pulse h-5 rounded bg-slate-200 dark:bg-slate-800 w-[50%] mb-2"></div>
            <div className="ml-[32px] animate-pulse h-5 rounded bg-slate-200 dark:bg-slate-800 w-[20%] mb-2"></div>
        </div>
    </>
}