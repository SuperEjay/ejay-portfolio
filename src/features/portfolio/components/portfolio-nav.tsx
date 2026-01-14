import { Link, useLocation } from '@tanstack/react-router'
import { Briefcase, FileText, Mail, User } from 'lucide-react'

import ThemeToggle from '@/components/theme-toggle'

interface PortfolioNavProps {
  isMobile?: boolean
}

export default function PortfolioNav({ isMobile = false }: PortfolioNavProps) {
  const location = useLocation()
  const navItems = [
    { label: 'About', href: '/portfolio', icon: User },
    { label: 'Resume', href: '/portfolio/resume', icon: FileText },
    { label: 'Portfolio', href: '/portfolio/portfolio', icon: Briefcase },
    { label: 'Contact', href: '/portfolio/contact', icon: Mail },
  ]

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <nav className="flex items-center justify-around bg-white dark:bg-[#252525] border-t border-[#e0e0e0] dark:border-[#3d3d3d] px-2 py-3 safe-area-pb transition-colors">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                isActive
                  ? 'text-[#ef4444]'
                  : 'text-[#666666] dark:text-[#a0a0a0]'
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
        <ThemeToggle />
      </nav>
    )
  }

  // Desktop navigation
  return (
    <div className="flex justify-end animate-fade-in-down">
      <nav className="flex items-center gap-4 md:gap-6 lg:gap-8 bg-[#f5f5f5] dark:bg-[#252525] rounded-full px-4 md:px-6 lg:px-8 py-3 lg:py-4 border border-[#e0e0e0] dark:border-transparent shadow-lg transition-colors">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`relative font-medium text-sm md:text-base transition-colors pb-1 group ${
                isActive
                  ? 'text-[#ef4444]'
                  : 'text-[#666666] dark:text-white/80 hover:text-[#ef4444]'
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#ef4444] transition-all ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          )
        })}
        <div className="w-px h-5 bg-[#d0d0d0] dark:bg-[#3d3d3d]" />
        <ThemeToggle />
      </nav>
    </div>
  )
}
