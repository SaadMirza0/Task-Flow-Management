
"use client"
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, Zap, Globe } from "lucide-react";
import Link from "next/link";
export default function Home() {
 
  return (
   <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
      <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
        
        {/* Simplified Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />

        {/* Hero Section */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="reveal text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1]">
            Work <span className="text-blue-500">Smarter,</span> <br />
            Not Harder.
          </h1>
          
          <p className="reveal delay-text text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            A minimalist workspace for high-performing teams to visualize progress without the noise.
          </p>

          <div className="reveal delay-card">
            <Show when="signed-in">
              <div className="group relative mx-auto max-w-md">
                {/* Subtle Glow Border */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
                
                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl">
                  <div className="flex flex-col items-center gap-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Ready to Focus</p>
                    </div>

                    <Link href="/TaskPage" className="w-full">
                      <button className="w-full bg-white text-slate-950 h-14 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-white/5">
                        Open Dashboard
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>

                    {/* Minimal Stats Bar */}
                    <div className="flex w-full items-center justify-between px-2 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Zap size={14} className="text-blue-400" />
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Live Flow</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-indigo-400" />
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Global</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Show>

            <Show when="signed-out">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignUpButton mode="modal">
                  <button className="w-full sm:w-auto px-10 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                    Get Started
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="w-full sm:w-auto px-10 py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </Show>
          </div>
        </div>
      </main>
    </div>
  );
}
