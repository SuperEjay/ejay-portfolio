import { Calendar } from 'lucide-react'

import { ResumeItem } from './resume-item'

export function ActivitiesSection() {
  return (
    <section className="animate-slide-in-left">
      <h3 className="text-[#333333] dark:text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <Calendar className="size-4 sm:size-5 text-[#ef4444]" />
        Activities
      </h3>
      <div className="space-y-0">
        <ResumeItem
          title="Invited Speaker - Php is Not Dead - Laravel is Proof"
          company="Animo Labs HQ - De La Salle University Manila"
          location="Philippines"
          period="05/2025"
          bullets={[
            'Conducted a workshop that helped students and developers overcome barriers to learning PHP frameworks while debunking common myths about PHP',
          ]}
        />
        <ResumeItem
          title="Business Value Class"
          company="Orange and Bronze"
          location="Makati, Philippines"
          period="02/2025"
          bullets={[
            'A workshop inspired by the Business Value Game, designed to teach participants how to prioritize features, evaluate trade-offs, and make value-driven decisions that align with business goals',
          ]}
        />
        <ResumeItem
          title="Agile 101 Class"
          company="Orange and Bronze"
          location="Philippines"
          period="11/2024"
          bullets={[
            'An introductory workshop that teaches the fundamentals of Agile principles, frameworks, and team practices, helping participants understand how to deliver value through iterative and collaborative development',
          ]}
          isLast
        />
      </div>
    </section>
  )
}
