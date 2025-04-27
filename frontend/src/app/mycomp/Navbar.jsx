"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // We'll initialize this state only on the client side to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    setIsMounted(true); // Mark component as mounted on client
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navItems = [
    { path: "/events", label: "Events" },
    { path: "/discover", label: "Discover" },
    { path: "/my-tickets", label: "My Tickets" },
  ];

  // Only calculate classes on the client side after mounting
  const headerClasses = isMounted
    ? `fixed w-full h-6 py-1 bg-transparent z-50 transition-all duration-300 ${
        scrolled ? " backdrop-blur-sm py-3 shadow-lg" : "bg-transparent "
      }`
    : "fixed w-full h-6 py-1 bg-transparent z-50"; // Default class for server-side rendering

  return (
    <header className={headerClasses}>
      <div className="max-w-[90vw] text-lg mx-auto px-4 flex items-center justify-between pt-4 ">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              SnapTix
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-medium text-base transition-colors duration-300 ${
                pathname === item.path
                  ? "text-pink-500"
                  : "text-gray-300 hover:text-pink-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <Link
            href="/ai-assistant"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 py-2 rounded-lg text-white shadow-md hover:shadow-pink-500/30 transition-all duration-300"
          >
            AI Assistant
          </Link>

          {/* Authentication */}
          {!user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 py-2 rounded-lg text-white shadow-md hover:shadow-pink-500/30 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative flex items-center">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
                aria-label="Open user menu"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-pink-500 p-0.5 bg-gradient-to-r from-pink-500 to-purple-600">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-white">
                      {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl bg-gray-800 border border-gray-700 shadow-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-700">
                      {user.photoURL && (
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={user.photoURL}
                            alt="Profile" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                          />
                        </div>
                      )}
                      <p className="font-medium text-white">{user.displayName || "User"}</p>
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                    
                    <div>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      
                      <Link
                        href="/my-tickets"
                        className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        My Tickets
                      </Link>
                      
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3 hover:bg-gray-700 transition-colors text-white border-t border-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2 focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block transition-all duration-300"
          ></motion.span>
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white block transition-all duration-300"
          ></motion.span>
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white block transition-all duration-300"
          ></motion.span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block py-2 text-lg ${
                    pathname === item.path
                      ? "text-pink-500 font-medium"
                      : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                href="/ai-assistant"
                className="block py-2 text-lg text-pink-500 font-medium"
              >
                AI Assistant
              </Link>
              
              <div className="pt-4 border-t border-gray-800">
                {user ? (
                  <>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500 mr-3">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold">
                              {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.displayName || "User"}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block py-2 text-white hover:text-pink-500 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block py-2 text-white hover:text-pink-500 transition-colors w-full text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/login"
                      className="py-2 text-center border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500/10 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="py-2 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium shadow-md"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}