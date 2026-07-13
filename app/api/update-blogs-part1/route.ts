import { NextResponse } from 'next/server';
import { savePost } from '@/lib/db';

export async function POST() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const posts = [
    {
      id: 'post-1',
      title: 'Ücretsiz QR Kod Nasıl Oluşturulur? Adım Adım Rehber',
      slug: 'ucretsiz-qr-kod-nasil-olusturulur-adim-adim-rehber',
      description: 'LuxQr ile adım adım ücretsiz, yüksek çözünürlüklü ve güvenli QR kod oluşturun. Her QR türü için detaylı rehber.',
      category: 'Rehber',
      mainImage: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=800&q=80&fm=webp',
      content: `QR kodlar artık hayatımızın ayrılmaz bir parçası. Menülerden kartvizitlere, WiFi şifrelerinden dosya paylaşımına kadar her yerde karşımıza çıkıyorlar.

## 🎯 Doğru Platform Seçimi

Piyasada onlarca QR araç bulunuyor ancak büyük çoğunluğu belirli süre sonra kodu durduruyor, reklam ekliyor veya yüksek çözünürlük için ücret alıyor. LuxQr bu sorunların hiçbirini taşımaz: tamamen şeffaf, reklamsız ve ömür boyu kalıcı.

---

## 📋 QR Kod Türleri

### Metin ve Bağlantı QR
Kısa notlar, web siteleri veya sosyal medya profilleri için idealdir.

### Dosya ve Medya QR
Görsel, video veya ses dosyalarınızı doğrudan buluta yükleyip QR'a dönüştürün. Portfolyo ve ürün tanıtımı için mükemmel.

### WiFi QR
Ağ adı ve şifrenizi içerir. Misafirleriniz tek taramayla internete bağlanır.

### Kartvizit QR
vCard standardında iletişim bilgilerinizi taşır. Tarayan kişi sizi rehberine tek tuşla ekler.

### IBAN ve Ödeme QR
Banka hesap bilgilerinizi içerir. Müşterileriniz bankacılık uygulamasından kodu tarayarak direkt havale yapar.

### Fiyat Listesi QR
Ürün görseli, açıklama ve fiyat içeren dijital katalog. Restoranlar ve mağazalar için ideal.

### Bio Link QR
Tüm sosyal medya ve web bağlantılarınızı tek sayfada toplar.

---

## ⚡ Adım Adım QR Oluşturma

**1. Adım:** luxqrpro.site adresine gidin (kayıt gerekmez).

**2. Adım:** Sol menüden istediğiniz QR türünü seçin.

**3. Adım:** İlgili formu doldurun.

**4. Adım:** 5 gradient renk paletinden birini seçin.

**5. Adım:** "QR Oluştur" butonuna basın ve indirin.

---

## 🔒 Güvenlik Standartları

- **HTTPS:** LuxQr tamamen şifreli bağlantı üzerinden çalışır
- **Veri minimizasyonu:** Yalnızca QR için gereken bilgiler işlenir
- **Üçüncü taraf yok:** Bilgileriniz asla paylaşılmaz
- **Şeffaf yönlendirme:** QR'ın nereye gittiğini her zaman bilebilirsiniz

---

## 📐 Boyut Rehberi

| Kullanım Yeri | Önerilen Boyut |
|--------------|---------------|
| Kartvizit | 2 × 2 cm |
| Broşür | 4 × 4 cm |
| Afiş | 8 × 8 cm |
| Billboard | 15 × 15 cm |

LuxQr ile saniyeler içinde güvenli QR kodunuzu oluşturun!`,
      createdAt: new Date(now - 15 * day).toISOString(),
      published: true,
    },
    {
      id: 'post-2',
      title: 'Restoranlar için QR Menü: Maliyet, Hijyen ve Müşteri Deneyimi',
      slug: 'restoranlar-icin-qr-menu-dijital-donusum',
      description: 'QR menüler maliyetleri düşürür, hijyen sağlar ve müşteri deneyimini zenginleştirir. Eksiksiz uygulama rehberi.',
      category: 'İşletme',
      mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&fm=webp',
      content: `Restoran işletmecileri için QR menü artık bir lüks değil, rekabette öne geçmenin zorunlu adımı.

## 💰 Maliyet Karşılaştırması

| Kalem | Kağıt Menü | QR Menü |
|-------|-----------|---------|
| İlk kurulum | 2.000 TL | 500 TL |
| Yıllık güncelleme (×8) | 16.000 TL | 0 TL |
| Tasarım ücreti | 3.000 TL | 0 TL |
| **Yıllık toplam** | **21.000 TL** | **500 TL** |

---

## 🦠 Hijyen Avantajları

Pandemi sonrası dönemde müşteriler ortak kullanılan nesnelere temkinli yaklaşıyor. QR menü:
- Fiziksel temas olmadan erişim
- Her müşteri kendi telefonunu kullanır
- Dezenfeksiyon zorunluluğu ortadan kalkar
- Müşteri güveni artar

---

## ⚡ Anında Güncelleme

Stokta kalmayan ürün mü var? Fiyat değişikliği mi? QR menüde saniyeler içinde yayına girer:
- Günün özel yemeğini ekleyin
- Biten ürünleri kaldırın
- Sezonluk fiyat güncellemeleri
- Özel gün kampanyaları

---

## 🌍 Çok Dilli Destek

Turistik bölgelerde birden fazla dil seçeneği sunun:
Türkçe, İngilizce, Almanca, Rusça, Arapça.

---

## 📊 Analitik Veriler

- En çok görüntülenen ürünler
- Menüde geçirilen süre
- Sipariş dönüşüm oranları
- Ziyaret saatleri ve yoğunluk

---

## 📱 Sosyal Medya Entegrasyonu

Menünüze Instagram, TripAdvisor veya Google Maps yönlendirmesi ekleyin. Her olumlu yorum yeni müşteri demektir.

LuxQr Fiyat Listesi özelliği ile dakikalar içinde QR menünüzü oluşturun!`,
      createdAt: new Date(now - 12 * day).toISOString(),
      published: true,
    },
    {
      id: '5',
      title: 'Etkinlik Yönetiminde QR Kod: Biletleme ve Giriş Kontrolü',
      slug: 'etkinlik-yonetiminde-qr-kod-biletleme-giris-kontrolu',
      description: 'Konser, fuar, konferans ve düğünlerde QR kod ile biletleme, giriş kontrolü ve katılımcı takibini nasıl yaparsınız?',
      category: 'Etkinlik',
      mainImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&fm=webp',
      content: `Yüzlerce veya binlerce katılımcıyı yönetmek, giriş kontrolü yapmak ve sahte biletleri önlemek ciddi bir zorluktur. QR kod tek çözüm sunar.

## 🎫 Çalışma Prensibi

Her katılımcıya benzersiz QR içeren dijital bilet gönderilir. Girişte taranır, anında doğrulanır. Sahte kod üretmek pratik olarak imkânsızdır.

---

## ⚡ Hız Karşılaştırması

| Yöntem | Kişi Başı Süre |
|--------|---------------|
| Manuel kontrol | 45-60 saniye |
| Barkod okuyucu | 15-20 saniye |
| QR kod sistemi | 2-5 saniye |

1000 kişilik etkinlikte kuyruk süresi 45 dakikadan 5 dakikaya iner.

---

## 🛡️ Sahtecilik Önleme

**Şifreli içerik:** Her bilet şifrelenerek oluşturulur. Görsel kopyalama geçersiz.

**Tek kullanım:** Taranan bilet "kullanıldı" olarak işaretlenir. Tekrar tarama reddedilir.

**Gerçek zamanlı doğrulama:** Sahte veya iptal biletler anında tespit edilir.

---

## 📊 Anlık Takip

- Kaç kişi girdi, kaç kişi bekliyor?
- Hangi kapı yoğun?
- VIP ve standart katılımcı ayrımı
- Kapasite uyarıları

---

## 🎯 Kullanım Alanları

- **Konserler:** Büyük kalabalık yönetimi
- **Konferanslar:** Oturum bazlı erişim
- **Düğünler:** Şık dijital davetiye
- **Spor:** Koltuk bazlı erişim
- **Kurumsal:** Çalışan ve misafir ayrımı

LuxQr ile etkinlik QR kodlarınızı oluşturun!`,
      createdAt: new Date(now - 10 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-qr-nedir-nasil-calisir',
      title: 'QR Kod Nedir, Nasıl Çalışır? Kapsamlı Başlangıç Rehberi',
      slug: 'qr-kod-nedir-nasil-calisir-kapsamli-rehber',
      description: 'QR kodun tarihçesi, çalışma prensibi, hata düzeltme seviyeleri ve günlük hayattaki kullanım alanlarını öğrenin.',
      category: 'Rehber',
      mainImage: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&q=80&fm=webp',
      content: `QR kod (Quick Response Code), 1994 yılında Denso Wave tarafından üretim hattındaki araçları takip etmek amacıyla geliştirildi. Bugün hayatın her alanında yer alıyor.

## 📖 Kısa Tarihçe

Masahiro Hara liderliğindeki ekip, geleneksel barkodun sınırlamalarını aşmak için QR kodu icat etti. Barkodlar 20 karakter tutarken QR kodlar binlerce karakter depolar.

---

## 🔬 QR Kodun Bileşenleri

**Konum İşaretleyicileri:** Karenin 3 köşesindeki büyük kareler. Kodu 360° döndürseniz de okunabilir.

**Veri Modülleri:** Her siyah-beyaz kare bir bit veri taşır.

**Sessiz Bölge:** Etraftaki beyaz boşluk. Minimum 4 modül genişliğinde olmalı.

---

## 🛡️ Hata Düzeltme Seviyeleri

| Seviye | Kurtarma | Kullanım |
|--------|---------|---------|
| L | %7 | Temiz ortam |
| M | %15 | Genel |
| Q | %25 | Endüstriyel |
| H | %30 | Logolu QR |

---

## 📦 Veri Kapasitesi

| Tür | Maksimum |
|-----|---------|
| Sayısal | 7.089 karakter |
| Alfasayısal | 4.296 karakter |
| Binary | 2.953 bayt |

---

## ⚡ Statik vs Dinamik

**Statik:** Oluşturulduktan sonra değişmez. Ucuz ama esnek değil.

**Dinamik:** Hedef URL değiştirilebilir, tarama sayısı takip edilir. LuxQr'ın tüm kodları dinamiktir.

---

## 🌍 Kullanım Alanları

**Perakende** → Ürün bilgisi, online alışveriş yönlendirmesi

**Sağlık** → Hasta kayıtları, ilaç takibi, aşı sertifikası

**Turizm** → Sesli rehber, sanal tur, harita

**Eğitim** → Ders materyali, ödev, sınav sistemi

**Finans** → Havale, ödeme, bağış

LuxQr ile QR kod oluşturmaya hemen başlayın!`,
      createdAt: new Date(now - 9 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-wifi-qr-rehberi',
      title: 'WiFi QR Kodu ile Misafirlerinizi Kolayca Bağlayın',
      slug: 'wifi-qr-kodu-olusturma-kullanma-rehberi',
      description: 'WiFi şifresi paylaşmanın en akıllı yolu: QR kod. Kafe, ofis ve ev için eksiksiz rehber.',
      category: 'WiFi',
      mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp',
      content: `"WiFi şifresi nedir?" sorusu artık tarihe karışıyor. WiFi QR kodu bu anı tamamen ortadan kaldırıyor.

## 📡 Nasıl Çalışır?

WiFi QR kodu ağ adı, şifre ve güvenlik türünü şifreli olarak içerir. Telefon taradığında bağlantı otomatik gerçekleşir.

Format: \`WIFI:S:AgAdi;T:WPA;P:Sifre;H:false;;\`

---

## ✅ Güvenlik Türleri

| Tür | Güvenlik | Öneri |
|-----|---------|-------|
| WPA3 | ⭐⭐⭐⭐⭐ | En iyi |
| WPA2 | ⭐⭐⭐⭐ | Standart |
| WEP | ⭐ | Kaçının |
| Açık | ❌ | Sadece misafir ağı |

---

## 🏢 Sektöre Göre Kullanım

**Kafe/Restoran:** Masa üstü stand. "Ücretsiz WiFi – Tarayın" başlığıyla bağlantı oranı %90 artar.

**Ofis:** Toplantı odaları ve misafir bekleme alanı.

**Otel:** Oda kapısı, TV yanı, hoş geldiniz kartı.

**Ev:** Buzdolabı veya kapı girişine yapıştırın.

---

## 🎨 Tasarım İpuçları

- LuxQr gradient temasıyla markayla uyumlu renk
- "WiFi'ye Bağlan" başlığı ekleyin
- Masaüstü stand: minimum 5×5 cm
- Duvar afişi: minimum 10×10 cm

---

## 🔐 Güvenlik Önlemleri

- Misafirler için ayrı SSID oluşturun
- Ana ağı misafir ağından izole edin
- Şifreyi düzenli değiştirin
- Dinamik QR ile sadece linki güncelleyin

---

## 📲 Cihaz Uyumluluğu

Android 10+ ve iOS 11+ kamera ile direkt okur. Ek uygulama gerekmez.

LuxQr ile WiFi QR kodunuzu 60 saniyede oluşturun!`,
      createdAt: new Date(now - 8 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-kartvizit-qr',
      title: 'Dijital Kartvizit ve QR Kod: Modern İş Ağı Oluşturmanın Yolu',
      slug: 'dijital-kartvizit-qr-kod-modern-is-agi',
      description: 'Kağıt kartvizit dönemi bitiyor. QR kod ile iş bağlantılarınızı nasıl güçlendirirsiniz?',
      category: 'Kariyer',
      mainImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80&fm=webp',
      content: `Her yıl 10 milyardan fazla kağıt kartvizit basılıyor; %88'i bir hafta içinde çöpe atılıyor.

## 📊 Karşılaştırma

| Sorun | Kağıt Kartvizit | QR Kartvizit |
|-------|----------------|-------------|
| Bilgi değişince | Tüm kartlar geçersiz | Anlık güncelleme |
| Alan kapasitesi | Sınırlı | Sınırsız |
| Kayıp riski | Yüksek | Yok |
| Çevre etkisi | Kâğıt israfı | Sıfır |
| Maliyet | Tekrarlayan | Tek seferlik |

---

## 🚀 QR Kartvizit Avantajları

**Sonsuz bilgi:** Telefon, e-posta, web, LinkedIn, Instagram, YouTube — hepsi tek QR'da.

**Anlık güncelleme:** Şirket veya numara değişince QR linki güncelleyin.

**İzleme:** Kaç kişinin taradığını takip edin.

---

## 📋 vCard Standardı

Tarayan kişi "Kişiyi Kaydet" ile tüm bilgilerinizi rehberine ekler:
- Ad, soyad, unvan, şirket
- Birden fazla telefon ve e-posta
- Web sitesi ve posta adresi
- Profil fotoğrafı

---

## 💼 Kullanım Senaryoları

**Fuar/Konferans:** Rozete QR ekleyin; yüzlerce kişiye kâğıtsız ulaşın.

**Satış:** Toplantıdan çıkarken müşteri kodu tarasın.

**Freelancer:** Farklı müşteri tiplerine göre farklı profil.

**Akademisyen:** Tüm akademik profiller tek QR'da.

---

## 🎨 Tasarım Entegrasyonu

Canva veya Illustrator'da kartın arka yüzüne ekleyin. Hem geleneksel hem dijital dünyaya hitap edin.

LuxQr ile Kartvizit QR oluşturmak sadece birkaç dakika!`,
      createdAt: new Date(now - 7 * day).toISOString(),
      published: true,
    },
  ];

  try {
    for (const post of posts) {
      await savePost(post as any);
    }
    return NextResponse.json({ success: true, updated: posts.map(p => p.id), count: posts.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
