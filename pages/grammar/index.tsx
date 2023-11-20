import AuthLoading from "@/components/AuthLoading";
import DashboardLayout from "@/components/Layouts/Dashboard";
import { useAuth } from "@/utils/AuthContext"
import { useRouter } from "next/router";
import { Button, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toast } from "@/utils/Swal";
import Markdown from "@/components/Markdown";
import { ChatComponent } from "@/components/Chat";


export default function Chat() {
    const auth = useAuth();
    const router = useRouter()
    if (auth.isLoading == false && auth.userData == null) {
        router.push('/login')
        return false
    }
    if (auth.isLoading) return <AuthLoading />
    return <>
        <DashboardLayout title="Grammar Checker">
            <div className="mb-5 text-slate-700 dark:text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Grammar Checker</h1>
                        <p>Improve your confidence with good grammar</p>
                    </div>

                </div>
                <hr className="mt-3 border-dashed border-slate-400 dark:border-slate-600" />
                <Chats />
            </div>
        </DashboardLayout>
    </>
}
function Chats() {
    const [sentences, setSentences] = useState('');
    const [chats, setChats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth()

    async function onCorrect() {
        setChats(prev => [...prev, {
            role: 'user',
            content: sentences
        }])
        setSentences('')
        setIsLoading(true)
        const response = await fetch('/api/grammar', {
            method: 'POST',
            body: JSON.stringify({
                sentences: sentences,
                uid: auth.userData.uid
            })
        })
        if (response.status === 200) {
            const responseData = await response.json();
            setChats(prev => [...prev, responseData.choices[0].message])
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong'
            })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (chats.length > 0) {
            sessionStorage.setItem('grammar', JSON.stringify(chats))
        }
    }, [chats])
    useEffect(() => {
        const historyData = sessionStorage.getItem('grammar');
        if (historyData) {
            setChats(JSON.parse(historyData))
        } else {
            setChats([])
        }
    }, [])

    return <>
        <div className="my-10">
            {chats.map((chat, key) => {
                return (
                    <ChatComponent key={key} chat={chat} />
                )
            })}
            {
                isLoading ? (<>
                    <div className="mb-3 hover:bg-slate-100 py-3 px-1 rounded">
                        <div className={`mb-1 flex items-center gap-2 text-blue-500`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="capitalize font-semibold lg:text-lg text-base">
                                assistant
                            </p>
                        </div>
                        <div className="ml-[32px] animate-pulse h-5 rounded bg-slate-200 mb-2"></div>
                        <div className="ml-[32px] animate-pulse h-5 rounded bg-slate-200 w-[50%] mb-2"></div>
                        <div className="ml-[32px] animate-pulse h-5 rounded bg-slate-200 w-[20%] mb-2"></div>
                    </div>
                </>) : null
            }
            {
                chats.length == 0 ? (<>
                    <div className="h-[300px] flex justify-center items-center">
                        <div className="flex flex-col items-center text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="font-semibold">How can i help you today?</p>
                        </div>
                    </div>
                </>) : null
            }
        </div>
        <div className="w-full flex gap-3 items-center mb-5">
            <Textarea
                minRows={2}
                placeholder="Enter your sentences..."
                onValueChange={e => {
                    setSentences(e)
                }}
                value={sentences}
                isDisabled={isLoading}
            />
            <Button className="text-white h-[58px]" color="success" onPress={onCorrect} isDisabled={sentences == ''} isLoading={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            </Button>
        </div>
    </>
}
