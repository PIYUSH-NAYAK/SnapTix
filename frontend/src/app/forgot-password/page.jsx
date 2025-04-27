"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ 
        type: "error", 
        content: "Please enter your email address" 
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      setMessage({ type: "", content: "" });
      
      await resetPassword(email);
      
      setMessage({
        type: "success",
        content: "Password reset email sent! Please check your inbox and follow the instructions."
      });
      
      setEmail("");
    } catch (error) {
      console.error("Password reset error:", error);
      
      if (error.code === "auth/user-not-found") {
        setMessage({
          type: "error",
          content: "No account found with this email address."
        });
      } else if (error.code === "auth/invalid-email") {
        setMessage({
          type: "error",
          content: "Please enter a valid email address."
        });
      } else {
        setMessage({
          type: "error",
          content: "Failed to send password reset email. Please try again later."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-[calc(3rem+1px)] min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-pink-500 hover:text-pink-400 transition">
            SnapTix
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Reset Your Password</h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {message.content && (
          <div 
            className={`mb-6 p-4 rounded-lg ${
              message.type === "error" 
                ? "bg-red-500/20 border border-red-500" 
                : "bg-green-500/20 border border-green-500"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              placeholder="yourname@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            } text-white rounded-lg transition`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            href="/login"
            className="text-pink-400 hover:text-pink-300 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}