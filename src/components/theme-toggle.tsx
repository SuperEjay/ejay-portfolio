import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/contexts/theme-context'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-[#e0e0e0] dark:hover:bg-[#3d3d3d] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="size-5 text-[#ffb43a]" />
      ) : (
        <Moon className="size-5 text-[#ffb43a]" />
      )}
    </button>
  )
}
