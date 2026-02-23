"use client";

import React from 'react';
import { BookOpenIcon, BrainCircuit, FileSlidersIcon, LogOut, SpeechIcon, User } from 'lucide-react';
import { SignOutButton, useClerk } from '@clerk/nextjs';
import { ThemeToggler } from '@/components/ui/ThemeToggler';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

import { useParams, usePathname } from "next/navigation"
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: "Interviews", href: "interviews", Icon: SpeechIcon },
  { name: "Questions", href: "questions", Icon: BookOpenIcon },
  { name: "Resume", href: "resumes", Icon: FileSlidersIcon },
]

const Navbar = ({ user }: { user: { name: string; imageUrl: string } }) => {
  const {  openUserProfile } = useClerk();
  const {jobInfoId} = useParams()
  const pathname= usePathname()

  return (
    <nav className="flex items-center justify-between px-6 border-b h-header bg-background">
      <div className="flex items-center gap-2">
        <Link href="/app">
        {/* <BrainCircuit className="size-6 text-primary" /> */}
        <span className="text-xl font-bold tracking-tight">Cortexa</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
      {typeof jobInfoId === "string" &&
  navLinks.map(({ name, href, Icon }) => {
    const hrefPath = `/app/job-infos/${jobInfoId}/${href}`
    const isActive = pathname === hrefPath

    return (
      <Button
        variant={pathname === hrefPath ? "secondary" : "ghost"}
        key={name}
        asChild
        className="cursor-pointer max-sm:hidden"
      >
        <Link href={hrefPath}>
          <Icon />
          {name}
        </Link>
      </Button>
    )
  })}


        <ThemeToggler />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="size-8 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => openUserProfile()} className="cursor-pointer">
                <User className='mr-2 h-4 w-4'/>
              Profile
            </DropdownMenuItem>
              <SignOutButton>
            <DropdownMenuItem  className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className='mr-2 h-4 w-4'/>
            Logout
            </DropdownMenuItem>
              </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
