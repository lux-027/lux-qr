import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/db';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const response = NextResponse.json({ success: true, posts });
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 500 });
  }
}
