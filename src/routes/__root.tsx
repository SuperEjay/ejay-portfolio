import { HeadContent, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Home } from 'lucide-react'

import Header from '../components/Header'
import { ThemeProvider } from '../contexts/theme-context'

import appCss from '../styles.css?url'

function NotFound() {
  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1a1a1a] terminal:bg-[#0a0a0a] p-4"
    >
      <div className="text-center max-w-md w-full">
        <h1 className="text-6xl sm:text-8xl font-bold text-[#ef4444] terminal:text-[#00ff00] mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] dark:text-white terminal:text-[#00ff00] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-base sm:text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#ef4444] terminal:bg-[#00ff00] px-6 py-3 text-base font-semibold text-white terminal:text-[#0a0a0a] transition-colors hover:bg-[#dc2626] terminal:hover:bg-[#00ff00]/80"
        >
          <Home className="size-5" />
          Go Home
        </Link>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Portfolio',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
