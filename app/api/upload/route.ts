import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Dosya yüklenmedi' },
        { status: 400 }
      );
    }

    // File size validation (100MB limit)
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Dosya boyutu çok büyük (Max 100MB)' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${randomStr}_${originalName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    console.log('Starting upload to Supabase:', { fileName, fileSize: file.size, contentType: file.type });
    const { data, error } = await supabase.storage
      .from('luxqr-files')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      console.error('Supabase upload error details:', JSON.stringify(error, null, 2));
      console.error('Upload attempt details:', { fileName, fileSize: buffer.length, bucket: 'luxqr-files' });
      return NextResponse.json(
        { success: false, error: 'Dosya yüklenirken hata oluştu', details: error.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('luxqr-files')
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      fileName,
      filePath: publicUrl,
    });
  } catch (error: any) {
    console.error("Yükleme sırasında hata:", error);
    return NextResponse.json({ error: error.message || "Dosya yüklenemedi" }, { status: 500 });
  }
}
