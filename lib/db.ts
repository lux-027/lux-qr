import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export interface QrCodeData {
  id: string;
  content: string;
  contentType: 'text' | 'image' | 'video' | 'file';
  fileName: string | null;
  filePath: string | null;
  expiresAt: string | null;
  createdAt: string;
}

const DB_PATH = join(process.cwd(), 'data', 'qr-codes.json');
const DATA_DIR = join(process.cwd(), 'data');

// Initialize database
async function initDb() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  
  if (!existsSync(DB_PATH)) {
    await writeFile(DB_PATH, JSON.stringify([], null, 2));
  }
}

// Read all QR codes
export async function getAllQrCodes(): Promise<QrCodeData[]> {
  await initDb();
  try {
    const data = await readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Get QR code by ID
export async function getQrCodeById(id: string): Promise<QrCodeData | null> {
  const qrCodes = await getAllQrCodes();
  return qrCodes.find(qr => qr.id === id) || null;
}

// Save QR code
export async function saveQrCode(qrCode: QrCodeData): Promise<void> {
  await initDb();
  const qrCodes = await getAllQrCodes();
  qrCodes.push(qrCode);
  await writeFile(DB_PATH, JSON.stringify(qrCodes, null, 2));
}

// Delete expired QR codes (optional cleanup)
export async function deleteExpiredQrCodes(): Promise<void> {
  await initDb();
  const qrCodes = await getAllQrCodes();
  const now = new Date();
  const validQrCodes = qrCodes.filter(qr => {
    if (!qr.expiresAt) return true;
    return new Date(qr.expiresAt) > now;
  });
  await writeFile(DB_PATH, JSON.stringify(validQrCodes, null, 2));
}
