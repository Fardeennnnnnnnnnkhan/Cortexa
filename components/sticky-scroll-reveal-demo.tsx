"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { MessageSquareCode, FileText, Search, Zap } from "lucide-react";

const content = [
  {
    title: "Real-time AI Interview Simulation",
    description:
      "Precision-engineered interviews that mirror the rigor of top-tier engineering firms. Get deep, behavioral, and technical evaluation in a high-fidelity environment built on industry benchmarks.",
    content: (
      <div className="h-full w-full overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
          className="h-full w-full object-cover grayscale brightness-50 contrast-125" 
          alt="AI Interview Interface" 
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-primary/10 transition-colors duration-700" />
        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-3">
             <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active Analysis</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Resume Calibration Engine",
    description:
      "Our AI doesn't just scan; it calibrates. We rewrite and re-structure your experience to match the exact semantic expectations of high-performance Applicant Tracking Systems.",
    content: (
      <div className="h-full w-full overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1626084300762-52d72a334aa4?q=80&w=2070&auto=format&fit=crop" 
          className="h-full w-full object-cover grayscale brightness-50" 
          alt="Resume Calibration" 
        />
        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay" />
        <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
      </div>
    ),
  },
  {
    title: "JD Intelligence Mining",
    description:
      "Surface the invisible requirements. Our engine identifies the core competencies and soft skills hidden within complex job descriptions so you never miss a critical detail.",
    content: (
      <div className="h-full w-full overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
          className="h-full w-full object-cover grayscale brightness-50 contrast-150" 
          alt="Intelligence Mining" 
        />
        <div className="absolute inset-0 bg-background/40 mix-blend-darken" />
      </div>
    ),
  },
  {
    title: "Trajectory Tracking",
    description:
      "A complete roadmap to your target role. Compare your current performance against senior-level competency models and identify the exact path to your next promotion.",
    content: (
      <div className="h-full w-full overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop" 
          className="h-full w-full object-cover grayscale brightness-50" 
          alt="Career Trajectory" 
        />
        <div className="absolute inset-0 bg-primary/10 transition-opacity" />
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full">
      <StickyScroll content={content} />
    </div>
  );
}
