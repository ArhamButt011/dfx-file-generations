import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { TabProvider } from '@/context/TabContsxt'
import MyProvider from '@/components/MyProvider'
import { AuthProvider } from '@/context/AuthContext'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DXF File Generation',
  description: 'Efficiently generate DXF files with ease using our powerful tool for precise image processing and seamless integration. Perfect for designers and engineers looking for high-quality CAD outputs.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <MyProvider>
            <TabProvider>{children}</TabProvider>
          </MyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
