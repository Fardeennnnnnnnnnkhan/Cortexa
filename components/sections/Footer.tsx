"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "AI Interviews", href: "#" },
        { label: "Roadmap", href: "#" },
        { label: "Resume Analysis", href: "#" },
        { label: "ATS Check", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#", badge: "Hiring" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  const socials = [
    { icon: Github, href: "https://github.com", label: "Github" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-border/40 bg-background/80 backdrop-blur-md pt-24 pb-12 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-3xl font-bold tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:to-primary transition-all duration-500">
                Cortexa
              </span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Empowering the next generation of professionals with AI-driven interview intelligence and career optimization.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-5">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/90">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors group"
                      >
                        {link.label}
                        {link.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {link.badge}
                          </span>
                        )}
                        <ExternalLink className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 lg:pl-12">
            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
                <Mail className="w-16 h-16" />
              </div>
              <h4 className="text-xl font-bold mb-3">Stay in the loop</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Get the latest insights on AI careers and product updates delivered to your inbox.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="h-12 bg-background/50 border-border/50 rounded-xl focus-visible:ring-primary/20 pl-4"
                  />
                </div>
                <Button className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/10 group">
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-[10px] text-center text-muted-foreground pt-2">
                  No spam. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Cortexa AI Labs. </span>
            <span className="hidden md:inline text-border/60">|</span>
            <span>All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Trust & Security
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Status
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
