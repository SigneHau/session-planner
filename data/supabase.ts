import { SupabaseClient } from "./supabaseClient";

export async function AddDateToDatabase() {

    const supabase = await SupabaseClient()

    const { data } = await supabase.from("dates").insert({
        session_date: new Date(),
    });

    return data;

}

export async function GetDates() {

    const supabase = await SupabaseClient()

    const { data } = await supabase.from("dates").select("*");

    return data;

}