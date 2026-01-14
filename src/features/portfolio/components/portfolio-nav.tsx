import { Link, useLocation } from '@tanstack/react-router'

export default function PortfolioNav() {
  const location = useLocation()
  const navItems = [
    { label: 'About', href: '/portfolio' },
    { label: 'Resume', href: '/portfolio/resume' },
    { label: 'Portfolio', href: '/portfolio/portfolio' },
    { label: 'Contact', href: '/portfolio/contact' },
  ]

  return (
    <nav className="flex justify-end gap-6 mb-8">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <Link
            key={item.href}
            to={item.href}
            className={`relative pb-1 transition-colors group ${
              isActive
                ? 'text-[#ef4444]'
                : 'text-white hover:text-[#ef4444]'
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
    </nav>
  )
}
