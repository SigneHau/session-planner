"use client"

import { SupabaseClient } from "@/data/supabaseClient"
import { Session } from "@supabase/supabase-js"
import { createContext, useEffect, useState } from "react"

export const SessionContext = createContext<Session | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    // Hook to track the user session on auth state changes e.g. user signs in and gets a token
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {

    // Synchronously returns the supabase client through a wrapper utitlty function
    const supabase = SupabaseClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // If the user signs out we need to kill the session
        if (event === "SIGNED_OUT") {
        setSession(null)
      } else if (session) {
        // Sets the session on auth change
        setSession(session)
      }
    })

    // cleans up the subscriber function
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    // Should wrap the whole application in the root layout file -> Gives the application access to the session and user
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
