import twilio from 'twilio'
import { NextResponse } from 'next/server'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: Request) {
  try {
    const { customerPhone, customerName, service, date, time } = await req.json()

    console.log('Sending to:', customerPhone)
    console.log('From:', process.env.TWILIO_WHATSAPP_NUMBER)
    console.log('SID exists:', !!process.env.TWILIO_ACCOUNT_SID)

    const message = await client.messages.create({
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${customerPhone}`,
      body: `✅ Booking Confirmed!\n\nHello ${customerName}!\n\nYour booking details:\n📋 Service: ${service}\n📅 Date: ${date}\n⏰ Time: ${time}\n\nThank you for booking with us!`
    })

    console.log('Message SID:', message.sid)
    return NextResponse.json({ success: true, sid: message.sid })
  } catch (error: any) {
    console.log('Twilio Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}