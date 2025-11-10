"use client"

import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { SessionContext } from "@/providers/auth-provider"
import { NotebookPen } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useContext } from "react"

const TeacherDashboard = () => {
  // Gets the user session from the context API provided by the auth-provider component that wraps root layout.tsx
  const session = useContext(SessionContext)

  // If no session or user redirect to home page
  if (!session) {
    redirect('/')
  }

  return (
    <section className="bg-muted gap-2 justify-center flex min-h-screen">
      <div className="w-full p-8 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-black text-xl">
            Create lessons for your students
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Here you can create a session and choose the different details that
            you want your students to see.
          </p>
        </div>
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
          <EmptyContent>
            <Button variant="outline" size="sm">
              Create session
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}

export default TeacherDashboard
