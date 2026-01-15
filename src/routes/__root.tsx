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
        title: 'Earnest John Gungon | Full-Stack Web Developer Portfolio',
      },
      {
        name: 'description',
        content:
          'Full-stack web developer specializing in Laravel, React, Next.js, and Inertia.js. Building modern, scalable applications with a focus on clean code and user experience. View my portfolio, projects, and resume.',
      },
      {
        name: 'keywords',
        content:
          'full-stack developer, web developer, Laravel, React, Next.js, Inertia.js, PHP, JavaScript, TypeScript, portfolio, software engineer, frontend developer, backend developer, web applications',
      },
      {
        name: 'author',
        content: 'Earnest John Gungon',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      {
        name: 'theme-color',
        content: '#ef4444',
      },
      // Open Graph Meta Tags
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Earnest John Gungon | Full-Stack Web Developer Portfolio',
      },
      {
        property: 'og:description',
        content:
          'Full-stack web developer specializing in Laravel, React, Next.js, and Inertia.js. Building modern, scalable applications with a focus on clean code and user experience.',
      },
      {
        property: 'og:image',
        content: '/assets/images/profile.jpg',
      },
      {
        property: 'og:image:alt',
        content: 'Earnest John Gungon - Full-Stack Web Developer',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:site_name',
        content: 'Earnest John Gungon Portfolio',
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      // Twitter Card Meta Tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Earnest John Gungon | Full-Stack Web Developer',
      },
      {
        name: 'twitter:description',
        content:
          'Full-stack web developer specializing in Laravel, React, Next.js, and Inertia.js. Building modern, scalable applications.',
      },
      {
        name: 'twitter:image',
        content: '/assets/images/profile.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'Earnest John Gungon - Full-Stack Web Developer',
      },
      // Additional Meta Tags
      {
        name: 'application-name',
        content: 'EJ Portfolio',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'EJ Portfolio',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'apple-touch-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
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
  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Earnest John Gungon',
    alternateName: 'EJ',
    jobTitle: 'Full-Stack Web Developer',
    description:
      'Full-stack web developer specializing in Laravel, React, Next.js, and Inertia.js. Building modern, scalable applications with a focus on clean code and user experience.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    image: '/assets/images/profile.jpg',
    sameAs: [
      // Add social media profiles here if available
      // 'https://linkedin.com/in/earnest-john-gungon',
      // 'https://github.com/yourusername',
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'Laravel',
      'React',
      'Next.js',
      'Inertia.js',
      'PHP',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'Software Engineering',
      'Frontend Development',
      'Backend Development',
      'API Development',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Educational Institution',
    },
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
