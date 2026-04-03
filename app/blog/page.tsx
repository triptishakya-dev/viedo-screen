"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  SearchIcon,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Mock Data
const CATEGORIES = ["All", "Technology", "Design", "Productivity", "Innovation"];

const POSTS = [
  {
    id: 1,
    title: "The Future of AI in Modern Web Development",
    excerpt: "How artificial intelligence is reshaping the way we build, test, and deploy web applications in 2026.",
    category: "Technology",
    date: "March 28, 2026",
    readTime: "8 min read",
    image: "/images/blog-1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Mastering Minimalism: A Guide to Sleek UI",
    excerpt: "Why less is more when it comes to creating premium user experiences that convert.",
    category: "Design",
    date: "March 25, 2026",
    readTime: "5 min read",
    image: "/images/blog-2.jpg",
  },
  {
    id: 3,
    title: "The Evolution of React 19 and Beyond",
    excerpt: "Deep dive into the latest features of React and what it means for the next generation of apps.",
    category: "Technology",
    date: "March 22, 2026",
    readTime: "12 min read",
    image: "/images/blog-3.jpg",
  },
  {
    id: 4,
    title: "Productivity Hacks for Remote Teams",
    excerpt: "Tooling and workflows that help distributed teams stay aligned and ship faster.",
    category: "Productivity",
    date: "March 20, 2026",
    readTime: "6 min read",
    image: "/images/blog-4.jpg",
  },
  {
    id: 5,
    title: "Sustainable Tech: Why Efficiency Matters",
    excerpt: "Building green software and the impact of optimized code on the environment.",
    category: "Innovation",
    date: "March 18, 2026",
    readTime: "7 min read",
    image: "/images/blog-5.jpg",
  },
  {
    id: 6,
    title: "Design Systems for Scale",
    excerpt: "Lessons learned from building and maintaining design systems for enterprise platforms.",
    category: "Design",
    date: "March 15, 2026",
    readTime: "10 min read",
    image: "/images/blog-6.jpg",
  }
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = POSTS.find(p => p.featured) || POSTS[0];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6"
            >
              <Sparkles className="w-3 h-3 mr-2" />
              Our Blog
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
            >
              Insights for the <span className="text-gradient">Modern Web</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              Explore our latest thoughts on technology, design, and innovation. 
              Stay ahead with curated content from our experts.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-80 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
            />
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-16">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                activeCategory === cat 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-600/20"
                  : "bg-white dark:bg-zinc-900 text-muted-foreground border border-border hover:bg-muted"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Featured Post */}
        {!searchQuery && activeCategory === "All" && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <Link href={`/blog/${featuredPost.id}`} className="group relative block aspect-[21/9] rounded-[2rem] overflow-hidden border border-border">
              <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/20 transition-colors duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              
              <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-700">
                <div className="w-full h-full bg-zinc-800 animate-pulse flex items-center justify-center">
                   <p className="text-zinc-600 font-mono">FEATURED_IMG_PLACEHOLDER</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-zinc-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {featuredPost.date}
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-zinc-300 text-lg md:text-xl line-clamp-2 md:line-clamp-none max-w-2xl mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="inline-flex items-center font-bold text-white group-hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(p => !p.featured || (searchQuery || activeCategory !== "All")).map((post, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={post.id}
              className="group flex flex-col h-full rounded-[2rem] bg-white dark:bg-zinc-900/50 border border-border p-3 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="w-full h-full bg-zinc-800/50 animate-pulse flex items-center justify-center">
                  <p className="text-zinc-600 text-xs font-semi-bold">IMAGE_PLACEHOLDER</p>
                </div>
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md text-foreground text-[10px] font-bold uppercase tracking-tight">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <div className="flex items-center text-muted-foreground text-xs font-medium space-x-4 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-2" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 min-h-[56px] group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center text-sm font-bold text-foreground group-hover:translate-x-1 transition-transform">
                  View Story <ChevronRight className="ml-1 w-4 h-4 text-blue-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-40 text-center">
            <div className="inline-flex p-6 rounded-full bg-muted mb-6">
              <SearchIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-8 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;