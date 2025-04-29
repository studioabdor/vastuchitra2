import { createClient } from '@supabase/supabase-js';
import * as functions from 'firebase-functions';

const supabaseUrl = functions.config().supabase.url;
const supabaseKey = functions.config().supabase.key;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in your environment.'
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const getSupabaseClient = () => {
  return supabase;
};