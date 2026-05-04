"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  getIdToken as firebaseGetIdToken,
} from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getIdToken = async () => {
    if (!firebaseUser) return null;
    return await firebaseGetIdToken(firebaseUser, false);
  };

  const authFetch = async (path, options = {}) => {
    const token = await getIdToken();
    return fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  };

  const syncUserToBackend = async (fbUser) => {
    try {
      await fetch(`${BACKEND_URL}/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || "",
          photoURL: fbUser.photoURL || "",
          provider: fbUser.providerData?.[0]?.providerId || "email",
        }),
      });
    } catch (err) {
      console.warn("Failed to sync user to backend:", err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
          providerData: fbUser.providerData,
        });
        syncUserToBackend(fbUser);
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = async () => { setUser(null); await signOut(auth); };
  const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{
      user, loading, signup, login, logout, signInWithGoogle, resetPassword, getIdToken, authFetch,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
