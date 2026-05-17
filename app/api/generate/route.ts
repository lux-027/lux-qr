import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addDays, addWeeks, addMonths } from 'date-fns';

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
    const qrCode = await prisma.qrCode.create({
      data: {
        content,
        contentType,
        fileName: fileName || null,
        filePath: filePath || null,
        expiresAt,
      },
    });

    return NextResponse.json({ 
      success: true, 
      id: qrCode.id,
      url: `/view/${qrCode.id}`
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
