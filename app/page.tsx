"use client";

import React, { useState } from 'react';
import { Video, Image, StickyNote, Power, PowerOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Page = () => {
  const [states, setStates] = useState({
    video: true,
    gallery: true,
    blog: true,
  });

  const toggleState = (key: keyof typeof states, value: boolean) => {
    setStates((prev) => ({ ...prev, [key]: value }));
    
    // Remote control logic for multiple content categories
    const channelName = key === 'gallery' ? 'gallery-control' : `${key}-control`;
    const tabName = `${key.charAt(0).toUpperCase() + key.slice(1)}Tab`;
    const route = key === 'gallery' ? '/image' : `/${key}`;
    
    const channel = new BroadcastChannel(channelName);
    if (value) {
      window.open(route, tabName);
      // Small delay to ensure the channel is ready in the new tab if it was just opened
      setTimeout(() => channel.postMessage('play'), 500);
    } else {
      channel.postMessage('pause');
    }
    channel.close();
  };

  const cards = [
    {
      id: 'video',
      title: 'Video',
      icon: <Video className="w-8 h-8" />,
      description: 'Manage and stream high-quality video content seamlessly.',
      color: 'from-blue-500/20 to-indigo-500/20',
      accent: 'text-blue-500',
    },
    {
      id: 'gallery',
      title: 'Image Gallery',
      icon: <Image className="w-8 h-8" />,
      description: 'Explore a curated collection of stunning visual assets.',
      color: 'from-purple-500/20 to-pink-500/20',
      accent: 'text-purple-500',
    },
    {
      id: 'blog',
      title: 'Blog',
      icon: <StickyNote className="w-8 h-8" />,
      description: 'Stay updated with the latest stories and insightful articles.',
      color: 'from-emerald-500/20 to-teal-500/20',
      accent: 'text-emerald-500',
    },
  ] as const;

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-6xl w-full">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient">Control Center</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Manage your media and content sections with ease. Toggle status for each category below.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const isActive = states[card.id as keyof typeof states];
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className={`relative group p-8 rounded-3xl glass backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-60 grayscale-[0.5]'
                }`}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 ${card.accent}`}>
                    {card.icon}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-muted-foreground mb-8 line-clamp-2">
                    {card.description}
                  </p>

                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => toggleState(card.id as keyof typeof states, true)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-foreground text-background shadow-lg shadow-black/20 scale-105' 
                          : 'bg-white/5 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      <Power className="w-4 h-4" />
                      ON
                    </button>
                    <button
                      onClick={() => toggleState(card.id as keyof typeof states, false)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                        !isActive 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 scale-105' 
                          : 'bg-white/5 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      <PowerOff className="w-4 h-4" />
                      OFF
                    </button>
                  </div>
                </div>

                {/* Status Indicator Tag */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border transition-colors ${
                  isActive 
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500' 
                    : 'border-red-500/30 bg-red-500/10 text-red-500'
                }`}>
                  {isActive ? 'Active' : 'Disabled'}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Page;