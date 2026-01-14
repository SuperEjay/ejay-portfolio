interface PortfolioLayoutProps {
  children: React.ReactNode
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen p-16 bg-[#f0f0f0] dark:bg-[#121212] w-full transition-colors">
      {children}
    </div>
  )
}
