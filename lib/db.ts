import { kv } from '@vercel/kv';

export interface QrCodeData {
  id: string;
  content: string;
  contentType: 'text' | 'image' | 'video' | 'file';
  fileName: string | null;
  filePath: string | null;
  note: string | null;
  expiresAt: string | null;
  createdAt: string;
  viewUrl: string | null;
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

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

const QR_PREFIX = 'qr:';
const QR_LIST_KEY = 'qr:all';
const GLOBAL_COUNTER_KEY = 'global:counter';
const INITIAL_COUNTER_VALUE = 1723;

const POST_PREFIX = 'post:';
const POST_LIST_KEY = 'posts:all';

const NEWSLETTER_PREFIX = 'newsletter:';
const NEWSLETTER_LIST_KEY = 'newsletter:all';

// In-memory fallback storage for local development
const inMemoryStorage = new Map<string, any>();
const inMemoryQrList = new Set<string>();
let inMemoryCounter = INITIAL_COUNTER_VALUE;

// Check if KV is available
let isKvAvailable = true;
let kvCheckComplete = false;

async function checkKvAvailability() {
  try {
    await kv.get('kv_check');
    isKvAvailable = true;
  } catch (error) {
    console.warn('KV not available, using in-memory storage');
    isKvAvailable = false;
  } finally {
    kvCheckComplete = true;
  }
}

// Initialize KV availability check
checkKvAvailability();

// Get QR code by ID
export async function getQrCodeById(id: string): Promise<QrCodeData | null> {
  try {
    if (isKvAvailable) {
      const data = await kv.get<QrCodeData>(`${QR_PREFIX}${id}`);
      return data;
    } else {
      return inMemoryStorage.get(`${QR_PREFIX}${id}`) || null;
    }
  } catch (error) {
    console.error('Error fetching QR code:', error);
    // Fallback to in-memory
    return inMemoryStorage.get(`${QR_PREFIX}${id}`) || null;
  }
}

// Save QR code
export async function saveQrCode(qrCode: QrCodeData, ttlSeconds?: number | null): Promise<void> {
  try {
    if (isKvAvailable) {
      // Save individual QR code with TTL if provided
      if (ttlSeconds) {
        await kv.set(`${QR_PREFIX}${qrCode.id}`, qrCode, { ex: ttlSeconds });
      } else {
        await kv.set(`${QR_PREFIX}${qrCode.id}`, qrCode);
      }
      
      // Add to list of all QR codes
      await kv.sadd(QR_LIST_KEY, qrCode.id);
    } else {
      // Fallback to in-memory storage
      inMemoryStorage.set(`${QR_PREFIX}${qrCode.id}`, qrCode);
      inMemoryQrList.add(qrCode.id);
      
      // Handle TTL in memory (simple cleanup)
      if (ttlSeconds && qrCode.expiresAt) {
        const expiresAt = new Date(qrCode.expiresAt);
        const now = new Date();
        const ttlMs = expiresAt.getTime() - now.getTime();
        if (ttlMs > 0) {
          setTimeout(() => {
            inMemoryStorage.delete(`${QR_PREFIX}${qrCode.id}`);
            inMemoryQrList.delete(qrCode.id);
          }, ttlMs);
        }
      }
    }
  } catch (error) {
    console.error('Error saving QR code:', error);
    // Fallback to in-memory storage
    inMemoryStorage.set(`${QR_PREFIX}${qrCode.id}`, qrCode);
    inMemoryQrList.add(qrCode.id);
  }
}

// Delete expired QR codes (optional cleanup)
export async function deleteExpiredQrCodes(): Promise<void> {
  try {
    if (isKvAvailable) {
      const qrIds = await kv.smembers(QR_LIST_KEY);
      const now = new Date();
      
      for (const id of qrIds) {
        const qrCode = await getQrCodeById(id);
        if (qrCode && qrCode.expiresAt && new Date(qrCode.expiresAt) < now) {
          await kv.del(`${QR_PREFIX}${id}`);
          await kv.srem(QR_LIST_KEY, id);
        }
      }
    } else {
      // Fallback to in-memory cleanup
      const now = new Date();
      for (const id of Array.from(inMemoryQrList)) {
        const qrCode = inMemoryStorage.get(`${QR_PREFIX}${id}`);
        if (qrCode && qrCode.expiresAt && new Date(qrCode.expiresAt) < now) {
          inMemoryStorage.delete(`${QR_PREFIX}${id}`);
          inMemoryQrList.delete(id);
        }
      }
    }
  } catch (error) {
    console.error('Error deleting expired QR codes:', error);
  }
}

// Get global counter value
export async function getGlobalCounter(): Promise<number> {
  try {
    if (isKvAvailable) {
      const current = await kv.get<number>(GLOBAL_COUNTER_KEY);
      return current || INITIAL_COUNTER_VALUE;
    } else {
      return inMemoryCounter;
    }
  } catch (error) {
    console.error('Error fetching global counter:', error);
    return inMemoryCounter;
  }
}

// Increment global counter
export async function incrementGlobalCounter(): Promise<number> {
  try {
    if (isKvAvailable) {
      const current = await getGlobalCounter();
      const newValue = current + 1;
      await kv.set(GLOBAL_COUNTER_KEY, newValue);
      return newValue;
    } else {
      inMemoryCounter++;
      return inMemoryCounter;
    }
  } catch (error) {
    console.error('Error incrementing global counter:', error);
    inMemoryCounter++;
    return inMemoryCounter;
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

// Newsletter Subscriber Functions

// Get all newsletter subscribers
export async function getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const subscriberIds = await kv.smembers(NEWSLETTER_LIST_KEY);
    const subscribers: NewsletterSubscriber[] = [];
    
    for (const id of subscriberIds) {
      const subscriber = await getNewsletterSubscriberById(id);
      if (subscriber) {
        subscribers.push(subscriber);
      }
    }
    
    return subscribers;
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }
}

// Get newsletter subscriber by ID
export async function getNewsletterSubscriberById(id: string): Promise<NewsletterSubscriber | null> {
  try {
    const data = await kv.get<NewsletterSubscriber>(`${NEWSLETTER_PREFIX}${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching newsletter subscriber from KV:', error);
    return null;
  }
}

// Get newsletter subscriber by email
export async function getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | null> {
  try {
    const subscriberIds = await kv.smembers(NEWSLETTER_LIST_KEY);
    
    for (const id of subscriberIds) {
      const subscriber = await getNewsletterSubscriberById(id);
      if (subscriber && subscriber.email.toLowerCase() === email.toLowerCase()) {
        return subscriber;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching newsletter subscriber by email:', error);
    return null;
  }
}

// Save newsletter subscriber
export async function saveNewsletterSubscriber(subscriber: NewsletterSubscriber): Promise<void> {
  try {
    await kv.set(`${NEWSLETTER_PREFIX}${subscriber.id}`, subscriber);
    await kv.sadd(NEWSLETTER_LIST_KEY, subscriber.id);
  } catch (error) {
    console.error('Error saving newsletter subscriber to KV:', error);
    throw error;
  }
}

// Delete newsletter subscriber
export async function deleteNewsletterSubscriber(id: string): Promise<void> {
  try {
    await kv.del(`${NEWSLETTER_PREFIX}${id}`);
    await kv.srem(NEWSLETTER_LIST_KEY, id);
  } catch (error) {
    console.error('Error deleting newsletter subscriber:', error);
    throw error;
  }
}
