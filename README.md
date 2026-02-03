# Earnest John Gungon - Portfolio

A modern, responsive portfolio website built with the latest web technologies. This portfolio showcases my work experience, projects, skills, and provides a way to get in touch.

## About Me

I'm a full-stack web developer building modern, scalable applications using Laravel, React, Next.js, and Inertia.js, with a strong foundation in HTML, CSS, JavaScript, and PHP. I deliver end-to-end solutions—from clean, responsive interfaces to robust APIs, mobile apps, and production-ready deployments.

## What I'm Doing

- **Web Development** - Building responsive, performant websites using modern tools and best practices
- **Frontend Engineering** - Creating intuitive user interfaces with focus on layout, accessibility, and UX
- **Backend & APIs** - Developing reliable backend systems using PHP and Laravel
- **Product-Focused Projects** - Turning ideas into functional products with clarity and maintainability

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React-based full-stack framework)
- **Routing**: [TanStack Router](https://tanstack.com/router) - Type-safe file-based routing
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 with [Shadcn](https://ui.shadcn.com/) components
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Server**: Nitro (via TanStack Start)
- **Testing**: Vitest
- **Linting/Formatting**: ESLint + Prettier

## Features

- 🎨 **Dark/Light Theme** - Toggle between dark and light modes
- 📱 **Fully Responsive** - Optimized for all screen sizes
- 🚀 **Server-Side Rendering** - Fast initial page loads
- 📊 **Animated Background** - Smooth visual effects
- 📄 **Multiple Pages**:
  - Home/Portfolio Overview
  - About
  - Resume/Experience
  - Contact
- 🎯 **Project Showcase** - Personal and company projects with details
- 💬 **Testimonials** - Client feedback section
- 🛠 **Skills Section** - Categorized technical skills

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher recommended)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun --bun run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
bun --bun run build
```

### Preview Production Build

```bash
bun --bun run preview
```

### Running Tests

```bash
bun --bun run test
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Main navigation header
│   ├── theme-toggle.tsx # Dark/light mode toggle
│   └── ui/              # Shadcn UI components
├── contexts/            # React contexts
│   └── theme-context.tsx # Theme provider
├── features/            # Feature-based modules
│   └── portfolio/      # Portfolio feature
│       ├── components/  # Portfolio-specific components
│       ├── data/        # JSON data files
│       ├── hooks/       # Custom hooks
│       ├── pages/       # Route pages
│       └── server/      # Server-side functions
├── lib/                 # Utility functions
├── routes/              # TanStack Router route files
├── styles.css           # Global styles
└── router.tsx           # Router configuration
```

## Key Dependencies

- `@tanstack/react-router` - Type-safe routing
- `@tanstack/react-start` - Full-stack React framework
- `react` & `react-dom` - UI library
- `tailwindcss` - Utility-first CSS
- `lucide-react` - Beautiful icons
- `nodemailer` - Email sending (contact form)

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run test` | Run tests |
| `bun run lint` | Lint code |
| `bun run format` | Format code with Prettier |
| `bun run check` | Run format and lint with fixes |

## Projects Showcase

### Personal Projects

- **Deja Bros POS** - Point of sale system for order and sales management
- **Pawispal** - Personal AI gym trainer fitness app
- **Euro App** - Warranty management system

### Company Projects (Springboard Philippines)

- DutyFree Philippines E-Commerce Platform
- KingPanda Car Sales Platform
- Alphera ERP System
- Polland Inventory Management System
- GoWork Platform (Robinsons Land Corporation)
- PasaDax & TAO (Government Platforms)

## Contact

Feel free to reach out through the contact page on the portfolio or via email.

## License

This project is private and for personal use.
