import { NextRequest, NextResponse } from 'next/server';
import { addDays, addWeeks, addMonths } from 'date-fns';
import { saveQrCode, QrCodeData } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

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

    // Create QR code record
    const qrCode: QrCodeData = {
      id: uuidv4(),
      content: content || '',
      contentType,
      fileName: fileName || null,
      filePath: filePath || null,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,
      createdAt: new Date().toISOString(),
    };

    // Save to Vercel KV
    await saveQrCode(qrCode);

    return NextResponse.json({ 
      success: true, 
      id: qrCode.id
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
