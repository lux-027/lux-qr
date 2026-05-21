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

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  mainImage: string;
  category: string;
  createdAt: string;
  published: boolean;
}

const QR_PREFIX = 'qr:';
const QR_LIST_KEY = 'qr:all';
const GLOBAL_COUNTER_KEY = 'global:counter';
const INITIAL_COUNTER_VALUE = 1723;

const POST_PREFIX = 'post:';
const POST_LIST_KEY = 'posts:all';

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
export async function saveQrCode(qrCode: QrCodeData, ttlSeconds?: number | null): Promise<void> {
  try {
    // Save individual QR code with TTL if provided
    if (ttlSeconds) {
      await kv.set(`${QR_PREFIX}${qrCode.id}`, qrCode, { ex: ttlSeconds });
    } else {
      await kv.set(`${QR_PREFIX}${qrCode.id}`, qrCode);
    }
    
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

// Get global counter value
export async function getGlobalCounter(): Promise<number> {
  try {
    const current = await kv.get<number>(GLOBAL_COUNTER_KEY);
    return current || INITIAL_COUNTER_VALUE;
  } catch (error) {
    console.error('Error fetching global counter:', error);
    return INITIAL_COUNTER_VALUE;
  }
}

// Increment global counter
export async function incrementGlobalCounter(): Promise<number> {
  try {
    const current = await getGlobalCounter();
    const newValue = current + 1;
    await kv.set(GLOBAL_COUNTER_KEY, newValue);
    return newValue;
  } catch (error) {
    console.error('Error incrementing global counter:', error);
    return INITIAL_COUNTER_VALUE;
  }
}

// Blog Post Functions

// Get all published posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    const postIds = await kv.smembers(POST_LIST_KEY);
    const posts: Post[] = [];
    
    for (const id of postIds) {
      const post = await getPostById(id);
      if (post && post.published) {
        posts.push(post);
      }
    }
    
    // Sort by date (newest first)
    return posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// Get post by ID
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const data = await kv.get<Post>(`${POST_PREFIX}${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching post from KV:', error);
    return null;
  }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postIds = await kv.smembers(POST_LIST_KEY);
    
    for (const id of postIds) {
      const post = await getPostById(id);
      if (post && post.slug === slug) {
        return post;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Save post
export async function savePost(post: Post): Promise<void> {
  try {
    await kv.set(`${POST_PREFIX}${post.id}`, post);
    await kv.sadd(POST_LIST_KEY, post.id);
  } catch (error) {
    console.error('Error saving post to KV:', error);
    throw error;
  }
}

// Delete post
export async function deletePost(id: string): Promise<void> {
  try {
    await kv.del(`${POST_PREFIX}${id}`);
    await kv.srem(POST_LIST_KEY, id);
  } catch (error) {
    console.error('Error deleting post from KV:', error);
    throw error;
  }
}
