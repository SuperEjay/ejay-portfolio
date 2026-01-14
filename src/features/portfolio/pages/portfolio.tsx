import { ExternalLink } from 'lucide-react'

import projectsData from '../data/projects.json'

interface ProjectCardProps {
  title: string
  type: string
  description: string
  date: string
  link: string
  image?: string
}

function ProjectCard({
  title,
  type,
  description,
  date,
  link,
  image,
}: ProjectCardProps) {
  return (
    <div className="group bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 overflow-hidden hover:border-[#ef4444]/50 terminal:hover:border-[#00ff00]/50 transition-all duration-300 animate-fade-in-up shadow-lg">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative aspect-video bg-[#e0e0e0]/70 dark:bg-[#3d3d3d]/70 terminal:bg-[#1a1a1a]/70 backdrop-blur-sm overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-[#999999] dark:text-[#666666] terminal:text-[#00ff00]/60 text-sm">
                {title}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-base sm:text-lg flex-1 group-hover:text-[#ef4444] terminal:group-hover:text-[#00ff00] transition-colors">
              {title}
            </h3>
            <ExternalLink className="size-4 sm:size-5 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/60 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[#ef4444] terminal:text-[#00ff00] text-xs sm:text-sm font-medium mb-2">
            {type}
          </p>
          <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-xs sm:text-sm leading-relaxed mb-3">
            {description}
          </p>
          <p className="text-[#999999] dark:text-[#777777] terminal:text-[#00ff00]/60 text-xs">{date}</p>
        </div>
      </a>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="animate-fade-in"
    >
      <section className="mb-8 sm:mb-12 animate-slide-in-left">
        <h2 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 relative inline-block">
          Portfolio
          <span className="absolute bottom-0 left-0 w-8 sm:w-12 h-1 bg-[#ef4444] terminal:bg-[#00ff00]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              type={project.type}
              description={project.description}
              date={project.date}
              link={project.link}
              image={project.image}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
