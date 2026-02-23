"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { MessageSquareCode, FileText, Search, Zap } from "lucide-react";

const content = [
  {
    title: "AI Interview Practice",
    description:
      "Practice real-time behavioral and technical interviews with our advanced AI that provides instant feedback. Our AI simulates real-world stress and provides detailed breakdowns of your performance, tone, and technical accuracy.",
    content: (
      <div className="h-full w-full overflow-hidden relative">
        <img 
          src="https://www.ttnews.com/sites/default/files/styles/article_full_width_image/public/2023-09/iTECH-Dysart-1200.jpg" 
          className="h-full w-full object-fit" 
          alt="AI Interview Interface" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
      </div>
    ),
  },
  {
    title: "Tailored Resume Suggestions",
    description:
      "Automatically optimize your resume for specific job descriptions to pass ATS and stand out to recruiters. We analyze the job requirements and suggest the perfect keywords and impact-driven bullet points to make your profile shine.",
    content: (
      <div className="h-full w-full overflow-hidden relative">
        <img 
          src="/resume-opt.png" 
          className="h-full w-full object-cover" 
          alt="Resume Optimization" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/40 to-transparent" />
      </div>
    ),
  },
  {
    title: "Job Description Deep Dive",
    description:
      "Uncover hidden requirements and key skills from job postings to better align your preparation. Stop guessing what the hiring manager wants and get a clear, prioritized list of what matters most in every role you apply for.",
    content: (
      <div className="h-full w-full overflow-hidden relative">
        <img 
          src="/job-analysis.png" 
          className="h-full w-full object-cover" 
          alt="Job Analysis Dashboard" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/40 to-transparent" />
      </div>
    ),
  },
  {
    title: "Instant Career Insights",
    description:
      "Get immediate feedback on your career trajectory and interview performance. Our system learns from thousands of successful hires to give you the exact roadmap needed to reach that senior-level position.",
    content: (
      <div className="h-full w-full overflow-hidden relative">
        <img 
          src="/career-roadmap.png" 
          className="h-full w-full object-cover" 
          alt="Career Roadmap" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/40 to-transparent shadow-[0_0_50px_rgba(var(--primary),0.3)]" />
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
