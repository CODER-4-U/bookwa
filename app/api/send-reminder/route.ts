import twilio from 'twilio'
import { NextResponse } from 'next/server'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: Request) {
  try {
    const { customerPhone, customerName, service, date, time } = await req.json()

    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${customerPhone}`,
      body: `⏰ Appointment Reminder!\n\nHello ${customerName}!\n\nThis is a reminder for your appointment:\n📋 Service: ${service}\n📅 Date: ${date}\n⏰ Time: ${time}\n\nSee you soon! 😊\n\nReply CONFIRM to confirm or CANCEL to cancel.`
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}