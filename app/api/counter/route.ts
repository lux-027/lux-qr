import { NextResponse } from 'next/server';
import { getGlobalCounter, incrementGlobalCounter } from '@/lib/db';

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

export async function POST() {
  try {
    const newCounter = await incrementGlobalCounter();
    return NextResponse.json({ 
      success: true, 
      counter: newCounter 
    });
  } catch (error) {
    console.error('Error incrementing global counter:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to increment counter' },
      { status: 500 }
    );
  }
}
