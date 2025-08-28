import { Hono } from 'hono'
import { z } from 'zod'

const goat = "supertopsecretkey6741"

// Define Cloudflare environment bindings so `c.env` is typed
interface Env {
  // Secrets and configuration
  TURNSTILE_SECRET: string
  TURNSTILE_SITEKEY: string
  MAILGUN_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

const schema = z.object({
  email: z.string().email(),
  token: z.string(), // Turnstile token (required)
})

app.post('/api/send-email', async (c) => {
  const { email, token } = schema.parse(await c.req.json())

  const ip = c.req.header('cf-connecting-ip') || 'unknown'

  // CAPTCHA check with Turnstile (required)
  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret: c.env.TURNSTILE_SECRET,
      response: token,
      remoteip: ip,
    }),
  })
  const result = await verify.json()
  if (!result.success) {
    console.error('Turnstile verification failed:', result);
    return c.json({ error: 'Captcha verification failed' }, 403)
  }

  // Mailgun API send
  const mgRes = await fetch(`https://api.mailgun.net/v3/cipherhacks.tech/messages`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`api:${c.env.MAILGUN_API_KEY}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      from: `CipherHacks <team@cipherhacks.tech>`,
      to: email,
      subject: 'Verfication key from CipherHacks',
      html: `<p>Hey! Here is your verification key: <strong>${goat}</strong></p><p>happy hacking!<br>arshan</p>`,
      text: 'Verification Key'
    }),
  })

  if (!mgRes.ok) {
    const error = await mgRes.text()
    console.error(error)
    return c.json({ error: 'Failed to send email' }, 500)
  }

  return c.json({ success: true, message: 'Email sent!' })
})

export default app