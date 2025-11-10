"use client"

import { SessionContext } from "@/providers/auth-provider"
import { useContext } from "react"

// NOT PUBLIC ROUTE, ONLY AUTHORISED USERS CAN SEE THIS DASHBOARD

// SHOWS CREATE SESSIONS AND MAYBE LINK TO PROFILE

const TeacherDashboard = () => {
  // Gets the user session from the context API provided by the auth-provider component that wraps root layout.tsx
  const session = useContext(SessionContext)

  // If no session or user then return something/loading state
  if (!session) {
    return <div>No user is signed in.</div>
  }

  return (
    <>
      <h1 className="font-bold text-2xl">Teacher dashboard with create sessions</h1>
      <p>User id: {session.user.id}</p>
      <p>User email: {session.user.email}</p>
    </>
  )
}

export default TeacherDashboard
