import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const qrCode = await prisma.qrCode.findUnique({
      where: { id: params.id },
    });

    if (!qrCode) {
      return NextResponse.json(
        { success: false, error: 'QR code not found' },
        { status: 404 }
      );
    }

    // Check if expired
    if (qrCode.expiresAt && new Date() > qrCode.expiresAt) {
      return NextResponse.json({
        success: false,
        expired: true,
        error: 'QR code has expired',
      });
    }

    return NextResponse.json({
      success: true,
      data: qrCode,
    });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch QR code' },
      { status: 500 }
    );
  }
}
