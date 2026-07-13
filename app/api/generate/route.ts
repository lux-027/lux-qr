import { NextRequest, NextResponse } from 'next/server';
import { addDays, addWeeks, addMonths } from 'date-fns';
import { saveQrCode, QrCodeData, incrementGlobalCounter } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, contentType, fileName, filePath, expiration, note } = body;

    // Calculate expiration date and TTL (in seconds)
    let expiresAt = null;
    let ttlSeconds = null;

    if (expiration === '1day') {
      expiresAt = addDays(new Date(), 1);
      ttlSeconds = 24 * 60 * 60; // 1 day
    } else if (expiration === '1week') {
      expiresAt = addWeeks(new Date(), 1);
      ttlSeconds = 7 * 24 * 60 * 60; // 7 days
    } else if (expiration === '1month') {
      expiresAt = addMonths(new Date(), 1);
      ttlSeconds = 30 * 24 * 60 * 60; // 30 days
    } else if (expiration === '3months') {
      expiresAt = addMonths(new Date(), 3);
      ttlSeconds = 90 * 24 * 60 * 60; // 90 days
    } else if (expiration === '6months') {
      expiresAt = addMonths(new Date(), 6);
      ttlSeconds = 180 * 24 * 60 * 60; // 180 days
    } else if (expiration === '12months') {
      expiresAt = addMonths(new Date(), 12);
      ttlSeconds = 365 * 24 * 60 * 60; // 365 days
    }

    // Create QR code record — use slug for bio-link
    let qrId = uuidv4();
    if (contentType === 'bio-link') {
      try {
        const parsed = JSON.parse(content || '{}');
        const username = (parsed.username || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20);
        if (username) {
          const suffix = Math.random().toString(36).substring(2, 6);
          qrId = `${username}-${suffix}`;
        }
      } catch {}
    }
    const viewUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.luxqrpro.site'}/view/${qrId}`;
    const qrCode: QrCodeData = {
      id: qrId,
      content: content || '',
      contentType,
      fileName: fileName || null,
      filePath: filePath || null,
      note: note || null,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,
      createdAt: new Date().toISOString(),
      viewUrl,
    };

    // Save to Vercel KV with TTL
    await saveQrCode(qrCode, ttlSeconds);

    // Increment global counter
    await incrementGlobalCounter();

    return NextResponse.json({ 
      success: true, 
      id: qrCode.id,
      viewUrl: qrCode.viewUrl
    });
  } catch (error) {
    console.error('QR Üretim Hatası:', error);
    console.error('Error generating QR code:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
