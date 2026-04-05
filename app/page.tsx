export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b">
        <h1 className="text-2xl font-bold text-green-600">BookWA 📅</h1>
        <div className="flex gap-4">
          <a href="#pricing" className="text-gray-600 hover:text-green-600">Pricing</a>
          <a href="#features" className="text-gray-600 hover:text-green-600">Features</a>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-8 py-20">
        <h2 className="text-5xl font-bold text-gray-800 max-w-3xl">
          WhatsApp Booking System for Your Bussiness
        </h2>
        <p className="text-xl text-gray-500 mt-6 max-w-2xl">
          Let your customers book appointments via WhatsApp automatically. No phone calls. No chaos. Just bookings.
        </p>
        <button className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl text-xl hover:bg-green-700">
          Start Free Today
        </button>
        <p className="text-gray-400 mt-3">No credit card required</p>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Everything You Need</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-xl font-bold mb-2">WhatsApp Integration</h4>
            <p className="text-gray-500">Customers book directly from WhatsApp. No app download needed.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">🔔</div>
            <h4 className="text-xl font-bold mb-2">Auto Reminders</h4>
            <p className="text-gray-500">Automatic WhatsApp reminders sent to customers before appointments.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-bold mb-2">Dashboard</h4>
            <p className="text-gray-500">See all bookings, manage staff and track your business easily.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Simple Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="border p-8 rounded-xl">
            <h4 className="text-2xl font-bold mb-2">Free</h4>
            <p className="text-4xl font-bold text-green-600 mb-6">$0<span className="text-lg text-gray-400">/month</span></p>
            <ul className="text-gray-600 space-y-2 mb-8">
              <li>✅ 50 bookings/month</li>
              <li>✅ WhatsApp booking link</li>
              <li>✅ Basic calendar</li>
              <li>❌ Auto reminders</li>
              <li>❌ Multiple staff</li>
            </ul>
            <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl hover:bg-green-50">
              Get Started Free
            </button>
          </div>
          <div className="border p-8 rounded-xl bg-green-600 text-white">
            <h4 className="text-2xl font-bold mb-2">Pro</h4>
            <p className="text-4xl font-bold mb-6">$19<span className="text-lg opacity-70">/month</span></p>
            <ul className="space-y-2 mb-8">
              <li>✅ Unlimited bookings</li>
              <li>✅ Auto WhatsApp reminders</li>
              <li>✅ Multiple staff</li>
              <li>✅ Analytics dashboard</li>
              <li>✅ Priority support</li>
            </ul>
            <button className="w-full bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-gray-100">
              Start Pro Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 border-t">
        <p>© 2026 BookWA. All rights reserved.</p>
      </footer>
    </main>
  );
}