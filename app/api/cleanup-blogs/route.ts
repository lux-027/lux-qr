import { NextResponse } from 'next/server';
import { deletePost } from '@/lib/db';

const toDelete = ['post-4', 'post-7', '3', 'post-6'];

export async function POST() {
  try {
    for (const id of toDelete) {
      await deletePost(id);
    }
    return NextResponse.json({ success: true, deleted: toDelete });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
