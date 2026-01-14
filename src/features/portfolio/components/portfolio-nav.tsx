import type { PageType } from '../types'

import ThemeToggle from '@/components/theme-toggle'

interface PortfolioNavProps {
  isMobile?: boolean
  activePage: PageType
  onNavigate: (page: PageType) => void
}

export default function PortfolioNav({
  isMobile = false,
  activePage,
  onNavigate,
}: PortfolioNavProps) {
  const navItems: Array<{ label: string; page: PageType }> = [
    { label: 'About', page: 'about' },
    { label: 'Resume', page: 'resume' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Contact', page: 'contact' },
  ]

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <nav className="flex items-center justify-center gap-4 bg-white/70 dark:bg-[#252525]/70 backdrop-blur-2xl rounded-2xl px-6 py-3.5 shadow-2xl border border-[#e0e0e0]/50 dark:border-[#3d3d3d]/30 safe-area-pb transition-colors supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-[#252525]/60">
        {navItems.map((item) => {
          const isActive = activePage === item.page
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? 'text-white bg-[#ef4444]'
                  : 'text-[#666666] dark:text-[#a0a0a0] hover:bg-[#f0f0f0] dark:hover:bg-[#3d3d3d]'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    )
  }

  // Desktop navigation
  return (
    <div className="flex justify-end animate-fade-in-down">
      <nav className="flex items-center gap-4 md:gap-6 lg:gap-8 bg-[#f5f5f5] dark:bg-[#252525] rounded-full px-4 md:px-6 lg:px-8 py-3 lg:py-4 border border-[#e0e0e0] dark:border-transparent shadow-lg transition-colors">
        {navItems.map((item) => {
          const isActive = activePage === item.page
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
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
            </button>
          )
        })}
        <div className="w-px h-5 bg-[#d0d0d0] dark:bg-[#3d3d3d]" />
        <ThemeToggle />
      </nav>
    </div>
  )
}
