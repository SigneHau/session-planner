import { createClient } from "@supabase/supabase-js";

 const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
);


export async function AddDateToDatabase() {

    const { data } = await supabase.from("dates").insert({
        session_date: new Date(),
    });

    return data;

}

export async function GetDates() {

    const { data } = await supabase.from("dates").select("*");

    return data;

}