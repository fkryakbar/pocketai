import { Gradient } from "@/components/GradientBackgroud";
import { Button } from "@nextui-org/react";
import HomeLayout from "@/components/Layouts/Home";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  return (
    <>
      <HomeLayout title="Pocket AI">
        <div className="flex h-screen justify-center items-center">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-blue-500 font-bold text-6xl text-center">
              Pocket AI
            </h1>
            <h4 className="mt-1 text-lg font-semibold text-slate-600 text-center">
              Intelligence That Fits in Your Pocket.
            </h4>
            <div className="mt-3 flex gap-3 items-center">
              <Button className="bg-blue-500 font-bold text-white" size="lg" radius="sm" onClick={e => {
                router.push('/login')
              }}>
                <Link href={'/login'}>
                  Get Started
                </Link>
              </Button>
              <Button className="font-bold bg-white text-slate-600 border-[1px]" size="lg" radius="sm" onClick={e => {
                router.push('/about')
              }}>
                <Link href={'/about'}>
                  About
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </HomeLayout>

    </>
  )
}
