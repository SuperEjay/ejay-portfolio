import { Globe, Layout, Quote, Rocket, Server, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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
  const IconComponent = iconMap[iconName] ?? Globe

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

interface TestimonialItemProps {
  name: string
  message: string
  image?: string
  onClick: () => void
}

function TestimonialItem({
  name,
  message,
  image,
  onClick,
}: TestimonialItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-3 p-5 sm:p-6 rounded-lg bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 hover:border-[#ef4444]/50 terminal:hover:border-[#00ff00]/50 transition-all duration-300 shadow-lg cursor-pointer group text-left w-[280px] sm:w-[300px] shrink-0 snap-start"
    >
      <div className="flex items-start gap-3">
        {/* Square avatar container with rounded corners */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#e0e0e0]/70 dark:bg-[#3d3d3d]/70 terminal:bg-[#1a1a1a]/70 border border-transparent group-hover:border-[#ef4444] terminal:group-hover:border-[#00ff00] transition-colors flex items-center justify-center overflow-hidden shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-xl sm:text-2xl font-bold">
              {name.charAt(0)}
            </span>
          )}
        </div>
        {/* Name next to avatar */}
        <h4 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-base sm:text-lg group-hover:text-[#ef4444] terminal:group-hover:text-[#00ff00] transition-colors">
          {name}
        </h4>
      </div>
      {/* Message below */}
      <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm sm:text-base leading-relaxed line-clamp-4">
        {message}
      </p>
    </button>
  )
}

interface TestimonialModalProps {
  testimonial: {
    name: string
    message: string
    image?: string
  } | null
  onClose: () => void
}

function TestimonialModal({ testimonial, onClose }: TestimonialModalProps) {
  if (!testimonial) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 terminal:bg-[#0a0a0a]/90 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-lg bg-white dark:bg-[#252525] terminal:bg-[#0a0a0a] rounded-xl border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 shadow-2xl animate-fade-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#f0f0f0] dark:bg-[#3d3d3d] terminal:bg-[#1a1a1a] text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00] hover:bg-[#ef4444] hover:text-white terminal:hover:bg-[#00ff00] terminal:hover:text-[#0a0a0a] transition-colors z-10"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#e0e0e0] dark:bg-[#3d3d3d] terminal:bg-[#1a1a1a] flex items-center justify-center overflow-hidden shrink-0">
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-2xl font-bold">
                  {testimonial.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h4 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-lg">
                {testimonial.name}
              </h4>
            </div>

            {/* Quote Icon */}
            <div className="ml-auto">
              <Quote className="size-10 text-[#ef4444]/20 terminal:text-[#00ff00]/20" />
            </div>
          </div>

          {/* Message */}
          <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm sm:text-base leading-relaxed">
            {testimonial.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<{
    name: string
    message: string
    image?: string
  } | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const updateScrollProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
      setScrollProgress(progress)
    }

    container.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress() // Initial calculation

    return () => {
      container.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="animate-fade-in overflow-hidden"
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
        <div className="relative w-full">
          {/* Horizontal scrollable carousel - 2 items visible per scroll */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            <div className="inline-flex gap-4 sm:gap-6">
              {testimonialsData.items.map((testimonial, index) => (
                <TestimonialItem
                  key={index}
                  name={testimonial.name}
                  message={testimonial.message}
                  image={testimonial.image}
                  onClick={() => setSelectedTestimonial(testimonial)}
                />
              ))}
            </div>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="mt-4 h-1 w-full bg-[#e0e0e0]/50 dark:bg-[#3d3d3d]/50 terminal:bg-[#00ff00]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ef4444] terminal:bg-[#00ff00] transition-all duration-200 ease-out rounded-full"
              style={{
                width: `${Math.max(
                  scrollProgress * 100,
                  scrollContainerRef.current &&
                    scrollContainerRef.current.scrollWidth >
                      scrollContainerRef.current.clientWidth
                    ? 33
                    : 100,
                )}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </div>
  )
}
