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
        <DashboardLayout title="Rephrase">
            <div className="mb-5 text-slate-700 dark:text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Rephrase</h1>
                        <p>Find New Ways to Say What Matters.</p>
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rephrase`, {
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
            sessionStorage.setItem('rephrase', JSON.stringify(chats))
        }
    }, [chats])
    useEffect(() => {
        const historyData = sessionStorage.getItem('rephrase');
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
                    <ChatLoading />
                </>) : null
            }
            {
                chats.length == 0 ? (<>
                    <div className="h-[300px] flex justify-center items-center">
                        <div className="flex flex-col items-center text-slate-700 dark:text-slate-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
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

