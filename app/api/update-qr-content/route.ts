import { NextRequest, NextResponse } from 'next/server';
import { getQrCodeById, saveQrCode } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, newContent } = body;

    const qrCode = await getQrCodeById(id);
    
    if (!qrCode) {
      return NextResponse.json(
        { success: false, error: 'QR code not found' },
        { status: 404 }
      );
    }

    // Update the content to be the view URL
    qrCode.content = newContent;
    await saveQrCode(qrCode);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating QR content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update QR content' },
      { status: 500 }
    );
  }
}
