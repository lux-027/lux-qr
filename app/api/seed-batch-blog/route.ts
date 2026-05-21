import { NextResponse } from 'next/server';
import { savePost } from '@/lib/db';

export async function POST() {
  try {
    const posts = [
      {
        id: 'post-2',
        title: 'Restoranlar İçin QR Menü Kullanmanın 5 Avantajı',
        slug: 'restoranlar-icin-qr-menu-kullanmanin-5-avantaji',
        description: 'QR menüler maliyetleri düşürür, güncellemeyi kolaylaştırır ve hijyeniktir. Dinamik QR kod ile menüyü anında değiştirin.',
        category: 'İşletme',
        mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
        content: `Restoran işletmecileri olarak sürekli maliyetleri düşürmek ve operasyonel verimliliği artırmak arayışındayız. QR menü teknolojisi, bu hedeflere ulaşmak için mükemmel bir çözüm sunuyor.

### 1. Maliyet Tasarrufu

Geleneksel kağıt menüler her sipariş değişikliğinde yeniden basılmalıdır. QR menüler ise dijital olduğu için anında güncellenebilir ve basım maliyetini ortadan kaldırır.

### 2. Hijyen ve Güvenlik

Pandemi sonrası hijyen standartları değişti. QR menüler, dokunmadan menüyü görüntüleme imkanı sunarak müşteri güvenini artırır.

### 3. Anında Güncelleme

Fiyat değişiklikleri, yeni ürün eklemeleri veya stok durumu - tüm bunları saniyeler içinde güncelleyebilirsiniz. Dinamik QR kodlar sayesinde menü linkini değiştirmeden içeriği güncelleyebilirsiniz.

### 4. Çok Dilli Destek

Turistik bölgelerde çalışan restoranlar için QR menüler otomatik dil seçimi sunabilir. Müşterinin telefon dilini algılayarak menüyü doğru dilde gösterir.

### 5. Analitik ve İçgörüler

Hangi ürünlerin daha çok ilgi çektiğini, müşterilerin menüyü ne kadar incelediğini ve sipariş alışkanlıklarını takip edebilirsiniz.

LuxQr ile restoranınız için profesyonel QR menü oluşturmak hemen başlayabilirsiniz!`,
        createdAt: new Date().toISOString(),
        published: true,
      },
      {
        id: 'post-3',
        title: 'Kişisel Kartvizitlerde QR Kod Devrimi',
        slug: 'kisisel-kartvizitlerde-qr-kod-devrimi',
        description: 'İletişim bilgilerinizi tek bir kodla paylaşın. Kartvizitinizde artık karmaşık bilgiler yerine profesyonel bir QR kod olsun.',
        category: 'Kişisel',
        mainImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
        content: `Geleneksel kartvizitler artık geçmişte kaldı. Modern profesyoneller, QR kod teknolojisi ile iletişim bilgilerini daha verimli bir şekilde paylaşıyor.

### Neden QR Kodlu Kartvizit?

**Sınırsız Bilgi Paylaşımı**
Geleneksel kartvizitlerde sınırlı alan vardır. QR kod ile telefon numarası, e-posta, web sitesi, sosyal medya hesapları ve hatta vCard dosyası paylaşabilirsiniz.

**Kolay Güncelleme**
İş yeriniz değişti mi? Telefon numaranız mı güncellendi? QR kod linkini değiştirmeden içeriği güncelleyebilirsiniz.

**Çevre Dostu**
Kağıt israfını önleyin. Dijital kartvizitler hem çevre dostu hem de ekonomiktir.

**Profesyonel Görünüm**
Minimalist ve modern tasarım ile iş ortaklarınızda güçlü bir ilk izlenim bırakın.

### Nasıl Kullanılır?

1. LuxQr ile QR kod oluşturun
2. İletişim bilgilerinizi içeren bir sayfaya yönlendirin
3. QR kodu kartvizitinize ekleyin
4. Tarama ile tüm bilgilerinize anında erişim sağlayın

Tek tarama ile tüm iletişim bilgilerinizi paylaşmanın kolaylığını deneyin!`,
        createdAt: new Date().toISOString(),
        published: true,
      },
      {
        id: 'post-4',
        title: 'QR Kod Güvenliği: Sahte Kodlardan Nasıl Korunuruz?',
        slug: 'qr-kod-guvenligi-sahte-kodlardan-nasil-korunuruz',
        description: 'QR kodları tararken nelere dikkat etmeli? Güvenli olmayan sitelere yönlendirilmemek için LuxQr sunduğu güvenlik ipuçları.',
        category: 'Güvenlik',
        mainImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
        content: `QR kodlar hayatımızın her alanında olsa da, güvenlik riskleri de beraberinde getirebilir. Sahte QR kodlarından korunmak için bilmeniz gerekenler.

### QR Kod Güvenliği Nedir?

QR kodları kendiliğinden zararlı değildir, ancak yönlendirdikleri URL'ler güvenlik riski taşıyabilir. Dolandırıcılar, sahte QR kodları ile kullanıcıları phishing sitelerine yönlendirebilir.

### Korunma Yöntemleri

**1. URL Kontrolü**
QR kodu taramadan önce, yönlendirileceğiniz URL'yi kontrol edin. Tanımadığınız veya şüpheli görünen sitelerden kaçının.

**2. Güvenli QR Platformları**
LuxQr gibi güvenli ve şeffaf platformları kullanın. Bu platformlar, oluşturulan kodların arkasına reklam veya zararlı içerik yerleştirmez.

**3. Resmi Kaynakları Doğrulayın**
Kamusal alanlarda gördüğünüz QR kodların resmi kaynaklardan geldiğinden emin olun.

**4. Mobil Güvenlik Uygulamaları**
QR tarayıcı uygulamaları yerine, güvenlik özellikleri olan tarayıcıları kullanın.

### LuxQr ile Güvenli QR Kodlar

LuxQr, kullanıcı güvenliğini ön planda tutar:
- Şeffaf ve reklamsız kod oluşturma
- Ömür boyu kalıcı linkler
- Güvenli URL yönlendirmeleri
- Kullanıcı verilerinin korunması

Güvenli QR kod oluşturmak için LuxQr'ı tercih edin!`,
        createdAt: new Date().toISOString(),
        published: true,
      },
      {
        id: 'post-5',
        title: 'Etkinlik ve Biletleme Sistemlerinde QR Kod',
        slug: 'etkinlik-ve-biletleme-sistemlerinde-qr-kod',
        description: 'Girişleri hızlandırın, sahteciliği önleyin. Etkinlik yönetimi artık sadece bir tarama uzağınızda.',
        category: 'Etkinlik',
        mainImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
        content: `Etkinlik organizasyonu, karmaşık bir süreç olabilir. QR kod teknolojisi, bu süreci basitleştirir ve güvenliği artırır.

### QR Kodlu Bilet Sisteminin Avantajları

**1. Hızlı Giriş**
Geleneksel bilet kontrolü dakikalar sürer. QR kod ile saniyeler içinde giriş yapılabilir.

**2. Sahtecilik Önleme**
Her bilet için benzersiz QR kod oluşturulur. Bu sayede sahte bilet kullanımı imkansız hale gelir.

**3. Gerçek Zamanlı Takip**
Etkinlik alanına giren katılımcı sayısını anlık olarak takip edebilirsiniz.

**4. Kolay Yönetim**
Bilet iptali, değişikliği veya transferi - tüm işlemler dijital olarak yapılabilir.

**5. Çevre Dostu**
Kağıt bilet israfını önleyin. Dijital biletler hem çevre dostu hem de ekonomiktir.

### Nasıl Uygulanır?

1. Etkinlik için benzersiz QR kodlar oluşturun
2. Her katılımcıya kişisel bilet gönderin
3. Girişte QR kodları tarayın
4. Gerçek zamanlı katılım takibi yapın

### LuxQr ile Etkinlik Yönetimi

LuxQr ile:
- Toplu QR kod oluşturma
- Dinamik bilet yönetimi
- Güvenli giriş kontrolü
- Analitik raporlama

Etkinlik yönetiminizi bir üst seviyeye taşıyın!`,
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
    console.error('Error seeding batch blog posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to seed batch blog posts' }, { status: 500 });
  }
}
