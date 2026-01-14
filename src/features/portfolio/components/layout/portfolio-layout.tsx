import AnimatedBackground from '@/components/animated-background'

interface PortfolioLayoutProps {
  children: React.ReactNode
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen p-16 w-full transition-colors relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
