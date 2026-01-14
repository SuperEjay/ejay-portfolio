import { useState } from 'react'

import { AboutPage, ContactPage, PortfolioPage, ResumePage } from '../pages'
import { usePageHead } from '../hooks/use-page-head'
import { PortfolioLayout } from './layout'
import PortfolioNav from './portfolio-nav'
import PortfolioSidebar from './portfolio-sidebar'
import WelcomeAnimation from './welcome-animation'
import type { PageType } from '../types'

export default function Portfolio() {
  const [activePage, setActivePage] = useState<PageType>('about')
  const [showWelcome, setShowWelcome] = useState(true)

  // Update head content based on active page
  usePageHead(activePage)

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage />
      case 'resume':
        return <ResumePage />
      case 'portfolio':
        return <PortfolioPage />
      case 'contact':
        return <ContactPage />
      default:
        return <AboutPage />
    }
  }

  return (
    <PortfolioLayout>
      {showWelcome && (
        <WelcomeAnimation onComplete={() => setShowWelcome(false)} />
      )}
      <div className="max-w-[1300px] mx-auto w-full">
        {/* Mobile: Stack layout, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] gap-4 sm:gap-6 items-start">
          {/* Sidebar - Full width on mobile, fixed width on desktop */}
          <div className="w-full lg:sticky lg:top-4">
            <PortfolioSidebar />
          </div>

          {/* Main Content Wrapper */}
          <div className="w-full min-w-0 relative">
            {/* Navigation - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute -top-1 sm:-top-2 lg:-top-3 right-4 sm:right-6 lg:right-8 z-20">
              <PortfolioNav
                activePage={activePage}
                onNavigate={setActivePage}
              />
            </div>

            {/* Main Content */}
            <div className="w-full min-h-screen overflow-hidden bg-white/60 dark:bg-[#1e1e1e]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 p-4 sm:p-6 lg:p-8 pt-12 sm:pt-14 lg:pt-16 pb-24 sm:pb-6 lg:pb-8 transition-colors shadow-lg">
              {renderPage()}
            </div>
          </div>

          {/* Mobile Navigation - Bottom fixed, centered */}
          <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <PortfolioNav
              isMobile
              activePage={activePage}
              onNavigate={setActivePage}
            />
          </div>
        </div>
      </div>
    </PortfolioLayout>
  )
}
