'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Settings() {
  const [user, setUser] = useState<any>(null)
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) window.location.href = '/login'
      else {
        setUser(data.user)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single()
        if (profile) {
          setBusinessName(profile.business_name || '')
          setPhone(profile.phone || '')
        }
      }
    }
    getUser()
  }, [])

  const saveSettings = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        business_name: businessName,
        phone: phone,
        email: user.email
      })
    if (error) setMessage('Error saving!')
    else setMessage('Settings saved! ✅')
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => window.location.href = '/'}
          className="text-2xl font-bold text-green-600 cursor-pointer"
        >
          BookWA 📅
        </h1>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="text-gray-600 hover:text-green-600"
        >
          ← Dashboard
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">⚙️ Settings</h2>

        <div className="bg-white rounded-2xl shadow p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Business Info</h3>

          <label className="block text-gray-700 font-medium mb-2">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Your salon/clinic name"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:border-green-500"
          />

          <label className="block text-gray-700 font-medium mb-2">
            WhatsApp Number
          </label>
          <input
            type="text"
            placeholder="+923001234567"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:border-green-500"
          />

          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="text"
            value={user?.email || ''}
            disabled
            className="w-full border rounded-xl px-4 py-3 mb-6 text-gray-400 bg-gray-50"
          />

          {message && (
            <p className="text-green-600 font-medium mb-4">{message}</p>
          )}

          <button
            onClick={saveSettings}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Account</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 font-medium">Logout</p>
              <p className="text-gray-500 text-sm">Sign out of your account</p>
            </div>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                window.location.href = '/login'
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
            
          </div>
          <div className="border-t mt-6 pt-6">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 font-medium">Delete Account</p>
      <p className="text-gray-500 text-sm">Permanently delete your account and all data</p>
    </div>
    <button
      onClick={async () => {
      const confirm = window.confirm('Delete account permanently?')
      if (confirm) {
        await supabase.rpc('delete_user')
        window.location.href = '/'
      }
    }}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Delete Account
    </button>
  </div>
</div>
        </div>
        

        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Plan</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 font-medium">Current Plan</p>
              <p className="text-green-600 font-bold">Free Plan</p>
            </div>
            <button
              onClick={() => window.open('/upgrade', '_blank')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Upgrade to Pro 🚀
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}