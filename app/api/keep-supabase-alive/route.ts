import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      { status: 'error', message: 'Supabase env vars missing' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    // Rastgele bir token üret ve keepalive_logs tablosuna kaydet
    const token = Math.random().toString(36).substring(2, 15);
    const { error: insertError } = await supabase
      .from('keepalive_logs')
      .insert([
        { token, created_at: new Date().toISOString() }
      ]);

    if (insertError) {
      // Tablo yoksa veya başka bir ekleme hatası varsa, Supabase'i uyanık tutmak
      // için mevcut qr_codes tablosuna basit bir sorgu atalım
      const { error: queryError } = await supabase
        .from('qr_codes')
        .select('id')
        .limit(1);

      if (queryError) throw queryError;

      return NextResponse.json({
        status: 'ok',
        mode: 'fallback_query',
        timestamp: new Date().toISOString(),
      });
    }

    // Eski kayıtları temizle (30 günden eski)
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      await supabase
        .from('keepalive_logs')
        .delete()
        .lt('created_at', thirtyDaysAgo.toISOString());
    } catch {
      // Temizlik başarısız olsa bile devam et
    }

    return NextResponse.json({
      status: 'ok',
      mode: 'insert',
      token,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}
