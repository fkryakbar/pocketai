import Head from "next/head";
import { Gradient } from "../GradientBackgroud";
import { ReactNode } from "react";

export default function Layout({ children, title }: { children: ReactNode, title: string }) {
    return <>
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content='Intelligence That Fits in Your Pocket' />
            </Head>
            <Gradient />
            {children}
        </>
    </>
}