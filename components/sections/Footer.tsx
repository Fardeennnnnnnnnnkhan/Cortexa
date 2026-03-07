"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "AI Interviews", href: "#features" },
        { label: "Resume Analysis", href: "#features" },
        { label: "How it Works", href: "#how-it-works" },
        { label: "Pricing", href: "#" },
        { label: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Legals",
      links: [
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "X (Twitter)", href: "https://twitter.com" },
        { label: "Instagram", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/fardeen-khan-077661290/" },
      ],
    },
  ];

  return (
    <footer className="relative bg-background border-t border-border/40 pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12 mb-24">
          {/* Brand/Navigation placeholder */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-foreground">Cortexa</h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              Empowering candidates with AI-driven intelligence for the world's most elite technical interviews.
            </p>
          </div>

          {/* Links Grid */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2 space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground/60">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact/Newsletter Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">Contact</h4>
              <p className="text-xs text-muted-foreground">The latest updates about Cortexa.</p>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email');
                const subject = encodeURIComponent("Interest in Cortexa");
                window.location.href = `mailto:fardeen14122004@gmail.com?subject=${subject}&body=Hello, I'm interested in Cortexa. My email is ${email}`;
              }}
              className="relative flex items-center group"
            >
              <input 
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
                className="w-full h-10 bg-muted/30 border border-border/50 px-4 pr-10 rounded-sm text-xs focus:outline-none focus:border-primary/50 transition-all text-foreground"
              />
              <button 
                type="submit" 
                className="absolute right-1 size-8 bg-primary hover:bg-primary/90 flex items-center justify-center rounded-sm transition-all group-hover:scale-105 active:scale-95 text-white"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Massive Branding Bottom */}
        <div className="relative pt-20 border-t border-border/10">
          <motion.div 
            className="flex flex-col items-start select-none group cursor-default relative pb-8 px-4"
            initial="initial"
            whileHover="hover"
          >
             {/* Simple Background Glow */}
             <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
             
             <motion.h2 
               variants={{
                 initial: { y: 0 },
                 hover: { 
                   y: -15,
                   transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
                 }
               }}
               className="text-[22vw] font-[1000] leading-[0.8] tracking-tighter flex items-center relative z-10 text-foreground dark:text-white group-hover:text-primary transition-colors duration-700"
             >
                Cortexa
                <motion.span 
                  variants={{
                    initial: { rotate: 0 },
                    hover: { 
                      rotate: 45,
                      transition: { duration: 0.8, ease: "anticipate" }
                    }
                  }}
                  className="text-primary italic inline-block origin-center ml-[0.02em] pb-[0.1em]"
                >
                  *
                </motion.span>
             </motion.h2>

             {/* Minimalist modern underline effect */}
             <div className="h-2 w-0 group-hover:w-[20%] bg-primary transition-all duration-1000 mt-[-2vw] ml-4 opacity-50" />
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              © {currentYear} Cortexa  • Built for the top 1%
            </p>
            <div className="flex items-center gap-8">
               <Link href="#" className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest">Trust</Link>
               <Link href="#" className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest">Status</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
