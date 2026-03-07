"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 md:py-40 bg-background overflow-hidden relative border-t border-border/40">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <h2 className="text-5xl md:text-[8rem] font-black leading-[0.9] tracking-tighter">
              <span className="text-foreground/20 dark:text-white/20 block uppercase">BUILT TO PREPARE.</span>
              <span className="text-foreground dark:text-white block uppercase">DESIGNED TO CONQUER.</span>
            </h2>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pt-12">
              <Link href="/app">
                <Button 
                  size="lg" 
                  className="bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 border-none rounded-2xl px-10 h-16 text-xl font-bold group transition-all duration-500 shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95"
                >
                  <span className="text-primary italic mr-2 text-2xl group-hover:rotate-12 transition-transform inline-block">*</span>
                  Try Cortexa for free
                </Button>
              </Link>
              
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground text-base md:text-xl font-black uppercase tracking-[0.2em] leading-tight">
                  Join 10,000+ candidates 
                </p>
                <div className="flex items-center gap-2">
                   <div className="h-px w-8 bg-primary/40" />
                   <p className="text-muted-foreground/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
                      Mastering the elite trajectory
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
