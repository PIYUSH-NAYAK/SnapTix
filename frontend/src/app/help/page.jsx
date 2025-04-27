"use client";
import Link from "next/link";

export default function HelpCenter() {
  return (
    <main className="pt-[calc(3rem+1px)] min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Help Center</h1>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-pink-400">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">How do I purchase tickets?</h3>
              <p className="text-gray-300">Browse events, select the one you're interested in, choose your seats, and complete the checkout process using your cryptocurrency wallet.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Are my tickets refundable?</h3>
              <p className="text-gray-300">Refund policies vary by event. Check the specific event details page for the refund policy information before purchasing.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">How does the blockchain verification work?</h3>
              <p className="text-gray-300">Each ticket is minted as a unique NFT on the blockchain, ensuring authenticity and preventing counterfeits. Your ticket can be verified through your wallet address.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">I need more help with my issue</h3>
              <p className="text-gray-300">
                For more specific assistance, please visit our detailed <Link href="/faq" className="text-pink-400 hover:underline">FAQ section</Link> or <Link href="/contact" className="text-pink-400 hover:underline">contact our support team</Link>.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-pink-400">Getting Started</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-2">
                <span className="text-pink-500">→</span>
                <Link href="#" className="hover:text-pink-400 transition">Creating an account</Link>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-500">→</span>
                <Link href="#" className="hover:text-pink-400 transition">Connecting your wallet</Link>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-500">→</span>
                <Link href="#" className="hover:text-pink-400 transition">Finding events</Link>
              </li>
              <li className="flex gap-2">
                <span className="text-pink-500">→</span>
                <Link href="#" className="hover:text-pink-400 transition">Purchasing tickets</Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-pink-400">Contact Support</h2>
            <p className="text-gray-300 mb-4">Still need help? Our support team is available to assist you.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}