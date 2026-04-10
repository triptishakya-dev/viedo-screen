"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const VideoPlayerPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isActive, setIsActive] = useState(true);

  // High-reliability Nature Background from YouTube (Spring-like)
  // Using YouTube because it has the best global compatibility and bypasses many network blocks.
  const youtubeId = "ScMzIvxBSi4"; // Nature 4K - High Reliability
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0`;

  useEffect(() => {
    const channel = new BroadcastChannel('video-control');
    
    channel.onmessage = (event) => {
      if (event.data === 'play') {
        setIsActive(true);
      } else if (event.data === 'pause') {
        setIsActive(false);
      }
    };

    // Safety timeout: If the video takes more than 5 seconds to load, hide the loader anyway
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      channel.close();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/10 to-black z-10 pointer-events-none" />
      
      <div className="relative group w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 mx-4 bg-zinc-950">
        {isActive ? (
          <iframe
            src={youtubeUrl}
            className="w-[100%] h-[115%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl z-20 transition-all duration-700">
            <div className="w-28 h-28 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 animate-pulse shadow-inner">
              <Pause className="w-12 h-12 text-white/20" />
            </div>
            <p className="text-white/20 font-black tracking-[0.5em] uppercase text-[10px] drop-shadow-2xl">
              Remote Control Standby
            </p>
          </div>
        )}

        {/* Global Loading Overlay */}
        {isLoading && isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-30 transition-opacity duration-1000">
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <Loader2 className="w-14 h-14 text-blue-500/40 animate-spin" />
                <div className="absolute inset-0 blur-2xl bg-blue-500/10 animate-pulse" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-white/30 text-[9px] font-bold tracking-[0.4em] uppercase animate-pulse">Establishing Secure Stream</p>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Cinematic Watermark */}
        <div className="absolute top-12 left-12 z-20 flex items-center gap-5 group-hover:translate-x-1 transition-all duration-700 pointer-events-none opacity-80 group-hover:opacity-100">
          <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
          <div className="flex flex-col gap-1">
            <h2 className="text-white/90 text-2xl font-black tracking-tighter uppercase italic">Viedo Focus</h2>
            <p className="text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase">Spring Park Experience • Ultra HD</p>
          </div>
        </div>

        {/* Decorative Corner Accents */}
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/5 rounded-tr-3xl" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/5 rounded-bl-3xl" />
      </div>

      {/* Persistent Status Bar */}
      <div className="absolute bottom-12 flex items-center gap-6 px-8 py-3 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-white/10 transition-colors duration-500">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_15px] transition-all duration-1000 ${isActive ? 'bg-emerald-500 shadow-emerald-500 animate-pulse' : 'bg-red-500 shadow-red-500'}`} />
          <span className={`text-[9px] font-black tracking-[0.4em] uppercase transition-colors duration-1000 ${isActive ? 'text-emerald-500/60' : 'text-red-500/60'}`}>
            Signal Path: {isActive ? "Encrypted Live" : "Offline"}
          </span>
        </div>
        <div className="w-[1px] h-4 bg-white/10" />
        <span className="text-white/20 text-[9px] font-bold tracking-[0.4em] uppercase">
          Latency: <span className="text-white/40">24ms</span>
        </span>
      </div>
    </div>
  );
};


export default VideoPlayerPage;


