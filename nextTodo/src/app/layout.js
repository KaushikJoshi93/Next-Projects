import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/providers/Provider'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextNotes || A next level notes app',
  description: 'A Modern next level notes app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " w-screen min-h-screen flex flex-col overflow-x-hidden"}>
        <Provider>
          <main className='flex-grow flex flex-col overflow-x-hidden'>
            <Navbar />
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
