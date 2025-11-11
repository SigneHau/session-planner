"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GetSessions } from "@/data/supabase"
import { useEffect, useState } from "react"

const Home = () => {
  // Fetch all sessions and display them or empty state if none created
  const [sessions, setSessions] = useState<any[] | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await GetSessions()
      if (error) {
        console.log("Error fetching data", error.message)
      } else {
        setSessions(data)
      }
    }

    fetchSessions()
  }, [])

  return (
    <div className="p-8 space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-black text-xl">
          An overview of all the student sessions
        </h1>
        <p className="text-muted-foreground max-w-lg">
          Here you can create a see all the different sessions created by the
          teachers at your institution
        </p>
      </div>
      <section className="grid grid-cols-12 gap-4">
        {sessions &&
          sessions.map(
            ({
              id,
              title,
              description,
              subject,
              starts_at,
              ends_at,
              location,
              teacherId,
            }) => (
              <Card className="max-w-sm col-span-3" key={id}>
                <CardContent className="space-y-2">
                  <h2 className="font-semibold">{title}</h2>
                </CardContent>
              </Card>
            )
          )}
      </section>
    </div>
  )
}

export default Home
