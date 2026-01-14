import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'terminal'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  try {
    const saved = localStorage.getItem('theme') as Theme
    if (saved === 'light' || saved === 'dark' || saved === 'terminal')
      return saved
  } catch {
    // localStorage not available
  }

  // Default based on time of day: AM (0-11) = light, PM (12-23) = dark
  const currentHour = new Date().getHours()
  if (currentHour >= 0 && currentHour < 12) {
    return 'light' // Morning (AM) - light mode
  } else {
    return 'dark' // Afternoon/Evening (PM) - dark mode
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setThemeState(getInitialTheme())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    root.classList.remove('light', 'dark', 'terminal')

    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'terminal') {
      root.classList.add('terminal')
    } else {
      root.classList.add('light')
    }

    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage not available
    }
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
