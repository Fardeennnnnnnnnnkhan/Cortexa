
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[160px] animate-pulse delay-700" />
      
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 Text */}
        <div className="relative inline-block">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
              Lost in Space
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            The page you're looking for has drifted beyond our reach. Let's get you back to safety.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild variant="default" size="lg" className="rounded-full px-8 h-12 shadow-lg shadow-primary/20 group">
            <Link href="/app" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 border-white/10 hover:bg-white/5 transition-all">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Link>
          </Button>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-0 right-0 animate-bounce delay-300 opacity-20 pointer-events-none">
            <Search className="size-12 text-blue-400" />
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}
