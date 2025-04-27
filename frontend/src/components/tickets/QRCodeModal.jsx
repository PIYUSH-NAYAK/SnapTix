import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function QRCodeModal({ isOpen, onClose, ticket }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{ticket.eventName}</h3>
            <p className="text-gray-300 text-sm">{ticket.venue}</p>
          </div>
          
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl flex justify-center mb-6"
          >
            <img 
              src={ticket.qrCode} 
              alt="Ticket QR Code" 
              className="w-56 h-56"
            />
          </motion.div>
          
          <div className="border-t border-gray-700 pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Ticket ID:</span>
              <span className="font-medium">{ticket.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Seat:</span>
              <span className="font-medium">{ticket.seatInfo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Price:</span>
              <span className="font-medium">{ticket.price}</span>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium"
            >
              Close
            </button>
            <button
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium shadow-lg"
            >
              Download
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}