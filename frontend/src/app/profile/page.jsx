"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user, loading, router]);

  // Determine the account type safely
  const getAccountType = () => {
    if (!user?.providerData || user.providerData.length === 0) {
      return 'Email & Password';
    }
    
    // Now we can safely check the provider
    return user.providerData[0]?.providerId === 'google.com' 
      ? 'Google Account' 
      : 'Email & Password';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-pink-500">Your Profile</h1>

        {message && (
          <div className="bg-green-500/20 border border-green-500 text-white p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl mb-8">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mr-6 overflow-hidden">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "Profile"} 
                  className="w-24 h-24 object-cover" 
                />
              ) : (
                <span className="text-4xl text-white">
                  {((user?.displayName || user?.email || "User").charAt(0)).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user?.displayName || "User"}
              </h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Account Type</p>
              <p className="font-medium">
                {getAccountType()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={() => router.push('/')} 
            className="px-4 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500/10 transition"
          >
            Back to Home
          </button>
          
          <button 
            onClick={async () => {
              try {
                await logout();
                router.push('/');
              } catch (error) {
                console.error("Failed to log out", error);
              }
            }} 
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}