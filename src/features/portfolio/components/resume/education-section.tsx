import { GraduationCap } from 'lucide-react'

import { ResumeItem } from './resume-item'

export function EducationSection() {
  return (
    <section className="mb-8 sm:mb-12 animate-slide-in-right">
      <h3 className="text-[#333333] dark:text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <GraduationCap className="size-4 sm:size-5 text-[#ef4444]" />
        Education
      </h3>
      <div className="space-y-0">
        <ResumeItem
          title="Bachelor of Science in Information Technology"
          company="Polytechnic University of the Philippines"
          location="Philippines"
          period="06/2014 — 05/2019"
          bullets={[
            'Completed a comprehensive program in Information Technology',
            'Focused on software development, database management, and system analysis',
          ]}
          isLast
        />
      </div>
    </section>
  )
}
