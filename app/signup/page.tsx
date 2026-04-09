'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Signup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    business: '',
  })

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password || !form.business) {
      setMessage('Please fill all fields!')
      return
    }
    if (form.password.length < 6) {
      setMessage('Password must be at least 6 characters!')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          business_name: form.business,
        }
      }
    })
    if (error) {
      if (error.message.includes('already registered')) {
        setMessage('Email already registered! Please login instead.')
      } else {
        setMessage(error.message)
      }
    } else {
      setMessage('Account created successfully!')
      setTimeout(() => router.push('/login'), 2000)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1
          onClick={() => router.push('/')}
          className="text-3xl font-bold text-green-600 mb-1 cursor-pointer"
        >
          BookWA 📅
        </h1>
        <p className="text-gray-500 mb-6">Create your free account</p>

        <input
          type="text"
          placeholder="Your Full Name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="text"
          placeholder="Business Name (e.g. Ahmed Salon)"
          value={form.business}
          onChange={e => setForm({...form, business: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          className="w-full border rounded-xl px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:border-green-500"
        />

        {message && (
          <p className={`text-sm mb-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-3"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-green-600 font-bold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </main>
  )
}