"use client"

import { SupabaseClient } from "@/data/supabaseClient"
import { Session } from "@supabase/supabase-js"
import { createContext, useEffect, useState } from "react"

export const SessionContext = createContext<Session | null | undefined>(
  undefined
)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Hook to track the user session on auth state changes e.g. user signs in and gets a token
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    // Synchronously returns the supabase client through a wrapper utitlty function
    const supabase = SupabaseClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "INITIAL_SESSION":
          // First load: set existing session or null
          setSession(session ?? null)
          break
        case "SIGNED_IN":
        case "TOKEN_REFRESHED":
        case "USER_UPDATED":
          if (session) setSession(session)
          break
        case "SIGNED_OUT":
          setSession(null)
          break
        default:
          if (session === null) setSession(null)
          break
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
