'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [plan, setPlan] = useState<any>(null)
  const [trialDaysLeft, setTrialDaysLeft] = useState<number>(0)
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchBookings = async (userId: string) => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setBookings(data)
  }

  const fetchPlan = async (userId: string) => {
    const { data } = await supabase
      .from('user_plans')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!data) {
      await supabase.from('user_plans').insert([{
        user_id: userId,
        plan: 'free',
        is_pro: false,
        trial_used: false
      }])
      setPlan({ is_pro: false, trial_used: false })
    } else {
      setPlan(data)
      if (data.trial_used && !data.is_pro) {
        const trialEnd = new Date(data.trial_end)
        const now = new Date()
        const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        setTrialDaysLeft(daysLeft)
        if (daysLeft <= 0) setShowUpgradePopup(true)
      }
    }
  }

  const updateStatus = async (id: string) => {
    await supabase.from('bookings').update({ status: 'completed' }).eq('id', id)
    const { data } = await supabase.auth.getUser()
    if (data.user) fetchBookings(data.user.id)
  }

  const deleteBooking = async (id: string) => {
    await supabase.from('bookings').delete().eq('id', id)
    const { data } = await supabase.auth.getUser()
    if (data.user) fetchBookings(data.user.id)
  }

  const sendReminder = async (booking: any) => {
    try {
      const res = await fetch('/api/send-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerPhone: booking.customer_phone,
          customerName: booking.customer_name,
          service: booking.service,
          date: booking.date,
          time: booking.time
        })
      })
      const data = await res.json()
      if (data.success) alert('✅ Reminder sent!')
      else alert('❌ Failed!')
    } catch {
      alert('❌ Error!')
    }
  }

  const exportToExcel = () => {
    const XLSX = require('xlsx')
    const data = bookings.map(b => ({
      'Customer': b.customer_name,
      'Phone': b.customer_phone,
      'Service': b.service,
      'Date': b.date,
      'Time': b.time,
      'Status': b.status
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings')
    XLSX.writeFile(wb, 'bookwa-bookings.xlsx')
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace('/login')
        return
      }
      const user = data.session.user
      setUser(user)
      await fetchBookings(user.id)
      await fetchPlan(user.id)
      setLoading(false)
    }
    init()
  }, [])

  useEffect(() => {
    const handleFocus = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) return
      const user = data.session.user
      setUser(user)
      fetchBookings(user.id)
      fetchPlan(user.id)
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading...</p>
      </main>
    )
  }

  const isPro = plan?.is_pro
  const trialActive = plan?.trial_used && trialDaysLeft > 0
  const isTrialExpired = plan?.trial_used && trialDaysLeft <= 0
  
  const isFreeUser = !isPro && !trialActive
  const hasFullAccess = isPro || trialActive

  const filteredBookings = bookings.filter(b =>
    b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    b.customer_phone?.includes(search) ||
    b.service?.toLowerCase().includes(search.toLowerCase())
  )

  const today = new Date().toISOString().split('T')[0]

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Trial Expired Popup */}
      {/* {showUpgradePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <p className="text-5xl mb-4">⏰</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your 14-Day Trial Has Ended!</h2>
            <p className="text-gray-600 mb-6">Upgrade to Pro to continue using BookWA!</p>
            <button
              onClick={() => window.open('/upgrade', '_blank')}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-3"
            >
              Upgrade to Pro — $19/month 🚀
            </button>
            <p className="text-gray-400 text-sm">7-day money back guarantee</p>
          </div>
        </div>
      )} */}
      {showUpgradePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
      <p className="text-5xl mb-4">⏰</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Your 14-Day Trial Has Ended!
      </h2>
      <p className="text-gray-600 mb-6">
        Upgrade to Pro to continue all features, or continue with free plan!
      </p>
      <button
        onClick={() => window.open('/upgrade', '_blank')}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-3"
      >
        Upgrade to Pro — $19/month 🚀
      </button>
      <button
        onClick={async () => {
          await supabase
            .from('user_plans')
            .update({ plan: 'free', trial_used: true })
            .eq('user_id', user.id)
          setShowUpgradePopup(false)
        }}
        className="w-full border-2 border-gray-300 text-gray-600 py-3 rounded-xl hover:bg-gray-50"
      >
        Continue as Free Plan
      </button>
      <p className="text-gray-400 text-xs mt-3">
        Free plan includes 50 bookings/month
      </p>
    </div>
  </div>
)}

      {/* Navbar */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => router.push('/')}
          className="text-2xl font-bold text-green-600 cursor-pointer hover:opacity-80"
        >
          BookWA 📅
        </h1>
        <div className="flex items-center gap-3">
          {trialActive && (
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              ⏳ {trialDaysLeft} days left
            </span>
          )}
          {isPro && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              ✅ Pro
            </span>
          )}
          {!isPro && (
            <button
              onClick={() => window.open('/upgrade', '_blank')}
              className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-bold hover:bg-yellow-500 text-sm"
            >
              Upgrade to Pro 🚀
              <span className="block text-xs font-normal">🎉 14-day free trial</span>
            </button>
          )}
          <button
            onClick={() => hasFullAccess ? router.push('/analytics') : window.open('/upgrade', '_blank')}
            className={`px-3 py-2 rounded-lg text-sm ${hasFullAccess ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 text-gray-400'}`}
          >
            📊 Analytics {!hasFullAccess && '🔒'}
          </button>
          <button
            onClick={() => router.push('/settings')}
            className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 text-sm"
          >
            ⚙️ Settings
          </button>
          <span className="text-gray-500 text-sm hidden md:block">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </nav>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-10">

