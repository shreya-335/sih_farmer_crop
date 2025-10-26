import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ModalProvider } from "@/components/providers/modal-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FarmGuard - Crop Damage Claims",
  description: "AI-powered crop damage assessment and claims management",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  )
}
