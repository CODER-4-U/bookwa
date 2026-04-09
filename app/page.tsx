'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

export default function Home() {
    const router = useRouter()


  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) setIsLoggedIn(true)
    }
    checkUser()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b sticky top-0 bg-white z-10">
        <h1 
          onClick={() => router.push('/')}
          className="text-2xl font-bold text-green-600 cursor-pointer hover:opacity-80"
        >
          BookWA 📅
        </h1>
        <div className="flex gap-4 items-center">
          <a href="#features" className="text-gray-600 hover:text-green-600">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-green-600">Pricing</a>
          {isLoggedIn ? (
  <button
      onClick={() => router.push('/dashboard')}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
      Go to Dashboard
    </button>
  ) : (
    <button
      onClick={() => router.push('/signup')}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
      Get Started Free
    </button>
  )}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-8 py-20">
        <h2 className="text-5xl font-bold text-gray-800 max-w-3xl">
          Stop Losing Clients — Automate Your Bookings on WhatsApp
        </h2>
        <p className="text-xl text-gray-700 mt-6 max-w-2xl">
          Let your customers book appointments via WhatsApp automatically. No phone calls. No chaos. Just bookings.
        </p>
        <button 
          onClick={() => router.push('/signup')}
          className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl text-xl hover:bg-green-700 transition">
          Start Free Today
        </button>
        <p className="text-gray-500 mt-3">No credit card required</p>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Everything You Need</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div 
            onClick={() => router.push('/login')}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">WhatsApp Integration</h4>
            <p className="text-gray-700">Customers book directly from WhatsApp. No app download needed.</p>
          </div>
          <div 
            onClick={() => router.push('/login')}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔔</div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">Auto Reminders</h4>
            <p className="text-gray-700">Automatic WhatsApp reminders sent to customers before appointments.</p>
          </div>
          <div 
            onClick={() => router.push('/login')}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">Dashboard</h4>
            <p className="text-gray-700">See all bookings, manage staff and track your business easily.</p>
          </div>
        </div>
      </section>
    {/* How It Works */}
<section className="px-8 py-20">
  <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
    <div className="bg-white border-2 border-green-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center relative">
      <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
      <h4 className="text-xl font-bold text-gray-800 mb-2">Sign Up Free</h4>
      <p className="text-gray-700">Create your account in 30 seconds. No credit card needed.</p>
    </div>
    <div className="bg-white border-2 border-green-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center relative">
      <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
      <h4 className="text-xl font-bold text-gray-800 mb-2">Share Your Link</h4>
      <p className="text-gray-700">Share your booking link on WhatsApp, Instagram or anywhere.</p>
    </div>
    <div className="bg-white border-2 border-green-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center relative">
      <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
      <h4 className="text-xl font-bold text-gray-800 mb-2">Get Bookings</h4>
      <p className="text-gray-700">Customers book instantly. You get WhatsApp notification immediately.</p>
    </div>
  </div>
</section>

{/* Testimonials */}
<section className="bg-gray-50 px-8 py-20">
  <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex mb-3">
        {'⭐'.repeat(5).split('').map((s,i) => <span key={i}>{s}</span>)}
      </div>
      <p className="text-gray-700 mb-4 text-sm">"BookWA changed my salon completely. I used to miss bookings all the time. Now everything is automatic!"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Sarah Johnson</p>
          <p className="text-gray-500 text-xs">Salon Owner, London 🇬🇧</p>
        </div>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex mb-3">
        {'⭐'.repeat(5).split('').map((s,i) => <span key={i}>{s}</span>)}
      </div>
      <p className="text-gray-700 mb-4 text-sm">"My clinic bookings increased by 40% in first month. Patients love booking via WhatsApp!"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Dr. Ahmed Hassan</p>
          <p className="text-gray-500 text-xs">Clinic Owner, Dubai 🇦🇪</p>
        </div>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex mb-3">
        {'⭐'.repeat(5).split('').map((s,i) => <span key={i}>{s}</span>)}
      </div>
      <p className="text-gray-700 mb-4 text-sm">"Setup took 5 minutes and now I save 2 hours daily on phone calls. Best tool for my barbershop!"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Marco Silva</p>
          <p className="text-gray-500 text-xs">Barbershop Owner, USA 🇺🇸</p>
        </div>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex mb-3">
        {'⭐'.repeat(5).split('').map((s,i) => <span key={i}>{s}</span>)}
      </div>
      <p className="text-gray-700 mb-4 text-sm">"Bilkul kamaal ka tool hai! Mere beauty parlor ke liye perfect. Customers khush hain aur bookings barh gayi hain!"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">F</div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Fatima Malik</p>
          <p className="text-gray-500 text-xs">Beauty Parlor, Lahore 🇵🇰</p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Pricing */}
      <section id="pricing" className="px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Simple Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="border p-8 rounded-xl hover:shadow-lg transition">
            <h4 className="text-2xl font-bold mb-2 text-gray-800">Free</h4>
            <p className="text-4xl font-bold text-green-600 mb-6">$0<span className="text-lg text-gray-500">/month</span></p>
            <ul className="text-gray-700 space-y-2 mb-8">
              <li>✅ 50 bookings/month</li>
              <li>✅ WhatsApp booking link</li>
              <li>✅ Basic calendar</li>
              <li>❌ Auto reminders</li>
              <li>❌ Multiple staff</li>
            </ul>
            <button 
              onClick={() => router.push('/signup')}
              className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl hover:bg-green-50 transition">
              Get Started Free
            </button>
          </div>
          <div className="border p-8 rounded-xl bg-green-600 text-white hover:shadow-lg transition">
            <h4 className="text-2xl font-bold mb-2">Pro</h4>
            <p className="text-4xl font-bold mb-6">$19<span className="text-lg opacity-70">/month</span></p>
            <ul className="space-y-2 mb-8">
              <li>✅ Unlimited bookings</li>
              <li>✅ Auto WhatsApp reminders</li>
              <li>✅ Multiple staff</li>
              <li>✅ Analytics dashboard</li>
              <li>✅ Priority support</li>
            </ul>
            <button 
              onClick={() => router.push('/login')}
              className="w-full bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Start Pro Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 border-t">
        <p>© 2026 BookWA. All rights reserved.</p>
      </footer>
    </main>
  )
}