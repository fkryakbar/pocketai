import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from '@/utils/AuthContext';
import { ThemeProvider } from 'next-themes';
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <ThemeProvider defaultTheme='dark' attribute='class'>
      <AuthProvider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </AuthProvider>
    </ThemeProvider>
  </>
}
