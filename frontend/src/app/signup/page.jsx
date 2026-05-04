"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const floatingCards = [
  { label: "🎵 Coldplay Tour", sub: "Mumbai · Jun 2026", color: "from-pink-500/30 to-purple-600/30", x: "8%", y: "10%", rotate: -5 },
  { label: "🏏 India vs AUS", sub: "Chennai · Sep 2026", color: "from-blue-500/25 to-indigo-500/25", x: "55%", y: "6%", rotate: 6 },
  { label: "🎭 Sunburn Festival", sub: "Goa · Dec 2026", color: "from-orange-500/25 to-pink-500/25", x: "3%", y: "65%", rotate: 4 },
  { label: "🎤 AR Rahman Live", sub: "Delhi · Aug 2026", color: "from-green-500/20 to-teal-500/20", x: "55%", y: "70%", rotate: -5 },
];

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const getStrength = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-400"];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => { if (user) router.push("/"); }, [user, router]);

  const strength = getStrength(password);
  const mismatch = confirmPassword && confirmPassword !== password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    const p = signup(email, password)
      .then(() => router.push("/"))
      .catch((err) => { throw new Error(err.message); })
      .finally(() => setLoading(false));
    toast.promise(p, { loading: "Creating account...", success: "Welcome to SnapTix!", error: (err) => err.message });
  };

  const handleGoogle = async () => {
    setLoading(true);
    const p = signInWithGoogle()
      .then(() => router.push("/"))
      .catch((err) => { throw new Error(err.message); })
      .finally(() => setLoading(false));
    toast.promise(p, { loading: "Connecting...", success: "Welcome to SnapTix!", error: (err) => err.message });
  };

  return (
    <div className="min-h-screen bg-black text-white flex pt-[calc(3rem+1px)]">

      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/15 blur-3xl animate-pulse" style={{ animationDelay: "1.2s" }} />

        {floatingCards.map((card, i) => (
          <motion.div
            key={i}
            className={`absolute bg-gradient-to-br ${card.color} backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 shadow-xl`}
            style={{ left: card.x, top: card.y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -8, 0], rotate: card.rotate }}
            transition={{ duration: 0.8, delay: i * 0.15, y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <p className="font-semibold text-sm text-white">{card.label}</p>
            <p className="text-xs text-gray-300 mt-0.5">{card.sub}</p>
          </motion.div>
        ))}

        <motion.div
          className="relative z-10 text-center px-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Join SnapTix
          </h1>
          <p className="text-gray-400 text-lg max-w-xs mx-auto leading-relaxed">
            Get NFT-backed tickets for the best events across India
          </p>

          <div className="mt-8 space-y-3 max-w-xs mx-auto">
            {[
              { icon: "✅", text: "NFT ticket ownership on blockchain" },
              { icon: "✅", text: "Real-time seat availability" },
              { icon: "✅", text: "Secure resale marketplace" },
              { icon: "✅", text: "100+ events across 20 cities" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-gray-300">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block w-px bg-white/5" />

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div
          className="w-full max-w-md py-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="lg:hidden text-center mb-8">
            <span className="text-4xl">🎟️</span>
            <h2 className="text-2xl font-bold mt-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">SnapTix</h2>
          </div>

          <h2 className="text-3xl font-bold mb-1">Create account</h2>
          <p className="text-gray-400 mb-8 text-sm">Join thousands discovering events on SnapTix</p>

          <motion.button
            onClick={handleGoogle}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center py-3 px-4 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition mb-6 disabled:opacity-60"
          >
            <GoogleIcon />
            Continue with Google
          </motion.button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">or sign up with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-pink-500 transition text-white placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-pink-500 transition text-white placeholder-gray-600 pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition">
                  {showPassword
                    ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
              {/* Strength bar */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map((n) => (
                      <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-300 ${n <= strength ? strengthColor[strength] : "bg-white/10"}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength <= 1 ? "text-red-400" : strength <= 3 ? "text-yellow-400" : "text-green-400"}`}>
                    {strengthLabel[strength]}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border focus:outline-none transition text-white placeholder-gray-600 pr-11 ${
                    mismatch ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-pink-500"
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition">
                  {showConfirm
                    ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
              {mismatch && <p className="text-xs text-red-400 mt-1">Passwords don't match</p>}
            </div>

            <motion.button
              type="submit"
              disabled={loading || !!mismatch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-pink-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Creating account...
                </span>
              ) : "Create Account"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-400 hover:text-pink-300 font-medium transition">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
