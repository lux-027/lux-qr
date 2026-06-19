import { NextResponse } from 'next/server';
import { getAllPosts, deletePost } from '@/lib/db';

export async function POST() {
  try {
    const posts = await getAllPosts();
    console.log(`Toplam ${posts.length} blog postu bulundu.`);
    
    // Başlıkları küçük harfe çevirip karşılaştır
    const titleMap = new Map<string, any[]>();
    const slugMap = new Map<string, any[]>();
    
    posts.forEach(post => {
      const normalizedTitle = post.title.toLowerCase().trim();
      const normalizedSlug = post.slug.toLowerCase().trim();
      
      if (titleMap.has(normalizedTitle)) {
        titleMap.get(normalizedTitle)!.push(post);
      } else {
        titleMap.set(normalizedTitle, [post]);
      }
      
      if (slugMap.has(normalizedSlug)) {
        slugMap.get(normalizedSlug)!.push(post);
      } else {
        slugMap.set(normalizedSlug, [post]);
      }
    });
    
    // Tekrarlayan başlıkları bul ve sil (ilk hariç)
    let deletedCount = 0;
    const deletedPosts: any[] = [];
    
    titleMap.forEach((posts, title) => {
      if (posts.length > 1) {
        // En yeni postu tut, diğerlerini sil
        const sortedPosts = posts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        // İlkini (en yeni) tut, diğerlerini sil
        for (let i = 1; i < sortedPosts.length; i++) {
          const postToDelete = sortedPosts[i];
          console.log(`Siliniyor: "${postToDelete.title}" (ID: ${postToDelete.id})`);
          deletePost(postToDelete.id);
          deletedPosts.push(postToDelete);
          deletedCount++;
        }
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `${deletedCount} adet tekrlayan blog postu silindi.`,
      deletedPosts 
    });
  } catch (error) {
    console.error('Error cleaning up duplicate posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to cleanup duplicate posts' }, { status: 500 });
  }
}
