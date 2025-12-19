import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Keyboard Fun - Learn Letters & Numbers",
  description: "Interactive keyboard learning app for toddlers",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any"
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml"
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
