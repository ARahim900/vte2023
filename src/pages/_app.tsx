import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '@/components/Navigation'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
