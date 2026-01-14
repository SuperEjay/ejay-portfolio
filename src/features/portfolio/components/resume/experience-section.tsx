import { Briefcase } from 'lucide-react'

import { ResumeItem } from './resume-item'

export function ExperienceSection() {
  return (
    <section className="mb-8 sm:mb-12 animate-slide-in-left">
      <h3 className="text-[#333333] dark:text-white text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <Briefcase className="size-4 sm:size-5 text-[#ef4444]" />
        Experience
      </h3>
      <div className="space-y-0">
        <ResumeItem
          title="Senior Software Developer"
          company="Springboard Philippines"
          location="Philippines"
          period="07/2020 — Present"
          bullets={[
            'Led the design and development of a full maritime payroll system, combining accounting features and crew management into one streamlined platform',
            'Led a team of developers as the lead, overseeing the planning, development, and delivery of web applications',
            'Helped clients smoothly migrate their WordPress websites to different hosting providers, offering hands-on support and training when needed',
            'Collaborated with a cross-functional team to build a modern e-commerce platform for DutyFree Philippines',
            'Worked closely with clients to gather requirements, give product demos, and quickly respond to questions and feedback',
            'Developed and deployed web and mobile applications for government-related projects, managing the full lifecycle from development to production',
            'Set up and maintained development and production environments, including API integrations and ensuring smooth deployment of applications',
          ]}
        />
        <ResumeItem
          title="Web Developer"
          company="Lee System Technology Ventures Inc"
          location="Caloocan City, Philippines"
          period="01/2019 — 07/2020"
          bullets={[
            'Maintained an in-house system, specifically in the field of human resources and accounting',
          ]}
          isLast
        />
      </div>
    </section>
  )
}
