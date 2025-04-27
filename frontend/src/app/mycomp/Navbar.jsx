"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return pathname === path ? "text-pink-400" : "text-white hover:text-pink-400 transition";
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="bg-black/30 backdrop-blur-sm py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        <Link href="/" className="text-3xl font-bold text-pink-500 ">
          SnapTix
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/events" className={isActive("/events")}>
            Events
          </Link>
          <Link href="/discover" className={isActive("/discover")}>
            Discover
          </Link>
          <Link href="/my-tickets" className={isActive("/my-tickets")}>
            My Tickets
          </Link>
          <Link href="/ai-assistant" className={isActive("/ai-assistant")}>
            AI Assistant
          </Link>
          
          {!loading && (
            <>
              {user ? (
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-2 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center overflow-hidden">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName || user.email} 
                          className="w-8 h-8 object-cover"
                        />
                      ) : (
                        <span className="text-white font-medium">
                          {(user.displayName || user.email || "User").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 truncate">
                        {user.displayName || user.email}
                      </div>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/login" 
                    className="text-white hover:text-pink-400 transition"
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 space-y-2">
          <Link 
            href="/events" 
            className="block py-2 px-4 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          <Link 
            href="/discover" 
            className="block py-2 px-4 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Discover
          </Link>
          <Link 
            href="/my-tickets" 
            className="block py-2 px-4 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            My Tickets
          </Link>
          <Link 
            href="/ai-assistant" 
            className="block py-2 px-4 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            AI Assistant
          </Link>
          
          {!loading && (
            <>
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-300 border-t border-gray-700 flex items-center">
                    {user.photoURL && (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || user.email} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    )}
                    <span className="truncate">{user.displayName || user.email}</span>
                  </div>
                  <Link 
                    href="/profile" 
                    className="block py-2 px-4 hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-4 hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4 py-2 border-t border-gray-700">
                  <Link 
                    href="/login" 
                    className="block py-2 hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </nav>
      )}
    </header>
  );
}