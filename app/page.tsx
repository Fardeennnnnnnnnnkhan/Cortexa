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
import { UserPlus, Sparkles, Mic, Trophy } from "lucide-react";
import HowItWorks from "@/components/sections/HowItWorks";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";



export default function LandingPage() {
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
            label: "Platform",
            bgColor: "rgba(59, 130, 246, 0.05)",
            textColor: "var(--foreground)",
            links: [
              { label: "Features", href: "#features", ariaLabel: "View Features" },
              { label: "How it Works", href: "#how-it-works", ariaLabel: "View Process" },
              { label: "Success Stories", href: "#partners", ariaLabel: "View Partners" }
            ]
          },
          {
            label: "Solutions",
            bgColor: "rgba(16, 185, 129, 0.05)",
            textColor: "var(--foreground)",
            links: [
              { label: "AI Interviews", href: "/app", ariaLabel: "AI Interviews" },
              { label: "Resume Review", href: "/app", ariaLabel: "Resume Review" },
              { label: "Big Tech Prep", href: "#partners", ariaLabel: "Elite Preparation" }
            ]
          },
          {
            label: "Resources",
            bgColor: "rgba(245, 158, 11, 0.05)",
            textColor: "var(--foreground)",
            links: [
              { label: "Blog", href: "#", ariaLabel: "Read Blog" },
              { label: "Documentation", href: "#", ariaLabel: "View Docs" },
              { label: "Support", href: "#", ariaLabel: "Get Support" }
            ]
          }
        ]}
        rightContent={
          <div className="flex items-center gap-4">
            <ThemeToggler />
            <SignedIn>
              <Button asChild variant="secondary" className="rounded-full shadow-sm border border-border/50">
                <Link href="/app">Dashboard</Link>
              </Button>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "size-9 border border-border/50"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="default" className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        }
      />

      {/* Hero Section */}
      <Hero/>


      {/* Features Section */}
      <div id="features">
        <Features/>
      </div>

      {/* Trust Section - Big Tech Placement Loop */}
      <section id="partners" className="py-24 bg-muted/30 border-y border-border/50 relative overflow-hidden">
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

      <HowItWorks />

      {/* High-Impact CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
}
