'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function PublicBooking() {
  const params = useParams()
  const businessId = params.businessId as string
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    service: '',
    date: '',
    time: '',
  })

  const handleSubmit = async () => {
    if (!form.customer_name || !form.customer_phone || !form.service || !form.date || !form.time) {
      alert('Please fill all fields!')
      return
    }
    setLoading(true)

    let phone = form.customer_phone
    if (phone.startsWith('0')) phone = '+92' + phone.slice(1)
    if (!phone.startsWith('+')) phone = '+' + phone

    const { error } = await supabase.from('bookings').insert([{
      user_id: businessId,
      customer_name: form.customer_name,
      customer_phone: phone,
      service: form.service,
      date: form.date,
      time: form.time,
      status: 'confirmed'
    }])

    if (error) {
      alert('Error: ' + error.message)
      setLoading(false)
      return
    }

    await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerPhone: phone,
        customerName: form.customer_name,
        service: form.service,
        date: form.date,
        time: form.time
      })
    })

    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow text-center max-w-md">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-2">You will receive a WhatsApp confirmation shortly!</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Book Another
        </button>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-1">📅 Book Appointment</h1>
        <p className="text-gray-500 mb-6">Fill in your details to book</p>

        <input
          type="text"
          placeholder="Your Name"
          value={form.customer_name}
          onChange={e => setForm({...form, customer_name: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="text"
          placeholder="WhatsApp Number with country code (e.g. +1234567890)"
          value={form.customer_phone}
          onChange={e => setForm({...form, customer_phone: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="text"
          placeholder="Service (e.g. Haircut, Consultation...)"
          value={form.service}
          onChange={e => setForm({...form, service: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({...form, date: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="time"
          value={form.time}
          onChange={e => setForm({...form, time: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-6 text-gray-800 focus:outline-none focus:border-green-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
        >
          {loading ? 'Booking...' : 'Confirm Booking ✅'}
        </button>

        <p className="text-center text-gray-400 text-xs mt-4">
          Powered by BookWA 📅
        </p>
      </div>
    </main>
  )
}