#!/usr/bin/env bun
import { google } from 'googleapis'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { createInterface } from 'readline'

/**
 * Script to generate Gmail API refresh token
 *
 * Usage:
 *   bun run scripts/generate-refresh-token.ts
 *
 * Or add to package.json:
 *   "generate-token": "bun run scripts/generate-refresh-token.ts"
 */

interface EnvFile {
  GMAIL_CLIENT_ID?: string
  GMAIL_CLIENT_SECRET?: string
  GMAIL_REFRESH_TOKEN?: string
  GMAIL_FROM_EMAIL?: string
  CONTACT_TO_EMAIL?: string
}

function loadEnvFile(): EnvFile {
  const envPath = join(process.cwd(), '.env')
  const env: EnvFile = {}

  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8')
    const lines = content.split('\n')

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim()
          // Remove quotes if present
          const cleanValue = value.replace(/^["']|["']$/g, '')
          env[key.trim() as keyof EnvFile] = cleanValue
        }
      }
    }
  }

  return env
}

function saveEnvFile(env: EnvFile) {
  const envPath = join(process.cwd(), '.env')
  const lines: string[] = []

  // Preserve existing comments and other variables
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8')
    const existingLines = content.split('\n')

    for (const line of existingLines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key] = trimmed.split('=')
        const envKey = key?.trim() as keyof EnvFile
        // Skip if we're updating this key
        if (!(envKey in env && env[envKey])) {
          lines.push(line)
        }
      } else {
        lines.push(line)
      }
    }
  }

  // Add or update Gmail API variables
  if (!lines.some((line) => line.includes('Gmail API'))) {
    lines.push('')
    lines.push('# Gmail API Credentials')
  }

  if (env.GMAIL_CLIENT_ID) {
    const existingIndex = lines.findIndex((line) =>
      line.startsWith('GMAIL_CLIENT_ID='),
    )
    if (existingIndex >= 0) {
      lines[existingIndex] = `GMAIL_CLIENT_ID=${env.GMAIL_CLIENT_ID}`
    } else {
      lines.push(`GMAIL_CLIENT_ID=${env.GMAIL_CLIENT_ID}`)
    }
  }

  if (env.GMAIL_CLIENT_SECRET) {
    const existingIndex = lines.findIndex((line) =>
      line.startsWith('GMAIL_CLIENT_SECRET='),
    )
    if (existingIndex >= 0) {
      lines[existingIndex] = `GMAIL_CLIENT_SECRET=${env.GMAIL_CLIENT_SECRET}`
    } else {
      lines.push(`GMAIL_CLIENT_SECRET=${env.GMAIL_CLIENT_SECRET}`)
    }
  }

  if (env.GMAIL_REFRESH_TOKEN) {
    const existingIndex = lines.findIndex((line) =>
      line.startsWith('GMAIL_REFRESH_TOKEN='),
    )
    if (existingIndex >= 0) {
      lines[existingIndex] = `GMAIL_REFRESH_TOKEN=${env.GMAIL_REFRESH_TOKEN}`
    } else {
      lines.push(`GMAIL_REFRESH_TOKEN=${env.GMAIL_REFRESH_TOKEN}`)
    }
  }

  if (env.GMAIL_FROM_EMAIL) {
    const existingIndex = lines.findIndex((line) =>
      line.startsWith('GMAIL_FROM_EMAIL='),
    )
    if (existingIndex >= 0) {
      lines[existingIndex] = `GMAIL_FROM_EMAIL=${env.GMAIL_FROM_EMAIL}`
    } else {
      lines.push(`GMAIL_FROM_EMAIL=${env.GMAIL_FROM_EMAIL}`)
    }
  }

  if (env.CONTACT_TO_EMAIL) {
    const existingIndex = lines.findIndex((line) =>
      line.startsWith('CONTACT_TO_EMAIL='),
    )
    if (existingIndex >= 0) {
      lines[existingIndex] = `CONTACT_TO_EMAIL=${env.CONTACT_TO_EMAIL}`
    } else {
      lines.push(`CONTACT_TO_EMAIL=${env.CONTACT_TO_EMAIL}`)
    }
  }

  writeFileSync(envPath, lines.join('\n') + '\n', 'utf-8')
}

