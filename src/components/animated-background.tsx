import { useEffect, useState } from 'react'

import { useTheme } from '@/contexts/theme-context'

function Star({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-white animate-twinkle"
      style={style}
    />
  )
}

function generateStars(count: number) {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${Math.random() * 2 + 1}s`,
      },
    })
  }
  return stars
}

export default function AnimatedBackground() {
  const { theme } = useTheme()
  const [stars] = useState(() => generateStars(50))
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevTheme, setPrevTheme] = useState(theme)

  useEffect(() => {
    if (prevTheme !== theme) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 1500)
      setPrevTheme(theme)
      return () => clearTimeout(timer)
    }
  }, [theme, prevTheme])

  const isDark = theme === 'dark'

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sky gradient */}
      <div
        className={`absolute inset-0 transition-all duration-1500 ${
          isDark
            ? 'bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#121212]'
            : 'bg-gradient-to-b from-[#87CEEB] via-[#E0F6FF] to-[#f0f0f0]'
        }`}
      />

      {/* Sunrise/Sunset glow */}
      {isTransitioning && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-[40%] ${
            isDark ? 'animate-sunset' : 'animate-sunrise'
          }`}
        >
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-t from-[#ff6b35]/40 via-[#ff8c42]/20 to-transparent'
                : 'bg-gradient-to-t from-[#ffb347]/60 via-[#ffcc33]/30 to-transparent'
            }`}
          />
        </div>
      )}

      {/* Sun/Moon */}
      <div
        className={`absolute transition-all duration-1500 ease-in-out ${
          isDark
            ? 'bottom-[-100px] right-[15%] opacity-0'
            : 'bottom-[20%] right-[15%] opacity-100'
        }`}
      >
        <div
          className={`w-20 h-20 rounded-full transition-all duration-1500 ${
            isDark
              ? 'bg-gradient-to-br from-[#ffd700] to-[#ff6b35] shadow-[0_0_60px_rgba(255,107,53,0.8)]'
              : 'bg-gradient-to-br from-[#fff5cc] to-[#ffdd00] shadow-[0_0_80px_rgba(255,221,0,0.6)]'
          }`}
        />
      </div>

      {/* Moon for dark mode */}
      <div
        className={`absolute transition-all duration-1500 ease-in-out ${
          isDark
            ? 'top-[10%] right-[20%] opacity-100'
            : 'top-[-100px] right-[20%] opacity-0'
        }`}
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f5f5f5] to-[#d0d0d0] shadow-[0_0_40px_rgba(255,255,255,0.3)]" />
          {/* Moon craters */}
          <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-[#c0c0c0]/50" />
          <div className="absolute top-7 left-8 w-2 h-2 rounded-full bg-[#c0c0c0]/40" />
          <div className="absolute top-5 left-2 w-2 h-2 rounded-full bg-[#c0c0c0]/30" />
        </div>
      </div>

      {/* Stars */}
      <div
        className={`absolute inset-0 transition-opacity duration-1500 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {stars.map((star) => (
          <Star key={star.id} style={star.style} />
        ))}
      </div>

      {/* Shooting star (only in dark mode) */}
      {isDark && (
        <div className="absolute top-[20%] left-[10%] animate-shooting-star">
          <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]">
            <div className="absolute w-20 h-[1px] bg-gradient-to-r from-white/80 to-transparent -translate-x-full" />
          </div>
        </div>
      )}

      {/* Clouds for light mode */}
      <div
        className={`absolute transition-opacity duration-1500 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute top-[15%] left-[10%] animate-float-slow">
          <div className="flex">
            <div className="w-16 h-8 bg-white/80 rounded-full blur-sm" />
            <div className="w-12 h-10 bg-white/80 rounded-full blur-sm -ml-6 -mt-2" />
            <div className="w-14 h-8 bg-white/80 rounded-full blur-sm -ml-4" />
          </div>
        </div>
        <div className="absolute top-[25%] right-[25%] animate-float-slower">
          <div className="flex">
            <div className="w-12 h-6 bg-white/70 rounded-full blur-sm" />
            <div className="w-10 h-8 bg-white/70 rounded-full blur-sm -ml-4 -mt-2" />
            <div className="w-10 h-6 bg-white/70 rounded-full blur-sm -ml-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
