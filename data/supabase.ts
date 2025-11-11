import { sessionProps } from "@/lib/types"
import { SupabaseClient } from "./supabaseClient"

export async function AddNewSessionToDb(session : sessionProps) {

  const supabase = SupabaseClient()

  const { data, error } = await supabase
    .from("sessions")
    .insert(session)
    .select()

  return {data: data, error: error}
}


export async function GetSessions() {

  const supabase = SupabaseClient()

  const { data, error } = await supabase
  .from('sessions')
  .select()

  return {data: data, error: error}
}
