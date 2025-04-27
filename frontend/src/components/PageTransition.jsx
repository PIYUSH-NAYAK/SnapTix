"use client";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        {children}
      </div>
    </AnimatePresence>
  );
}