async function readInput(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question(prompt, (answer: string) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  console.log('🔐 Gmail API Refresh Token Generator\n')
  console.log(
    'This script will help you generate a refresh token for Gmail API.\n',
  )

  // Load existing .env file
  const env = loadEnvFile()

  // Get or use existing Client ID
  let clientId = env.GMAIL_CLIENT_ID
  if (!clientId) {
    console.log(
      '\n📝 You need to create OAuth 2.0 credentials in Google Cloud Console:',
    )
    console.log('   1. Go to: https://console.cloud.google.com/')
    console.log('   2. Select your project (or create a new one)')
    console.log('   3. Navigate to: APIs & Services > Credentials')
    console.log('   4. Click "Create Credentials" > "OAuth client ID"')
    console.log('   5. ⚠️  Application type: MUST be "Desktop app" (NOT "Web application")')
    console.log('      This script uses a redirect URI that only works with Desktop app type')
    console.log('   6. Name: "Portfolio Contact Form"')
    console.log('   7. Click "Create"')
    console.log('   8. Copy the Client ID and Client Secret\n')
    clientId = await readInput('Enter your Gmail Client ID: ')
    if (!clientId) {
      console.error('❌ Client ID is required')
      process.exit(1)
    }
  } else {
    console.log(
      `✓ Using existing GMAIL_CLIENT_ID: ${clientId.substring(0, 20)}...`,
    )
  }

  // Validate Client ID format (should be a long string ending in .apps.googleusercontent.com)
  if (
    !clientId.includes('.apps.googleusercontent.com') &&
    clientId.length < 20
  ) {
    console.warn('⚠️  Warning: Client ID format looks incorrect.')
    console.warn('   Expected format: xxxxxx-xxxxx.apps.googleusercontent.com')
    const continueAnyway = await readInput('Continue anyway? (y/n): ')
    if (
      continueAnyway.toLowerCase() !== 'y' &&
      continueAnyway.toLowerCase() !== 'yes'
    ) {
      process.exit(1)
    }
  }

  // Get or use existing Client Secret
  let clientSecret = env.GMAIL_CLIENT_SECRET
  if (!clientSecret) {
    clientSecret = await readInput('Enter your Gmail Client Secret: ')
    if (!clientSecret) {
      console.error('❌ Client Secret is required')
      process.exit(1)
    }
  } else {
    console.log(
      `✓ Using existing GMAIL_CLIENT_SECRET: ${clientSecret.substring(0, 10)}...`,
    )
  }

  // Validate Client Secret format (should be a long string)
  if (clientSecret.length < 20) {
    console.warn('⚠️  Warning: Client Secret format looks incorrect.')
    console.warn('   Client secrets are typically 24+ characters long.')
    const continueAnyway = await readInput('Continue anyway? (y/n): ')
    if (
      continueAnyway.toLowerCase() !== 'y' &&
      continueAnyway.toLowerCase() !== 'yes'
    ) {
      process.exit(1)
    }
  }

  // Create OAuth2 client
  const redirectUri = 'urn:ietf:wg:oauth:2.0:oob' // Redirect URI for installed apps
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri,
  )

  // Define scopes
  const scopes = ['https://www.googleapis.com/auth/gmail.send']

  console.log('\n🔍 Verifying OAuth client configuration...')
  console.log(`   Client ID: ${clientId.substring(0, 30)}...`)
  console.log(`   Redirect URI: ${redirectUri}`)
  console.log(`   Scopes: ${scopes.join(', ')}`)

  // Generate authorization URL
  let authUrl: string
  try {
    authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent', // Force consent screen to get refresh token
    })
  } catch (error) {
    console.error('\n❌ Error generating authorization URL:')
    if (error instanceof Error) {
      console.error(`   ${error.message}`)
    }
    console.error('\n💡 This usually means:')
    console.error('   • Client ID or Client Secret is incorrect')
    console.error('   • OAuth client was deleted from Google Cloud Console')
    console.error('   • OAuth client belongs to a different project')
    console.error('\n📝 To fix:')
    console.error('   1. Verify credentials in Google Cloud Console')
    console.error(
      '   2. Make sure you copied the full Client ID and Client Secret',
    )
    console.error('   3. Check that the OAuth client exists and is enabled')
    process.exit(1)
  }

  console.log('\n📋 Follow these steps:')
  console.log('1. Open the following URL in your browser:')
  console.log(`\n   ${authUrl}\n`)
  console.log('2. Sign in with your Google account')
  console.log('3. Grant the necessary permissions')
  console.log('4. After granting permissions, you will see a page with:')
  console.log('   "Please copy this code, switch to your application and paste it there:"')
  console.log('   📝 The authorization code will be displayed in a box on that page')
  console.log('   ⚠️  IMPORTANT: The code expires quickly (within minutes)')
  console.log('   ⚠️  IMPORTANT: Each code can only be used ONCE')
  console.log('   ⚠️  IMPORTANT: Copy the ENTIRE code (it\'s usually a long string)\n')

  // Get authorization code from user
  const code = await readInput('Enter the authorization code: ')

  if (!code) {
    console.error('❌ Authorization code is required')
    process.exit(1)
  }

  try {
    // Exchange authorization code for tokens
    console.log('\n🔄 Exchanging authorization code for tokens...')
    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.refresh_token) {
      console.error('❌ No refresh token received. Make sure you:')
      console.error('   - Selected "offline" access type')
      console.error('   - Granted all requested permissions')
      console.error(
        "   - Are using a Google account that hasn't authorized this app before",
      )
      console.error(
        "\n💡 Tip: If you've authorized this app before, you may need to:",
      )
      console.error(
        '   1. Revoke access at: https://myaccount.google.com/permissions',
      )
      console.error('   2. Run this script again')
      process.exit(1)
    }

    console.log('\n✅ Success! Refresh token generated:\n')
    console.log(`   ${tokens.refresh_token}\n`)

    // Ask if user wants to save to .env file
    const saveToEnv = await readInput('Save to .env file? (y/n): ')

    if (saveToEnv.toLowerCase() === 'y' || saveToEnv.toLowerCase() === 'yes') {
      const updatedEnv: EnvFile = {
        ...env,
        GMAIL_CLIENT_ID: clientId,
        GMAIL_CLIENT_SECRET: clientSecret,
        GMAIL_REFRESH_TOKEN: tokens.refresh_token,
      }

      // Optionally ask for email addresses
      if (!env.GMAIL_FROM_EMAIL) {
        const fromEmail = await readInput(
          'Enter your Gmail address (for GMAIL_FROM_EMAIL, or press Enter to skip): ',
        )
        if (fromEmail) {
          updatedEnv.GMAIL_FROM_EMAIL = fromEmail
        }
      }

      if (!env.CONTACT_TO_EMAIL) {
        const toEmail = await readInput(
          'Enter contact form recipient email (for CONTACT_TO_EMAIL, or press Enter to skip): ',
        )
        if (toEmail) {
          updatedEnv.CONTACT_TO_EMAIL = toEmail
        }
      }

      saveEnvFile(updatedEnv)
      console.log('\n✅ Credentials saved to .env file!')
    } else {
      console.log('\n📝 Add this to your .env file:')
      console.log(`GMAIL_CLIENT_ID=${clientId}`)
      console.log(`GMAIL_CLIENT_SECRET=${clientSecret}`)
      console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`)
    }

    console.log(
      '\n✨ Setup complete! You can now use the Gmail API to send emails.',
    )
  } catch (error) {
    console.error('\n❌ Error retrieving access token:')

    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase()

      if (errorMessage.includes('invalid_grant')) {
        console.error('\n🔴 Invalid Grant Error - Common causes:')
        console.error(
          '   1. Authorization code has already been used (codes are single-use)',
        )
        console.error(
          '   2. Authorization code has expired (codes expire within minutes)',
        )
        console.error('   3. System clock is out of sync')
        console.error('   4. Redirect URI mismatch in Google Cloud Console')
        console.error('\n💡 Solutions:')
        console.error(
          "   • Get a NEW authorization code (don't reuse old codes)",
        )
        console.error(
          '   • Make sure you copy the code immediately after authorization',
        )
        console.error(
          '   • Verify redirect URI in Google Cloud Console matches:',
        )
        console.error('     "urn:ietf:wg:oauth:2.0:oob"')
        console.error(
          '   • If using "Desktop app" type, ensure redirect URI is set correctly',
        )
        console.error('   • Try revoking access and starting fresh:')
        console.error('     https://myaccount.google.com/permissions')
        console.error('\n📝 Steps to fix:')
        console.error(
          '   1. Run this script again to get a new authorization URL',
        )
        console.error(
          '   2. Authorize immediately and copy the code right away',
        )
        console.error('   3. Paste the code into this script immediately')
      } else if (
        errorMessage.includes('invalid_client') ||
        errorMessage.includes('401')
      ) {
        console.error('\n🔴 Invalid Client Error (401)')
        console.error(
          "   The OAuth client credentials are incorrect or the client doesn't exist.",
        )
        console.error('\n💡 Common causes:')
        console.error("   • Client ID is wrong or doesn't exist")
        console.error("   • Client Secret doesn't match the Client ID")
        console.error('   • OAuth client was deleted from Google Cloud Console')
        console.error(
          '   • OAuth client belongs to a different Google Cloud project',
        )
        console.error(
          '   • Credentials were copied incorrectly (missing characters)',
        )
        console.error('\n📝 Steps to fix:')
        console.error(
          '   1. Go to: https://console.cloud.google.com/apis/credentials',
        )
        console.error('   2. Verify your OAuth 2.0 Client ID exists')
        console.error('   3. Click on the client to view details')
        console.error(
          '   4. Copy the FULL Client ID (ends with .apps.googleusercontent.com)',
        )
        console.error(
          '   5. Copy the FULL Client Secret (click "Show" if hidden)',
        )
        console.error(
          "   6. Make sure you're using credentials from the correct project",
        )
        console.error("   7. If client doesn't exist, create a new one:")
        console.error('      - ⚠️  Application type: MUST be "Desktop app" (NOT "Web application")')
        console.error('      - Name: "Portfolio Contact Form"')
        console.error(
          '   8. Run this script again with the correct credentials',
        )
      } else if (
        errorMessage.includes('redirect_uri_mismatch') ||
        errorMessage.includes('can only be used by a client id for native application') ||
        errorMessage.includes('not allowed for the web client type')
      ) {
        console.error('\n🔴 Redirect URI / Client Type Mismatch Error')
        console.error("   The redirect URI 'urn:ietf:wg:oauth:2.0:oob' can ONLY be used")
        console.error('   with a "Desktop app" (native application) OAuth client type.')
        console.error('   It CANNOT be used with a "Web application" client type.')
        console.error('\n💡 Solution: Create a NEW "Desktop app" OAuth client')
        console.error('   1. Go to: https://console.cloud.google.com/apis/credentials')
        console.error('   2. Click "Create Credentials" > "OAuth client ID"')
        console.error('   3. ⚠️  Application type: Select "Desktop app" (NOT "Web application")')
        console.error('   4. Name: "Portfolio Contact Form" (or any name you prefer)')
        console.error('   5. Click "Create"')
        console.error('   6. Copy the NEW Client ID and Client Secret')
        console.error('   7. Run this script again with the Desktop app credentials')
        console.error('\n📝 Note: You can have both Web and Desktop app clients in the same project.')
        console.error('   Just make sure to use the Desktop app credentials for this script.')
      } else {
        console.error(`   ${error.message}`)
      }
    } else {
      console.error(error)
    }

    console.error(
      '\n💡 Alternative: Use OAuth 2.0 Playground (recommended for first-time setup)',
    )
    console.error('   https://developers.google.com/oauthplayground/')
    console.error('   See GMAIL_API_SETUP.md for detailed instructions')

    process.exit(1)
  }

  process.exit(0)
}

// Run the script
main().catch((error) => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
