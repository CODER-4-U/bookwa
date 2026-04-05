'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  const handleSignup = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Check your email to confirm signup!')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-2">BookWA 📅</h1>
        <p className="text-gray-500 mb-6">Login or create your account</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-3 focus:outline-none focus:border-green-500 text-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-green-500 text-gray-800"
        />

        {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-3"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl font-bold hover:bg-green-50"
        >
          {loading ? 'Loading...' : 'Create Account'}
        </button>
      </div>
    </main>
  )
}