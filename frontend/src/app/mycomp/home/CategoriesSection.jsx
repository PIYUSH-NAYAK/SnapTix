"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CategoriesSection({ categoriesInView, categories }) {
  // Icons mapping for different event categories
  const categoryIcons = {
    "concert": "🎵",
    "sports": "🏆",
    "theatre": "🎭",
    "conference": "🎤",
    "festival": "🎪",
    "comedy": "😂",
    "film": "🎬",
    "workshop": "🧠",
    "art": "🎨",
    "food": "🍽️",
    "technology": "💻",
    "wellness": "🧘"
  };

  // Default category data if needed
  const defaultCategories = [
    "concert", "sports", "theatre", "festival", "comedy", "film"
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  // Category colors
  const categoryColors = [
    "from-pink-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-orange-500 to-red-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-amber-600",
    "from-indigo-500 to-blue-600",
  ];

  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Browse by Category
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={categoriesInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full"
          />
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Find events that match your interests across multiple categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={categoriesInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <Link href={`/events?type=${category}`} className="w-full">
                <div className="aspect-square rounded-3xl mb-3 flex items-center justify-center shadow-lg bg-gradient-to-br border border-white/10 backdrop-blur-sm overflow-hidden relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[index % categoryColors.length]} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <span className="text-4xl relative z-10">
                    {categoryIcons[category.toLowerCase()] || "🎟️"}
                  </span>
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span className="text-white text-sm font-medium">Explore</span>
                  </motion.div>
                </div>
                <p className="text-center text-white font-medium capitalize">
                  {category}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}