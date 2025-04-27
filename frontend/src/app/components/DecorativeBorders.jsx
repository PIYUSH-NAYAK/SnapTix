// "use client";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function DecorativeBorders() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   // Track mouse position for subtle movement effect
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: e.clientX / window.innerWidth,
//         y: e.clientY / window.innerHeight,
//       });
//     };
    
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);
  
//   return (
//     <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
//       {/* Top border */}
//       <motion.div
//         className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"
//         animate={{
//           backgroundPosition: ["0% 0%", "100% 0%"],
//           opacity: [0.3, 0.8, 0.3]
//         }}
//         transition={{ 
//           duration: 15, 
//           repeat: Infinity,
//           repeatType: "reverse" 
//         }}
//       />
      
//       {/* Bottom border */}
//       <motion.div
//         className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
//         animate={{
//           backgroundPosition: ["100% 0%", "0% 0%"],
//           opacity: [0.3, 0.8, 0.3]
//         }}
//         transition={{ 
//           duration: 15, 
//           repeat: Infinity,
//           repeatType: "reverse",
//           delay: 2
//         }}
//       />
      
//       {/* Left border */}
//       <motion.div
//         className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-pink-500/30 to-transparent"
//         animate={{
//           backgroundPosition: ["0% 0%", "0% 100%"],
//           opacity: [0.3, 0.8, 0.3]
//         }}
//         transition={{ 
//           duration: 18, 
//           repeat: Infinity,
//           repeatType: "reverse",
//           delay: 1 
//         }}
//       />
      
//       {/* Right border */}
//       <motion.div
//         className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
//         animate={{
//           backgroundPosition: ["0% 100%", "0% 0%"],
//           opacity: [0.3, 0.8, 0.3]
//         }}
//         transition={{ 
//           duration: 18, 
//           repeat: Infinity,
//           repeatType: "reverse",
//           delay: 3
//         }}
//       />
      
//       {/* Corner accents */}
//       <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-pink-500/50 rounded-tl-sm" 
//         style={{ 
//           transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)` 
//         }}
//       />
//       <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-pink-500/50 rounded-tr-sm"
//         style={{ 
//           transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * -5}px)` 
//         }}
//       />
//       <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-pink-500/50 rounded-bl-sm"
//         style={{ 
//           transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * 5}px)` 
//         }}
//       />
//       <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-pink-500/50 rounded-br-sm"
//         style={{ 
//           transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)` 
//         }}
//       />
//     </div>
//   );
// }