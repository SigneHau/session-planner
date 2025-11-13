"use client"

import { CreateSessionDialog } from "@/components/createSessionDialog"
import SessionCard from "@/components/sessionCard"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { GetUniqueTeacherSessions } from "@/data/supabase"
import { SessionContext } from "@/providers/auth-provider"
import { NotebookPen } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const TeacherDashboard = () => {
  // Gets the user session from the context API provided by the auth-provider component that wraps root layout.tsx
  const session = useContext(SessionContext)
  const router = useRouter()

  // Fetch all sessions and display them or empty state if none created
  const [sessions, setSessions] = useState<any[] | null>(null)

  // IF USER FROM SESSION IS NULL THEN ROUTE THE USER AWAY IF "UNDEFINED" THEN THE USER FROM SESSION IS LOADING
  useEffect(() => {
    if (session === null) {
      router.replace("/")
    }

    // Fetch the session data unique to the teacher that is logged in on mount
    const fetchSessions = async () => {
      const { data, error } = await GetUniqueTeacherSessions()
      if (error) {
        console.log("Error fetching data", error.message)
      } else {
        setSessions(data)
      }
    }
    fetchSessions()
  }, [session, router])

  // Loading state while resolving the initial session
  if (session === undefined) {
    return (
      <section className="bg-muted gap-2 justify-center flex min-h-screen">
        <div className="w-full p-8 space-y-4">
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-muted gap-2 justify-center flex min-h-screen">
      <div className="w-full p-8 space-y-4">
        <div className="flex flex-col gap-2">
          <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-black text-xl">
            Create lessons for your students
          </motion.h1>
          <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
          }}
          className="text-muted-foreground max-w-lg">
            Here you can create a session and choose the different details that
            you want your students to see.
          </motion.p>
        </div>
        <CreateSessionDialog />
        <section className="grid grid-cols-12 gap-4">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard key={session.id} {...session} />
            ))
          ) : (
            <Empty className="col-span-12 border-2 border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <NotebookPen />
                </EmptyMedia>
                <EmptyTitle>No sessions created</EmptyTitle>
                <EmptyDescription>
                  Create a new session and display to your students
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>
      </div>
    </section>
  )
}

export default TeacherDashboard