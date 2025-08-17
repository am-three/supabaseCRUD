import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
// console.log('SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_KEY);
// console.log('env check:', import.meta.env.VITE_SUPABASE_URL);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;  