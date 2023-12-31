import Home from "@/components/Layouts/Home";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "next/link";

export default function About() {
    return (
        <Home title="About">
            <div className="h-screen flex justify-center items-center dark:text-white">
                <div className="lg:w-[350px] w-full mx-5 bg-white shadow-md rounded-lg p-5 dark:bg-slate-900">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <h1 className='text-3xl font-bold text-blue-500'>
                                Pocket AI
                            </h1>
                        </Link>
                        <ThemeToggler />
                    </div>
                    <div className="mt-5">
                        <h1 className="font-bold text-xl">
                            About
                        </h1>
                        <p className="text-gray-500 text-sm mt-2 dark:text-white">Something about <b>Pocket AI</b></p>
                        <p className="mt-4 text-sm text-gray-500 dark:text-white">
                            Pocket AI is an application that contains tools already integrated with AI. These tools include an assistant, translator, grammar corrector, and math solver. These tools are designed to be simple and easy to access directly from your pocket.
                        </p>
                        <p className="mt-4 text-sm text-gray-500 dark:text-white">
                            I developed this stuff just for personal use. I use this stuff for productivity purposes
                        </p>
                        <p className="mt-4 text-sm text-gray-500 font-semibold dark:text-white">
                            -fkryakbar
                        </p>
                    </div>
                </div>
            </div>
        </Home>
    )
}