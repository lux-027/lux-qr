import { NextResponse } from 'next/server';
import { savePost } from '@/lib/db';

export async function POST() {
  try {
    const post = {
      id: 'post-1',
      title: 'Ücretsiz ve Güvenli QR Kod Nasıl Oluşturulur?',
      slug: 'ucretsiz-ve-guvenli-qr-kod-nasil-olusturulur',
      description: 'Adım adım tamamen ücretsiz, yüksek çözünürlüklü ve güvenli QR kod oluşturmanın yolları. LuxQr ile verilerinizi güvende tutun.',
      category: 'Rehber',
      mainImage: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&q=80',
      content: 'Günümüz dijital dünyasında QR kodlar, menülerden kartvizitlere, WiFi şifrelerinden dosya paylaşımına kadar her yerde karşımıza çıkıyor. Peki, hem tamamen ücretsiz hem de verilerinizin çalınma riski olmadan nasıl güvenli bir QR kod oluşturabilirsiniz?\n\n### 1. Güvenilir Bir Platform Seçin\nPiyasadaki birçok ücretsiz QR kod sitesi, oluşturduğunuz kodların arkasına reklam yerleştirir veya belirli bir süre sonra kodun çalışmasını durdurur. LuxQr gibi modern platformlar ise tamamen şeffaf, reklamsız ve ömür boyu kalıcı QR kodlar üretmenizi sağlar.\n\n### 2. QR Kod Türünü Belirleyin\nOluşturmak istediğiniz içeriğe göre doğru türü seçmek çok önemlidir:\n- **Metin/Not:** Kısa bilgileri saklamak için.\n- **Görsel/Video:** Dosyalarınızı doğrudan buluta yükleyip QR\'a dönüştürmek için.\n- **Bağlantı (URL):** Web sitenize veya sosyal medya profillerinize yönlendirmek için.\n\n### 3. Dinamik QR Kodların Avantajı\nDinamik QR kodlar sayesinde, kodu bir kez basıp bastıktan sonra bile arkasındaki linki veya dosyayı istediğiniz zaman değiştirebilirsiniz. Bu, özellikle restoran menüleri ve broşürler için harika bir maliyet tasarrufudur.\n\nLuxQr ile saniyeler içinde kendi güvenli QR kodunuzu oluşturmaya hemen ana sayfamızdan başlayabilirsiniz!',
      createdAt: new Date().toISOString(),
      published: true,
    };

    await savePost(post);

    return NextResponse.json({ success: true, message: 'Blog yazısı başarıyla eklendi', post });
  } catch (error) {
    console.error('Error seeding blog post:', error);
    return NextResponse.json({ success: false, error: 'Failed to seed blog post' }, { status: 500 });
  }
}
