import { Code } from 'lucide-react'

import skillsData from '../../data/skills.json'

export function SkillsSection() {
  return (
    <section className="mb-8 sm:mb-12 animate-slide-in-right">
      <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <Code className="size-4 sm:size-5 text-[#ef4444] terminal:text-[#00ff00]" />
        My Skills
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {skillsData.categories.map((category, index) => (
          <div
            key={index}
            className="bg-[#f5f5f5] dark:bg-[#252525] terminal:bg-[#0a0a0a] rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 p-4 sm:p-6 animate-fade-in-up"
          >
            <h4 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-sm sm:text-base mb-3 sm:mb-4">
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium bg-[#ef4444]/10 terminal:bg-[#00ff00]/10 text-[#ef4444] terminal:text-[#00ff00] border border-[#ef4444]/20 terminal:border-[#00ff00]/30 dark:bg-[#ef4444]/20 dark:border-[#ef4444]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
