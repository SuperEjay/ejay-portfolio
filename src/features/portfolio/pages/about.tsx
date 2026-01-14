import { Camera, Code, PenTool, Smartphone } from 'lucide-react'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-[#f5f5f5] dark:bg-[#252525] rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] p-6 hover:border-[#ef4444]/50 transition-colors animate-fade-in-up">
      <div className="text-[#ef4444] mb-4">{icon}</div>
      <h3 className="text-[#333333] dark:text-white font-bold text-lg mb-2">
        {title}
      </h3>
      <p className="text-[#666666] dark:text-[#a0a0a0] text-sm">
        {description}
      </p>
    </div>
  )
}

interface TestimonialCardProps {
  name: string
  text: string
  avatar?: string
}

function TestimonialCard({ name, text, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-[#f5f5f5] dark:bg-[#252525] rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] p-6 animate-fade-in-up">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[#e0e0e0] dark:bg-[#3d3d3d] flex items-center justify-center shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-[#333333] dark:text-white text-xl">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-[#333333] dark:text-white font-bold mb-2">
            {name}
          </h4>
          <p className="text-[#666666] dark:text-[#a0a0a0] text-sm">{text}</p>
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
        <h2 className="text-[#333333] dark:text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 relative inline-block">
          About Me
          <span className="absolute bottom-0 left-0 w-8 sm:w-12 h-1 bg-[#ef4444]" />
        </h2>
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <p className="text-[#555555] dark:text-white text-sm sm:text-base leading-relaxed">
            Hi, I'm Ejay — a web developer who enjoys turning ideas into
            functional, user-friendly digital experiences.
          </p>
          <p className="text-[#555555] dark:text-white text-sm sm:text-base leading-relaxed">
            I work mainly with modern web technologies like HTML, CSS,
            JavaScript, PHP, and Laravel, and I enjoy building systems that
            solve real-world problems—from internal tools to community-focused
            platforms. I'm especially interested in creating clean, maintainable
            code and continuously improving how things look, feel, and perform.
          </p>
          <p className="text-[#555555] dark:text-white text-sm sm:text-base leading-relaxed">
            Beyond coding, I'm constantly learning—whether it's refining my
            front-end skills, exploring backend architecture, or experimenting
            with new tools and workflows. I value growth, collaboration, and
            building things that actually make an impact.
          </p>
          <p className="text-[#555555] dark:text-white text-sm sm:text-base leading-relaxed">
            When I'm not coding, you'll usually find me learning something new,
            planning my next project, or thinking about how technology can be
            used to improve everyday life.
          </p>
        </div>
      </section>

      {/* What I'm Doing Section */}
      <section className="mb-8 sm:mb-12 animate-slide-in-right">
        <h2 className="text-[#333333] dark:text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          What I'm Doing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <ServiceCard
            icon={<PenTool className="size-6 sm:size-8" />}
            title="Web Design"
            description="The most modern and high-quality design made at a professional level."
          />
          <ServiceCard
            icon={<Code className="size-6 sm:size-8" />}
            title="Web Development"
            description="High-quality development of sites at the professional level."
          />
          <ServiceCard
            icon={<Smartphone className="size-6 sm:size-8" />}
            title="Mobile Apps"
            description="Professional development of applications for iOS and Android."
          />
          <ServiceCard
            icon={<Camera className="size-6 sm:size-8" />}
            title="Photography"
            description="I make high-quality photos of any category at a professional level."
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="animate-slide-in-left">
        <h2 className="text-[#333333] dark:text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <TestimonialCard
            name="Daniel Lewis"
            text="Earnest was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client."
          />
          <TestimonialCard
            name="Jessica Miller"
            text="Earnest was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client."
          />
        </div>
      </section>
    </div>
  )
}
