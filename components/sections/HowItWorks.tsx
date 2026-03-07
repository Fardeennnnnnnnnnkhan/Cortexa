"use client";

import { motion } from "framer-motion";
import { Zap, Search, Mic, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    phase: "01",
    title: "Profile Architecture",
    description: "Deconstruct your professional history to synthesize a dynamic, AI-optimized profile that speaks the direct language of executive recruiters.",
    icon: Zap,
    color: "bg-blue-500",
    image: "/step1.png"
  },
  {
    phase: "02",
    title: "Intelligence Calibration",
    description: "Identify hidden competency gaps and surface the precise keywords required to dominate top-tier ATS algorithms using semantic analysis.",
    icon: Search,
    color: "bg-emerald-500",
    image: "/step2.png"
  },
  {
    phase: "03",
    title: "Stress Simulations",
    description: "Enter a reactive environment where the AI adapts to your style, forcing you to master behavioral complexity and think on your feet.",
    icon: Mic,
    color: "bg-amber-500",
    image: "/step3.png"
  },
  {
    phase: "04",
    title: "Secure the Offer",
    description: "Walk into the final round with absolute command of your roadmap. Translate your prep into a high-value placement at elite firms.",
    icon: Trophy,
    color: "bg-purple-500",
    image: "/step4.png"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Background architectural elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-border/40" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-border/40" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-border/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] border border-primary/20 mb-8">
              The Methodology
            </div>
            <h2 className="text-6xl md:text-[7rem] font-[1000] leading-[0.85] tracking-tighter mb-10">
              HOW <br/> <span className="text-foreground/20">CORTEXA</span> WORKS.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
              An elite, multi-phase framework designed to transform your professional trajectory through modular intelligence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="h-full p-8 md:p-10 rounded-[2.5rem] bg-muted/30 border border-border/50 hover:border-primary/30 transition-all duration-700 flex flex-col justify-between overflow-hidden relative">
                {/* Background number */}
                <div className="absolute -right-4 -top-4 text-[10rem] font-black text-foreground/[0.03] select-none group-hover:text-primary/[0.05] transition-colors duration-700">
                  {step.phase}
                </div>

                <div className="relative z-10 space-y-6">
                  <div className={`size-14 rounded-2xl ${step.color}/10 border border-${step.color}/20 flex items-center justify-center text-primary`}>
                    <step.icon className="size-6" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="pt-10 relative z-10">
                  <div className="h-px w-full bg-border group-hover:bg-primary/30 transition-colors duration-700 mb-6" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 group-hover:text-primary transition-colors">
                      Phase {step.phase}
                    </span>
                    <ArrowRight className="size-4 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for the section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between p-12 rounded-[3rem] bg-foreground text-background dark:bg-white dark:text-black gap-8"
        >
           <div className="space-y-2 text-center md:text-left">
              <h4 className="text-3xl font-black tracking-tight">Ready to initiate calibration?</h4>
              <p className="text-background/60 dark:text-black/60 font-medium">Step into the most advanced interview prep ecosystem.</p>
           </div>
           <Link href="/app">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white hover:scale-105 transition-transform font-bold text-lg">
                Start My Roadmap
              </Button>
           </Link>
        </motion.div>
      </div>
    </section>
  );
}
