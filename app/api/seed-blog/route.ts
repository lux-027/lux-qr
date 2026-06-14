import { NextResponse } from 'next/server';
import { savePost } from '@/lib/db';

export async function POST() {
  try {
    const posts = [
      {
        id: '2',
        title: 'Restoranlar İçin QR Menü Kullanmanın 5 Avantajı',
        slug: 'restoranlar-icin-qr-menu-kullanmanin-5-avantaji',
        description: 'QR menüler maliyetleri düşürür, güncellemeyi kolaylaştırır ve hijyeniktir. Dinamik QR kod ile menüyü anında değiştirin.',
        category: 'İşletme',
        mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
        content: 'Restoran işletmecileri olarak sürekli maliyetleri düşürmek ve operasyonel verimliliği artırmak arayışındayız. QR menü teknolojisi, bu hedeflere ulaşmak için mükemmel bir çözüm sunuyor. Geleneksel menü sistemlerinin yerini alan dijital QR menüler, sadece bir trend değil, restoran yönetiminde devrim yaratan bir araçtır.\n\n### 1. Maliyet Tasarrufu\n\nGeleneksel kağıt menüler her sipariş değişikliğinde yeniden basılmalıdır. Bu durum, özellikle mevsimsel değişiklikler veya özel günler için menü güncellemeleri gerektiren restoranlar için önemli bir maliyet kalemi oluşturur. QR menüler ise dijital olduğu için anında güncellenebilir ve basım maliyetini ortadan kaldırır.\n\n**Maliyet Analizi:**\n- Kağıt menü basım maliyeti: Her güncellemede 500-2000 TL\n- Tasarım ve düzenleme süresi: 2-3 iş günü\n- QR menü maliyeti: Tek seferlik kurulum, sonsuz güncelleme\n- Tasarım ve düzenleme süresi: Dakikalar içinde\n\nYıllık bazda hesaplandığında, bir restoran ortalama 10-12 kez menü güncellemesi yapar. Bu durumda tasarruf miktarı oldukça ciddi boyutlara ulaşır. Ayrıca, menüde yapılacak küçük bir düzeltme için tüm menüyü yeniden basmak yerine, tek tıkla güncelleme yapabilirsiniz.\n\n### 2. Hijyen ve Güvenlik\n\nPandemi sonrası hijyen standartları değişti. Müşteriler artık ortak kullanılan nesnelere daha temkinli yaklaşmaktadır. QR menüler, dokunmadan menüyü görüntüleme imkanı sunarak müşteri güvenini artırır.\n\n**Hijyen Avantajları:**\n- Fiziksel temas olmadan menü erişimi\n- Her müşteri kendi telefonunu kullanır\n- Menü dezenfeksiyon ihtiyacı ortadan kalkar\n- Müşteri psikolojisinde güven artışı\n\nÖzellikle kalabalık restoranlarda, menülerin sürekli el değiştirmesi hijyen riski oluşturur. QR menü sistemi bu riski tamamen ortadan kaldırır ve müşterilerinize daha güvenli bir yemek deneyimi sunmanızı sağlar.\n\n### 3. Anında Güncelleme\n\nFiyat değişiklikleri, yeni ürün eklemeleri veya stok durumu - tüm bunları saniyeler içinde güncelleyebilirsiniz. Dinamik QR kodlar sayesinde menü linkini değiştirmeden içeriği güncelleyebilirsiniz.\n\n**Güncelleme Senaryoları:**\n- Günün yemeği veya özel menüler\n- Stokta kalmayan ürünlerin anında kaldırılması\n- Fiyat güncellemeleri\n- Yeni sezon ürünlerinin eklenmesi\n- Özel gün kampanyaları\n\nGeleneksel menülerde bir ürünün bitmesi durumunda, müşteriler sipariş vermeye çalıştığında hayal kırıklığı yaşarlar. QR menüde ise stok durumu anında güncellenebilir ve müşteriler sadece mevcut ürünleri görür.\n\n### 4. Çok Dilli Destek\n\nTuristik bölgelerde çalışan restoranlar için QR menüler otomatik dil seçimi sunabilir. Müşterinin telefon dilini algılayarak menüyü doğru dilde gösterir.\n\n**Dil Desteği Özellikleri:**\n- Otomatik dil algılama\n- Türkçe, İngilizce, Almanca, Rusça, Arapça gibi popüler diller\n- Dil seçimi menüsü\n- Para birimi otomatik dönüşümü\n- Kültürel uyumlu içerik\n\nTuristik bölgelerde yabancı müşterilerin menüyü anlaması büyük bir sorundur. QR menü sistemi ile her müşteri kendi dilinde menüyü okuyabilir ve sipariş verebilir. Bu durum müşteri memnuniyetini ve satışları artırır.\n\n### 5. Analitik ve İçgörüler\n\nHangi ürünlerin daha çok ilgi çektiğini, müşterilerin menüyü ne kadar incelediğini ve sipariş alışkanlıklarını takip edebilirsiniz.\n\n**Analitik Veriler:**\n- En çok görüntülenen ürünler\n- Menü kalma süresi\n- Sipariş dönüşüm oranları\n- Ziyaret saatleri ve yoğunluk analizleri\n- Müşteri tercihleri\n\nBu veriler, restoranınızın stratejik kararlarını bilgilendirir. Hangi ürünleri öne çıkarmanız gerektiğini, hangi saatlerde promosyon yapmanız gerektiğini ve menü tasarımını nasıl iyileştireceğinizi analiz edebilirsiniz.\n\n### Ek Avantajlar\n\n**Sosyal Medya Entegrasyonu:**\nQR menü üzerinden sosyal medya hesaplarınıza yönlendirme yapabilir, müşterilerinizi yorum bırakmaya teşvik edebilirsiniz.\n\n**Özel Gün Mesajları:**\nDoğum günü, yıldönümü gibi özel günlerde müşterilerinize özel mesajlar gönderebilirsiniz.\n\n**Sadakat Programı:**\nQR menü üzerinden sadakat programı entegrasyonu yapabilir, düzenli müşterilerinizi ödüllendirebilirsiniz.\n\nLuxQr ile restoranınız için profesyonel QR menü oluşturmak hemen başlayabilirsiniz!',
        createdAt: new Date().toISOString(),
        published: true,
      },
      {
        id: '3',
        title: 'Kişisel Kartvizitlerde QR Kod Devrimi',
        slug: 'kisisel-kartvizitlerde-qr-kod-devrimi',
        description: 'İletişim bilgilerinizi tek bir kodla paylaşın. Kartvizitinizde artık karmaşık bilgiler yerine profesyonel bir QR kod olsun.',
        category: 'Kişisel',
        mainImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
        content: 'Geleneksel kartvizitler artık geçmişte kaldı. Modern profesyoneller, QR kod teknolojisi ile iletişim bilgilerini daha verimli bir şekilde paylaşıyor.\n\n### Neden QR Kodlu Kartvizit?\n\n**Sınırsız Bilgi Paylaşımı**\nGeleneksel kartvizitlerde sınırlı alan vardır. QR kod ile telefon numarası, e-posta, web sitesi, sosyal medya hesapları ve hatta vCard dosyası paylaşabilirsiniz.\n\n**Kolay Güncelleme**\nİş yeriniz değişti mi? Telefon numaranız mı güncellendi? QR kod linkini değiştirmeden içeriği güncelleyebilirsiniz.\n\n**Çevre Dostu**\nKağıt israfını önleyin. Dijital kartvizitler hem çevre dostu hem de ekonomiktir.\n\n**Profesyonel Görünüm**\nMinimalist ve modern tasarım ile iş ortaklarınızda güçlü bir ilk izlenim bırakın.\n\n### Nasıl Kullanılır?\n\n1. LuxQr ile QR kod oluşturun\n2. İletişim bilgilerinizi içeren bir sayfaya yönlendirin\n3. QR kodu kartvizitinize ekleyin\n4. Tarama ile tüm bilgilerinize anında erişim sağlayın\n\nTek tarama ile tüm iletişim bilgilerinizi paylaşmanın kolaylığını deneyin!',
        createdAt: new Date().toISOString(),
        published: true,
      },
      {
        id: '4',
        title: 'QR Kod Güvenliği: Sahte Kodlardan Nasıl Korunuruz?',
        slug: 'qr-kod-guvenligi-sahte-kodlardan-nasil-korunuruz',
        description: 'QR kodları tararken nelere dikkat etmeli? Güvenli olmayan sitelere yönlendirilmemek için LuxQr sunduğu güvenlik ipuçları.',
        category: 'Güvenlik',
        mainImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
        content: 'QR kodlar hayatımızın her alanında olsa da, güvenlik riskleri de beraberinde getirebilir. Sahte QR kodlarından korunmak için bilmeniz gerekenler.\n\n### QR Kod Güvenliği Nedir?\n\nQR kodları kendiliğinden zararlı değildir, ancak yönlendirdikleri URL\'ler güvenlik riski taşıyabilir. Dolandırıcılar, sahte QR kodları ile kullanıcıları phishing sitelerine yönlendirebilir.\n\n### Korunma Yöntemleri\n\n**1. URL Kontrolü**\nQR kodu taramadan önce, yönlendirileceğiniz URL\'yi kontrol edin. Tanımadığınız veya şüpheli görünen sitelerden kaçının.\n\n**2. Güvenli QR Platformları**\nLuxQr gibi güvenli ve şeffaf platformları kullanın. Bu platformlar, oluşturulan kodların arkasına reklam veya zararlı içerik yerleştirmez.\n\n**3. Resmi Kaynakları Doğrulayın**\nKamusal alanlarda gördüğünüz QR kodların resmi kaynaklardan geldiğinden emin olun.\n\n**4. Mobil Güvenlik Uygulamaları**\nQR tarayıcı uygulamaları yerine, güvenlik özellikleri olan tarayıcıları kullanın.\n\n### LuxQr ile Güvenli QR Kodlar\n\nLuxQr, kullanıcı güvenliğini ön planda tutar:\n- Şeffaf ve reklamsız kod oluşturma\n- Ömür boyu kalıcı linkler\n- Güvenli URL yönlendirmeleri\n- Kullanıcı verilerinin korunması\n\nGüvenli QR kod oluşturmak için LuxQr\'ı tercih edin!',
        createdAt: new Date().toISOString(),
        published: true,
      },
      {
        id: '5',
        title: 'Etkinlik ve Biletleme Sistemlerinde QR Kod',
        slug: 'etkinlik-ve-biletleme-sistemlerinde-qr-kod',
        description: 'Girişleri hızlandırın, sahteciliği önleyin. Etkinlik yönetimi artık sadece bir tarama uzağınızda.',
        category: 'Etkinlik',
        mainImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
        content: 'Etkinlik organizasyonu, karmaşık bir süreç olabilir. QR kod teknolojisi, bu süreci basitleştirir ve güvenliği artırır.\n\n### QR Kodlu Bilet Sisteminin Avantajları\n\n**1. Hızlı Giriş**\nGeleneksel bilet kontrolü dakikalar sürer. QR kod ile saniyeler içinde giriş yapılabilir.\n\n**2. Sahtecilik Önleme**\nHer bilet için benzersiz QR kod oluşturulur. Bu sayede sahte bilet kullanımı imkansız hale gelir.\n\n**3. Gerçek Zamanlı Takip**\nEtkinlik alanına giren katılımcı sayısını anlık olarak takip edebilirsiniz.\n\n**4. Kolay Yönetim**\nBilet iptali, değişikliği veya transferi - tüm işlemler dijital olarak yapılabilir.\n\n**5. Çevre Dostu**\nKağıt bilet israfını önleyin. Dijital biletler hem çevre dostu hem de ekonomiktir.\n\n### Nasıl Uygulanır?\n\n1. Etkinlik için benzersiz QR kodlar oluşturun\n2. Her katılımcıya kişisel bilet gönderin\n3. Girişte QR kodları tarayın\n4. Gerçek zamanlı katılım takibi yapın\n\n### LuxQr ile Etkinlik Yönetimi\n\nLuxQr ile:\n- Toplu QR kod oluşturma\n- Dinamik bilet yönetimi\n- Güvenli giriş kontrolü\n- Analitik raporlama\n\nEtkinlik yönetiminizi bir üst seviyeye taşıyın!',
        createdAt: new Date().toISOString(),
        published: true,
      },
    ];

    for (const post of posts) {
      await savePost(post);
    }

    return NextResponse.json({ 
      success: true, 
      message: '4 blog yazısı başarıyla eklendi', 
      count: posts.length 
    });
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to seed blog posts' }, { status: 500 });
  }
}
