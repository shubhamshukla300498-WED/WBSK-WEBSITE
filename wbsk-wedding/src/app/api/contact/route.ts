import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter — configure with your email provider
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"WBSK Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Inquiry from ${name} — WBSK Website`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1A130C; border-bottom: 2px solid #C9963C; padding-bottom: 10px;">
            New Wedding Inquiry
          </h2>
          <table style="width: 100%; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #7D6548; font-weight: bold;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7D6548; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7D6548; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Sent from wbsk.com contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
