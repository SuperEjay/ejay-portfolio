import { useEffect, useState } from 'react'

import AnimatedBackground from '@/components/animated-background'
import { useTheme } from '@/contexts/theme-context'

interface WelcomeAnimationProps {
  onComplete: () => void
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const { theme } = useTheme()
  const isTerminal = theme === 'terminal'
  const [isExiting, setIsExiting] = useState(false)
  const [showLine1, setShowLine1] = useState(false)
  const [showLine2, setShowLine2] = useState(false)
  const [showLine3, setShowLine3] = useState(false)

  useEffect(() => {
    // Consolidated timing logic
    // Line 1: Show immediately (after component mounts)
    const line1Timer = setTimeout(() => {
      setShowLine1(true)
    }, 0)

    // Line 2: Show after 500ms
    const line2Timer = setTimeout(() => {
      setShowLine2(true)
    }, 500)

    // Line 3: Show after 1000ms (500ms after line 2)
    const line3Timer = setTimeout(() => {
      setShowLine3(true)
    }, 1000)

    // Start exit animation after 2.5 seconds (visible for ~1.5s after all lines appear)
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 2500)

    // Complete and remove from DOM after exit animation (1s duration)
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => {
      clearTimeout(line1Timer)
      clearTimeout(line2Timer)
      clearTimeout(line3Timer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isExiting ? 'animate-fade-out-up' : 'opacity-100'
      }`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Use the same animated background as the main app */}
      <AnimatedBackground />
      
      {/* Overlay to ensure content is readable - darker for terminal theme */}
      <div
        className={`absolute inset-0 backdrop-blur-sm transition-colors ${
          isTerminal
            ? 'bg-[#0a0a0a]/95'
            : 'bg-gradient-to-b from-[#87CEEB]/80 via-[#E0F6FF]/80 to-[#f0f0f0]/80 dark:from-[#0a0a1a]/80 dark:via-[#1a1a3a]/80 dark:to-[#121212]/80'
        }`}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:gap-6">
        {/* Line 1: "Hello, I'm Earnest John" */}
        <div
          className={`transition-all duration-500 ease-out ${
            showLine1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
            <span
              className={
                isTerminal
                  ? 'text-[#00ff00]'
                  : 'text-[#1a1a1a] dark:text-white'
              }
            >
              Hello, I'm{' '}
            </span>
            <span
              className={
                isTerminal
                  ? 'text-[#00ff00]'
                  : 'text-[#ef4444]'
              }
            >
              Earnest John
            </span>
          </h1>
        </div>

        {/* Line 2: "Full-Stack Web Developer" */}
        <div
          className={`transition-all duration-500 ease-out ${
            showLine2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium ${
              isTerminal
                ? 'text-[#00ff00]/90'
                : 'text-[#666666] dark:text-[#a0a0a0]'
            }`}
          >
            Full-Stack Web Developer
          </p>
        </div>

        {/* Line 3: "Turning ideas into web solutions" */}
        <div
          className={`transition-all duration-500 ease-out ${
            showLine3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl font-normal ${
              isTerminal
                ? 'text-[#00ff00]/80'
                : 'text-[#888888] dark:text-[#aaaaaa]'
            }`}
          >
            Turning ideas into web solutions
          </p>
        </div>
      </div>
    </div>
  )
}
