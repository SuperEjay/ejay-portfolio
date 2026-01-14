import { GraduationCap } from 'lucide-react'

import educationData from '../../data/education.json'
import { ResumeItem } from './resume-item'

export function EducationSection() {
  return (
    <section className="mb-8 sm:mb-12 animate-slide-in-right">
      <h3 className="text-[#333333] dark:text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <GraduationCap className="size-4 sm:size-5 text-[#ef4444]" />
        Education
      </h3>
      <div className="space-y-0">
        {educationData.map((item, index) => (
          <ResumeItem
            key={index}
            title={item.title}
            company={item.company}
            location={item.location}
            period={item.period}
            bullets={item.bullets}
            isLast={index === educationData.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
