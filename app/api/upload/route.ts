import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const maxDuration = 300; // 300 second timeout for Vercel (5 minutes)

export async function POST(request: Request) {
  try {
    console.log('Upload API called');
    
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

    // Check file size before processing (Supabase limit is typically 50MB, but we use 100MB for user convenience)
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_FILE_SIZE) {
      console.error('File size exceeds limit:', file.size, 'Max:', MAX_FILE_SIZE);
      return NextResponse.json({ 
        error: 'Dosya boyutu çok büyük. Maksimum 100MB limiti var.',
        details: `Dosya boyutu: ${(file.size / 1024 / 1024).toFixed(2)}MB, Maksimum: 100MB`,
        code: '413'
      }, { status: 413 });
    }

    // Dosyayı buffer'a güvenli çevirme (Sunucu çökmesini engeller)
    console.log('Converting file to buffer...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Buffer created, size:', buffer.length);

    // Benzersiz dosya adı üretme (crypto.randomUUID kullanarak tam benzersizlik)
    const fileExt = file.name.split('.').pop();
    const uniqueId = crypto.randomUUID();
    const fileName = `${Date.now()}-${uniqueId}.${fileExt}`;
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

    // Supabase Storage'a yükleme
    console.log('Supabase Upload Başlatılıyor:', {
      fileName: safeFileName,
      originalFileName: file.name,
      fileSize: buffer.length,
      contentType: file.type,
      bucket: 'luxqr-files'
    });

    console.log('Starting Supabase upload...');
    const { data, error: storageError } = await supabase.storage
      .from('luxqr-files')
      .upload(safeFileName, buffer, {
        contentType: file.type,
        upsert: true,
        cacheControl: '3600'
      });
    console.log('Supabase upload completed');

    if (storageError) {
      console.error('Supabase Detaylı Storage Hatası:', storageError.message, storageError);
      return NextResponse.json({ 
        error: storageError.message,
        details: storageError.message,
        code: storageError.statusCode
      }, { status: 400 });
    }

    // Public URL alma
    console.log('Public URL Alınıyor:', { fileName: safeFileName });
    const { data: urlData } = supabase.storage
      .from('luxqr-files')
      .getPublicUrl(safeFileName);
    console.log('Public URL obtained:', urlData?.publicUrl);

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
