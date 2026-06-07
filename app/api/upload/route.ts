import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    // Environment değişkenlerinin doğruluğunu kontrol et
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('Supabase Environment Variables Missing:', {
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!supabaseServiceRoleKey,
        env: process.env.NODE_ENV
      });
      return NextResponse.json({ 
        error: 'Supabase environment variables tanımlı değil. Lütfen Vercel Environment Variables kısmından NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY değerlerini ekleyin.',
        details: 'Missing environment variables'
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // FormData içeriğini debug için logla
    console.log('FormData Debug:', {
      hasFile: !!file,
      fileKeys: Array.from(formData.keys()),
      fileSize: file?.size,
      fileType: file?.type,
      fileName: file?.name
    });

    if (!file) {
      console.error('Dosya bulunamadı - FormData keys:', Array.from(formData.keys()));
      return NextResponse.json({ 
        error: 'Dosya objesi bulunamadı. FormData\'da "file" key\'i eksik olabilir.',
        debug: { keys: Array.from(formData.keys()) }
      }, { status: 400 });
    }

    // Dosyayı buffer'a güvenli çevirme (Sunucu çökmesini engeller)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Benzersiz dosya adı üretme
    const fileExt = file.name.split('.').pop();
    const fileName = `luxqr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

    // Supabase Storage'a yükleme
    console.log('Supabase Upload Başlatılıyor:', {
      fileName: safeFileName,
      originalFileName: file.name,
      fileSize: buffer.length,
      contentType: file.type,
      bucket: 'luxqr-files'
    });

    const { data, error: uploadError } = await supabase.storage
      .from('luxqr-files')
      .upload(safeFileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase Upload Hatası:', {
        message: uploadError.message,
        statusCode: uploadError.statusCode,
        error: uploadError,
        fileName: safeFileName,
        fileSize: buffer.length
      });
      return NextResponse.json({ 
        error: `Supabase yükleme hatası: ${uploadError.message}`,
        details: uploadError.message,
        code: uploadError.statusCode
      }, { status: 400 });
    }

    // Public URL alma
    console.log('Public URL Alınıyor:', { fileName: safeFileName });
    const { data: urlData } = supabase.storage
      .from('luxqr-files')
      .getPublicUrl(safeFileName);

    if (!urlData || !urlData.publicUrl) {
      console.error('Public URL Alınamadı:', { urlData, fileName: safeFileName });
      return NextResponse.json({ 
        error: 'Public URL alınamadı. Dosya başarıyla yüklendi ancak URL oluşturulamadı.',
        fileName: safeFileName
      }, { status: 500 });
    }

    // QR kod frontend tarafında mı yoksa burada mı üretiliyor kontrol et. 
    // Eğer api içinde qrcode kütüphanesi patlıyorsa sadece linki dönmek en temizidir:
    return NextResponse.json({ success: true, url: urlData.publicUrl });

  } catch (error: any) {
    console.error('Dosya Yükleme Hatası:', error);
    console.error('Hata detayları:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: error.message || 'Sunucu içi hata',
      details: error.message,
      name: error.name
    }, { status: 500 });
  }
}
