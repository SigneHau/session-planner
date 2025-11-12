"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { GetSessions } from "@/data/supabase"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "motion/react"
import SessionCard from "@/components/sessionCard"
import SessionSkeleton from "@/components/sessionSkeleton"

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
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-black text-xl"
        >
          An overview of all the student sessions
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
          }}
          className="text-muted-foreground max-w-lg"
        >
          Here you can see all the different sessions created by the teachers at
          your institution
        </motion.p>
      </div>
      <section className="grid grid-cols-12 gap-4">
        {sessions && sessions.length > 0
          ? sessions.map((session) => (
              <SessionCard key={session.id} {...session} />
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7].map((i) => <SessionSkeleton key={i} />)}
      </section>
    </div>
  )
}

export default Home
