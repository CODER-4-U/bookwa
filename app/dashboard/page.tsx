'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) window.location.href = '/login'
      setUser(data.user)
      if (data.user) fetchBookings(data.user.id)
    }
    getUser()
  }, [])

  const fetchBookings = async (userId: string) => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setBookings(data)
  }
    const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    fetchBookings(user.id)
  }

  const deleteBooking = async (id: string) => {
    await supabase.from('bookings').delete().eq('id', id)
    fetchBookings(user.id)
  }
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const today = new Date().toISOString().split('T')[0]
  const todayBookings = bookings.filter(b => b.date === today)

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">BookWA 📅</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">{bookings.length}</p>
            <p className="text-gray-700 mt-2">Total Bookings</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">{todayBookings.length}</p>
            <p className="text-gray-700 mt-2">Today's Appointments</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">
              {new Set(bookings.map(b => b.customer_phone)).size}
            </p>
            <p className="text-gray-700 mt-2">Total Customers</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            <button
              onClick={() => window.location.href = '/book'}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + New Booking
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📅</p>
              <p className="text-gray-700 text-lg">No bookings yet!</p>
              <p className="text-gray-500 mt-2">Click New Booking to get started</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-700">Customer</th>
                  <th className="text-left py-3 text-gray-700">Phone</th>
                  <th className="text-left py-3 text-gray-700">Service</th>
                  <th className="text-left py-3 text-gray-700">Date</th>
                  <th className="text-left py-3 text-gray-700">Time</th>
                  <th className="text-left py-3 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-gray-800">{booking.customer_name}</td>
                    <td className="py-3 text-gray-800">{booking.customer_phone}</td>
                    <td className="py-3 text-gray-800">{booking.service}</td>
                    <td className="py-3 text-gray-800">{booking.date}</td>
                    <td className="py-3 text-gray-800">{booking.time}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
                        >
                          ✅ Complete
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm hover:bg-red-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}