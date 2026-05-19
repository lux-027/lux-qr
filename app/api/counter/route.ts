import { NextResponse } from 'next/server';
import { getGlobalCounter } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const counter = await getGlobalCounter();
    return NextResponse.json({ 
      success: true, 
      counter 
    });
  } catch (error) {
    console.error('Error fetching global counter:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch counter' },
      { status: 500 }
    );
  }
}
