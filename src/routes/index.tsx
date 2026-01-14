import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Portfolio } from '@/features'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Portfolio />
    </Suspense>
  )
}
