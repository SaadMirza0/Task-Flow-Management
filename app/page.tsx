
"use client"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {ArrowRight} from "lucide-react"

import Link from "next/link";
export default function Home() {
    const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };
  return (
  <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-500/30">
      

      {/* --- HERO SECTION --- */}
      <main className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-6 overflow-hidden">
        
        {/* Abstract Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 max-w-4xl pt-12"
        >
          <motion.h1 variants={containerVariants} className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
            Work Smarter, <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Not Harder.
            </span>
          </motion.h1>
          
          <motion.p variants={containerVariants} className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Task Flow Management helps you visualize your daily progress with a clean, distraction-free interface.
          </motion.p>

          <motion.div variants={containerVariants}>
            <Show when={"signed-in"}>
      <motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="relative group"
>
  {/* External Ambient Glow */}
  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

  <div className="relative flex flex-col items-center bg-[#0B0F1A] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden">
    
    {/* Animated "System Online" Indicator */}
    <div className="absolute top-6 right-6 flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Session</span>
    </div>

    {/* Icon/Avatar Placeholder */}
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/5 shadow-inner">
       <div className="text-4xl">🚀</div>
    </div>

    <h2 className="text-3xl font-black mb-2 text-white tracking-tight">
      Welcome Back!
    </h2>
    <p className="text-slate-400 text-sm mb-8 font-medium">
      Your workspace is synced and ready.
    </p>
    
    <Link href="/TaskPage" className="w-full">
      <motion.button 
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full group/btn overflow-hidden bg-white text-slate-950 px-12 py-4 rounded-2xl font-black text-lg shadow-[0_20px_40px_-15px_rgba(255,255,255,0.15)] transition-all"
      >
        {/* Button Hover Shine */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        
        <span className="flex items-center justify-center gap-3">
          Planning Dashboard
          <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
        </span>
      </motion.button>
    </Link>

    {/* Subtle Task Mini-Stat */}
    <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-around">
        <div className="text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Flow Status</p>
            <p className="text-xs font-bold text-blue-400">Peak Efficiency</p>
        </div>
        <div className="h-8 w-px bg-white/5"></div>
        <div className="text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Region</p>
            <p className="text-xs font-bold text-blue-400">Global Cloud</p>
        </div>
    </div>
  </div>

  <style jsx>{`
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
</motion.div>
            </Show>

            <Show when={"signed-out"}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <SignUpButton>
                  <motion.button 
                    whileHover={{ y: -4 }}
                    className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-bold text-lg shadow-white/10 shadow-2xl"
                  >
                    Create Free Account
                  </motion.button>
                </SignUpButton>
                
                <SignInButton>
                  <button className="px-10 py-4 rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/5 transition-all">
                    Sign In
                  </button>
                </SignInButton>
              </div>
              <p className="mt-8 text-slate-500 text-sm italic">Join 2,000+ productive users today.</p>
            </Show>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
