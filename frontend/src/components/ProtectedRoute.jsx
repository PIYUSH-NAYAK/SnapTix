"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup', '/forgot-password'];
  
  useEffect(() => {
    // If authentication status is still loading, don't do anything yet
    if (loading) return;
    
    const isPublicRoute = publicRoutes.includes(pathname);
    
    if (!user && !isPublicRoute) {
      // User is not logged in and trying to access a protected route
      router.push('/login');
    } else {
      // Either user is logged in or accessing a public route
      setIsAuthorized(true);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    // Show loading spinner while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  // If it's a public route OR user is authenticated for protected route
  if (publicRoutes.includes(pathname) || isAuthorized) {
    return children;
  }
  
  // Don't render anything while redirecting to login
  return null;
}