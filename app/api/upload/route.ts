import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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
    const { data, error } = await supabaseAdmin.storage
      .from('luxqr-files')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json(
        { success: false, error: 'Dosya yüklenirken hata oluştu' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('luxqr-files')
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      fileName,
      filePath: publicUrl,
    });
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('size') || error.message.includes('too large')) {
        return NextResponse.json(
          { success: false, error: 'Dosya boyutu çok büyük (Max 100MB)' },
          { status: 400 }
        );
      }
      if (error.message.includes('network') || error.message.includes('connection')) {
        return NextResponse.json(
          { success: false, error: 'Sunucu bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { success: false, error: 'Dosya yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
