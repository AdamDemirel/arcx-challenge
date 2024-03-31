import type { Metadata } from "next"
import { Inter } from "next/font/google"

// import 'react-calendar/dist/Calendar.css'
import "./styles/globals.css"

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Adams ARCx challenge",
  description: "Adams solution for the ARCx challenge",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
