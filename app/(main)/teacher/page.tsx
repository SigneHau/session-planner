"use client"

import { CreateSessionDialog } from "@/components/createSessionDialog"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { SessionContext } from "@/providers/auth-provider"
import { NotebookPen } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

const TeacherDashboard = () => {
  // Gets the user session from the context API provided by the auth-provider component that wraps root layout.tsx
  const session = useContext(SessionContext)
  const router = useRouter()

  // IF USER FROM SESSION IS NULL THEN ROUTE THE USER AWAY IF "UNDEFINED" THEN THE USER FROM SESSION IS LOADING

  useEffect(() => {
    if (session === null) {
      router.replace("/")
    }
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
          <h1 className="font-black text-xl">
            Create lessons for your students
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Here you can create a session and choose the different details that
            you want your students to see.
          </p>
        </div>
        <CreateSessionDialog />
        <Empty className="border-2 border-dashed">
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
      </div>
    </section>
  )
}

export default TeacherDashboard
