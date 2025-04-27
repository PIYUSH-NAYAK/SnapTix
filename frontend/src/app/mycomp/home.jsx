"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchAllEvents } from "../services/chatApi";
import { useAuth } from "../../context/AuthContext";
import { useInView } from "react-intersection-observer";
import dynamic from 'next/dynamic';

// Import components with dynamic import for AnimatedParticles
const AnimatedParticles = dynamic(
  () => import('./home/AnimatedParticles'),
  { ssr: false }
);

// Import the decorative borders component
// const DecorativeBorders = dynamic(
//   () => import('../components/DecorativeBorders'),
//   { ssr: false }
// );

import HeroSection from "./home/HeroSection";
import FeaturedEvents from "./home/FeaturedEvents";
import CategoriesSection from "./home/CategoriesSection";
import FeaturesSection from "./home/FeaturesSection";
import TestimonialsSection from "./home/TestimonialsSection";
import NewsletterSection from "./home/NewsletterSection";
import Footer from "./home/Footer";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const { user } = useAuth();
  
  // Animation refs with higher threshold for better timing
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuredRef, featuredInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [categoriesRef, categoriesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [testimonialRef, testimonialInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Automatic testimonial carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        prev === displayedTestimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [displayedTestimonials]);

  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetchAllEvents();
      if (result.success) {
        // Get 4 random events to feature
        const randomEvents = result.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedEvents(randomEvents);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(result.data.map(event => event.type))];
        setCategories(uniqueCategories.slice(0, 6)); // Take up to 6 categories
      }
      setLoading(false);
    };

    // Indian user testimonials
    const allTestimonials = [
      {
        id: 1,
        name: "Priya Sharma",
        role: "Classical Music Enthusiast",
        location: "Delhi",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        comment: "SnapTix helped me discover amazing classical music concerts in Delhi that I would have missed otherwise. The blockchain verification gives me confidence my tickets are authentic!",
      },
      {
        id: 2,
        name: "Arjun Patel",
        role: "Cricket Fan",
        location: "Mumbai",
        image: "https://randomuser.me/api/portraits/men/44.jpg",
        comment: "I've attended multiple IPL matches using SnapTix. The seat selection and instant ticket delivery makes the whole process stress-free.",
      },
      {
        id: 3,
        name: "Divya Reddy",
        role: "Theater Artist",
        location: "Bangalore",
        image: "https://randomuser.me/api/portraits/women/17.jpg",
        comment: "As both a performer and audience member, I love how SnapTix is supporting the local arts scene in Bangalore. Their AI recommendations introduced me to experimental theater!",
      },
      {
        id: 4,
        name: "Vikram Singh",
        role: "Tech Conference Organizer",
        location: "Hyderabad",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        comment: "We used SnapTix for our annual developer conference and ticket distribution was seamless. The analytics helped us understand our audience better.",
      },
      {
        id: 5,
        name: "Ananya Krishnan",
        role: "Film Festival Coordinator",
        location: "Chennai",
        image: "https://randomuser.me/api/portraits/women/66.jpg",
        comment: "SnapTix revolutionized our independent film festival ticketing process. The secure blockchain verification eliminated counterfeit tickets completely!",
      },
      {
        id: 6,
        name: "Rajiv Malhotra",
        role: "Music Producer",
        location: "Kolkata",
        image: "https://randomuser.me/api/portraits/men/73.jpg",
        comment: "From small indie shows to major concerts, SnapTix helps us manage tickets for all our events. Their platform has made reaching new audiences so much easier.",
      },
      {
        id: 7,
        name: "Meera Joshi",
        role: "Food Festival Enthusiast",
        location: "Pune",
        image: "https://randomuser.me/api/portraits/women/51.jpg",
        comment: "I discovered the amazing street food festival through SnapTix recommendations. The AI really understands my taste in culinary events!",
      },
      {
        id: 8,
        name: "Karthik Nair",
        role: "EDM Concert Goer",
        location: "Goa",
        image: "https://randomuser.me/api/portraits/men/62.jpg",
        comment: "Booking tickets for Sunburn Festival through SnapTix was a breeze. The mobile-friendly website works perfectly even with spotty beach WiFi!",
      }
    ];
    
    setTestimonials(allTestimonials);
    
    // Randomly select 3 testimonials to display
    const shuffled = shuffleArray(allTestimonials);
    setDisplayedTestimonials(shuffled.slice(0, 3));

    loadEvents();
  }, []);

  // Function to refresh testimonials
  const refreshTestimonials = () => {
    const shuffled = shuffleArray(testimonials);
    setDisplayedTestimonials(shuffled.slice(0, 3));
    setCurrentTestimonialIndex(0);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Add the decorative borders component */}
      {/* <DecorativeBorders /> */}
      
      {/* Animated particles background with higher z-index */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <AnimatedParticles />
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10">
        <HeroSection heroInView={heroInView} user={user} />
      </div>

      {/* Featured Events Section */}
      <div ref={featuredRef} className="relative z-10">
        <FeaturedEvents featuredInView={featuredInView} loading={loading} featuredEvents={featuredEvents} />
      </div>

      {/* Categories Section */}
      <div ref={categoriesRef} className="relative z-10">
        <CategoriesSection categoriesInView={categoriesInView} categories={categories} />
      </div>
      
      {/* Features Section */}
      <div ref={featuresRef} className="relative z-10">
        <FeaturesSection featuresInView={featuresInView} />
      </div>
      
      {/* Testimonials Section */}
      <div ref={testimonialRef} className="relative z-10">
        <TestimonialsSection 
          testimonialInView={testimonialInView} 
          displayedTestimonials={displayedTestimonials}
          currentTestimonialIndex={currentTestimonialIndex}
          setCurrentTestimonialIndex={setCurrentTestimonialIndex}
          refreshTestimonials={refreshTestimonials}
        />
      </div>
      
      {/* Newsletter Section */}
      <div ref={newsletterRef} className="relative z-10">
        <NewsletterSection newsletterInView={newsletterInView} />
      </div>

    
    </main>
  );
}
