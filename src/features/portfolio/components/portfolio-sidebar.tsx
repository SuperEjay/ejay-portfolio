import {
  CalendarDays,
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
    <div className="flex items-start gap-3 w-full">
      <div className="p-2 rounded-lg border border-[#ef4444] text-[#ef4444] shrink-0 bg-[#ef4444]/10">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-[#a0a0a0] text-xs uppercase tracking-wide font-medium">
          {label}
        </span>
        <span className="text-white text-xs truncate" title={value}>
          {value}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className="block hover:opacity-80 transition-opacity"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return content
}

export default function PortfolioSidebar() {
  return (
    <div
      className="flex flex-col gap-6 px-4 py-10 bg-[#252525] rounded-lg border border-[#3d3d3d] shadow-lg h-fit"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Profile Section */}
      <div className="flex flex-col gap-[25px] w-full items-center">
        <div className="w-[200px]">
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
        <p className="text-white text-center font-bold text-[18px]">
          Earnest John Gungon
        </p>
        <Badge
          variant="outline"
          className="border-[#4a4a4a] text-[#a0a0a0] bg-transparent font-normal"
        >
          Software Engineer
        </Badge>
      </div>

      <div className="w-full h-px bg-[#3d3d3d]" />

      <div className="flex flex-col gap-4 px-2">
        <ContactItem
          icon={<Mail className="size-5" />}
          label="Email"
          value="earnest0987@gmail.com"
          href="mailto:earnest0987@gmail.com"
        />
        <ContactItem
          icon={<Phone className="size-5" />}
          label="Phone"
          value="(+63) 9386134057"
          href="tel:+639386134057"
        />
        <ContactItem
          icon={<CalendarDays className="size-5" />}
          label="Birthday"
          value="October 29, 1999"
        />
        <ContactItem
          icon={<MapPin className="size-5" />}
          label="Location"
          value="Navotas, Metro Manila Philippines"
        />
      </div>

      <div className="flex justify-center gap-4 pt-2">
        <a
          href="https://www.facebook.com/ejohngungon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#a0a0a0] hover:text-[#06b6d4] transition-colors"
          aria-label="Facebook"
        >
          <Facebook className="size-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/superejay/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#a0a0a0] hover:text-[#06b6d4] transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="size-5" />
        </a>
        <a
          href="https://github.com/SuperEjay"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#a0a0a0] hover:text-[#06b6d4] transition-colors"
          aria-label="GitHub"
        >
          <Github className="size-5" />
        </a>
      </div>
    </div>
  )
}
