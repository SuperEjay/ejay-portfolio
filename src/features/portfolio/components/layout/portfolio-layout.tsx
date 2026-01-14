import AnimatedBackground from '@/components/animated-background'

interface PortfolioLayoutProps {
  children: React.ReactNode
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 w-full transition-colors relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
