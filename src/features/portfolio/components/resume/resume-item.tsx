interface ResumeItemProps {
  title: string
  company?: string
  location?: string
  period: string
  description?: string
  bullets?: Array<string>
  isLast?: boolean
}

export function ResumeItem({
  title,
  company,
  location,
  period,
  description,
  bullets,
  isLast = false,
}: ResumeItemProps) {
  return (
    <div className="flex gap-3 sm:gap-4 animate-fade-in-up">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444] terminal:bg-[#00ff00] shrink-0" />
        {!isLast && (
          <div className="w-0.5 h-full bg-[#e0e0e0] dark:bg-[#3d3d3d] terminal:bg-[#00ff00]/30 mt-1.5 sm:mt-2" />
        )}
      </div>
      <div className={`flex-1 ${!isLast ? 'pb-4 sm:pb-6' : ''}`}>
        <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-sm sm:text-base mb-0.5 sm:mb-1">
          {title}
        </h3>
        {company && (
          <p className="text-[#555555] dark:text-[#b0b0b0] terminal:text-[#00ff00]/80 text-xs sm:text-sm mb-0.5">
            {company}
            {location && ` • ${location}`}
          </p>
        )}
        <p className="text-[#ef4444] terminal:text-[#00ff00] text-xs sm:text-sm font-medium mb-1 sm:mb-2">
          {period}
        </p>
        {bullets && bullets.length > 0 ? (
          <ul className="list-disc list-inside space-y-0.5 sm:space-y-1">
            {bullets.map((bullet, index) => (
              <li
                key={index}
                className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-xs sm:text-sm leading-relaxed"
              >
                {bullet}
              </li>
            ))}
          </ul>
        ) : (
          description && (
            <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-xs sm:text-sm leading-relaxed">
              {description}
            </p>
          )
        )}
      </div>
    </div>
  )
}
