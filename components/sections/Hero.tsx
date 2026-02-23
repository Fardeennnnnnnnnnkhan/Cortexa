import Link from "next/link"
import Hyperspeed from "../Hyperspeed"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import BlurText from "../BlurText"
import CurvedLoop from "../CurvedLoop"

export default function Hero(){
return(
 <section className="relative pt-48 pb-32 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Hyperspeed Background - Restricted to Hero */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Hyperspeed
            effectOptions={{
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xffffff,
                brokenLines: 0xffffff,
                leftCars: [0xec4899, 0x8b5cf6, 0x3b82f6],
                rightCars: [0x2dd4bf, 0x06b6d4, 0x3b82f6],
                sticks: 0x2dd4bf
              }
            }}
          />

          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
          {/* Bottom Gradient for Smooth Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <BlurText text="Next-Gen AI Job Preparation" delay={40} animateBy="letters" className="text-xs font-medium" />
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 flex flex-wrap items-center justify-center gap-x-4">
            <BlurText 
              text="Master your career with" 
              delay={50} 
            />
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent pb-1">
              <BlurText 
                text="AI-driven intelligence." 
                delay={50}
                className="inline-block"
                animationFrom={{ opacity: 0, y: 20 }}
                animationTo={[{ opacity: 1, y: 0 }]}
              />
            </span>
          </h1>

          <div className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            <BlurText 
              text="Cortexa helps you practice interviews, refine technical skills, and tailor your resume for every job description." 
              delay={20} 
              className="block"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button size="lg" className="rounded-full px-8 text-lg h-12 shadow-lg shadow-primary/20 group">
              <Link href="/app">Get Started for Free</Link>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Creative Dual-Layer Background Pattern */}
        <div className="absolute inset-0 pointer-events-none z-20 select-none overflow-hidden hover:opacity-100 transition-opacity duration-1000">
          {/* Top Layer: Bold & Visible */}
          {/* <div className="absolute left-0 right-0 w-full opacity-40">
            <CurvedLoop 
              marqueeText="CORTEXA AI • FUTURE READY • MASTER YOUR CAREER • "
              speed={1}
              curveAmount={0}
              className="fill-muted-foreground/20 text-9xl md:text-[10rem] tracking-tighter uppercase font-black"
            />
          </div> */}
          {/* Bottom Layer: Technical Outline */}
        </div>
          <div className="absolute left-0 right-0 top-[80] w-full opacity-100">
            <CurvedLoop 
              marqueeText="CORTEXA • CORTEXA • CORTEXA • "
              speed={1}
              curveAmount={0}
              className="fill-transparent stroke-muted-foreground stroke-[1px] text-8xl md:text-[25rem] tracking-tighter uppercase font-black"
            />
          </div>
      </section>
)
}

