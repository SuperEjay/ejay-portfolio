import { useState } from 'react'
import {
  CalendarDays,
  ChevronDown,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'

interface ContactItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const content = (
    <div className="flex items-start gap-3 w-full group">
      <div className="p-2 rounded-lg border border-[#ef4444] text-[#ef4444] shrink-0 bg-[#ef4444]/10 group-hover:border-[#ef4444] group-hover:text-[#ef4444] group-hover:bg-[#ef4444]/20 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-[#666666] dark:text-[#a0a0a0] group-hover:text-[#ef4444] text-xs uppercase tracking-wide font-medium transition-colors">
          {label}
        </span>
        <span className="text-[#333333] dark:text-white text-xs sm:text-sm truncate" title={value}>
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
      className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 py-6 sm:py-10 bg-white dark:bg-[#252525] rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] shadow-lg h-fit animate-fade-in-up transition-colors"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Profile Section - Always visible */}
      <div className="flex flex-col sm:flex-col lg:flex-col gap-4 sm:gap-[25px] w-full items-center">
        {/* Mobile: Horizontal layout, Desktop: Vertical */}
        <div className="flex lg:flex-col items-center gap-4 lg:gap-[25px] w-full">
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
          <div className="flex flex-col gap-2 lg:items-center">
            <p className="text-[#333333] dark:text-white font-bold text-base sm:text-lg lg:text-[18px] lg:text-center">
              Earnest John Gungon
            </p>
            <Badge
              variant="outline"
              className="border-[#d0d0d0] dark:border-[#4a4a4a] text-[#666666] dark:text-[#a0a0a0] bg-transparent font-normal w-fit"
            >
              Software Engineer
            </Badge>
          </div>
        </div>

        {/* Show Contacts Button - Mobile only */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex lg:hidden items-center gap-2 text-[#ef4444] text-sm font-medium mt-2"
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
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'
        }`}
      >
        <div className="w-full h-px bg-[#e0e0e0] dark:bg-[#3d3d3d]" />

        {/* Contact items - 2 columns on tablet, 1 column on mobile/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 px-0 sm:px-2">
          <ContactItem
            icon={<Mail className="size-4 sm:size-5" />}
            label="Email"
            value="earnest0987@gmail.com"
            href="mailto:earnest0987@gmail.com"
          />
          <ContactItem
            icon={<Phone className="size-4 sm:size-5" />}
            label="Phone"
            value="(+63) 9386134057"
            href="tel:+639386134057"
          />
          <ContactItem
            icon={<CalendarDays className="size-4 sm:size-5" />}
            label="Birthday"
            value="October 29, 1999"
          />
          <ContactItem
            icon={<MapPin className="size-4 sm:size-5" />}
            label="Location"
            value="Navotas, Metro Manila Philippines"
          />
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <a
            href="https://www.facebook.com/ejohngungon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] dark:text-[#a0a0a0] hover:text-[#ef4444] transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/superejay/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] dark:text-[#a0a0a0] hover:text-[#ef4444] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href="https://github.com/SuperEjay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] dark:text-[#a0a0a0] hover:text-[#ef4444] transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
