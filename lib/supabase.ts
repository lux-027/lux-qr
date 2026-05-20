import { createClient } from '@supabase/supabase-js';

// Vercel build hatalarını ve boş key sorununu tamamen çözmek için doğrudan tanımlama
const supabaseUrl = 'https://uiltqydfbdqbsqkxaaqh.supabase.co';
const supabaseAnonKey = 'sb_publishable_I4n8V4BZBrzmUogv8j9Z1g_I1-20MJj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
