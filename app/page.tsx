"use client";

import  { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/ui/ThemeToggler";
import CardNav from "@/components/CardNav";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import LogoLoop from "@/components/LogoLoop";
import FlowingMenu from "@/components/FlowingMenu";
import { 
  SiGoogle, 
  SiMeta, 
  SiAmazon, 
  SiNetflix, 
  SiApple, 
  SiOpenai, 
  SiUber, 
  SiAirbnb, 
  SiSpotify
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import Stepper, { Step } from "@/components/Stepper";
import { UserPlus, Sparkles, Mic, Trophy } from "lucide-react";
import Footer from "@/components/sections/Footer";



export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stepperKey, setStepperKey] = useState(0);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      {/* <SplashCursor /> */}
      {/* Navigation */}
      <CardNav 
        logo={
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
             <Link href="/">Cortexa</Link>
            </span>
          </div>
        }
        baseColor="var(--background)"
        items={[
          {
            label: "Product",
            bgColor: "rgba(59, 130, 246, 0.1)",
            textColor: "var(--foreground)",
            links: [
              { label: "AI Interviews", href: "#", ariaLabel: "AI Interviews" },
              { label: "Roadmap", href: "#", ariaLabel: "Roadmap" }
            ]
          },
          {
            label: "Features",
            bgColor: "rgba(139, 92, 246, 0.1)",
            textColor: "var(--foreground)",
            links: [
              { label: "Resume Analysis", href: "#", ariaLabel: "Resume Analysis" },
              { label: "ATS Check", href: "#", ariaLabel: "ATS Check" }
            ]
          },
          {
            label: "Company",
            bgColor: "rgba(236, 72, 153, 0.1)",
            textColor: "var(--foreground)",
            links: [
              { label: "About Us", href: "#", ariaLabel: "About Us" },
              { label: "Blog", href: "#", ariaLabel: "Blog" }
            ]
          }
        ]}
        rightContent={
          <div className="flex items-center gap-4">
            <ThemeToggler />
            {isLoggedIn ? (
              <Button asChild variant="secondary" className="rounded-full shadow-sm">
                <Link href="/app">Dashboard</Link>
              </Button>
            ) : (
              <Button onClick={() => setIsLoggedIn(true)} variant="default" className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
                Sign In
              </Button>
            )}
          </div>
        }
      />

      {/* Hero Section */}
      <Hero/>


      {/* Features Section */}
      <Features/>

      {/* Trust Section - Big Tech Placement Loop */}
      <section className="py-24 bg-muted/30 border-y border-border/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Crack the World's Most Elite Teams
            </h2>
            <p className="text-lg text-muted-foreground">
              Master the art of technical and behavioral interviews on Cortexa to secure your position at world-leading tech giants.
            </p>
          </div>
        </div>
        
        <div className="relative w-full">
          {/* Enhanced Glassmorphism Overlays */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-muted/30 via-muted/10 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-muted/30 via-muted/10 to-transparent z-10 pointer-events-none" />
          
          <LogoLoop 
            speed={30}
            gap={100}
            logoHeight={48}
            pauseOnHover={true}
            className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
            logos={[
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiGoogle className="w-8 h-8" /> Google</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><FaMicrosoft className="w-8 h-8" /> Microsoft</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiMeta className="w-8 h-8" /> Meta</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiAmazon className="w-8 h-8 text-[#FF9900]" /> Amazon</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiNetflix className="w-8 h-8 text-[#E50914]" /> Netflix</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiApple className="w-8 h-8" /> Apple</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiOpenai className="w-8 h-8" /> OpenAI</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiUber className="w-8 h-8" /> Uber</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiAirbnb className="w-8 h-8 text-[#FF5A5F]" /> Airbnb</div> },
              { node: <div className="flex items-center gap-4 font-bold text-2xl tracking-tighter text-foreground/90"><SiSpotify className="w-8 h-8 text-[#1DB954]" /> Spotify</div> },
            ]}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-40 relative overflow-hidden border-b border-border/40 bg-background/30 backdrop-blur-[2px]">
        {/* Dynamic Atmospheric Blobs for Glass Clarity */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[160px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-emerald-500/10 rounded-full blur-[140px] animate-pulse delay-500" />
        
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-4">
            <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-[-0.04em] leading-[1.1] bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              Master the Path to <br/> Your Dream Career
            </h2>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              Our proven AI-driven methodology is designed to transform potential into performance in four powerful phases.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Stepper 
              key={stepperKey}
              onFinalStepCompleted={() => setStepperKey(prev => prev + 1)}
              contentClassName="min-h-[350px] md:min-h-[480px] flex items-center justify-center"
              nextButtonText="Next Phase"
              backButtonText="Previous"
            >
              <Step>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-4 md:p-16">
                  <div className="space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                      Phase 01
                    </div>
                    <h3 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight md:leading-none">
                      Architect Your <br/> Professional Identity
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Transform your PDF resume into a dynamic, AI-powered professional profile. We analyze years of experience to distill your unique value proposition.
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative bg-card/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-4 shadow-2xl">
                      <img src="/step1.png" alt="Profile Architecture" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
              </Step>
              
              <Step>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-4 md:p-16">
                  <div className="order-2 md:order-1 relative group">
                    <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative bg-card/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-4 shadow-2xl">
                      <img src="/step2.png" alt="AI Forensic Analysis" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest border border-accent/20">
                      Phase 02
                    </div>
                    <h3 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight md:leading-none">
                      Deep AI <br/> Forensic Analysis
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Leverage our proprietary ATS-matching engine to identify hidden gaps and surface critical keywords that standard scanners often miss.
                    </p>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-4 md:p-16">
                  <div className="space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                      Phase 03
                    </div>
                    <h3 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight md:leading-none">
                      High-Fidelity <br/> Simulation Practice
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Engage with an AI that adapts to your responses. Experience technical and behavioral simulations that mirror the rigor of top-tier tech firms.
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-amber-500/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative bg-card/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-4 shadow-2xl">
                      <img src="/step3.png" alt="Simulation Practice" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-4 md:p-16">
                  <div className="order-2 md:order-1 relative group">
                    <div className="absolute -inset-4 bg-emerald-500/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative bg-card/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-4 shadow-2xl">
                      <img src="/step4.png" alt="Executive Offer" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                  <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                      Phase 04
                    </div>
                    <h3 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight md:leading-none">
                      Secure the <br/> Executive Offer
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Walk into your interview with a roadmap built for success. Demonstrate absolute command over your narrative and secure your elite placement.
                    </p>
                  </div>
                </div>
              </Step>
            </Stepper>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
