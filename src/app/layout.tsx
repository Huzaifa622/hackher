import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import {Toaster} from "react-hot-toast"

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hack Her',
  description: 'Hack her',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} example bg-[#f7f8f9] text-black`}>{children} <Toaster/> </body>
    </html>
  )
}
