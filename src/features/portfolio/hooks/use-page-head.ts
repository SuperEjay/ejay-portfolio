import { useEffect } from 'react'
import type { PageType } from '../types'

interface PageHeadConfig {
  title: string
  description: string
  keywords?: string
}

const baseUrl =
  typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : ''

const pageHeadConfigs: Record<PageType, PageHeadConfig> = {
  about: {
    title: 'About Me | Earnest John Gungon - Full-Stack Web Developer',
    description:
      'Learn about Earnest John Gungon, a full-stack web developer specializing in Laravel, React, Next.js, and Inertia.js. Discover my skills, services, and what I do as a Software Engineer.',
    keywords:
      'about Earnest John Gungon, full-stack developer, Laravel developer, React developer, Next.js developer, software engineer, web development, frontend, backend, Inertia.js',
  },
  resume: {
    title: 'Resume | Earnest John Gungon - Professional Experience & Skills',
    description:
      'View Earnest John Gungon\'s professional resume, work experience, education, technical skills, and achievements. Learn about my journey as a full-stack web developer.',
    keywords:
      'resume, CV, Earnest John Gungon resume, work experience, education, technical skills, software engineer resume, web developer experience, career history',
  },
  portfolio: {
    title: 'Portfolio | Earnest John Gungon - Web Development Projects',
    description:
      'Browse through Earnest John Gungon\'s portfolio of web development projects including Deja Bros POS, Pawispal fitness app, and Euro warranty management system. See my work and applications.',
    keywords:
      'portfolio, web development projects, Laravel projects, React projects, Next.js applications, software projects, case studies, web applications, Earnest John Gungon portfolio',
  },
  contact: {
    title: 'Contact | Get In Touch with Earnest John Gungon',
    description:
      'Get in touch with Earnest John Gungon for collaboration opportunities, project inquiries, or professional networking. Available for freelance work and full-time opportunities.',
    keywords:
      'contact Earnest John Gungon, hire web developer, freelance developer, collaboration, project inquiry, contact form, software engineer contact, web developer contact',
  },
}

export function usePageHead(page: PageType) {
  useEffect(() => {
    const config = pageHeadConfigs[page]
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const pageUrl = currentUrl || `${baseUrl}/portfolio`

    // Update document title
    document.title = config.title

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', config.description)

    // Update or create meta keywords
    if (config.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', config.keywords)
    }

    // Update or create canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', pageUrl)

    // Update Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:image', content: `${baseUrl}/assets/images/profile.jpg` },
      { property: 'og:image:alt', content: 'Earnest John Gungon' },
    ]

    ogTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`)
      if (!metaTag) {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('property', tag.property)
        document.head.appendChild(metaTag)
      }
      metaTag.setAttribute('content', tag.content)
    })

    // Update Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      {
        name: 'twitter:image',
        content: `${baseUrl}/assets/images/profile.jpg`,
      },
    ]

    twitterTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`)
      if (!metaTag) {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('name', tag.name)
        document.head.appendChild(metaTag)
      }
      metaTag.setAttribute('content', tag.content)
    })
  }, [page])
}
