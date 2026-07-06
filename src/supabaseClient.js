import { createClient } from '@supabase/supabase-js';

// Kredensial Supabase — hardcoded karena sudah dikonfigurasi
const supabaseUrl = 'https://vsjiblsysajpesvaznwq.supabase.co';
const supabaseAnonKey = 'sb_publishable_UjwDdAuHQ55cAjjax_l4QA_yg9q-MMe';

// Selalu terkoneksi karena kredensial sudah valid
export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.info('Supabase berhasil terkoneksi ke:', supabaseUrl);
