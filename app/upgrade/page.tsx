'use client'
import { useRouter } from 'next/navigation'


export default function Upgrade() {
  const router = useRouter()
  const payoneerLink =
    'https://link.payoneer.com/Token?t=717AF8F4A66A420E8DACC158E8E40E23&src=pl'
  const contactEmail = 'muteerehamn854@gmail.com'

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => router.push('/')}
          className="text-2xl font-bold text-green-600 cursor-pointer"
        >
          BookWA 📅
        </h1>
        {/* <button
          onClick={() => router.push('/landingpage')}
          className="text-gray-600 hover:text-green-600"
        >
          back to home
        </button> */}
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Upgrade to BookWA Pro 🚀
          </h1>
          <p className="text-xl text-gray-600">
            14 days FREE trial • Cancel anytime • 7-day money back guarantee
          </p>
          <p className="text-5xl font-bold text-green-600 mt-6">
            $19<span className="text-xl text-gray-500">/month</span>
          </p>
          <p className="text-gray-500 mt-2">First 14 days completely FREE</p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            What You Get With Pro:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Unlimited bookings',
              'Auto WhatsApp reminders',
              'Multiple staff management',
              'Advanced analytics dashboard',
              'Priority 24/7 support',
              '7-day money back guarantee',
              'Custom booking page',
              'Export bookings to Excel',
            ].map((feature, i) => (
              <p key={i} className="text-gray-700">
                ✅ {feature}
              </p>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choose Payment Method:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* International Payment */}
          <div className="bg-white rounded-2xl shadow p-6 border-2 border-green-100">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              International Payment
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Pay securely with card via Payoneer
            </p>
            <ul className="text-gray-600 text-sm mb-4 space-y-1">
              <li>✅ Visa / Mastercard</li>
              <li>✅ Debit Card</li>
              <li>✅ Bank Transfer</li>
              <li>✅ Secure and Encrypted</li>
            </ul>
            <div className="flex justify-center mb-4">
              <img
                src="/qr-payment.png"
                alt="Scan to Pay"
                width={150}
                height={150}
                className="rounded-xl border"
              />
            </div>
            <p className="text-center text-gray-500 text-xs mb-4">
              Scan QR code to pay
            </p>
            <a
              href={payoneerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition text-center"
            >
              Pay Now via Payoneer 💳
            </a>
          </div>

          {/* Pakistan Payment */}
          <div className="bg-white rounded-2xl shadow p-6 border-2 border-green-100">
            <div className="text-sm mb-3 text-gray-800">🇵🇰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Pakistan Payments
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Pay via JazzCash
            </p>
            <div className="bg-green-50 rounded-xl p-4 mb-4">
              <p className="text-gray-800 font-bold text-center text-xl flex items-center justify-center gap-2">
                <img src="jazzcash.png" className="w-7 h-7" alt="easypaisa" />
                03405137118
              </p>
              <p className="text-gray-600 text-center text-sm mt-1">
                JazzCash
              </p>
              <p className="text-gray-600 text-center text-sm">
                Account: shamsa khawal
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 mb-4">
              <p className="text-gray-800 font-bold text-center text-xl flex items-center justify-center gap-2">
                <img src="easypaisa.png" className="w-7 h-7" alt="easypaisa" />
                03405137118
              </p>
              <p className="text-gray-600 text-center text-sm mt-1">
                Easypaisa
              </p>
              <p className="text-gray-600 text-center text-sm">
                Account: shamsa khawal
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-3 mb-4">
              <p className="text-gray-700 text-sm text-center font-bold">
                Send PKR 5,300 ≈ $19
              </p>
            </div>
            <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=muteerehman854@gmail.com&su=BookWA+Pro+Payment&body=I+have+paid+for+BookWA+Pro.+My+BookWA+account+email+is:"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition text-center"
          >
            Send Payment Proof 📧
          </a>
          </div>
        </div>

        {/* After Payment Steps */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            📋 After Payment Steps:
          </h3>
          <ol className="text-gray-700 space-y-2">
            <li>
              1️⃣ Send payment screenshot to <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muteerehman854@gmail.com&su=BookWA+Pro+Payment&body=Hello,%0A%0AI%20have%20paid%20for%20BookWA%20Pro.%20Here%20is%20my%20payment%20screenshot%20attached.%0A%0AMy%20BookWA%20account%20email%20is:%20[your%20account%20email]%0A%0AThank%20you" target = "_blank"><strong>{contactEmail}</strong></a>
            </li>
            <li>2️⃣ Include your BookWA account email</li>
            <li>3️⃣ We activate Pro within <strong>2 hours</strong></li>
            <li>4️⃣ You receive confirmation email</li>
          </ol>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '🔒', text: 'Secure Payment' },
            { icon: '↩️', text: '7-Day Refund' },
            { icon: '⚡', text: '2Hr Activation' },
            { icon: '💬', text: '24/7 Support' },
          ].map((badge, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow">
              <p className="text-3xl mb-1">{badge.icon}</p>
              <p className="text-gray-700 text-sm font-medium">{badge.text}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="text-center">
          <p className="text-gray-600">Questions? Contact us:</p>
          <a
            href={`mailto:${contactEmail}`}
            className="text-green-600 font-bold hover:underline"
          >
            {contactEmail}
          </a>
        </div>
      </div>
    </main>
  )
}