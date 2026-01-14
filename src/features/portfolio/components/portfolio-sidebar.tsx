import { useState } from 'react'
import { ChevronDown, Facebook, Github, Linkedin, Mail } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import ThemeToggle from '@/components/theme-toggle'

interface ContactItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const content = (
    <div className="flex items-start gap-3 w-full group">
      <div className="p-2 rounded-lg border border-[#ef4444] terminal:border-[#00ff00] text-[#ef4444] terminal:text-[#00ff00] shrink-0 bg-[#ef4444]/10 terminal:bg-[#00ff00]/10 group-hover:border-[#ef4444] terminal:group-hover:border-[#00ff00] group-hover:text-[#ef4444] terminal:group-hover:text-[#00ff00] group-hover:bg-[#ef4444]/20 terminal:group-hover:bg-[#00ff00]/20 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 group-hover:text-[#ef4444] terminal:group-hover:text-[#00ff00] text-xs uppercase tracking-wide font-medium transition-colors">
          {label}
        </span>
        <span
          className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-xs sm:text-sm truncate"
          title={value}
        >
          {value}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className="block transition-all hover:translate-x-1"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return <div className="block">{content}</div>
}

export default function PortfolioSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 py-6 sm:py-10 bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 shadow-lg h-fit animate-fade-in-up transition-colors"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Profile Section - Always visible */}
      <div className="flex flex-col sm:flex-col lg:flex-col gap-4 sm:gap-[25px] w-full items-center">
        {/* Mobile: Horizontal layout, Desktop: Vertical */}
        <div className="flex lg:flex-col items-center gap-4 lg:gap-[25px] w-full relative">
          <div className="w-[80px] sm:w-[120px] lg:w-[200px] shrink-0">
            <AspectRatio
              ratio={1}
              className="bg-muted rounded-lg overflow-hidden"
            >
              <img
                src="/assets/images/profile.jpg"
                alt="Earnest John Gungon"
                className="w-full h-full object-cover rounded-lg"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-2 lg:items-center flex-1">
            <p className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-base sm:text-lg lg:text-[18px] lg:text-center">
              Earnest John Gungon
            </p>
            <Badge
              variant="outline"
              className="border-[#d0d0d0] dark:border-[#4a4a4a] terminal:border-[#00ff00]/50 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 bg-transparent font-normal w-fit"
            >
              Software Engineer
            </Badge>
          </div>
          {/* Theme Toggle - Only visible on small screens */}
          <div className="absolute top-0 right-0 lg:hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Show Contacts Button - Mobile only */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex lg:hidden items-center gap-2 text-[#ef4444] terminal:text-[#00ff00] text-sm font-medium mt-2"
        >
          Show Contacts
          <ChevronDown
            className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Collapsible section on mobile, always visible on desktop */}
      <div
        className={`flex flex-col gap-4 sm:gap-6 overflow-hidden transition-all duration-300 ${
          isExpanded
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'
        }`}
      >
        <div className="w-full h-px bg-[#e0e0e0] dark:bg-[#3d3d3d] terminal:bg-[#00ff00]/30" />

        <div className="flex justify-center gap-4 pt-2">
          <a
            href="mailto:earnest0987@gmail.com"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 hover:bg-[#ef4444] terminal:hover:bg-[#00ff00] hover:text-white terminal:hover:text-[#0a0a0a] hover:border-[#ef4444] terminal:hover:border-[#00ff00] transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="size-5" />
          </a>
          <a
            href="https://www.facebook.com/ejohngungon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 hover:bg-[#ef4444] terminal:hover:bg-[#00ff00] hover:text-white terminal:hover:text-[#0a0a0a] hover:border-[#ef4444] terminal:hover:border-[#00ff00] transition-all duration-300"
            aria-label="Facebook"
          >
            <Facebook className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/superejay/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 hover:bg-[#ef4444] terminal:hover:bg-[#00ff00] hover:text-white terminal:hover:text-[#0a0a0a] hover:border-[#ef4444] terminal:hover:border-[#00ff00] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href="https://github.com/SuperEjay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 hover:bg-[#ef4444] terminal:hover:bg-[#00ff00] hover:text-white terminal:hover:text-[#0a0a0a] hover:border-[#ef4444] terminal:hover:border-[#00ff00] transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
