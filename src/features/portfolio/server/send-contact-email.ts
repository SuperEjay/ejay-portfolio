import { google } from 'googleapis'
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

function createGmailClient() {
  // Get OAuth2 credentials from environment variables
  const clientId = process.env.GMAIL_CLIENT_ID
  const clientSecret = process.env.GMAIL_CLIENT_SECRET
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN
  const fromEmail = process.env.GMAIL_FROM_EMAIL ?? 'earnest0987@gmail.com'

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Gmail API credentials not configured. Please set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN environment variables.',
    )
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'urn:ietf:wg:oauth:2.0:oob', // Redirect URI for installed apps
  )

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  })

  return {
    gmail: google.gmail({ version: 'v1', auth: oauth2Client }),
    fromEmail,
  }
}

function encodeMessage(
  to: string,
  from: string,
  subject: string,
  text: string,
  replyTo?: string,
) {
  const message = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    replyTo ? `Reply-To: ${replyTo}` : '',
    'Content-Type: text/plain; charset=utf-8',
    '',
    text,
  ]
    .filter(Boolean)
    .join('\n')

  // Encode message in base64url format (Gmail API requirement)
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
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
    const { gmail, fromEmail } = createGmailClient()

    const subject = sanitizeHeaderValue(
      data.subject ?? `Inquiry - ${data.fullName}`,
    )

    const replyTo = sanitizeHeaderValue(data.email)
    const fullName = sanitizeHeaderValue(data.fullName)
    const contactEmail = sanitizeHeaderValue(data.email)

    // Format the From field to show the contact's information
    // Gmail API requires the From address to match the authenticated account,
    // so we use the authenticated email but include the contact's info in the display name
    // The Reply-To header is set to the contact's email so replies go directly to them
    const fromField = `"${fullName} <${contactEmail}>" <${fromEmail}>`

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

    const rawMessage = encodeMessage(to, fromField, subject, text, replyTo)

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    })

    return { ok: true as const }
  })
