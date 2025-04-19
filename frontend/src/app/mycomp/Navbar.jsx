"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? "text-pink-400" : "text-white hover:text-pink-400 transition";
  };

  return (
    <header className="bg-black/30 backdrop-blur-sm py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-pink-500">
          SnapTix
        </Link>
        <nav className="space-x-6">
          <Link
            href="/events"
            className={isActive("/events")}
          >
            Events
          </Link>
          <Link 
            href="/discover" 
            className={isActive("/discover")}
          >
            Discover
          </Link>
          <Link
            href="/my-tickets"
            className={isActive("/my-tickets")}
          >
            My Tickets
          </Link>
          <Link
            href="/ai-assistant"
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg text-white transition"
          >
            AI Assistant
          </Link>
        </nav>
      </div>
    </header>
  );
}