
"use client";

import { Button } from "@/components/ui/button";
import { ShieldAlert, RefreshCcw, Home, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ArcjetErrorPage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center space-y-8 z-10"
      >
        <div className="flex justify-center">
          <div className="size-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShieldAlert className="size-12 text-red-500 relative z-10" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Security Checkpoint
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your connection looks a bit unusual. To keep our platform secure, we've temporarily paused this session.
          </p>
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 mt-6">
            <p className="text-red-400 text-sm font-medium flex items-center justify-center gap-2">
              <Lock className="size-4" />
              Potential rate limit or unusual activity detected.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <Button 
            onClick={handleReload}
            size="lg" 
            className="rounded-full h-14 text-lg font-bold bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <RefreshCcw className="mr-2 size-5" />
            Reload Page
          </Button>
          
          <Button asChild variant="ghost" size="lg" className="rounded-full h-14 text-muted-foreground hover:text-white transition-colors">
            <Link href="/">
              <Home className="mr-2 size-5" />
              Return Home
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground/50 pt-8 uppercase tracking-[0.2em]">
          Protected by Arcjet Intelligence
        </p>
      </motion.div>

      {/* Atmospheric Particles Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
