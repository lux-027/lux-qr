const { kv } = require('@vercel/kv');

const POST_PREFIX = 'post:';
const POST_LIST_KEY = 'posts:all';

async function getAllPosts() {
  try {
    const postIds = await kv.smembers(POST_LIST_KEY);
    const posts = [];
    
    for (const id of postIds) {
      const post = await kv.get(`${POST_PREFIX}${id}`);
      if (post) {
        posts.push(post);
      }
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

async function findDuplicatePosts() {
  const posts = await getAllPosts();
  console.log(`Toplam ${posts.length} blog postu bulundu.`);
  
  // Başlıkları küçük harfe çevirip karşılaştır
  const titleMap = new Map();
  const slugMap = new Map();
  
  posts.forEach(post => {
    const normalizedTitle = post.title.toLowerCase().trim();
    const normalizedSlug = post.slug.toLowerCase().trim();
    
    if (titleMap.has(normalizedTitle)) {
      titleMap.get(normalizedTitle).push(post);
    } else {
      titleMap.set(normalizedTitle, [post]);
    }
    
    if (slugMap.has(normalizedSlug)) {
      slugMap.get(normalizedSlug).push(post);
    } else {
      slugMap.set(normalizedSlug, [post]);
    }
  });
  
  // Tekrarlayan başlıkları bul
  const duplicateTitles = [];
  titleMap.forEach((posts, title) => {
    if (posts.length > 1) {
      duplicateTitles.push({ title, posts });
    }
  });
  
  // Tekrarlayan slug'ları bul
  const duplicateSlugs = [];
  slugMap.forEach((posts, slug) => {
    if (posts.length > 1) {
      duplicateSlugs.push({ slug, posts });
    }
  });
  
  console.log('\n=== Tekrarlayan Başlıklar ===');
  if (duplicateTitles.length === 0) {
    console.log('Tekrarlayan başlık bulunamadı.');
  } else {
    duplicateTitles.forEach(({ title, posts }) => {
      console.log(`\nBaşlık: "${title}" (${posts.length} adet)`);
      posts.forEach(post => {
        console.log(`  - ID: ${post.id}, Slug: ${post.slug}, Tarih: ${post.createdAt}`);
      });
    });
  }
  
  console.log('\n=== Tekrarlayan Slug\'lar ===');
  if (duplicateSlugs.length === 0) {
    console.log('Tekrarlayan slug bulunamadı.');
  } else {
    duplicateSlugs.forEach(({ slug, posts }) => {
      console.log(`\nSlug: "${slug}" (${posts.length} adet)`);
      posts.forEach(post => {
        console.log(`  - ID: ${post.id}, Başlık: ${post.title}, Tarih: ${post.createdAt}`);
      });
    });
  }
  
  return { duplicateTitles, duplicateSlugs, allPosts: posts };
}

findDuplicatePosts().then(result => {
  console.log('\n=== Özet ===');
  console.log(`Tekrarlayan başlık sayısı: ${result.duplicateTitles.length}`);
  console.log(`Tekrarlayan slug sayısı: ${result.duplicateSlugs.length}`);
  process.exit(0);
}).catch(error => {
  console.error('Hata:', error);
  process.exit(1);
});
