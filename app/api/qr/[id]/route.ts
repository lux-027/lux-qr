import { NextRequest, NextResponse } from 'next/server';
import { getQrCodeById } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Fetching QR code with ID:', params.id);
    const qrCode = await getQrCodeById(params.id);
    console.log('QR code data:', qrCode);

    if (!qrCode) {
      console.log('QR code not found');
      return NextResponse.json(
        { success: false, error: 'QR code not found' },
        { 
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          }
        }
      );
    }

    // Check if expired
    if (qrCode.expiresAt && new Date() > new Date(qrCode.expiresAt)) {
      console.log('QR code expired');
      return NextResponse.json({
        success: false,
        expired: true,
        error: 'QR code has expired',
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        }
      });
    }

    console.log('QR code found and valid');
    return NextResponse.json({
      success: true,
      data: qrCode,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      }
    });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { success: false, error: 'Failed to fetch QR code' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        }
      }
    );
  }
}
