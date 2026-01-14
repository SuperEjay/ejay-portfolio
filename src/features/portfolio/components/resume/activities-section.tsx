import { Calendar } from 'lucide-react'

import activitiesData from '../../data/activities.json'
import { ResumeItem } from './resume-item'

export function ActivitiesSection() {
  return (
    <section className="mb-8 sm:mb-12 animate-slide-in-left">
      <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <Calendar className="size-4 sm:size-5 text-[#ef4444] terminal:text-[#00ff00]" />
        Activities
      </h3>
      <div className="space-y-0">
        {activitiesData.map((item, index) => (
          <ResumeItem
            key={index}
            title={item.title}
            company={item.company}
            location={item.location}
            period={item.period}
            bullets={item.bullets}
            isLast={index === activitiesData.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
