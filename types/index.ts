import React from "react";

export type MediaItem = {
  id: number;
  type: "image" | "video" | "blog";
  title: string;
  description: string;
  url?: string;
  thumbnail?: string;
  icon: React.ReactNode;
  color: string;
  content?: {
    author: string;
    date: string;
    readTime: string;
    text: string[];
  };
};
