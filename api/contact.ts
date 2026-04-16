import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const TO_ADDRESS = 'nacinc4@gmail.com';
// Switch FROM_ADDRESS to 'hello@pageconcrete.com' once domain is verified in Resend dashboard
const FROM_ADDRESS = 'onboarding@resend.dev';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Instantiate Resend here so it reads the env var at request time
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { firstName, lastName, phone, email, service, message, formSource } = req.body as {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    service?: string;
    message?: string;
    formSource?: string;
  };

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  const name = [firstName, lastName].filter(Boolean).join(' ') || 'Website Visitor';
  const replyTo = email || undefined;
  const serviceLabel = service || 'Not specified';
  const messageBody = message || 'No message provided.';
  const source = formSource || 'Contact Form';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px;">
      <div style="background: #1d4e89; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Request</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">Source: ${source}</p>
      </div>
      <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 140px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;"><a href="tel:${phone}" style="color: #1d4e89;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${email || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Service</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${serviceLabel}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: bold; color: #475569; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; color: #1e293b;">${messageBody.replace(/\n/g, '<br/>')}</td>
          </tr>
        </table>
      </div>
      <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
        This message was sent from the Page Concrete website contact form.
      </p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: replyTo,
      subject: `New ${source} – ${name} (${serviceLabel})`,
      html: emailHtml,
    });

    if (error) {
      console.error('[resend] Error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    console.log('[resend] Email sent:', data?.id);
    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[resend] Unexpected error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
