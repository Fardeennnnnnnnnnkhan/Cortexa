"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Target, 
  Cpu, 
  Layout, 
  Rocket, 
  ChevronRight 
} from "lucide-react";

const features = [
  {
    title: "AI Forensic Analysis",
    description: "Deep-learning algorithms deconstruct your technical background to identify hidden high-impact narratives that elite recruiters crave.",
    icon: Cpu,
    color: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-500",
    delay: 0.1
  },
  {
    title: "Behavioral Simulation",
    description: "Engage in reactive mock scenarios where the AI adapts its questioning style based on your unique biometric and narrative responses.",
    icon: Zap,
    color: "from-amber-500/20 to-amber-500/0",
    iconColor: "text-amber-500",
    delay: 0.2
  },
  {
    title: "Semantic Mapping",
    description: "Calibrate your resume against the industry's most rigorous ATS filters, ensuring 99.9% visibility in top-tier application pools.",
    icon: Target,
    color: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-500",
    delay: 0.3
  },
  {
    title: "Biometric Feedback",
    description: "Receive real-time sentiment analysis on your tone, pace, and clarity, allowing you to master your delivery with clinical precision.",
    icon: Shield,
    color: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-500",
    delay: 0.4
  },
  {
    title: "Scenario Architect",
    description: "Generate infinite mock scenarios tailored to specific company cultures—from the chaos of early-stage startups to the rigid structures of FAANG.",
    icon: Layout,
    color: "from-pink-500/20 to-pink-500/0",
    iconColor: "text-pink-500",
    delay: 0.5
  },
  {
    title: "Executive Calibration",
    description: "Your preparation is tuned by intelligence gathered from thousands of successful high-value placements at world-leading tech firms.",
    icon: Rocket,
    color: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-500",
    delay: 0.6
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-40 bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] border border-primary/20">
              Operational Core
            </div>
            <h2 className="text-6xl md:text-[7rem] font-[1000] leading-[0.85] tracking-tighter">
              ELITE TOOLSET. <br/> <span className="text-foreground/20">UNFAIR ADVANTAGE.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
              Deconstruct the interview process and reconstruct your competitive edge with our clinical suite of AI-driven capabilities.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="h-full p-10 rounded-[2rem] bg-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-700 flex flex-col group-hover:bg-muted/30 relative overflow-hidden">
                {/* Gradient Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                {/* Icon Section */}
                <div className="mb-10 relative">
                  <div className={`size-14 rounded-2xl bg-background border border-border/50 shadow-sm flex items-center justify-center ${feature.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="size-6" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4 flex-grow">
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors duration-500 uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Interactive Link */}
                <div className="mt-10 pt-6 border-t border-border/10 flex items-center justify-between group/link cursor-pointer">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 group-hover:text-primary transition-colors">
                    Explore Capability
                  </span>
                  <ChevronRight className="size-4 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Stats or Proof at Bottom */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
           viewport={{ once: true }}
           className="mt-24 pt-16 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-12"
        >
           {[
             { label: "AI Scenarios", value: "50k+" },
             { label: "Success Rate", value: "98.4%" },
             { label: "Lvl-Up Speed", value: "3.2x" },
             { label: "Elite Firms", value: "200+" }
           ].map((stat, i) => (
             <div key={i} className="space-y-1">
                <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </motion.div>
      </div>
    </section>
  );
}