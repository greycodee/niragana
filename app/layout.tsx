import { Inter } from 'next/font/google'
import './globals.css'

// app/layout.tsx
import {Providers} from "./providers";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='light'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}