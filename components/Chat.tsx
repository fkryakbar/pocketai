import { Button } from "@nextui-org/react";
import { useState } from "react";
import Markdown from "./Markdown";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
// import MarkdownIt from 'markdown-it';
// import markdownItKatex from 'markdown-it-katex';


// const md = new MarkdownIt();
// md.use(markdownItKatex);

export function ChatComponent({ chat, isMathAnswer = false }: { chat: any, isMathAnswer?: boolean }) {
    // const result = md.render(chat.content);

    const [isPressed, setIsPressed] = useState(false)

    const copyToClipboard = async () => {
        setIsPressed(true)
        await navigator.clipboard.writeText(chat.content);
    };
    return <>
        <div className="mb-3 hover:bg-slate-100 dark:hover:bg-slate-900 py-3 px-2 rounded hover:cursor-pointer">
            <div className={`mb-1 flex items-center gap-2 ${chat.role == 'assistant' ? 'text-blue-500' : null}`}>
                {
                    chat.role == 'assistant' ? (<>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </>) : null
                }
                {
                    chat.role == 'user' ? (<>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </>) : null
                }
                <div className="flex justify-between flex-grow">
                    <p className="capitalize font-semibold lg:text-lg text-base">
                        {chat.role}
                    </p>
                    <Button className="text-slate-500 bg-transparent text-xs" size={'sm'} onPress={copyToClipboard}>
                        {
                            isPressed ? (<>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>

                            </>) : (<>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                </svg>
                            </>)
                        }
                    </Button>
                </div>
            </div>
            <div className="ml-[32px] prose dark:prose-invert prose-sm prose-p:mt-0 prose-p:mb-3 prose-p:text-xs lg:prose-p:text-sm max-w-none">
                {
                    isMathAnswer ? (<>
                        {/* <div dangerouslySetInnerHTML={{ __html: result }}></div> */}
                        <Latex>
                            {chat.content}
                        </Latex>
                    </>) : (<>
                        <Markdown>
                            {chat.content}
                        </Markdown>

                    </>)
                }
            </div>
        </div>
    </>
}