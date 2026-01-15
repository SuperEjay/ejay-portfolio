import { Download, ExternalLink, Loader2 } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'

import { sendContactEmail } from '../server/send-contact-email'

export default function ContactPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const defaultSubject = useMemo(() => {
    const name = fullName.trim()
    return `Inquiry - ${name || 'Full Name'}`
  }, [fullName])

  const canSubmit =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSubmit || isSending) return

    setIsSending(true)
    setStatus('idle')
    setErrorMessage(null)

    try {
      await sendContactEmail({
        data: {
          fullName,
          email,
          message,
          subject: defaultSubject.replace(
            'Full Name',
            fullName.trim() || 'Full Name',
          ),
        },
      })

      setStatus('success')
      setFullName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to send message.',
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="animate-fade-in relative"
    >
      {/* Loading Overlay */}
      {isSending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 terminal:bg-[#0a0a0a]/90 backdrop-blur-sm">
          <div className="rounded-lg border border-[#e0e0e0] dark:border-[#3d3d3d] terminal:border-[#00ff00]/30 bg-white dark:bg-[#252525] terminal:bg-[#0a0a0a] p-8 sm:p-10 shadow-xl">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="size-8 sm:size-10 text-[#ef4444] terminal:text-[#00ff00] animate-spin" />
              <p className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-base sm:text-lg font-semibold">
                Sending your message...
              </p>
              <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm">
                Please wait while we process your email.
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="mb-8 sm:mb-12 animate-slide-in-left">
        <h2 className="text-[#333333] dark:text-white terminal:text-[#00ff00] text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 relative inline-block">
          Contact
          <span className="absolute bottom-0 left-0 w-8 sm:w-12 h-1 bg-[#ef4444] terminal:bg-[#00ff00]" />
        </h2>

        {/* CV View/Download Section */}
        <div className="mb-6 sm:mb-8 rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md p-4 sm:p-6 animate-fade-in-up shadow-lg">
          <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-lg sm:text-xl mb-3 sm:mb-4">
            View or Download CV
          </h3>
          <p className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm sm:text-base mb-4">
            View my resume in a new tab or download it to learn more about my experience and skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/cv/Earnest-John-Gungon-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ef4444] terminal:bg-[#00ff00] px-5 py-3 text-sm sm:text-base font-semibold text-white terminal:text-[#0a0a0a] transition-colors hover:bg-[#dc2626] terminal:hover:bg-[#00ff00]/80"
            >
              <ExternalLink className="size-4 sm:size-5" />
              View CV
            </a>
            <a
              href="/cv/Earnest-John-Gungon-CV.pdf"
              download="Earnest-John-Gungon-CV.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/60 bg-white/70 dark:bg-[#1e1e1e]/70 terminal:bg-[#0a0a0a]/70 px-5 py-3 text-sm sm:text-base font-semibold text-[#333333] dark:text-white terminal:text-[#00ff00] transition-colors hover:bg-[#f0f0f0] dark:hover:bg-[#2d2d2d] terminal:hover:bg-[#1a1a1a]"
            >
              <Download className="size-4 sm:size-5" />
              Download CV
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-6 sm:mt-8 rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 bg-white/60 dark:bg-[#252525]/60 terminal:bg-[#0a0a0a]/60 backdrop-blur-md p-4 sm:p-6 shadow-lg">
          <h3 className="text-[#333333] dark:text-white terminal:text-[#00ff00] font-bold text-lg sm:text-xl mb-4">
            Contact Form
          </h3>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm font-medium">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 bg-white/70 dark:bg-[#1e1e1e]/70 terminal:bg-[#0a0a0a]/70 backdrop-blur-sm px-4 py-3 text-sm sm:text-base text-[#333333] dark:text-white terminal:text-[#00ff00] placeholder:text-[#999999] dark:placeholder:text-[#777777] terminal:placeholder:text-[#00ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/40 terminal:focus:ring-[#00ff00]/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm font-medium">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 bg-white/70 dark:bg-[#1e1e1e]/70 terminal:bg-[#0a0a0a]/70 backdrop-blur-sm px-4 py-3 text-sm sm:text-base text-[#333333] dark:text-white terminal:text-[#00ff00] placeholder:text-[#999999] dark:placeholder:text-[#777777] terminal:placeholder:text-[#00ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/40 terminal:focus:ring-[#00ff00]/40"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#666666] dark:text-[#a0a0a0] terminal:text-[#00ff00]/80 text-sm font-medium">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={6}
                className="w-full resize-y rounded-lg border border-[#e0e0e0]/60 dark:border-[#3d3d3d]/60 terminal:border-[#00ff00]/30 bg-white/70 dark:bg-[#1e1e1e]/70 terminal:bg-[#0a0a0a]/70 backdrop-blur-sm px-4 py-3 text-sm sm:text-base text-[#333333] dark:text-white terminal:text-[#00ff00] placeholder:text-[#999999] dark:placeholder:text-[#777777] terminal:placeholder:text-[#00ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/40 terminal:focus:ring-[#00ff00]/40"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={!canSubmit || isSending}
                className="inline-flex items-center justify-center rounded-lg bg-[#ef4444] terminal:bg-[#00ff00] px-5 py-3 text-sm sm:text-base font-semibold text-white terminal:text-[#0a0a0a] transition-colors hover:bg-[#dc2626] terminal:hover:bg-[#00ff00]/80 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending…' : 'Send Message'}
              </button>

              {status === 'success' ? (
                <p className="text-sm text-green-600 dark:text-green-400 terminal:text-[#00ff00]">
                  Message sent successfully.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="text-sm text-red-600 dark:text-red-400 terminal:text-[#ff4444]">
                  {errorMessage ?? 'Failed to send message.'}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
