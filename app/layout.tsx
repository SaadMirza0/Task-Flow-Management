import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, Show, SignInButton, SignUpButton } from '@clerk/nextjs'
import Navbar from "../component/Navbar"
import Footer from "../component/Footer"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export const metadata: Metadata = {
  title: "TaskFlow | Elite Task Management & Strategy Canvas",
  description: "Master your workflow with TaskFlow. A high-performance task manager featuring an infinite strategy whiteboard, PostgreSQL persistence, and dark-mode optimization.",
  keywords: ["Task Management", "Strategy Board", "Kanban", "Productivity Tool", "Next.js Task App", "Saad Mirza"],
  authors: [{ name: "Saad Mirza", url: "https://saadmirzaportfolio.vercel.app" }],
  creator: "Saad Mirza",
  
 
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "taskmanagmentbysm.vercel.app", 
    title: "TaskFlow | Visual Workflow Management",
    description: "The professional way to track daily work and visualize complex projects on an infinite canvas.",
    siteName: "TaskFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskFlow Dashboard Preview",
      },
    ],
  },

  
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow | Smart Task Management",
    description: "Track work, visualize strategy, and deploy tasks faster.",
    creator: "@your_twitter_handle",
    images: ["/og-image.png"], 
  },

  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
     <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          <Navbar/>
            {children}
         
 <Footer/>
      </body>
    </html>
           </ClerkProvider>
  );
}