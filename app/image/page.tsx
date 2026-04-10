"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  Share2, 
  Maximize2, 
  Heart,
  ImageIcon,
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

const IMAGES = [
  {
    id: 1,
    title: "Alpine Serenity",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070",
    category: "Mountains",
    description: "The peak of human exploration meets the boundary of the sky."
  },
  {
    id: 2,
    title: "Ocean Whisper",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=2070",
    category: "Ocean",
    description: "The deep mystery of the blue abyss."
  },
  {
    id: 3,
    title: "Urban Glow",
    url: "https://images.unsplash.com/photo-1519608487913-d98304c0ecad?auto=format&fit=crop&q=80&w=2070",
    category: "City",
    description: "Lights of the future illuminating the present."
  },
  {
    id: 4,
    title: "Lush Forest",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2070",
    category: "Nature",
    description: "The breathing lungs of our world."
  },
  {
    id: 5,
    title: "Golden Hour",
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=2070",
    category: "Landscape",
    description: "Where the day finishes its journey."
  },
  {
    id: 6,
    title: "Desert Silence",
    url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2070",
    category: "Landscape",
    description: "Endless horizons and shifting sands."
  }
];

const CATEGORIES = ["All", "Mountains", "Ocean", "City", "Nature", "Landscape"];

const ImagePage = () => {
  const [selectedImage, setSelectedImage] = useState<typeof IMAGES[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isActive, setIsActive] = useState(true);

  React.useEffect(() => {
    const channel = new BroadcastChannel('gallery-control');
    
    channel.onmessage = (event) => {
      if (event.data === 'play') {
        setIsActive(true);
      } else if (event.data === 'pause') {
        setIsActive(false);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const filteredImages = IMAGES.filter(img => activeCategory === "All" || img.category === activeCategory);

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20 px-4">
      {/* Mesh Background */}
      <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-30 blur-[100px] pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full" />
      </div>

      {!isActive ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 min-h-[60vh] flex flex-col items-center justify-center text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-24 h-24 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-10"
            >
               <Maximize2 className="w-8 h-8 text-white/20 animate-pulse" />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tight mb-4 uppercase italic">Gallery Sync: Standby</h2>
            <p className="text-muted-foreground text-lg tracking-widest uppercase text-xs opacity-50">Controlled Remotely from Dashboard</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>Visual Gallery</span>
            </motion.div>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              Capture <span className="text-gradient">Beauty</span>
            </motion.h1>
            
            {/* Filters */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-wrap items-center justify-center gap-3"
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-foreground text-background shadow-xl shadow-foreground/20" 
                      : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Masonry-like Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image, idx) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-xl border border-white/5 bg-zinc-900"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">{image.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && isActive && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10 active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="lg:w-2/3 h-[50vh] lg:h-auto bg-black flex items-center justify-center">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="lg:w-1/3 p-12 overflow-y-auto bg-zinc-900 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                    {selectedImage.category}
                  </div>
                  <h2 className="text-4xl font-black mb-6 leading-tight">{selectedImage.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition shadow-lg shadow-white/10 flex items-center justify-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download Content</span>
                  </button>
                  <div className="flex gap-4">
                    <button className="flex-1 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition flex items-center justify-center space-x-2">
                      <Heart className="w-5 h-5" />
                      <span>Like</span>
                    </button>
                    <button className="flex-1 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition flex items-center justify-center space-x-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default ImagePage;
