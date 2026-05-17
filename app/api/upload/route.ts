import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

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

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${randomStr}_${originalName}`;

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
    });

    return NextResponse.json({
      success: true,
      fileName,
      filePath: blob.url,
    });
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { success: false, error: 'Dosya yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
