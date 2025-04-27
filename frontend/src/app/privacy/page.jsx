"use client";
import { useState } from "react";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("introduction");
  
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Privacy Policy</h1>
        <p className="text-gray-400 mb-4">Last updated: April 25, 2025</p>
        
        <div className="grid md:grid-cols-4 gap-8 mt-8">
          {/* Navigation sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sticky top-8">
              <h3 className="font-semibold text-pink-400 mb-4">On this page</h3>
              <nav className="space-y-2 text-sm">
                <button 
                  onClick={() => scrollToSection("introduction")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "introduction" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Introduction
                </button>
                <button 
                  onClick={() => scrollToSection("collection")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "collection" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Information Collection
                </button>
                <button 
                  onClick={() => scrollToSection("use")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "use" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Use of Information
                </button>
                <button 
                  onClick={() => scrollToSection("sharing")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "sharing" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Information Sharing
                </button>
                <button 
                  onClick={() => scrollToSection("security")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "security" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Data Security
                </button>
                <button 
                  onClick={() => scrollToSection("cookies")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "cookies" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Cookies Policy
                </button>
                <button 
                  onClick={() => scrollToSection("rights")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "rights" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  User Rights
                </button>
                <button 
                  onClick={() => scrollToSection("changes")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "changes" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Policy Changes
                </button>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeSection === "contact" ? "bg-pink-600/30 text-white" : "text-gray-300 hover:bg-gray-700/30"
                  }`}
                >
                  Contact Us
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3 space-y-10">
            <section id="introduction" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Introduction</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  SnapTix  is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the "Platform").
                </p>
                <p>
                  Please read this Privacy Policy carefully. By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Platform.
                </p>
              </div>
            </section>
            
            <section id="collection" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Information Collection</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  We collect several types of information from and about users of our Platform, including:
                </p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> This includes your name, email address, postal address, phone number, and other information you provide when creating an account or purchasing tickets.
                  </li>
                  <li>
                    <strong>Blockchain Information:</strong> As a blockchain-based platform, we collect public wallet addresses and transaction information that appears on the blockchain.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> We automatically collect information about how you interact with our Platform, including browsing patterns, clicked links, and features used.
                  </li>
                  <li>
                    <strong>Device Information:</strong> We collect information about the device and internet connection you use to access our Platform, including device type, operating system, and browser type.
                  </li>
                </ul>
              </div>
            </section>
            
            <section id="use" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Use of Information</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  We use the information we collect about you for various purposes, including:
                </p>
                <ul>
                  <li>Processing and fulfilling your ticket purchases</li>
                  <li>Verifying your identity and preventing fraud</li>
                  <li>Providing customer support and responding to inquiries</li>
                  <li>Personalizing your experience and delivering targeted content and event recommendations</li>
                  <li>Improving our Platform and developing new products and services</li>
                  <li>Sending you marketing communications, if you have opted in</li>
                  <li>Complying with legal obligations and enforcing our terms</li>
                </ul>
              </div>
            </section>
            
            <section id="sharing" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Information Sharing</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  We may share your personal information with:
                </p>
                <ul>
                  <li>Event organizers (limited to information necessary for event management and check-in)</li>
                  <li>Service providers who perform functions on our behalf</li>
                  <li>Legal and regulatory authorities when required by law</li>
                  <li>Potential buyers in the event of a merger, acquisition, or sale of assets</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>
            
            <section id="security" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Data Security</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include encryption, secure socket layer (SSL) technology, and regular security assessments.
                </p>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </div>
            </section>
            
            <section id="cookies" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Cookies Policy</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content.
                </p>
                <p>
                  Our cookies fall into the following categories:
                </p>
                <ul>
                  <li><strong>Essential cookies:</strong> Required for the Platform to function properly</li>
                  <li><strong>Analytical cookies:</strong> Help us understand how users interact with our Platform</li>
                  <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Targeting cookies:</strong> Collect information about your browsing habits to deliver relevant advertisements</li>
                </ul>
                <p>
                  You can manage cookie preferences through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Platform.
                </p>
              </div>
            </section>
            
            <section id="rights" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">User Rights</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul>
                  <li>The right to access the personal information we hold about you</li>
                  <li>The right to request correction of incomplete or inaccurate information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict or object to our processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the Contact Us section.
                </p>
              </div>
            </section>
            
            <section id="changes" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Policy Changes</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.
                </p>
              </div>
            </section>
            
            <section id="contact" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-pink-400">Contact Us</h2>
              <div className="prose prose-invert prose-pink max-w-none">
                <p>
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p>
                  Email: privacy@snaptix.com<br />
                  Address: 123 Event Street, Mumbai, India<br />
                  Phone: +91 98765 43210
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}