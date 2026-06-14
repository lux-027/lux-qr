import { NextResponse } from 'next/server';
import { saveNewsletterSubscriber, getNewsletterSubscriberByEmail } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir e-posta adresi girin' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await getNewsletterSubscriberByEmail(email);
    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta zaten abone listesinde' },
        { status: 400 }
      );
    }

    // Create new subscriber
    const subscriber = {
      id: `newsletter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    };

    await saveNewsletterSubscriber(subscriber);

    return NextResponse.json({
      success: true,
      message: 'Bültenimize başarıyla abone oldunuz!'
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Abone olurken bir hata oluştu' },
      { status: 500 }
    );
  }
}
