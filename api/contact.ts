import { Resend } from "resend"
import type { VercelRequest, VercelResponse } from "@vercel/node"

const resend = new Resend(process.env.RESEND_API_KEY)
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" })
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "marquesduartemiguel@gmail.com",
      subject: `Novo contato - ${name}`,
      replyTo: email,
      text: `
Nome: ${name}
Email: ${email}

Mensagem:
${message}
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Email failed" })
  }
}