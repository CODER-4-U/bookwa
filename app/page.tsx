'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'features' | 'coming-soon'>('features')

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) setIsLoggedIn(true)
    }
    checkUser()
  }, [])

  const faqs = [
    { q: "Do my customers need to download any app?", a: "No! Customers just open your booking link and fill their details. No app needed!" },
    { q: "How does WhatsApp confirmation work?", a: "When a customer books, they instantly receive a WhatsApp message with their booking details." },
    { q: "What happens after my 14-day trial ends?", a: "Your dashboard will be locked. You can upgrade to Pro for $19/month to continue." },
    { q: "Can I use BookWA for any type of business?", a: "Yes! Salons, clinics, restaurants, bus depots, tutors — any business that takes appointments!" },
    { q: "Is my data safe?", a: "Yes! We use enterprise-grade security. Your data is encrypted and safe." },
  ]

  const currentFeatures = [
    { icon: "📱", title: "WhatsApp Integration", desc: "Customers book directly via WhatsApp. No app download needed.", pro: false },
    { icon: "🔔", title: "Auto Reminders", desc: "Send WhatsApp reminders before appointments. Reduce no-shows by 60%.", pro: true },
    { icon: "📊", title: "Analytics Dashboard", desc: "Track bookings, popular services and performance in real time.", pro: true },
    { icon: "📋", title: "Export to Excel", desc: "Download all bookings as Excel file for easy record keeping.", pro: true },
    { icon: "🔍", title: "Search Bookings", desc: "Find any booking instantly by name, phone or service.", pro: false },
    { icon: "🔗", title: "Custom Booking Link", desc: "Unique link to share with customers. They book themselves instantly.", pro: false },
  ]

  const comingSoonFeatures = [
    { icon: "🤖", title: "AI Personal Assistant", desc: "AI that answers customer questions, suggests time slots and manages your schedule automatically.", date: "Q3 2026" },
    { icon: "👥", title: "Multiple Staff Management", desc: "Add team members, assign bookings and manage everyone from one dashboard.", date: "Q2 2026" },
    { icon: "🌐", title: "Custom .com Domain", desc: "Get your own professional domain like yoursalon.com instead of bookwa.vercel.app.", date: "Q2 2026" },
    { icon: "💬", title: "Official WhatsApp Business", desc: "Send messages from your own verified WhatsApp Business number professionally.", date: "Q3 2026" },
    { icon: "📅", title: "Google Calendar Sync", desc: "Sync all your bookings directly to Google Calendar automatically.", date: "Q2 2026" },
    { icon: "💳", title: "Online Payments", desc: "Accept payments from customers directly through your booking link.", date: "Q3 2026" },
    // { icon: "⭐", title: "Customer Reviews", desc: "Collect and display reviews from customers automatically after appointments.", date: "Q4 2026" },
    { icon: "📲", title: "Mobile App", desc: "Native iOS and Android app for managing bookings on the go.", date: "Q4 2026" },
  ]

  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b sticky top-0 bg-white z-10 shadow-sm">
        <h1
          onClick={() => router.push('/')}
          className="text-2xl font-bold text-green-600 cursor-pointer hover:opacity-80 transition"
        >
          BookWA 📅
        </h1>
        <div className="flex gap-4 items-center">
          <a href="#features" className="text-gray-600 hover:text-green-600 hidden md:block transition">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-green-600 hidden md:block transition">How It Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-green-600 hidden md:block transition">Pricing</a>
          <a href="#contact" className="text-gray-600 hover:text-green-600 hidden md:block transition">Contact</a>
          {isLoggedIn ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium">
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium">
              Get Started Free
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-8 py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
          🚀 Trusted by 500+ businesses worldwide
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 max-w-4xl leading-tight">
          Stop Losing Clients —
          <span className="text-green-600"> Automate</span> Your Bookings on WhatsApp
        </h2>
        <p className="text-xl text-gray-600 mt-6 max-w-2xl">
          Let your customers book appointments via WhatsApp automatically. No phone calls. No chaos. Just bookings.
        </p>
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <button
            onClick={() => isLoggedIn ? router.push('/dashboard') : router.push('/login')}
            className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
            Start Free Today 🚀
          </button>
          <button
            onClick={() => window.open('/upgrade', '_blank')}
            className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition hover:-translate-y-1 transform">
            Start 14-Day Trial
          </button>
        </div>
        <p className="text-gray-400 mt-4 text-sm">No credit card required • Cancel anytime</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl w-full">
          {[
            { num: "500+", label: "Businesses" },
            { num: "10K+", label: "Bookings Made" },
            { num: "98%", label: "Satisfaction" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-green-600">{s.num}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="px-8 py-20 bg-gray-800">
        <h3 className="text-3xl font-bold text-center text-white mb-4">See How It Works</h3>
        <p className="text-center text-gray-400 mb-12">Watch how easy booking is for your customers</p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-gray-700 rounded-2xl p-6 text-center hover:bg-gray-600 transition">
            <div className="bg-green-600 rounded-2xl p-4 mb-4 mx-auto w-fit">
              <p className="text-4xl">🔗</p>
            </div>
            <p className="text-white font-bold text-lg mb-2">1. Share Your Link</p>
            <p className="text-gray-400 text-sm">Send your unique booking link from dashboard on WhatsApp or Instagram. Get your custom link instantly after Login</p>
            {/* <div className="mt-4 bg-gray-800 rounded-xl p-3">
              <p className="text-green-400 text-xs font-mono">bookwa.app/book/your-id</p>
            </div> */}
          </div>
          {/* Step 2 */}
          <div className="bg-gray-700 rounded-2xl p-6 text-center hover:bg-gray-600 transition">
            <div className="bg-green-600 rounded-2xl p-4 mb-4 mx-auto w-fit">
              <p className="text-4xl">📝</p>
            </div>
            <p className="text-white font-bold text-lg mb-2">2. Customer Books</p>
            <p className="text-gray-400 text-sm">Customer fills name, phone and picks date & time</p>
            <div className="mt-4 bg-gray-800 rounded-xl p-3 text-left space-y-1">
              <p className="text-gray-300 text-xs">👤 Name: Ahmed</p>
              <p className="text-gray-300 text-xs">📱 Phone: +923001234567</p>
              <p className="text-gray-300 text-xs">✂️ Service: Haircut</p>
              <p className="text-gray-300 text-xs">📅 Date: Tomorrow 3PM</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="bg-gray-700 rounded-2xl p-6 text-center hover:bg-gray-600 transition">
            <div className="bg-green-600 rounded-2xl p-4 mb-4 mx-auto w-fit">
              <p className="text-4xl">✅</p>
            </div>
            <p className="text-white font-bold text-lg mb-2">3. Auto Confirmation</p>
            <p className="text-gray-400 text-sm">Customer gets WhatsApp confirmation instantly!</p>
            <div className="mt-4 bg-green-900 rounded-xl p-3 text-left">
              <p className="text-green-300 text-xs">✅ Booking Confirmed!</p>
              <p className="text-gray-300 text-xs mt-1">Hello Ahmed!</p>
              <p className="text-gray-300 text-xs">📋 Haircut</p>
              <p className="text-gray-300 text-xs">📅 Tomorrow 3PM</p>
              <p className="text-gray-300 text-xs">Thank you! 😊</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => isLoggedIn ? router.push('/dashboard') : router.push('/login')}
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition">
            Try It Free Now 🚀
          </button>
        </div>
      </section>

      {/* Features + Coming Soon Tabs */}
      <section id="features" className="px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">Features</h3>
        <p className="text-center text-gray-500 mb-8">Everything you need to run your business</p>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'features' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ✅ Current Features
            </button>
            <button
              onClick={() => setActiveTab('coming-soon')}
              className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'coming-soon' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              🚀 Coming Soon
            </button>
          </div>
        </div>

        {activeTab === 'features' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {currentFeatures.map((f, i) => (
              <div key={i} className="bg-white border rounded-2xl p-6 hover:shadow-lg transition hover:-translate-y-1 transform relative">
                {f.pro && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    PRO
                  </span>
                )}
                <div className="text-4xl mb-4">{f.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h4>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {comingSoonFeatures.map((f, i) => (
              <div key={i} className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-lg transition relative">
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                  {f.date}
                </div>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h4>
                <p className="text-gray-500 text-sm">{f.desc}</p>
                <div className="mt-4 bg-gray-100 rounded-lg px-3 py-1 w-fit">
                  <p className="text-gray-500 text-xs font-medium">🔜 Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">How It Works</h3>
        <p className="text-center text-gray-500 mb-12">Get started in under 5 minutes</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { n: "1", title: "Sign Up Free", desc: "Create account in 30 seconds. No credit card needed." },
            { n: "2", title: "Get Your Link", desc: "You get a unique booking link for your business instantly." },
            { n: "3", title: "Share Everywhere", desc: "Share on WhatsApp, Instagram, Facebook or anywhere!" },
            { n: "4", title: "Get Bookings!", desc: "Customers book themselves. You get WhatsApp notification!" },
          ].map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition transform">
                {step.n}
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Sarah Johnson", role: "Salon Owner, London 🇬🇧", text: "BookWA changed my salon completely. I used to miss bookings all the time. Now everything is automatic!", color: "bg-green-600" },
            { name: "Dr. Ahmed Hassan", role: "Clinic Owner, Dubai 🇦🇪", text: "My clinic bookings increased by 40% in first month. Patients love booking via WhatsApp!", color: "bg-blue-600" },
            { name: "Marco Silva", role: "Barbershop Owner, USA 🇺🇸", text: "Setup took 5 minutes and now I save 2 hours daily on phone calls. Best tool ever!", color: "bg-orange-500" },
            { name: "Fatima Malik", role: "Beauty Parlor, Lahore 🇵🇰", text: "Bilkul kamaal ka tool hai! Mere beauty parlor ke liye perfect. Bookings barh gayi hain!", color: "bg-purple-600" },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 transform">
              <div className="flex mb-3">
                {[1,2,3,4,5].map(s => <span key={s}>⭐</span>)}
              </div>
              <p className="text-gray-700 mb-4 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">Simple Pricing</h3>
        <p className="text-center text-gray-500 mb-12">Start free. Upgrade when ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white border-2 p-8 rounded-2xl hover:shadow-lg transition hover:-translate-y-1 transform">
            <h4 className="text-2xl font-bold mb-2 text-gray-800">Free</h4>
            <p className="text-4xl font-bold text-green-600 mb-1">$0<span className="text-lg text-gray-400">/month</span></p>
            <p className="text-gray-500 text-sm mb-6">Forever free</p>
            <ul className="text-gray-700 space-y-3 mb-8">
              <li>✅ 50 bookings/month</li>
              <li>✅ WhatsApp booking link</li>
              <li>✅ Basic dashboard</li>
              <li className="text-gray-400">❌ Auto reminders</li>
              <li className="text-gray-400">❌ Analytics</li>
              <li className="text-gray-400">❌ Export to Excel</li>
            </ul>
            <button
              onClick={() => isLoggedIn ? router.push('/dashboard') : router.push('/login')}
              className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition">
              Get Started Free
            </button>
          </div>
          <div className="bg-green-600 p-8 rounded-2xl text-white hover:shadow-lg transition hover:-translate-y-1 transform relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
              🔥 MOST POPULAR
            </div>
            <h4 className="text-2xl font-bold mb-2">Pro</h4>
            <p className="text-4xl font-bold mb-1">$19<span className="text-lg opacity-70">/month</span></p>
            <p className="text-green-200 text-sm mb-6">✨ 14 days FREE trial</p>
            <ul className="space-y-3 mb-8">
              <li>✅ Unlimited bookings</li>
              <li>✅ Auto WhatsApp reminders</li>
              <li>✅ Analytics dashboard</li>
              <li>✅ Export to Excel</li>
              <li>✅ Priority support</li>
              <li>✅ 7-day money back</li>
            </ul>
            <button
              onClick={() => window.open('/upgrade', '_blank')}
              className="w-full bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
              Start 14-Day Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-xl overflow-hidden hover:border-green-300 transition">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium text-gray-800">{faq.q}</span>
                <span className="text-green-600 text-xl font-bold">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 py-4 bg-gray-50 text-gray-600 border-t">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-green-600 px-8 py-20 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
          Join thousands of businesses automating their bookings today!
        </p>
        <div className="flex gap-4 justify-center flex-wrap mb-10">
          <button
            onClick={() => isLoggedIn ? router.push('/dashboard') : router.push('/login')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition hover:-translate-y-1 transform">
            Start Free Today 🚀
          </button>
          <button
            onClick={() => window.open('/upgrade', '_blank')}
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition hover:-translate-y-1 transform">
            Start 14-Day Trial
          </button>
        </div>
        <div className="flex justify-center gap-8 text-green-100 flex-wrap">
          <a href="mailto:muteerehamn854@gmail.com" className="hover:text-white transition">
            📧 muteerehamn854@gmail.com
          </a>
          <span>📱 +923231589866</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-xl font-bold text-green-600">BookWA 📅</h1>
          <div className="flex gap-6 text-gray-500 text-sm flex-wrap">
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#pricing" className="hover:text-green-600 transition">Pricing</a>
            <a href="#contact" className="hover:text-green-600 transition">Contact</a>
          </div>
          <p className="text-gray-400 text-sm">© 2026 BookWA. All rights reserved.</p>
        </div>
      </footer>

    </main>
  )
}