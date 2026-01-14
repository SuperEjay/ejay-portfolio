import { ChevronDown, Moon, Sun, Terminal } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

import { useTheme } from '@/contexts/theme-context'

const themes = [
  { value: 'light' as const, label: 'Light', icon: Sun },
  { value: 'dark' as const, label: 'Dark', icon: Moon },
  { value: 'terminal' as const, label: 'Terminal', icon: Terminal },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentTheme = themes.find((t) => t.value === theme) || themes[1]
  const CurrentIcon = currentTheme.icon

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#e0e0e0] dark:hover:bg-[#3d3d3d] terminal:hover:bg-[#1a1a1a] transition-colors"
        aria-label="Select theme"
      >
        <CurrentIcon className="size-4 sm:size-5 text-[#ef4444] terminal:text-[#00ff00]" />
        <ChevronDown
          className={`size-3 sm:size-4 text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#252525] terminal:bg-[#0a0a0a] rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 shadow-lg z-50 overflow-hidden">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon
            const isActive = theme === themeOption.value

            return (
              <button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'bg-[#ef4444]/10 text-[#ef4444] terminal:bg-[#00ff00]/10 terminal:text-[#00ff00]'
                    : 'text-[#333333] dark:text-white terminal:text-[#00ff00] hover:bg-[#f5f5f5] dark:hover:bg-[#3d3d3d] terminal:hover:bg-[#1a1a1a]'
                }`}
              >
                <Icon className="size-4" />
                <span className="text-sm font-medium">{themeOption.label}</span>
                {isActive && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
