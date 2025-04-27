// app/layout.js

import { Inter } from 'next/font/google'; // Using Google font Inter
import './globals.css';
import Navbar from './mycomp/Navbar';
import { AuthProvider } from '../context/AuthContext';
import Footer from './mycomp/home/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

// Inter font initialized
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'SnapTix - Event Discovery Platform',
  description: 'Discover and book tickets for exciting events',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-black">
        <AuthProvider>
          <Navbar />

          <ProtectedRoute>
            <PageTransition>
              {children}
            </PageTransition>
          </ProtectedRoute>

          <Footer />

          <Toaster position="top-center" toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid rgba(236, 72, 153, 0.3)'
            },
            success: {
              iconTheme: {
                primary: '#EC4899',
                secondary: '#fff'
              }
            }
          }} />
        </AuthProvider>
      </body>
    </html>
  );
}
