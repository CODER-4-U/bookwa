// import twilio from 'twilio'
// import { NextResponse } from 'next/server'

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID!,
//   process.env.TWILIO_AUTH_TOKEN!
// )

// export async function POST(req: Request) {
//   try {
//     const { customerPhone, customerName, service, date, time } = await req.json()

//     console.log('Sending to:', customerPhone)
//     console.log('From:', process.env.TWILIO_WHATSAPP_NUMBER)
//     console.log('SID exists:', !!process.env.TWILIO_ACCOUNT_SID)

//     const message = await client.messages.create({
//       from: `whatsapp:+14155238886`,
//       to: `whatsapp:${customerPhone}`,
//       body: `✅ Booking Confirmed!\n\nHello ${customerName}!\n\nYour booking details:\n📋 Service: ${service}\n📅 Date: ${date}\n⏰ Time: ${time}\n\nThank you for booking with us!`
//     })

//     console.log('Message SID:', message.sid)
//     return NextResponse.json({ success: true, sid: message.sid })
//   } catch (error: any) {
//     console.log('Twilio Error:', error.message)
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }




import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { customerPhone, customerName, service, date, time } = await req.json()

    let phone = customerPhone.trim()
    if (phone.startsWith('0')) phone = '92' + phone.slice(1)
    if (phone.startsWith('+')) phone = phone.slice(1)

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.META_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: {
            body: `✅ Booking Confirmed!\n\nHello ${customerName}!\n\nYour booking:\n📋 Service: ${service}\n📅 Date: ${date}\n⏰ Time: ${time}\n\nThank you! 😊`
          }
        })
      }
    )

    const data = await response.json()
    if (data.error) return NextResponse.json({ error: data.error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}