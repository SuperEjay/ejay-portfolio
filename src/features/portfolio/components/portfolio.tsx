import { PortfolioLayout } from './layout'
import PortfolioNav from './portfolio-nav'
import PortfolioSidebar from './portfolio-sidebar'
import PortfolioContent from './portfolio-content'

export default function Portfolio() {
  return (
    <PortfolioLayout>
      <div className="max-w-[1300px] mx-auto w-full">
        {/* Mobile: Stack layout, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-4 sm:gap-6 items-start">
          {/* Sidebar - Full width on mobile, fixed width on desktop */}
          <div className="w-full lg:sticky lg:top-4">
            <PortfolioSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full min-h-screen bg-white dark:bg-[#1e1e1e] rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] p-4 sm:p-6 lg:p-8 pt-4 sm:pt-8 lg:pt-12 pb-24 sm:pb-6 lg:pb-8 transition-colors relative">
            {/* Navigation - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute -top-4 sm:-top-5 lg:-top-6 right-4 sm:right-6 lg:right-8 z-10">
              <PortfolioNav />
            </div>

            <PortfolioContent />
          </div>

          {/* Mobile Navigation - Bottom fixed, centered */}
          <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <PortfolioNav isMobile />
          </div>
        </div>
      </div>
    </PortfolioLayout>
  )
}
