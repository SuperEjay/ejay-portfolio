import { Briefcase, ExternalLink, FolderKanban, LayoutGrid } from 'lucide-react'
import { useState } from 'react'

import projectsData from '../data/projects.json'

type ProjectFilter = 'all' | 'personal' | 'company'

interface PersonalProjectCardProps {
  title: string
  type: string
  description: string
  date: string
  link: string
  image?: string
}

function PersonalProjectCard({
  title,
  type,
  description,
  date,
  link,
  image,
}: PersonalProjectCardProps) {
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
          <p className="text-[#999999] dark:text-[#777777] terminal:text-[#00ff00]/60 text-xs">
            {date}
          </p>
        </div>
      </a>
    </div>
  )
}

interface CompanyProjectCardProps {
  projectName: string
  company: string
  role: string
  contribution: string | string[]
  tech?: string
  date?: string
  isLast?: boolean
}

function CompanyProjectCard({
  projectName,
  company,
  role,
  contribution,
  tech,
  date,
  isLast = false,
}: CompanyProjectCardProps) {
  const bullets = Array.isArray(contribution) ? contribution : [contribution]

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
          {projectName}
        </h3>
        <p className="text-[#555555] dark:text-[#b0b0b0] terminal:text-[#00ff00]/80 text-xs sm:text-sm mb-0.5">
          {company}
        </p>
        <p className="text-[#ef4444] terminal:text-[#00ff00] text-xs sm:text-sm font-medium mb-1 sm:mb-2">
          {role}
        </p>
        {tech && (
          <p className="text-[#999999] dark:text-[#777777] terminal:text-[#00ff00]/60 text-xs mb-1 sm:mb-2">
            {tech}
          </p>
        )}
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
        {date && (
          <p className="text-[#999999] dark:text-[#777777] terminal:text-[#00ff00]/60 text-xs mt-1">
            {date}
          </p>
        )}
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const personalProjects = projectsData.personal || []
  const companyProjects = projectsData.company || []

  const filterOptions: {
    value: ProjectFilter
    label: string
    icon: React.ReactNode
    count: number
  }[] = [
    {
      value: 'all',
      label: 'All',
      icon: <LayoutGrid className="size-4" />,
      count: personalProjects.length + companyProjects.length,
    },
    {
      value: 'personal',
      label: 'Personal',
      icon: <FolderKanban className="size-4" />,
      count: personalProjects.length,
    },
    {
      value: 'company',
      label: 'Company',
      icon: <Briefcase className="size-4" />,
      count: companyProjects.length,
    },
  ]

  const showPersonal = filter === 'all' || filter === 'personal'
  const showCompany = filter === 'all' || filter === 'company'

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

        {/* Project Type Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === option.value
                  ? 'bg-[#ef4444] terminal:bg-[#00ff00] text-white terminal:text-[#0a0a0a] shadow-md'
                  : 'bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 hover:border-[#ef4444]/50 terminal:hover:border-[#00ff00]/50'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  filter === option.value
                    ? 'bg-white/20 terminal:bg-[#0a0a0a]/20'
                    : 'bg-[#e0e0e0]/50 dark:bg-[#3d3d3d]/50 terminal:bg-[#1a1a1a]/50'
                }`}
              >
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Personal Projects Section */}
        {showPersonal && personalProjects.length > 0 && (
          <div
            className={
              showCompany && companyProjects.length > 0 ? 'mb-12 sm:mb-16' : ''
            }
          >
            {filter === 'all' && (
              <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <FolderKanban className="size-5 sm:size-6 text-[#ef4444] terminal:text-[#00ff00]" />
                Personal Projects
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {personalProjects.map((project, index) => (
                <PersonalProjectCard
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
          </div>
        )}

        {/* Company Projects Section */}
        {showCompany && companyProjects.length > 0 && (
          <div>
            {filter === 'all' && (
              <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <Briefcase className="size-5 sm:size-6 text-[#ef4444] terminal:text-[#00ff00]" />
                Company Projects
              </h3>
            )}
            <div className="space-y-0">
              {companyProjects.map((project, index) => (
                <CompanyProjectCard
                  key={index}
                  projectName={project.projectName}
                  company={project.company}
                  role={project.role}
                  contribution={project.contribution}
                  tech={project.tech}
                  date={project.date}
                  isLast={index === companyProjects.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State for Company Projects */}
        {showCompany && companyProjects.length === 0 && (
          <div
            className={
              showPersonal && personalProjects.length > 0 && filter === 'all'
                ? 'mt-8 sm:mt-12'
                : ''
            }
          >
            {filter === 'all' && (
              <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <Briefcase className="size-5 sm:size-6 text-[#ef4444] terminal:text-[#00ff00]" />
                Company Projects
              </h3>
            )}
            <div className="bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 p-8 sm:p-12 text-center">
              <Briefcase className="size-12 sm:size-16 mx-auto mb-4 text-[#999999] dark:text-[#666666] terminal:text-[#00ff00]/40" />
              <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm sm:text-base">
                Company projects will be displayed here
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
