import { Globe, Layout, Rocket, Server } from 'lucide-react'

import aboutData from '../data/about.json'
import testimonialsData from '../data/testimonials.json'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Layout,
  Server,
  Rocket,
}

interface ServiceCardProps {
  iconName: string
  title: string
  description: string
}

function ServiceCard({ iconName, title, description }: ServiceCardProps) {
  const IconComponent = iconMap[iconName] || Globe

  return (
    <div className="bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 p-6 hover:border-[#ef4444]/50 terminal:hover:border-[#00ff00]/50 transition-colors animate-fade-in-up shadow-lg">
      <div className="text-[#ef4444] terminal:text-[#00ff00] mb-4">
        <IconComponent className="size-6 sm:size-8" />
      </div>
      <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-lg mb-2">
        {title}
      </h3>
      <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm">
        {description}
      </p>
    </div>
  )
}

interface TestimonialCardProps {
  name: string
  message: string
  image?: string
}

function TestimonialCard({ name, message, image }: TestimonialCardProps) {
  return (
    <div className="bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 p-6 animate-fade-in-up shadow-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[#e0e0e0]/70 dark:bg-[#3d3d3d]/70 terminal:bg-[#1a1a1a]/70 backdrop-blur-sm border terminal:border-[#00ff00]/30 flex items-center justify-center shrink-0 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-xl">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold mb-2">
            {name}
          </h4>
          <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="animate-fade-in"
    >
      {/* About Me Section */}
      <section className="mb-8 sm:mb-12 animate-slide-in-left">
        <h2 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
          About Me
          <span className="absolute bottom-0 left-0 w-8 sm:w-12 h-1 bg-[#ef4444] terminal:bg-[#00ff00]" />
        </h2>
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          {aboutData.aboutMe.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#555555] dark:text-white terminal:text-[#00ff00]/90 text-sm sm:text-base leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* What I'm Doing Section */}
      <section className="mb-8 sm:mb-12 animate-slide-in-right">
        <h2 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          {aboutData.whatImDoing.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {aboutData.whatImDoing.services.map((service, index) => (
            <ServiceCard
              key={index}
              iconName={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="animate-slide-in-left">
        <h2 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          {testimonialsData.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {testimonialsData.items.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              message={testimonial.message}
              image={testimonial.image}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
