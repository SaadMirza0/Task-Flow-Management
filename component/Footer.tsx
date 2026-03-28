"use client"
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail, ArrowUpRight } from "lucide-react";

  const socials = [
    { icon: <FaGithub />, link: "https://github.com/SaadMirza0", hover: "hover:bg-white hover:text-black" },
    { icon: <FaLinkedin />, link: "https://linkedin.com", hover: "hover:bg-[#0077b5] hover:text-white" },
    { icon: <FaInstagram />, link: "https://instagram.com/saadmirza.dev", hover: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-600 hover:text-white" },
    { icon: <FaWhatsapp />, link: "https://wa.me/913010544620", hover: "hover:bg-[#25d366] hover:text-white" },
    { icon: <Mail />, link: "mailto:saadmirzapak@gmail.com", hover: "hover:bg-blue-500 hover:text-white" },
  ];
export default function Footer(){
    return(
  <footer className=" border-t-2 border-slate-900 bg-[#030712] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Creative Credit */}
          <div className="group flex flex-col gap-2 items-center md:items-start">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 group-hover:text-blue-500 transition-colors">
              Project Architect
            </p>
            <a 
              href="https://saadmirzaportfolio.vercel.app" 
              target="_blank"
              className="flex items-center gap-2 text-2xl font-bold text-white group-hover:tracking-wider transition-all duration-500"
            >
              SAAD MIRZA
              <motion.span 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowUpRight size={20} className="text-blue-500" />
              </motion.span>
            </a>
          </div>

          {/* Right: Solid Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-slate-400 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 ${social.hover}`}
              >
                <span className="text-xl">{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-900 pt-8 gap-4">
          <div className="flex gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Efficiency</span>
            <span className="hover:text-white cursor-pointer transition-colors">Design</span>
            <span className="hover:text-white cursor-pointer transition-colors">Success</span>
          </div>
          
          <div className="text-[10px] font-black text-slate-700 bg-slate-900/50 px-4 py-2 rounded-full tracking-[0.2em]">
            © {new Date().getFullYear()} Task-Flow-Management
          </div>
        </div>
      </div>
    </footer>
    )
}