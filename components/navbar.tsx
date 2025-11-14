"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { ModeToggle } from "./modeToggle"
import { useContext, useState } from "react"
import { SessionContext } from "@/providers/auth-provider"
import { SupabaseClient } from "@/data/supabaseClient"
import { Spinner } from "./ui/spinner"
import { usePathname } from "next/navigation"

const Navbar = () => {
  // Gets the user session data
  const userSession = useContext(SessionContext)
  const [isSigningOut, setIsSigningOut] = useState(false)

  // Check current pathname in the URL
  const pathname = usePathname()

  const handleSignOut = async () => {
    setIsSigningOut(true)

    // Try to sign out the user
    try {
      const supabase = SupabaseClient()

      const { error } = await supabase.auth.signOut()
    } catch (error) {
      console.log("Error signing out", error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <nav className="bg-card h-15 px-8 py-1 flex items-center justify-between text-card-foreground border-b rounded-b-2xl">
      <Link
        href="/"
        className="flex hover:-translate-y-1 hover:rounded-lg transition-all gap-2 items-center text-primary p-1"
      >
        <Image width={45} height={30} alt="logo" src="/logocalendar.svg" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold">Session</p>
          <p className="text-xs font-bold">planner</p>
        </div>
      </Link>

      <div className="flex gap-4 items-center">
        <ModeToggle />
        {userSession?.access_token && (
          <>
            <Link href="/teacher">
              <Button variant={pathname === '/teacher' ? 'default' : 'outline'}>Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant={pathname === "/" ? 'default' : 'outline'}>Student schedule</Button>
            </Link>
          </>
        )}

        <Link href="/signin">
          {userSession?.access_token ? (
            isSigningOut ? (
              <Button variant="outline">
                <Spinner />
                Signing out...
              </Button>
            ) : (
              <Button onClick={handleSignOut} variant="outline">
                Sign out
              </Button>
            )
          ) : (
            <Button variant="outline">Sign in as teacher</Button>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
