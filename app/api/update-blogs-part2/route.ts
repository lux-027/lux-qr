import { NextResponse } from 'next/server';
import { savePost } from '@/lib/db';

export async function POST() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const posts = [
    {
      id: 'blog-sosyal-medya-qr',
      title: 'Sosyal Medya Pazarlamada QR Kod: Takipçi Kazanmanın Akıllı Yolu',
      slug: 'sosyal-medya-pazarlamada-qr-kod-kullanimi',
      description: 'Instagram, TikTok ve YouTube\'da organik büyüme için QR kod stratejileri. Gerçek örnekler ve kampanya fikirleri.',
      category: 'Pazarlama',
      mainImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&fm=webp',
      content: `Sosyal medya büyümesi için içerik kalitesi şart ama yeterli değil. Fiziksel dünyadan dijital platforma köprü kurmak en güçlü organik büyüme stratejilerinden biridir.

## 📈 Dönüşüm Oranı Farkı

| Yöntem | Ortalama Dönüşüm |
|--------|-----------------|
| Kullanıcı adı yazmak | %2-3 |
| Link tıklamak | %8-12 |
| QR kod taramak | %18-25 |

QR tarama tek adımda doğrudan takip sayfasına götürür.

---

## 📱 Platform Bazlı Stratejiler

### Instagram
**Kafe/Restoran:** Masa QR → "Yemeğinizi paylaşın, bizi etiketleyin – özel indirim kazanın!" Hem UGC hem takipçi.

**Perakende:** Deneme kabini → "Bu kıyafeti giyen müşterileri görün @markaniz"

**Etkinlik:** Sahne arkası erişim QR; heyecan ve takipçi birlikte.

### TikTok
**Ürün ambalajı:** Kutu açılışı trendi zirvededir. "Bizi takip et, harika içerikler seni bekliyor!"

**Outdoor reklam:** Durak ve billboard QR → TikTok profili.

### YouTube
**Kullanım kılavuzu:** "Kurulum videosunu izleyin" QR kodu müşteri desteğini azaltır, aboneliği artırır.

---

## 🎯 Kampanya Fikirleri

**"Tara & Kazan":** Ürün ambalajına QR ekleyin, tarayanlar çekilişe katılsın.

**Çapraz Büyüme:** Instagram'dan TikTok'a, TikTok'tan YouTube'a QR köprüleri.

**Sadakat Programı:** Mağazada QR tarayanlara özel indirim kodu.

---

## 📊 Ölçüm ve Optimizasyon

- Haftalık tarama sayısı takibi
- Lokasyon bazlı analiz
- Kampanya öncesi/sonrası karşılaştırma
- A/B testi: Farklı mesajlı 2 QR kodu karşılaştırın

LuxQr ile sosyal medya QR kodlarınızı oluşturun!`,
      createdAt: new Date(now - 6 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-isletme-qr-10-kullanim',
      title: 'İşletmeler için QR Kodun 10 Yaratıcı Kullanım Alanı',
      slug: 'isletmeler-icin-qr-kodun-10-yaratici-kullanim-alani',
      description: 'Küçük işletmeden büyük şirkete her sektörde QR kod kullanımını artıracak 10 pratik fikir.',
      category: 'İşletme',
      mainImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&fm=webp',
      content: `QR kodlar yalnızca "web sitesi linki" için değildir. İşte her sektörde uygulayabileceğiniz 10 yaratıcı fikir.

## 1️⃣ Dijital Menü ve Fiyat Listesi
Fiyatları anında güncelleyin, alerjen bilgisi ekleyin, video tarifi sunun. LuxQr Fiyat Listesi özelliği ile saniyeler içinde hazır.

## 2️⃣ Müşteri Geri Bildirim Sistemi
Masa QR → Google Yorumları. Fiş arkası QR → Anket formu. Katılım oranı geleneksel yöntemlerin 5 katı.

## 3️⃣ Ürün Kimlik Doğrulama
Her ürüne benzersiz QR. Tarama ile orijinallik doğrulama. Kozmetik, ilaç ve lüks ürünlerde sahtecilikle mücadele.

## 4️⃣ Stok ve Envanter Yönetimi
Raf etiketleri QR ile stok girişi/çıkışı. Barkodun daha fazla veri taşıyan alternatifi.

## 5️⃣ Müşteri Sadakat Programı
Kasa QR → Puan kazanma. Uygulama indirme zorunluluğu yok. Basit ve etkili.

## 6️⃣ Mülk ve Vasıta Bilgisi
Kiralık mülk kapısına QR → Sanal tur. Araç camına QR → Sigorta ve muayene bilgisi.

## 7️⃣ Eğitim ve Onboarding
Kullanım kılavuzlarına video QR. Yeni çalışan prosedür erişimi. Kâğıt kılavuzlar yerine interaktif içerik.

## 8️⃣ Etkinlik Yönetimi
QR rozetli kartvizit. Oturum geçişi kontrolü. Program ve anket entegrasyonu.

## 9️⃣ Ödeme ve Bağış
IBAN QR ile anında havale. Bağış kampanyaları için poster QR. LuxQr IBAN özelliği ile dakikalar içinde hazır.

## 🔟 Sosyal Sorumluluk
Ambalaj QR → Geri dönüşüm talimatları. Karbon hesaplama. Sosyal sorumluluk projeleri tanıtımı.

---

## 🚀 Hemen Başlayın

Tek ihtiyacınız LuxQr. Ücretsiz oluşturun, indirin, kullanın!`,
      createdAt: new Date(now - 5 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-egitimde-qr',
      title: 'Eğitimde QR Kod: Öğretmenler ve Öğrenciler için Pratik Rehber',
      slug: 'egitimde-qr-kod-ogretmenler-ogrenciler-rehberi',
      description: 'Sınıf etkinliklerinden ev ödevine, dijital içerik paylaşımından sınav sistemlerine kadar eğitimde QR kodun tüm kullanımları.',
      category: 'Eğitim',
      mainImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fm=webp',
      content: `Teknolojinin eğitime entegrasyonu artık zorunluluk. QR kodlar öğretmen ve öğrencilerin dijital içeriklere anında erişimini sağlıyor.

## 👩‍🏫 Öğretmenler için Kullanımlar

### Ders Materyali Dağıtımı

| Geleneksel | QR Kod |
|-----------|--------|
| Kâğıt, toner maliyeti | Sıfır maliyet |
| Kaybolabilir | Bulutta güvende |
| Güncelleme = yeniden basmak | Anlık güncelleme |
| Sade içerik | Renkli, zengin, interaktif |

### İnteraktif Etkinlikler

**QR Kod Avı:** Sınıfta farklı noktalara QR kodlar koyun. Her kod sonraki ipucuna götürsün. Katılım 3 kat artar.

**İstasyon Rotasyonu:** Her istasyonda farklı içerik türü: video, metin, quiz, simülasyon.

**Anlık Anket:** Google Forms bağlantılı QR ile ders sonu kavrama testi.

---

## 🎓 Öğrenciler için Kullanımlar

**Akıllı Not Organizasyonu:** Notları Drive'a yükle, QR oluştur, deftere yapıştır. Sınav döneminde tek tarama.

**Grup Projesi:** Ortak doküman, toplantı notu ve sunum QR ile paylaş.

---

## 🏫 Okul Yönetimi

**Kütüphane:** Her kitaba QR → ödünç alma, iade tarihi, yazar bilgisi.

**Devamsızlık:** Kimlik kartı QR ile saniyeler içinde yoklama.

**Veli İletişimi:** Duyuru, randevu, karne bildirimi QR ile.

---

## 📚 Dersler Bazında

- **Matematik:** Problem çözüm videoları, hesap makinesi linki
- **Fen:** Deney videoları, sanal müze turu
- **Tarih:** Belgesel, tarihi haritalar, birincil kaynaklar
- **Dil:** Telaffuz sesi, kelime oyunları
- **Beden:** Hareket tekniği videoları, antrenman planları

LuxQr ile eğitim QR kodları ücretsiz!`,
      createdAt: new Date(now - 4 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-iban-qr-odeme',
      title: 'IBAN QR Kodu ile Ödeme Almak: Kapsamlı Rehber',
      slug: 'iban-qr-kodu-ile-odeme-almak-rehberi',
      description: 'Banka havalesi yapmayı QR kod ile basitleştirin. IBAN QR oluşturma, kullanım alanları ve güvenlik ipuçları.',
      category: 'Finans',
      mainImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&fm=webp',
      content: `Türkiye'de her gün milyonlarca havale işlemi gerçekleşiyor. IBAN elle girilmek zorunda. QR kod bu sorunu tamamen çözüyor.

## 🏦 Nasıl Çalışır?

IBAN QR kodunu tarayan kişi bankacılık uygulamasının havale ekranına yönlendirilir. Tüm bilgiler otomatik dolar; sadece tutar girilir.

---

## 👥 Kim Kullanmalı?

| Kullanıcı | Senaryo |
|-----------|---------|
| Freelancer | Fatura yerine QR gönder |
| Kafe/dükkan | Kasa QR standı |
| Dernek | Bağış toplama |
| Site yönetimi | Aylık aidat QR |
| Esnaf | Pazarda dijital ödeme |

---

## 🔒 Güvenlik

IBAN zaten kamuya açık bilgidir — paylaşmak güvenlidir. Dikkat edilmesi gereken: fiziksel ortamlarda sahte etiket yapıştırılması.

**Önlemler:**
- Ödeme öncesi son 4 hane kontrolü
- QR standınızı düzenli inceleyin
- Dinamik QR ile tarama takibi yapın

---

## 🏦 Destekleyen Bankalar

İş Bankası, Ziraat, Garanti BBVA, Yapı Kredi, Akbank, Halkbank, VakıfBank mobil uygulamaları destekler.

---

## 📋 LuxQr ile Oluşturma

1. IBAN QR seçin
2. 26 haneli IBAN girin
3. Alıcı adı girin
4. İsteğe bağlı: Sabit tutar, açıklama
5. Oluştur → İndir

---

## 💡 Yaratıcı Kullanımlar

**Fatura entegrasyonu:** "Bu kodu tarayarak ödeme yapabilirsiniz" notu ekleyin.

**Sosyal medya kampanyası:** Görsel + IBAN QR. Takipçiler uygulamadan çıkmadan bağış yapar.

**Masaüstü stand:** Akrilik stand ile kasa önüne koyun. Kart okuyucu maliyeti ortadan kalkar.

IBAN QR ile ödeme almayı kolaylaştırın!`,
      createdAt: new Date(now - 3 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-bio-link-nedir',
      title: 'Bio Link Nedir? Instagram ve TikTok için Tek Link Çözümü',
      slug: 'bio-link-nedir-instagram-tiktok-tek-link-cozumu',
      description: 'Sosyal medya biyografinizdeki tek linki en verimli şekilde kullanın. Bio link sayfası oluşturma ve QR entegrasyonu.',
      category: 'Sosyal Medya',
      mainImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80&fm=webp',
      content: `Instagram biyografinizdeki tek link alanı dijital varlığınızın en değerli noktasıdır. Bio Link bu küçük alandan maksimum değer elde etmenizi sağlar.

## 🔗 Bio Link Nedir?

Tek bir URL altında birden fazla bağlantıyı toplayan özel açılış sayfasıdır. Instagram, TikTok, Twitter ve YouTube'da yalnızca bir link paylaşabilirsiniz. Bio link ile bu tek link tüm bağlantılarınıza erişim sunar.

---

## ❌ "Link in Bio" Problemi

| Senaryo | Sorun |
|---------|-------|
| Yeni ürün tanıtımı | Eski linki değiştirmek gerekir |
| Birden fazla platform | Hangisi bio'ya girer? |
| Blog + mağaza + YouTube | Sadece biri sığar |

Bio link bu sorunların hepsini çözer.

---

## 👥 Kim Kullanmalı?

- **İçerik üreticileri:** YouTube, Spotify, blog, Patreon tek noktada
- **Küçük işletmeler:** Web sitesi, menü, harita, rezervasyon birlikte
- **Influencer:** Affiliate linkler ve kişisel projeler
- **Müzisyenler:** Tüm müzik platformları + bilet satışı
- **Freelancer:** Portföy, LinkedIn, Calendly birleşik

---

## ✨ LuxQr Bio Link Özellikleri

- 30+ gradient arka plan teması
- Sınırsız link ekleme
- Logo/profil fotoğrafı yükleme
- @kullaniciadi ile hatırlanabilir URL
- QR kod ile fiziksel ortamlarda paylaşım

---

## 📱 Bio Link + QR Kombinasyonu

| Ortam | Kullanım |
|-------|---------|
| Kartvizit | QR taranınca tüm bağlantılar |
| Ürün ambalajı | "Daha fazlası için tarayın" |
| Etkinlik rozeti | Anında ağ oluşturma |
| Vitrin/afiş | "Bizi online takip edin" |

---

## 🎨 Tasarım İpuçları

**Sıralama:** En önemli linki en üste koyun. Ziyaretçilerin %70'i sadece ilk 1-2 linke tıklar.

**Başlıklar:** "Buraya tıkla" yerine "Yeni koleksiyonu keşfet" veya "Ücretsiz ders al" yazın.

**Güncellik:** Eski kampanya linklerini kaldırın, sayfanızı taze tutun.

LuxQr'da Bio Link ücretsiz ve anında hazır!`,
      createdAt: new Date(now - 2 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-qr-tasarim-ipuclari',
      title: 'Profesyonel QR Kod Tasarımı: Okunabilirlik ve Estetik Rehberi',
      slug: 'profesyonel-qr-kod-tasarimi-okunabilirlik-estetik',
      description: 'Görsel olarak çekici ama her cihazdan kolayca okunabilen QR kodlar nasıl tasarlanır? Renkler, boyut, logo rehberi.',
      category: 'Tasarım',
      mainImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fm=webp',
      content: `QR kodun "çirkin" olması gerektiği fikri tamamen yanlış. Modern araçlar okunabilirliği koruyarak estetik tasarımlar oluşturmanıza imkân tanır.

## 🎯 Birinci Kural: Okunabilirlik

Taranamayan bir QR kod ne kadar güzel görünürse görünsün işe yaramaz. Her karar için sorun: **"Bu kod hâlâ okunabilir mi?"**

---

## 🎨 Renk ve Kontrast

| Kombinasyon | Güvenlik |
|------------|---------|
| Siyah + beyaz | ⭐⭐⭐⭐⭐ En güvenilir |
| Koyu lacivert + açık gri | ⭐⭐⭐⭐ |
| Gradient + beyaz arka plan | ⭐⭐⭐⭐ |
| Sarı + turuncu | ⭐ Kaçının |
| Açık pembe + beyaz | ❌ Okunmaz |

---

## 🖼️ Logo Kullanım Kuralları

- **H seviyesi** hata düzeltme kullanın (LuxQr otomatik yapar)
- Logo QR alanının maksimum **%30'unu** kaplasın
- Logo etrafında **beyaz boşluk** bırakın
- Eklendikten sonra mutlaka **test taraması** yapın

---

## 📐 Boyut Standartları

| Kullanım | Minimum |
|---------|---------|
| Kartvizit | 2 × 2 cm |
| Broşür | 3 × 3 cm |
| Afiş | 6 × 6 cm |
| Billboard | 15 × 15 cm |
| Ürün etiketi | 1.5 × 1.5 cm |

---

## 🔲 Sessiz Bölge

Kod etrafında minimum **4 modül** beyaz boşluk şart. Bu olmadan okuyucu kodu ayırt edemez.

---

## ✏️ Açıklayıcı Metin

Başlık tarama oranını %40 artırır:
- ❌ Yalnızca QR
- ✅ QR + "Menüyü Görüntüle"
- ✅ QR + WiFi ikonu + "WiFi'ye Bağlan"

---

## 🧪 Test Protokolü

1. 3 farklı telefon markasıyla test
2. Düşük ışık koşullarında dene
3. Farklı açılardan tara
4. Yazdırılmış halini de test et
5. Hem Android hem iOS ile dene

LuxQr gradient + logo destekli yüksek çözünürlüklü QR için idealdir!`,
      createdAt: new Date(now - 1 * day).toISOString(),
      published: true,
    },
    {
      id: 'blog-qr-guvenlik',
      title: 'QR Kod Güvenliği: Sahte Kodlardan Nasıl Korunursunuz?',
      slug: 'qr-kod-guvenligi-sahte-kodlardan-korunma-rehberi',
      description: 'QR kodları tararken nelere dikkat etmeli? Phishing, malware ve sahte yönlendirmelerden korunma rehberi.',
      category: 'Güvenlik',
      mainImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&fm=webp',
      content: `QR kodlar hayatımızın her alanında yer alıyor. Bu yaygınlık beraberinde güvenlik risklerini getiriyor.

## ⚠️ Yaygın QR Saldırıları

| Saldırı Türü | Nasıl Çalışır | Risk |
|-------------|--------------|------|
| Sticker değiştirme | Orijinal üstüne sahte etiket | 🔴 Yüksek |
| Phishing QR | Sahte banka/alışveriş sitesi | 🔴 Yüksek |
| Malware indirme | Zararlı APK tetikleme | 🟠 Orta |
| Konum takibi | Gizli veri toplama | 🟡 Düşük |

---

## 🛡️ Korunma Yöntemleri

**1. Taramadan Önce URL Önizlemesi**
Modern QR okuyucular taramadan önce URL'yi gösterir. Tanımadığınız veya şüpheli domainlerden kaçının.

**2. Fiziksel Bütünlük Kontrolü**
Ödeme terminali veya ofis girişindeki QR'ın üstüne yapıştırılmış etiket olup olmadığını kontrol edin.

**3. HTTPS Zorunluluğu**
Yönlendirilen site HTTPS kullanıyor mu? HTTP olan sitelerde kişisel bilgi girmeyin.

**4. Güvenli Platform Kullanımı**
LuxQr gibi şeffaf platformlarda oluşturulan kodlar reklam veya zararlı içerik barındırmaz.

---

## 🏢 İşletmeler için Önlemler

Kendi QR kodlarınızı korumak için:
- Düzenli fiziksel kontrol yapın
- Müdahale izli (tamper-evident) etiket kullanın
- Dinamik QR ile tarama istatistiklerini takip edin
- Olağandışı tarama artışlarını araştırın

---

## ✅ Güvenli QR Kontrol Listesi

**Taramadan Önce:**
- [ ] URL önizlemesini kontrol edin
- [ ] Fiziksel bütünlüğü doğrulayın
- [ ] Resmi kaynak olduğundan emin olun

**Taramadan Sonra:**
- [ ] Açılan site HTTPS mi?
- [ ] Domain tanıdık mı?
- [ ] Kişisel bilgi istiyor mu?

---

## 🔒 LuxQr Güvenlik Standartları

- Şeffaf ve reklamsız kod oluşturma
- HTTPS yönlendirmeleri
- Kullanıcı verilerinin korunması
- Üçüncü taraflarla veri paylaşımı yok

Güvenli QR için LuxQr'ı tercih edin!`,
      createdAt: new Date(now).toISOString(),
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
