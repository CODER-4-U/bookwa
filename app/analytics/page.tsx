'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Analytics() {
  const [bookings, setBookings] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) window.location.href = '/login'
      else {
        setUser(data.user)
        const { data: bookingData } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', data.user.id)
        if (bookingData) setBookings(bookingData)
      }
    }
    getUser()
  }, [])

  const totalBookings = bookings.length
  const completedBookings = bookings.filter(b => b.status === 'completed').length
  const activeBookings = bookings.filter(b => b.status !== 'completed').length
  const totalCustomers = new Set(bookings.map(b => b.customer_phone)).size

  const serviceCount: Record<string, number> = {}
  bookings.forEach(b => {
    serviceCount[b.service] = (serviceCount[b.service] || 0) + 1
  })
  const topServices = Object.entries(serviceCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const monthCount: Record<string, number> = {}
  bookings.forEach(b => {
    const month = b.date?.slice(0, 7)
    if (month) monthCount[month] = (monthCount[month] || 0) + 1
  })
  const monthlyData = Object.entries(monthCount).sort()

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => window.location.href = '/'}
          className="text-2xl font-bold text-green-600 cursor-pointer"
        >
          BookWA 📅
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="text-gray-600 hover:text-green-600 font-medium"
          >
            ← Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">📊 Analytics</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">{totalBookings}</p>
            <p className="text-gray-700 mt-2">Total Bookings</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-blue-600">{completedBookings}</p>
            <p className="text-gray-700 mt-2">Completed</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-yellow-600">{activeBookings}</p>
            <p className="text-gray-700 mt-2">Active</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-purple-600">{totalCustomers}</p>
            <p className="text-gray-700 mt-2">Customers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Top Services */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Top Services</h3>
            {topServices.length === 0 ? (
              <p className="text-gray-500">No data yet!</p>
            ) : (
              <div className="space-y-3">
                {topServices.map(([service, count], i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{service}</span>
                      <span className="text-gray-500 font-bold">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${(count / totalBookings) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Monthly Bookings */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Monthly Bookings</h3>
            {monthlyData.length === 0 ? (
              <p className="text-gray-500">No data yet!</p>
            ) : (
              <div className="space-y-3">
                {monthlyData.map(([month, count], i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{month}</span>
                      <span className="text-gray-500 font-bold">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${(count / totalBookings) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✅ Completion Rate</h3>
            <div className="text-center">
              <p className="text-6xl font-bold text-green-600">
                {totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0}%
              </p>
              <p className="text-gray-500 mt-2">of bookings completed</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🕐 Recent Activity</h3>
            {bookings.length === 0 ? (
              <p className="text-gray-500">No activity yet!</p>
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 5).map((b, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="text-gray-800 font-medium">{b.customer_name}</p>
                      <p className="text-gray-500 text-sm">{b.service}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}