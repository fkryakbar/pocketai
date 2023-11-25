import AuthLoading from "@/components/AuthLoading";
import DashboardLayout from "@/components/Layouts/Dashboard";
import { useAuth } from "@/utils/AuthContext"
import { useRouter } from "next/router";
import { Button, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toast } from "@/utils/Swal";
import { ChatComponent } from "@/components/Chat";
import Cookies from 'js-cookie';
import ChatLoading from "@/components/ChatLoading";

export default function Chat() {
    const auth = useAuth();
    const router = useRouter()
    if (auth.isLoading == false && auth.userData == null) {
        router.push('/login')
        return false
    }
    if (auth.isLoading) return <AuthLoading />
    return <>
        <DashboardLayout title="Math Solver">
            <div className="mb-5 text-slate-700 dark:text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Math Solver</h1>
                        <p>Where Every Problem Finds an Answer.</p>
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

    async function onCorrect() {
        setChats(prev => [...prev, {
            role: 'user',
            content: sentences
        }])
        setSentences('')
        setIsLoading(true)
        const formData = new FormData();
        formData.set('sentences', sentences)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/math`, {
            method: 'POST',
            body: formData,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${Cookies.get('token_session')}`
            }
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
            sessionStorage.setItem('math', JSON.stringify(chats))
        }
    }, [chats])
    useEffect(() => {
        const historyData = sessionStorage.getItem('math');
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
                    <ChatComponent isMathAnswer={true} key={key} chat={chat} />
                )
            })}
            {
                isLoading ? (<>
                    <ChatLoading />
                </>) : null
            }
            {
                chats.length == 0 ? (<>
                    <div className="h-[300px] flex justify-center items-center">
                        <div className="flex flex-col items-center text-slate-700 dark:text-slate-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                            </svg>
                            <p className="font-semibold">How can i help you today?</p>
                        </div>
                    </div>
                </>) : null
            }
        </div>
        <div className="w-full flex gap-3 items-center">
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

