'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push('/')
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">You are logged in 🎉</p>
    </main>
  )
}