{/* Booking Link */}
<div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
  <p className="font-bold text-gray-800 mb-1">
    📲 Share with customers to get bookings automatically!
  </p>
  <p className="text-gray-500 text-xs mb-3">
    Customers open this link, fill their details and booking appears in your dashboard instantly!
  </p>
  <div className="flex justify-between items-center bg-white rounded-lg px-3 py-2 border">
    <p className="text-green-600 text-sm truncate">
      {`${typeof window !== 'undefined' ? window.location.origin : ''}/book/${user?.id}`}
    </p>
    <button
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/book/${user?.id}`)
        alert('Link copied! ✅')
      }}
      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm ml-2 whitespace-nowrap"
    >
      📋 Copy
    </button>
  </div>
</div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">
              {bookings.filter(b => b.status !== 'completed').length}
            </p>
            <p className="text-gray-700 mt-2">Active Bookings</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'completed').length}
            </p>
            <p className="text-gray-700 mt-2">Completed</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">
              {new Set(bookings.map(b => b.customer_phone)).size}
            </p>
            <p className="text-gray-700 mt-2">Total Customers</p>
          </div>
        </div>

        

        {/* Bookings */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            <div className="flex gap-2">
              <button
                onClick={() => hasFullAccess ? exportToExcel() : window.open('/upgrade', '_blank')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${hasFullAccess ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400'}`}
              >
                📊 Export {!hasFullAccess && '🔒'}
              </button>
              <button
                onClick={() => router.push('/book')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
              >
                + New Booking
              </button>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search bookings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:border-green-500"
          />

          {filteredBookings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📅</p>
              <p className="text-gray-700 text-lg">No bookings yet!</p>
              <p className="text-gray-500 mt-2">Click New Booking to get started</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-800 mb-3">🟡 Active Bookings</h3>
              {filteredBookings.filter(b => b.status !== 'completed').length === 0 ? (
                <p className="text-gray-500 mb-6">No active bookings!</p>
              ) : (
                <table className="w-full mb-8">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-gray-700">Customer</th>
                      <th className="text-left py-3 text-gray-700">Phone</th>
                      <th className="text-left py-3 text-gray-700">Service</th>
                      <th className="text-left py-3 text-gray-700">Date</th>
                      <th className="text-left py-3 text-gray-700">Time</th>
                      <th className="text-left py-3 text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.filter(b => b.status !== 'completed').map((booking, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-3 text-gray-800">{booking.customer_name}</td>
                        <td className="py-3 text-gray-800">{booking.customer_phone}</td>
                        <td className="py-3 text-gray-800">{booking.service}</td>
                        <td className="py-3 text-gray-800">{booking.date}</td>
                        <td className="py-3 text-gray-800">{booking.time}</td>
                        <td className="py-3">
                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => updateStatus(booking.id)}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
                            >
                              ✅ Complete
                            </button>
                            <button
                              onClick={() => hasFullAccess ? sendReminder(booking) : window.open('/upgrade', '_blank')}
                              className={`px-3 py-1 rounded-full text-sm ${hasFullAccess ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-400'}`}
                            >
                              🔔 Remind {!hasFullAccess && '🔒'}
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

              <h3 className="text-lg font-bold text-gray-800 mb-3">✅ Completed Bookings</h3>
              {filteredBookings.filter(b => b.status === 'completed').length === 0 ? (
                <p className="text-gray-500">No completed bookings yet!</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-gray-700">Customer</th>
                      <th className="text-left py-3 text-gray-700">Phone</th>
                      <th className="text-left py-3 text-gray-700">Service</th>
                      <th className="text-left py-3 text-gray-700">Date</th>
                      <th className="text-left py-3 text-gray-700">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.filter(b => b.status === 'completed').map((booking, i) => (
                      <tr key={i} className="border-b bg-green-50">
                        <td className="py-3 text-gray-800">{booking.customer_name}</td>
                        <td className="py-3 text-gray-800">{booking.customer_phone}</td>
                        <td className="py-3 text-gray-800">{booking.service}</td>
                        <td className="py-3 text-gray-800">{booking.date}</td>
                        <td className="py-3 text-gray-800">{booking.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}