"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle, user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    const signupPromise = signup(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setError("Failed to create an account: " + err.message);
        throw new Error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    
    toast.promise(signupPromise, {
      loading: 'Creating account...',
      success: 'Account created successfully!',
      error: (err) => `Signup failed: ${err.message}`
    });
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    
    const googlePromise = signInWithGoogle()
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setError("Failed to sign in with Google: " + err.message);
        throw new Error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    
    toast.promise(googlePromise, {
      loading: 'Connecting with Google...',
      success: 'Account connected successfully!',
      error: (err) => `Google sign-in failed: ${err.message}`
    });
  };

  const handleNavigateToLogin = () => {
    toast.loading('Loading login page...', { 
      duration: 1000,
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid rgba(236, 72, 153, 0.3)'
      }
    });
  };

  return (
    <motion.main 
      className="pt-[calc(3rem+1px)] min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl max-w-md w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.h1 
          className="text-3xl font-bold mb-6 text-center text-pink-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sign Up for SnapTix
        </motion.h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 disabled:cursor-not-allowed rounded-lg transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2 px-4 bg-white text-gray-900 hover:bg-gray-200 rounded-lg flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="text-pink-400 hover:text-pink-300"
            onClick={handleNavigateToLogin}
          >
            Log In
          </Link>
        </div>
      </motion.div>
    </motion.main>
  );
}