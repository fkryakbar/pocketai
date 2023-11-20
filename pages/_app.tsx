import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from '@/utils/AuthContext';
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <AuthProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </AuthProvider>
  </>
}
