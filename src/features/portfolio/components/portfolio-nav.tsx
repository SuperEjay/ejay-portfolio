import { Link, useLocation } from '@tanstack/react-router'

import ThemeToggle from '@/components/theme-toggle'

export default function PortfolioNav() {
  const location = useLocation()
  const navItems = [
    { label: 'About', href: '/portfolio' },
    { label: 'Resume', href: '/portfolio/resume' },
    { label: 'Portfolio', href: '/portfolio/portfolio' },
    { label: 'Contact', href: '/portfolio/contact' },
  ]

  return (
    <div className="flex justify-end animate-fade-in-down">
      <nav className="flex items-center gap-6 bg-[#f5f5f5] dark:bg-[#252525] rounded-full px-6 py-3 border border-[#e0e0e0] dark:border-[#3d3d3d] transition-colors">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`relative font-medium transition-colors pb-1 group ${
                isActive
                  ? 'text-[#ef4444]'
                  : 'text-[#666666] dark:text-[#a0a0a0] hover:text-[#ef4444]'
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
