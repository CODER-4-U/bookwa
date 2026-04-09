'use client'
import { useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  useEffect(() => {
    const handleAuth = async () => {
      await supabase.auth.getSession()
      
      if (window.opener) {
        window.opener.location.href = '/dashboard'
        window.close()
      } else {
        window.location.href = '/dashboard'
      }
    }
    
    setTimeout(handleAuth, 1000)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <p className="text-2xl mb-2">✅</p>
        <p className="text-gray-600">Almost done...</p>
      </div>
    </div>
  )
}