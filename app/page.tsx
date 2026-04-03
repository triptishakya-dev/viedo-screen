"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  MonitorPlay, 
  Calendar, 
  Clock, 
  User, 
  Image as ImageIcon, 
  Play, 
  FileText, 
  ArrowRight, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaItem } from "@/types";
import Card from "@/components/card";
import Link from "next/link";

const galleryItems: MediaItem[] = [
  {
    id: 1,
    type: "image",
    title: "Alpine Serenity",
    description: "A stunning high-resolution capture of the Swiss Alps at dawn.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070",
    icon: <ImageIcon className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 101,
    type: "image",
    title: "Ocean Whisper",
    description: "The rhythmic dance of waves against the golden shore.",
    thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=2070",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=2070",
    icon: <ImageIcon className="w-6 h-6" />,
    color: "from-teal-500 to-emerald-500",
  },
  {
    id: 2,
    type: "video",
    title: "Spring Blossoms",
    description: "A beautiful cinematic capture of blooming trees in a spring park.",
    url: "https://videos.pexels.com/video-files/31944076/13608365_1080_1920_30fps.mp4",
    icon: <Play className="w-6 h-6" />,
    color: "from-pink-400 to-rose-400",
  },
  {
    id: 201,
    type: "video",
    title: "City Lights",
    description: "The vibrant pulse of a metropolitan skyline at night.",
    url: "https://videos.pexels.com/video-files/2096568/2096568-uhd_2560_1440_30fps.mp4",
    icon: <Play className="w-6 h-6" />,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 3,
    type: "blog",
    title: "The Future of AI",
    description: "Exploring the intersection of human creativity and artificial intelligence.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-500",
    content: {
      author: "Alex Rivera",
      date: "Oct 12, 2025",
      readTime: "5 min read",
      text: [
        "The landscape of artificial intelligence is shifting from purely analytical tasks to creative collaboration.",
      ],
    },
  },
  {
    id: 301,
    type: "blog",
    title: "Minimalist Design",
    description: "Why less is truly more in modern digital interfaces.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-slate-500 to-zinc-700",
    content: {
      author: "Sarah Chen",
      date: "Nov 05, 2025",
      readTime: "4 min read",
      text: ["Minimalism isn't about lack, it's about focus."],
    },
  },
];

const SectionHeader = ({ title, icon: Icon, href }: { title: string, icon: any, href: string }) => (
  <div className="flex items-center justify-between mb-8 px-2">
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-2xl bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
    <Link 
      href={href}
      className="group flex items-center space-x-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
    >
      <span>View All</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const Page = () => {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [showImageSlider, setShowImageSlider] = useState(true);
  const [showVideoSection, setShowVideoSection] = useState(true);
  const [showBlogSlider, setShowBlogSlider] = useState(true);

  const images = galleryItems.filter(item => item.type === "image");
  const videos = galleryItems.filter(item => item.type === "video");
  const blogs = galleryItems.filter(item => item.type === "blog");

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-6">
            <MonitorPlay className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Premium Content Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground">
            Experience <span className="text-gradient">Pure Digital</span> Art
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Toggle your preferred media types below and dive into our curated collections.
          </p>
        </motion.div>
      </div>

      {/* Media Controls Section */}
      <div className="max-w-4xl mx-auto mb-20 px-4">
        <div className="glass rounded-3xl p-6 flex flex-wrap items-center justify-center gap-4 shadow-2xl border-white/5">
           {/* Toggle Image */}
           <button 
              onClick={() => setShowImageSlider(!showImageSlider)}
              className={cn(
                "flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-bold",
                showImageSlider ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/20" : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
           >
              <ImageIcon className="w-5 h-5" />
              <span>Images</span>
              <div className={cn("w-2 h-2 rounded-full", showImageSlider ? "bg-white" : "bg-white/20")} />
           </button>

           {/* Toggle Video */}
           <button 
              onClick={() => setShowVideoSection(!showVideoSection)}
              className={cn(
                "flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-bold",
                showVideoSection ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30 ring-2 ring-pink-400/20" : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
           >
              <Play className="w-5 h-5" />
              <span>Videos</span>
              <div className={cn("w-2 h-2 rounded-full", showVideoSection ? "bg-white" : "bg-white/20")} />
           </button>

           {/* Toggle Blog */}
           <button 
              onClick={() => setShowBlogSlider(!showBlogSlider)}
              className={cn(
                "flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-bold",
                showBlogSlider ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400/20" : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
           >
              <FileText className="w-5 h-5" />
              <span>Blogs</span>
              <div className={cn("w-2 h-2 rounded-full", showBlogSlider ? "bg-white" : "bg-white/20")} />
           </button>
        </div>
      </div>

      {/* Sections Below */}
      <div className="space-y-32">
        {/* Blog Slider Section */}
        <AnimatePresence>
          {showBlogSlider && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="relative"
            >
              <SectionHeader title="Latest Stories" icon={FileText} href="/blog" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((item, idx) => (
                  <Card key={item.id} item={item} index={idx} onClick={setActiveItem} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Video Section */}
        <AnimatePresence>
          {showVideoSection && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
            >
              <SectionHeader title="Cinematic Experiences" icon={Play} href="/video" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((item, idx) => (
                  <Card key={item.id} item={item} index={idx} onClick={setActiveItem} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Image Slider Section */}
        <AnimatePresence>
          {showImageSlider && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
            >
              <SectionHeader title="Visual Gallery" icon={ImageIcon} href="/image" />
              <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                {images.map((item, idx) => (
                  <div key={item.id} className="min-w-[300px] md:min-w-[450px] snap-center">
                    <Card item={item} index={idx} onClick={(i) => window.open(i.url, "_blank")} />
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Media Modal Popup */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={cn(
                "relative z-10 w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col",
                activeItem.type === "blog" ? "max-w-4xl bg-background rounded-3xl" : "max-w-6xl bg-zinc-950 rounded-2xl"
              )}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItem(null);
                }}
                className="absolute top-6 right-6 z-50 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all border border-white/10 hover:scale-110 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Conditional Content Rendering */}
              {activeItem.type === "video" && (
                <div className="w-full aspect-video bg-black">
                  <video
                    key={activeItem.url}
                    autoPlay
                    controls
                    className="w-full h-full object-contain"
                  >
                    <source src={activeItem.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                    <h3 className="text-2xl font-bold text-white mb-2">{activeItem.title}</h3>
                    <p className="text-white/60 text-sm max-w-lg">{activeItem.description}</p>
                  </div>
                </div>
              )}

              {activeItem.type === "blog" && activeItem.content && (
                <div className="max-h-[85vh] overflow-y-auto">
                   <div className="px-8 pt-16 pb-12 sm:px-12 sm:pt-20">
                      <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground border-b border-border pb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{activeItem.content.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{activeItem.content.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{activeItem.content.readTime}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tight">
                        {activeItem.title}
                      </h2>
                      
                      <div className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                        {activeItem.content.text.map((paragraph: string, i: number) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                      
                      <div className="mt-12 pt-8 border-t border-border">
                        <Link 
                          href="/blog"
                          onClick={() => setActiveItem(null)}
                          className="inline-flex px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 items-center space-x-2"
                        >
                          <span>Discover More Articles</span>
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;