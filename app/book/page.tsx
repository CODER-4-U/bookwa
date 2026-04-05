'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function BookingForm() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    service: '',
    date: '',
    time: '',
  })

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) window.location.href = '/login'
      setUser(data.user)
    }
    getUser()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase.from('bookings').insert([
      {
        user_id: user?.id,
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        service: form.service,
        date: form.date,
        time: form.time,
      }
    ])
    if (error) alert(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow text-center">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-700 mb-6">Customer will receive WhatsApp confirmation</p>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-6">📅 New Booking</h1>

        <input
          type="text"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={e => setForm({...form, customer_name: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="text"
          placeholder="Customer Phone (WhatsApp)"
          value={form.customer_phone}
          onChange={e => setForm({...form, customer_phone: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
           type="text"
           placeholder="Service (e.g. Haircut, Consultation, Bus Ticket...)"
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
          {loading ? 'Saving...' : 'Confirm Booking'}
        </button>

        <button
          onClick={() => window.location.href = '/dashboard'}
          className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  )
}