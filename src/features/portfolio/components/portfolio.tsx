import { PortfolioLayout } from './layout'
import PortfolioNav from './portfolio-nav'
import PortfolioSidebar from './portfolio-sidebar'
import PortfolioContent from './portfolio-content'

export default function Portfolio() {
  return (
    <PortfolioLayout>
      <div className="max-w-[1300px] mx-auto w-full">
        <div className="grid grid-cols-[20%_80%] gap-6 items-start">
          <div className="sticky top-4">
            <PortfolioSidebar />
          </div>
          <div className="min-h-screen bg-white dark:bg-[#1e1e1e] rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] p-8 transition-colors">
            <div className="mb-8">
              <PortfolioNav />
            </div>
            <PortfolioContent />
          </div>
        </div>
      </div>
    </PortfolioLayout>
  )
}
