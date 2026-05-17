import { kv } from '@vercel/kv';

export interface QrCodeData {
  id: string;
  content: string;
  contentType: 'text' | 'image' | 'video' | 'file';
  fileName: string | null;
  filePath: string | null;
  expiresAt: string | null;
  createdAt: string;
}

const QR_PREFIX = 'qr:';
const QR_LIST_KEY = 'qr:all';

// Get QR code by ID
export async function getQrCodeById(id: string): Promise<QrCodeData | null> {
  try {
    const data = await kv.get<QrCodeData>(`${QR_PREFIX}${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching QR code from KV:', error);
    return null;
  }
}

// Save QR code
export async function saveQrCode(qrCode: QrCodeData): Promise<void> {
  try {
    // Save individual QR code
    await kv.set(`${QR_PREFIX}${qrCode.id}`, qrCode);
    
    // Add to list of all QR codes
    await kv.sadd(QR_LIST_KEY, qrCode.id);
  } catch (error) {
    console.error('Error saving QR code to KV:', error);
    throw error;
  }
}

// Delete expired QR codes (optional cleanup)
export async function deleteExpiredQrCodes(): Promise<void> {
  try {
    const qrIds = await kv.smembers(QR_LIST_KEY);
    const now = new Date();
    
    for (const id of qrIds) {
      const qrCode = await getQrCodeById(id);
      if (qrCode && qrCode.expiresAt && new Date(qrCode.expiresAt) < now) {
        await kv.del(`${QR_PREFIX}${id}`);
        await kv.srem(QR_LIST_KEY, id);
      }
    }
  } catch (error) {
    console.error('Error deleting expired QR codes:', error);
  }
}
