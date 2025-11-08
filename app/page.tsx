'use client'

import { ModeToggle } from "@/components/modeToggle"
import { Button } from "@/components/ui/button"
import {AddDateToDatabase, GetDates }from "@/data/supabase"
import Link from "next/link"
import { useEffect, useState } from "react"

const Home = () => {
  // Save the date from supabase to display in the jsx
  const [sessionDate, setsessionDate] = useState<Date>(new Date())

  // useEffect(() => {

  //   // Adds a entry with a date to the database tabel
  //   AddDateToDatabase()

  //   // Gets an array of dates from our table in supabase
  //   const getSessionDate = async () => {
  //     const dates = await GetDates()
      
  //     if(dates) {

  //       // HERE THE CONVERSION HAPPENS TO THE DANISH TIMEZONE ON THE CLIENT
  //       // The date string from supabase is UTC 0 formatted and needs to be formatted to the local time and timezone
  //       // The "Date" class does this conversion and we save it in a state variable
  //       setsessionDate(new Date(dates[dates.length - 1].session_date))

  //     }
  //   }

  //   getSessionDate();
  // }, [])
  
  return (
    <main className="items-center gap-2 justify-center flex min-h-screen">
      <Link href="/signin" className="underline">Gå til sign in</Link>
      <Link href="/signup" className="underline">Gå til sign up</Link>
      <p className="text-white">Har lavet nogle forskellige todos</p>
      {/* We display the converted string in a danish format. Since it is a dateobject we need to convert it to a string. 
      We could also use .toLocaleString for a better format */}
      {/* <p className="text-xl text-white">{sessionDate.toString()}</p> */}

      
    </main>
  )
}

export default Home

