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
      body: `✅ Booking Confirmed!\n\nHello ${customerName}!\n\nYour booking details:\n📋 Service: ${service}\n📅 Date: ${date}\n⏰ Time: ${time}\n\nThank you for booking with us!`
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}