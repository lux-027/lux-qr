import { NextRequest, NextResponse } from 'next/server';
import { addDays, addWeeks, addMonths } from 'date-fns';
import { saveQrCode } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, contentType, fileName, filePath, expiration } = body;

    // Calculate expiration date
    let expiresAt = null;
    if (expiration === '1day') {
      expiresAt = addDays(new Date(), 1);
    } else if (expiration === '1week') {
      expiresAt = addWeeks(new Date(), 1);
    } else if (expiration === '1month') {
      expiresAt = addMonths(new Date(), 1);
    }
    // 'unlimited' means expiresAt stays null

    // Generate unique ID
    const id = randomUUID();

    // Create QR code record
    const qrCode = {
      id,
      content: content || '',
      contentType: contentType as 'text' | 'image' | 'video' | 'file',
      fileName: fileName || null,
      filePath: filePath || null,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,
      createdAt: new Date().toISOString(),
    };

    await saveQrCode(qrCode);

    return NextResponse.json({ 
      success: true, 
      id
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
