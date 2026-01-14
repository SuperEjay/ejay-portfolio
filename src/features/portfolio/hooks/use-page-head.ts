import { useEffect } from 'react'
import type { PageType } from '../types'

interface PageHeadConfig {
  title: string
  description: string
  keywords?: string
}

const pageHeadConfigs: Record<PageType, PageHeadConfig> = {
  about: {
    title: 'About Me | Portfolio',
    description:
      'Learn more about me, my skills, and what I do as a Software Engineer specializing in web development and software engineering.',
    keywords: 'about, software engineer, web developer, portfolio, skills',
  },
  resume: {
    title: 'Resume | Portfolio',
    description:
      'View my professional resume, work experience, education, and technical skills.',
    keywords: 'resume, CV, experience, education, skills, work history',
  },
  portfolio: {
    title: 'Portfolio | My Work',
    description:
      'Browse through my portfolio of web development projects, applications, and creative work.',
    keywords:
      'portfolio, projects, web development, applications, work samples',
  },
  contact: {
    title: 'Contact | Get In Touch',
    description:
      'Get in touch with me for collaboration opportunities, project inquiries, or just to say hello.',
    keywords: 'contact, get in touch, collaboration, inquiry, email',
  },
}

export function usePageHead(page: PageType) {
  useEffect(() => {
    const config = pageHeadConfigs[page]

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

    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', config.title)

    let ogDescription = document.querySelector(
      'meta[property="og:description"]',
    )
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescription)
    }
    ogDescription.setAttribute('content', config.description)

    // Update Twitter Card meta tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta')
      twitterTitle.setAttribute('name', 'twitter:title')
      document.head.appendChild(twitterTitle)
    }
    twitterTitle.setAttribute('content', config.title)

    let twitterDescription = document.querySelector(
      'meta[name="twitter:description"]',
    )
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta')
      twitterDescription.setAttribute('name', 'twitter:description')
      document.head.appendChild(twitterDescription)
    }
    twitterDescription.setAttribute('content', config.description)
  }, [page])
}
