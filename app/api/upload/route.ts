import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase bağlantısını doğrudan burada garantiye alıyoruz
const supabaseUrl = 'https://uiltqydfbdqbsqkxaaqh.supabase.co';
const supabaseAnonKey = 'sb_publishable_I4n8V4BZBrzmUogv8j9Z1g_I1-20MJj';

const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    // Dosyayı buffer'a güvenli çevirme (Sunucu çökmesini engeller)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Benzersiz dosya adı üretme
    const fileExt = file.name.split('.').pop();
    const fileName = `luxqr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

    // Supabase Storage'a yükleme
    const { data, error: uploadError } = await supabase.storage
      .from('luxqr-files')
      .upload(safeFileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error('Detayli Supabase Hatasi:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    // Public URL alma
    const { data: urlData } = supabase.storage
      .from('luxqr-files')
      .getPublicUrl(safeFileName);

    if (!urlData || !urlData.publicUrl) {
      return NextResponse.json({ error: 'Public URL alınamadı' }, { status: 500 });
    }

    // QR kod frontend tarafında mı yoksa burada mı üretiliyor kontrol et. 
    // Eğer api içinde qrcode kütüphanesi patlıyorsa sadece linki dönmek en temizidir:
    return NextResponse.json({ success: true, url: urlData.publicUrl });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu içi hata' }, { status: 500 });
  }
}
