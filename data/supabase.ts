import { sessionProps } from "@/lib/types"
import { SupabaseClient } from "./supabaseClient"

export async function AddNewSessionToDb(session: sessionProps) {
  const supabase = SupabaseClient()

  // Insert a row in sessions table
  const { data, error } = await supabase
    .from("sessions")
    .insert(session)
    .select()

  return { data: data, error: error }
}

export async function GetSessions() {
  const supabase = SupabaseClient()

  // Select all data from sessions table
  const { data, error } = await supabase.from("sessions").select()

  return { data: data, error: error }
}

export async function GetUniqueTeacherSessions() {
  const supabase = SupabaseClient()

  // Gets the user if exist
  const { data: { user } } = await supabase.auth.getUser()

  // Gets the rows on the session table where the authorised user id matches the teacherId column => Their own data
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("teacherId", user?.id)

  return { data: data, error: error }
}
