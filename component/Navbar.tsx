"use client"
import Link from "next/link"
import { UserButton,Show,SignInButton,SignUpButton } from "@clerk/nextjs"
import { motion } from "framer-motion";
export default function Navbar(){

    return (
  <nav className="flex items-center justify-between px-8 py-4 bg-[#0B0F1A] border-b border-slate-800/50 shadow-2xl sticky top-0 z-50 backdrop-blur-md">
      {/* Logo Section */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="text-xl font-extrabold tracking-tighter text-white cursor-pointer"
      >
        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            <Link href={"/"} >
          Logo
          </Link>
        </span>
      </motion.div>

      {/* Navigation Links */}
  <ul className="flex items-center gap-10 text-sm font-medium text-slate-400">
  {["WhiteBoard", "Tasks", "Another"].map((item) => (
    <motion.li
      key={item}
      whileHover={{ y: -2, color: "#60A5FA" }}
      className="relative cursor-pointer transition-colors duration-200 group"
      onClick={() => {
        if (item === "WhiteBoard") {
          // Scrolls to the bottom of the page where the Whiteboard is
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          });
        }
        if(item === "Tasks"){
            window.scrollTo({
                top:0,behavior:"smooth"
            })
        }
            if(item === "Another"){
            window.scrollTo({
                top:3000,behavior:"smooth"
            })
        }
      }}
    >
      {item}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
    </motion.li>
  ))}
</ul>


      {/* Auth Buttons */}
      <div className="flex items-center gap-5">
        <Show when={"signed-out"}>
          <SignInButton>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </motion.button>
          </SignInButton>
          
          <SignUpButton>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: `0px 0px 15px rgba(59, 130, 246, 0.5)` }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-900/20 transition-all"
            >
              Get Started
            </motion.button>
          </SignUpButton>
        </Show>

        <Show when={"signed-in"}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-1 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-[2px]"
          >
            <div className="bg-[#0B0F1A] rounded-full p-0.5">
              <UserButton />
            </div>
          </motion.div>
        </Show>
      </div>
    </nav>



    )
}