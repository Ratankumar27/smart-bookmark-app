'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Bookmark = {
  id: string
  url: string
  title: string
  created_at: string
}

export default function Home() {

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [user, setUser] = useState<any>(null)

  

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
      redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const fetchBookmarks = async (userId: string) => {
  const { data } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (data) setBookmarks(data)
}

useEffect(() => {
  let channel: any

  // 1️⃣ Get current user
  supabase.auth.getUser().then(({ data }) => {
    if (!data.user) return

    setUser(data.user)
    fetchBookmarks(data.user.id)

    // 2️⃣ Realtime subscription (USER-SCOPED)
    channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${data.user.id}`,
        },
        () => fetchBookmarks(data.user.id)
      )
      .subscribe()
  })

  // 3️⃣ Listen to auth changes
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (session?.user) {
        setUser(session.user)
        fetchBookmarks(session.user.id)
      } else {
        setUser(null)
        setBookmarks([])
        if (channel) supabase.removeChannel(channel)
      }
    }
  )

  return () => {
    if (channel) supabase.removeChannel(channel)
    authListener.subscription.unsubscribe()
  }
}, [])


  const addBookmark = async () => {
    if (!user) return
    const url = prompt('Enter URL')
    const title = prompt('Enter title')

    if (!url || !title) return

    await supabase.from('bookmarks').insert({
      url,
      title,
      user_id: user.id,
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
  <main className="min-h-screen relative flex flex-col items-center justify-center gap-6">

    {user && (
      <button
        onClick={logout}
        className="absolute top-6 right-6 px-4 py-2 bg-gray-700 text-white rounded"
      >
        Logout
      </button>
    )}
    {user && (
  <div className="absolute top-8 right-28 text-sm text-gray-600">
    {user.email}
  </div>
)}

    {!user && (
      <button
        onClick={signInWithGoogle}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Sign in with Google
      </button>
    )}

    <h2 className="text-xl font-bold">📌 Live Bookmarks</h2>

    {user && (
      <button
        onClick={addBookmark}
        className="px-6 py-3 bg-green-600 text-white rounded"
      >
        ➕ Add Bookmark
      </button>
    )}

    <ul className="w-full max-w-md space-y-3">
      
      {bookmarks.map(b => (

        <li
          key={b.id}
          className="border p-3 rounded flex justify-between"
        >
          <a href={b.url} target="_blank" className="text-blue-600">
            {b.title}
          </a>

          {user && (
            <button
              onClick={async () => {
              const { error } = await supabase
              .from('bookmarks')
              .delete()
              .eq('id', b.id)

              if (error) {
                console.error('Delete failed:', error.message)
                alert(error.message)
                return
              }

              // ✅ UPDATE UI IMMEDIATELY
              setBookmarks(prev => prev.filter(item => item.id !== b.id))
              }}
              className="text-red-500"
            >
              Delete
            </button>
          )}
          
        </li>
      ))}
    </ul>
  </main>
)

}