"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MediaItem } from "@/types";

interface CardProps {
  item: MediaItem;
  index: number;
  onClick: (item: MediaItem) => void;
}

const Card: React.FC<CardProps> = ({ item, index, onClick }) => {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative h-[420px] rounded-3xl overflow-hidden glass hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer shadow-xl hover:shadow-blue-500/10"
      onClick={() => onClick(item)}
    >
      {/* Background Decoration */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
          item.color
        )}
      />

      {/* Type Badge */}
      <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-foreground/70">
        {item.type}
      </div>

      {/* Icon Circle */}
      <div
        className={cn(
          "relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-300",
          item.color
        )}
      >
        {item.icon}
      </div>

      <h2 className="relative z-10 text-2xl font-bold mb-4 text-foreground">
        {item.title}
      </h2>
      <p className="relative z-10 text-muted-foreground mb-10 line-clamp-3">
        {item.description}
      </p>

      <button className="relative z-10 flex items-center space-x-2 px-6 py-3 bg-foreground text-background font-semibold rounded-2xl group-hover:scale-105 active:scale-95 transition-all shadow-md group-hover:shadow-lg">
        <span className="text-sm">
          {item.type === "image"
            ? "View Image"
            : item.type === "video"
            ? "Watch Now"
            : "Read Post"}
        </span>
      </button>
    </motion.div>
  );
};

export default Card;
