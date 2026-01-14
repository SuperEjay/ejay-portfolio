import {
  ActivitiesSection,
  EducationSection,
  ExperienceSection,
} from '../components/resume'

export default function ResumePage() {
  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="animate-fade-in"
    >
      <section className="mb-8 sm:mb-12 animate-slide-in-left">
        <h2 className="text-[#333333] dark:text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 relative inline-block">
          Resume
          <span className="absolute bottom-0 left-0 w-8 sm:w-12 h-1 bg-[#ef4444]" />
        </h2>

        <EducationSection />
        <ExperienceSection />
        <ActivitiesSection />
      </section>
    </div>
  )
}
