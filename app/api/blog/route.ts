import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/db';

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 500 });
  }
}
