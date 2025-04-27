// app/layout.js

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './mycomp/Navbar';
import { AuthProvider } from '../context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // ensures the font is swapped while loading
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'SnapTix - Event Discovery Platform',
  description: 'Discover and book tickets for exciting events',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
