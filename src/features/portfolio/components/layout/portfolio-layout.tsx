interface PortfolioLayoutProps {
  children: React.ReactNode
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen p-16 bg-[#121212] w-full">
      {children}
    </div>
  )
}
