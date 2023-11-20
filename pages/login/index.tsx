import { Gradient } from "@/components/GradientBackgroud";
import HomeLayout from "@/components/Layouts/Home";
import { useAuth } from "@/utils/AuthContext";
import { sigInUser } from "@/utils/Authentication";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const auth = useAuth()

    async function onSignUp() {
        setIsLoading(true);
        await sigInUser(email, password);
        setIsLoading(false);
    }

    if (auth.isLoading == false && auth.userData) {
        router.push('/assistant')
    }
    return <>
        <HomeLayout title="Login">
            <div className="flex h-screen justify-center items-center">
                <div className="lg:w-[350px] w-full mx-5 bg-white shadow-md rounded-lg p-5 dark:bg-slate-900">
                    <Link href="/">
                        <h1 className='text-3xl font-bold text-blue-500'>
                            Pocket AI
                        </h1>
                    </Link>
                    <div className="mt-5 flex items-center gap-3">
                        <p className="font-bold text-lg">Login</p>
                        {
                            auth.isLoading ? (
                                <>
                                    <Spinner color="default" size="sm" />
                                </>
                            ) : null
                        }
                    </div>
                    <p className="mt-2  text-sm">To continue to <b>Pocket AI</b></p>

                    <form className="mt-5" onSubmit={e => {
                        e.preventDefault()
                    }} >
                        <Input type="email" label="Email" isDisabled={isLoading} onValueChange={e => {
                            setEmail(e)
                        }} />
                        <Input type="password" label="Password" isDisabled={isLoading} className="mt-3" onValueChange={e => {
                            setPassword(e)
                        }} />
                        <div className="form-control w-full max-w-xs mt-3">
                            <Button elementType={'button'} className="w-full bg-blue-500 text-white hover:bg-blue-700 font-semibold" type="submit" onPress={onSignUp} isLoading={isLoading}>
                                Login
                            </Button>
                        </div>
                    </form>
                    {/* <p className="my-3 text-center text-sm">Don&apos;t have any account? Click <Link className="text-green-400" href="/register">here</Link> to register</p> */}
                </div>
            </div>
        </HomeLayout>
    </>
}