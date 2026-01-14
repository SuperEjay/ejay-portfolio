import nodemailer from 'nodemailer'
import { createServerFn } from '@tanstack/react-start'

export type ContactFormInput = {
  fullName: string
  email: string
  message: string
  subject?: string
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function sanitizeHeaderValue(v: string) {
  // prevent header injection (CRLF)
  return v.replace(/(\r|\n)/g, ' ').trim()
}

export const sendContactEmail = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown): ContactFormInput => {
    if (typeof d !== 'object' || d === null) {
      throw new Error('Invalid payload')
    }

    const data = d as Partial<ContactFormInput>

    if (!isNonEmptyString(data.fullName))
      throw new Error('Full name is required')
    if (!isNonEmptyString(data.email)) throw new Error('Email is required')
    if (!isNonEmptyString(data.message)) throw new Error('Message is required')

    return {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      subject: isNonEmptyString(data.subject) ? data.subject.trim() : undefined,
    }
  })
  .handler(async ({ data }) => {
    const to = process.env.CONTACT_TO_EMAIL ?? 'earnest0987@gmail.com'
    const from = process.env.CONTACT_FROM_EMAIL ?? to

    const subject = sanitizeHeaderValue(
      data.subject ?? `Inquiry - ${data.fullName}`,
    )

    // Expect either SMTP URL or explicit SMTP config env vars
    // SMTP_URL example: smtp://user:pass@smtp.gmail.com:587
    const transporter = nodemailer.createTransport(
      process.env.SMTP_URL
        ? process.env.SMTP_URL
        : {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: process.env.SMTP_USER
              ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
              : undefined,
          },
    )

    // If transporter isn't configured, nodemailer will fail here; surface a clean error.
    const replyTo = sanitizeHeaderValue(data.email)
    const fullName = sanitizeHeaderValue(data.fullName)

    const text = [
      `New inquiry from your portfolio contact form.`,
      ``,
      `Name: ${fullName}`,
      `Email: ${replyTo}`,
      ``,
      `Message:`,
      data.message,
      ``,
    ].join('\n')

    await transporter.sendMail({
      to,
      from,
      subject,
      replyTo,
      text,
    })

    return { ok: true as const }
  })
