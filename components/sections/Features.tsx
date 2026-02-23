import StickyScrollRevealDemo from "../sticky-scroll-reveal-demo";

export default function Features(){
    return (
     <section className="py-24 relative bg-background z-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Elevate Your Preparation</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover the suite of AI-powered tools designed to help you land your dream role.</p>
              </div>
    
              <div className="max-w-7xl mx-auto">
                <StickyScrollRevealDemo />
              </div>
            </div>
          </section>
    )
}