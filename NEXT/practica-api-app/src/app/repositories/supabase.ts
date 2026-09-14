import { createClient } from '@supabase/supabase-js'


const supabaseUrl='https://pupozoplotgkuqvfykrg.supabase.co';
const supabaseKey='sb_publishable_FmjrQcUT6nd4ztOJ489QjA_uRKqPAlZ';

//Crear la conexión con supabase.

export const supabase = createClient(supabaseUrl,supabaseKey);