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


    // Motion library animation variants to enable animations
  const containerVariant = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    hidden: {},
  }

  const itemVariant = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 },
  }

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
      {sessions === null ? (
          <div className="grid grid-cols-12 gap-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <SessionSkeleton key={i} />)}
          </div>
        ) : (
          <motion.section
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-12 gap-4"
          >
            {sessions.map((session) => (
              <motion.div className="col-span-3" variants={itemVariant} key={session.id}>
                <SessionCard
                  {...session}
                />
              </motion.div>
            ))}
          </motion.section>
        )}
    </div>
  )
}

export default Home