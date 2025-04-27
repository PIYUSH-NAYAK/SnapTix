import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIyq1U7n6i5ikR5Zd_FNTKz1jeNwC6iBY",
  authDomain: "snaptix-94a2b.firebaseapp.com",
  projectId: "snaptix-94a2b",
  storageBucket: "snaptix-94a2b.firebasestorage.app",
  messagingSenderId: "445385745567",
  appId: "1:445385745567:web:c519644dcfe9f2f643eeaa",
  measurementId: "G-4ELH59YHH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics - only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth, analytics };
export default app;