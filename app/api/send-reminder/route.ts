import twilio from 'twilio'
import { NextResponse } from 'next/server'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: Request) {
  try {
    const { customerPhone, customerName, service, date, time } = await req.json()

    let phone = customerPhone.trim()
    if (phone.startsWith('0')) phone = '+92' + phone.slice(1)
    if (!phone.startsWith('+')) phone = '+' + phone

    console.log('Reminder to:', phone)

    await client.messages.create({
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${phone}`,
      body: `⏰ Reminder!\n\nHello ${customerName}!\n\nYour appointment:\n📋 ${service}\n📅 ${date}\n⏰ ${time}\n\nSee you soon! 😊`
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.log('Reminder Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}