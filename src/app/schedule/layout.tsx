import { Providers } from '@/app/schedule/provider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Calendar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Providers>{children}</Providers>
}
