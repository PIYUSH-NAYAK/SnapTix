"use client";
import { useState } from "react";
import Link from "next/link";

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState("general");
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      faqs: [
        {
          id: "what-is-snaptix",
          question: "What is SnapTix?",
          answer: "SnapTix is an innovative event discovery and ticketing platform that uses blockchain technology to securely issue and verify event tickets as NFTs. Our platform helps you find events that match your interests and provides a seamless ticket purchasing experience."
        },
        {
          id: "how-does-it-work",
          question: "How does SnapTix work?",
          answer: "SnapTix connects event organizers with attendees. Users can browse events, purchase tickets securely using cryptocurrency, and receive their tickets as NFTs in their digital wallet. Our AI assistant also helps users discover events tailored to their preferences."
        },
        {
          id: "account-required",
          question: "Do I need to create an account to use SnapTix?",
          answer: "While you can browse events without an account, you'll need to sign up and connect a digital wallet to purchase tickets. Creating an account gives you access to personalized recommendations and the ability to manage your tickets."
        }
      ]
    },
    {
      id: "tickets",
      title: "Tickets & Purchases",
      faqs: [
        {
          id: "purchase-process",
          question: "How do I purchase tickets?",
          answer: "To purchase tickets, select the event you're interested in, choose your seats or ticket type, and proceed to checkout. You'll need a connected digital wallet with sufficient funds to complete the transaction. After purchase, your ticket NFT will be transferred to your wallet."
        },
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer: "SnapTix currently accepts Ethereum (ETH) for ticket purchases. We plan to add support for more cryptocurrencies in the future."
        },
        {
          id: "ticket-refunds",
          question: "Can I get a refund for my ticket?",
          answer: "Refund policies vary by event. Check the specific event details page for information about the refund policy before making your purchase. Some events may allow ticket reselling on our secondary marketplace instead of refunds."
        }
      ]
    },
    {
      id: "blockchain",
      title: "Blockchain & NFTs",
      faqs: [
        {
          id: "what-is-nft-ticket",
          question: "What is an NFT ticket?",
          answer: "An NFT (Non-Fungible Token) ticket is a digital ticket that exists on the blockchain. Each ticket is unique, cannot be duplicated, and contains embedded information about the event and your specific seat or access level. The blockchain technology ensures the authenticity and security of your ticket."
        },
        {
          id: "wallet-setup",
          question: "What digital wallet should I use?",
          answer: "SnapTix is compatible with MetaMask, which is our recommended wallet for the best experience. You can download the MetaMask extension for your browser or mobile app and create a wallet in minutes."
        },
        {
          id: "gas-fees",
          question: "Do I pay gas fees for ticket purchases?",
          answer: "Yes, as with any blockchain transaction, there are gas fees associated with purchasing tickets. These fees go to the network miners who process the transaction, not to SnapTix. We display the estimated gas fees before you confirm your purchase."
        }
      ]
    },
    {
      id: "events",
      title: "Events & Venues",
      faqs: [
        {
          id: "event-types",
          question: "What types of events are available on SnapTix?",
          answer: "SnapTix features a diverse range of events including concerts, sports matches, theater performances, film screenings, festivals, standup comedy shows, and conferences across major Indian cities."
        },
        {
          id: "venue-information",
          question: "How do I get information about the venue?",
          answer: "Detailed venue information is provided on each event page, including location, available facilities, accessibility features, and sometimes maps or seating charts. For specific questions about a venue, you can contact the event organizer through the event page."
        },
        {
          id: "event-cancellation",
          question: "What happens if an event is canceled?",
          answer: "If an event is canceled, ticket holders will be notified via email and through the SnapTix app. Depending on the event's policy, you may receive an automatic refund to your wallet or have the option to use your ticket for a rescheduled date."
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Support",
      faqs: [
        {
          id: "lost-tickets",
          question: "What if I lose access to my tickets?",
          answer: "Since your tickets are stored as NFTs in your blockchain wallet, they remain accessible as long as you have access to your wallet. If you lose access to your wallet, you'll need to use your recovery phrase to restore it. We recommend storing your recovery phrase securely."
        },
        {
          id: "app-compatibility",
          question: "Which devices is SnapTix compatible with?",
          answer: "SnapTix is a web-based platform that works on desktop and mobile browsers. We've optimized the experience for Chrome, Firefox, Safari, and Edge on desktop, as well as native browsers on iOS and Android devices."
        },
        {
          id: "contact-support",
          question: "How do I contact customer support?",
          answer: "You can contact our support team through the Contact Us page, by emailing support@snaptix.com, or by using the live chat feature available on our website during business hours."
        }
      ]
    }
  ];

  return (
    <main className="pt-[calc(3rem+1px)] min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Frequently Asked Questions</h1>
        <p className="text-gray-400 mb-8">Find answers to common questions about SnapTix</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setOpenCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                openCategory === category.id
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        
        <div className="space-y-8">
          {faqCategories.map(category => (
            <div key={category.id} className={category.id === openCategory ? "block" : "hidden"}>
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">{category.title}</h2>
              
              <div className="space-y-4">
                {category.faqs.map(faq => (
                  <div 
                    key={faq.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/30 transition"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${openFaqs[faq.id] ? "transform rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    
                    <div className={`px-6 py-4 text-gray-300 border-t border-gray-700/50 ${openFaqs[faq.id] ? "block" : "hidden"}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">Still have questions?</h2>
          <p className="text-gray-300 mb-6">Our support team is ready to help you with any other questions you might have.</p>
          <Link
            href="/contact"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}