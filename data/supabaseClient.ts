import { createClient } from "@supabase/supabase-js";

// Utility function to get supabase client
export async function SupabaseClient() {
    
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
    );

    return supabase;

}
