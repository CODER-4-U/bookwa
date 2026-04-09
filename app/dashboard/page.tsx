'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [plan, setPlan] = useState<any>(null)
  const [trialDaysLeft, setTrialDaysLeft] = useState<number>(14)
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)
  const [search, setSearch] = useState('')


  const fetchBookings = async (userId: string) => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setBookings(data)
  }

  const fetchPlan = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_plans')
      .select('*')
      .eq('user_id', userId)
      .single()

    if(error || !data) {
      await supabase.from('user_plans').insert([{ user_id: userId }])
      setTrialDaysLeft(14)
      setPlan({ is_pro: false, trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) })
    } else {
      setPlan(data)
      if (!data.is_pro) {
        const trialEnd = new Date(data.trial_end)
        const now = new Date()
        const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        setTrialDaysLeft(daysLeft)
        if (daysLeft <= 0) setShowUpgradePopup(true)
      }
    }
  }


// useEffect(() => {
//   // Force reload when coming back from another page
//   const handlePageShow = (e: PageTransitionEvent) => {
//     if (e.persisted) {
//       window.location.reload()
//     }
//   }
//   window.addEventListener('pageshow', handlePageShow)
//   return () => window.removeEventListener('pageshow', handlePageShow)
// }, [])

useEffect(() => {
  const handleVisibility = async () => {
    if (document.visibilityState === 'visible') {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
        fetchBookings(data.user.id)
        fetchPlan(data.user.id)
      }
    }
  }
  document.addEventListener('visibilitychange', handleVisibility)
  return () => document.removeEventListener('visibilitychange', handleVisibility)
}, [])


  const updateStatus = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'completed' })
      .eq('id', id)
    if (error) alert(error.message)
    else {
      const { data } = await supabase.auth.getUser()
      if (data.user) fetchBookings(data.user.id)
    }
  }

  const deleteBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id)
    if (error) alert(error.message)
    else {
      const { data } = await supabase.auth.getUser()
      if (data.user) fetchBookings(data.user.id)
    }
  }

useEffect(() => {
  const handlePageShow = (e: PageTransitionEvent) => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        fetchBookings(data.user.id)
        fetchPlan(data.user.id)
      }
    })
  }
  window.addEventListener('pageshow', handlePageShow)
  return () => window.removeEventListener('pageshow', handlePageShow)
}, [])


  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        window.location.href = '/login'
      } else {
        setUser(data.user)
        await fetchBookings(data.user.id)
        await fetchPlan(data.user.id)
      }
    }
    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await fetchBookings(session.user.id)
          await fetchPlan(session.user.id)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const today = new Date().toISOString().split('T')[0]
const todayBookings = bookings.filter(b => b.date === today)
const isPro = plan?.is_pro
const isTrialExpired = trialDaysLeft <= 0

const filteredBookings = bookings.filter(b =>
  b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
  b.customer_phone?.includes(search) ||
  b.service?.toLowerCase().includes(search.toLowerCase())
)

  const exportToExcel = () => {
  const XLSX = require('xlsx')
  const data = bookings.map(b => ({
    'Customer Name': b.customer_name,
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




  return (
    <main className="min-h-screen bg-gray-50">

      {/* Trial Expired Popup */}
      {showUpgradePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <p className="text-5xl mb-4">⏰</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your 14-Day Trial Has Ended!
            </h2>
            <p className="text-gray-600 mb-6">
              Upgrade to Pro to continue using BookWA and never lose a booking again!
            </p>
            <button
              onClick={() => window.open('/upgrade', '_blank')}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-3"
            >
              Upgrade to Pro — $19/month 🚀
            </button>
            <p className="text-gray-400 text-sm">7-day money back guarantee</p>
          </div>
        </div>
      )}

      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => window.location.href = '/'}
          className="text-2xl font-bold text-green-600 cursor-pointer hover:opacity-80"
        >
          BookWA 📅
        </h1>
        <div className="flex items-center gap-4">
          {!isPro && !isTrialExpired && (
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              ⏳ {trialDaysLeft} days left in trial
            </span>
          )}
          {isPro && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              ✅ Pro Plan
            </span>
          )}
          
          {!isPro && (
            <button
              onClick={() => window.open('/upgrade', '_blank')}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 text-sm"
            >
              Upgrade to Pro 🚀
            </button>
          )}
          <button
          onClick={() => window.location.href = '/analytics'}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
        >
          📊 Analytics
        </button>
        <span className="text-gray-700 text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className={`max-w-6xl mx-auto px-8 py-10 ${isTrialExpired && !isPro ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">
              {filteredBookings.filter(b => b.status !== 'completed').length}
            </p>
            <p className="text-gray-700 mt-2">Active Bookings</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">
              {filteredBookings.filter(b => b.status === 'completed').length}
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
        

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            {/* <h2 className="text-xl font-bold text-gray-800"></h2> */}
              <div className="flex gap-2">
                <button
                  onClick={exportToExcel}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  📊 Export Excel
                </button>
            <button
              onClick={() => window.location.href = '/book'}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + New Booking
            </button>
          </div>
          </div>


          <input
          type="text"
          placeholder="🔍 Search by name, phone or service..."
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
                <table className="w-full mb-10">
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
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(booking.id)}
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