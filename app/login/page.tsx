'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [message, setMessage] = useState('')

 useEffect(() => {
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      router.replace("/dashboard")
      return
    }
  }
  checkSession()
}, [])

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Please enter email and password!')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage('Wrong email or password!')
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }
  const handleGoogleLogin = async () => {
  setGoogleLoading(true)
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: { prompt: 'select_account' },
      skipBrowserRedirect: true
    },
  })
  if (error) {
    setMessage(error.message)
    setGoogleLoading(false)
    return
  }
  if (data?.url) {
    const popup = window.open(data.url, 'google-login', 'width=500,height=600,left=400,top=100')
    const timer = setInterval(async () => {
      try {
        if (popup?.closed) {
          clearInterval(timer)
          setGoogleLoading(false)
          const { data: session } = await supabase.auth.getSession()
          if (session.session) router.push('/dashboard')
        }
      } catch (e) {
        clearInterval(timer)
        setGoogleLoading(false)
      }
    }, 500)
  }
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
        <p className="text-gray-500 mb-6">Login to your account</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-3 text-gray-800 focus:outline-none focus:border-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:border-green-500"
        />

        {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-3"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {googleLoading ? "Opening Google..." : "Continue with Google"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="text-green-600 font-bold cursor-pointer hover:underline"
          >
            Create account
          </span>
        </p>
      </div>
    </main>
  )
}