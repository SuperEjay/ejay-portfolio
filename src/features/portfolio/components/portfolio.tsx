import { PortfolioLayout } from './layout'
import PortfolioSidebar from './portfolio-sidebar'

export default function Portfolio() {
  return (
    <PortfolioLayout>
      <div className="max-w-[1200px] mx-auto w-full">
        {/* create grid layout with 2 columns where first column is 1/2 and second column is 1/2 */}
        <div className="grid grid-cols-[20%_80%] gap-4">
          <PortfolioSidebar />
          <div className="border-2 border-green-500">
            <h1>Portfolio</h1>
          </div>
        </div>
      </div>
    </PortfolioLayout>
  )
}
