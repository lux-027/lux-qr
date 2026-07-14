import { NextResponse } from 'next/server';
import { savePost } from '@/lib/db';

export async function POST() {
  try {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const posts = [
      {
        id: 'blog-qr-nedir-nasil-calisir',
        title: 'QR Kod Nedir, Nasıl Çalışır? Kapsamlı Başlangıç Rehberi',
        slug: 'qr-kod-nedir-nasil-calisir-kapsamli-rehber',
        description: 'QR kodun tarihçesi, çalışma prensibi, hata düzeltme seviyeleri ve günlük hayattaki kullanım alanlarını detaylıca öğrenin.',
        category: 'Rehber',
        mainImage: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&q=80&fm=webp',
        content: `QR kod (Quick Response Code), 1994 yılında Japon şirket Denso Wave tarafından üretim hattındaki araçları takip etmek amacıyla geliştirildi. Bugün akıllı telefonlardan ödeme sistemlerine, restoran menülerinden hastane kayıtlarına kadar hayatın her alanında yer aldı.

## QR Kodun Anatomisi

Bir QR kod yüzeyi incelendiğinde birkaç temel bileşen dikkat çeker:

**Konum İşaretleyicileri (Finder Patterns)**
Karenin üç köşesindeki büyük kareler, okuyucunun kodu bulmasını ve yönelimini belirlemesini sağlar. Kodu 360 derece döndürseniz dahi okunabilir.

**Hizalama İşaretleyicisi**
Özellikle büyük kodlarda bükme veya eğrilik durumlarında doğru okumayı sağlar.

**Veri Modülleri**
Asıl bilgiyi taşıyan siyah-beyaz karelerdir.

## Hata Düzeltme Seviyeleri

QR kodun en güçlü özelliklerinden biri, kısmen hasar görmüş olsa bile okunabilmesidir. Reed-Solomon algoritması dört seviyede hata düzeltme sunar:

- **L (Düşük):** %7 kurtarma
- **M (Orta):** %15 kurtarma
- **Q (Yüksek):** %25 kurtarma
- **H (En Yüksek):** %30 kurtarma

Logolu QR kodlarda H seviyesi tercih edilir; logo kodu kısmen kapatsa bile okunabilir kalır.

## Veri Kapasitesi

- Sayısal veri: Maksimum 7.089 karakter
- Alfasayısal: Maksimum 4.296 karakter
- İkili (Binary): Maksimum 2.953 bayt

## Statik ve Dinamik QR Kodlar

**Statik QR Kodlar:** Oluşturulduktan sonra değiştirilemez. İçerdiği URL kalıcıdır.

**Dinamik QR Kodlar:** Kısa bir yönlendirme URL'si içerir. Asıl hedef dilediğiniz zaman değiştirilebilir, tarama sayısı takip edilebilir.

LuxQr tarafından sunulan QR kodlar dinamik sisteme dayanır; bir kez oluşturarak içeriği istediğiniz zaman değiştirebilirsiniz.

## Günlük Hayattaki Kullanım Alanları

**Perakende ve E-ticaret:** Ürün bilgisi, fiyat karşılaştırması, online satın alma.

**Sağlık Sektörü:** Hasta kayıtları, ilaç takibi, aşı sertifikaları.

**Turizm:** Müze ve tarihi mekânlarda sesli rehber ve tanıtım videoları.

**Eğitim:** Ders materyallerine hızlı erişim, ödev takibi.

**Pazarlama:** Reklam posterlerinden dijital içeriklere ölçülebilir köprü.

**Ödeme Sistemleri:** Bankacılık uygulamalarıyla entegre ödeme kolaylığı.

## QR Kod Nasıl Tarlanır?

Akıllı telefonunuzun kamera uygulamasını QR kodun üzerine getirmek genellikle yeterlidir. iOS ve modern Android cihazlar yerleşik QR okuyucuya sahiptir. Kodu taradığınızda ekranın üst kısmında bir bildirim belirir; dokunduğunuzda hemen ilgili sayfaya yönlendirilirsiniz. Eski cihazlarda Google Lens, Apple Kamera veya özel QR okuyucu uygulamaları kullanılabilir. Tarama mesafesi ve açı, kodun boyutuna göre değişir; genel kural olarak kodu 15-30 cm mesafeden ve düz açıyla okutmaktır.

## QR Kod ve Barkod Arasındaki Fark

Barkodlar genellikle yatay çizgilerden oluşur ve sadece sayı veya kısa metin taşıyabilir. QR kodlar ise iki boyutlu kare modüller sayesinde çok daha fazla veri saklar. Barkod bir ürün kodu taşırken, QR kod bir web sitesi, kişi kartı, WiFi profili, ödeme bilgisi ve hatta bir ses dosyasına köprü olabilir. Bu esneklik, QR kodları pazarlama, eğitim, sağlık ve lojistik gibi birçok sektörde vazgeçilmez kılar.

## Gelecekte QR Kodlar

NFC ve biyometrik sistemler yaygınlaşsa da QR kodların kullanımı azalmıyor; aksine daha güvenli ve zengin deneyimlerle evriliyor. Dinamik QR'lar sayesinde aynı fiziksel kodun arkasındaki içerik anında değiştirilebiliyor. Artırılmış gerçeklik (AR) entegrasyonları, etkinlik bileti doğrulama, dijital menüler ve kişiselleştirilmiş pazarlama kampanyaları QR kodun gelecekteki kullanım alanlarından yalnızca bazıları. Kısa vadede QR, fiziksel ve dijital dünyalar arasındaki en pratik köprü olmaya devam edecek.

## Sık Yapılan Hatalar

- Çok küçük boyutlarda kod yazdırmak okunabilirliği düşürür.
- Düşük kontrastlı renkler (açık sarı, beyaz üzerine beyaz) taranamaz.
- Sessiz bölge (kodun etrafındaki boşluk) unutulursa okuyucu kodu tanıyamaz.
- İçeriği değiştirmek istendiğinde statik kod kullanmak yeni baskı gerektirir.

## LuxQr ile QR Kod Oluşturma

LuxQr platformunda QR kod oluşturmak son derece basittir. Metin, bağlantı, WiFi şifresi, kartvizit, IBAN veya ses dosyası için dakikalar içinde profesyonel bir QR kod oluşturabilirsiniz. Oluşturduğunuz kodlar yüksek çözünürlüklü olarak indirilir, sosyal medyada paylaşılır ve yazdırılabilir. Dinamik QR özelliği sayesinde aynı kodu güncel tutabilir, tarama istatistiklerini takip edebilirsiniz. Hemen deneyin!`,
        createdAt: new Date(now - 9 * day).toISOString(),
        published: true,
      },
      {
        id: 'blog-wifi-qr-rehberi',
        title: 'WiFi QR Kodu ile Misafirlerinizi Kolayca Bağlayın',
        slug: 'wifi-qr-kodu-olusturma-kullanma-rehberi',
        description: 'WiFi şifresi paylaşmanın en akıllı yolu: QR kod. Kafe, ofis ve ev kullanımı için adım adım rehber.',
        category: 'WiFi',
        mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp',
        content: `"WiFi şifresi nedir?" sorusu artık tarih oluyor. WiFi QR kodları bu sıradan ama can sıkıcı anı ortadan kaldırıyor.

## WiFi QR Kodu Nedir?

WiFi QR kodu, ağ adınızı (SSID), şifrenizi ve güvenlik türünüzü şifrelenmiş olarak içeren özel bir koddur. Bu kodu tarayan akıllı telefon WiFi bağlantısını otomatik gerçekleştirir.

Teknik format: \`WIFI:S:AgAdi;T:WPA;P:Sifre;H:false;;\`

## Neden Kullanmalısınız?

**Misafir Deneyimi:** Uzun şifreler elle girilmez. Tek tarama yeterli.

**Gizlilik:** Şifrenizi söylemeden paylaşın.

**Profesyonel İmaj:** Kafe ve oteller için şık bir dijital dokunuş.

## Desteklenen Güvenlik Türleri

- **WPA/WPA2:** Modern ağların büyük çoğunluğu. Önerilen.
- **WEP:** Eski ve güvensiz; yeni ağlarda tercih etmeyin.
- **Açık Ağ:** Şifresiz misafir ağları için.

## Adım Adım Oluşturma

1. LuxQr'a gidin, **WiFi QR** seçin
2. Ağ adını ve şifreyi girin
3. Güvenlik türünü seçin
4. QR Oluştur → İndirin

60 saniyeden az sürer!

## Nereye Koymalısınız?

- **Kafe/Restoran:** Masalar, menü arkası, kapı girişi
- **Ofis:** Toplantı odaları, resepsiyon
- **Otel:** Oda kapısı, TV yanı, hoş geldiniz kartı
- **Ev:** Buzdolabı, oturma odası duvarı

## Tasarım İpuçları

LuxQr'ın gradient renk seçenekleriyle markanızla uyumlu tasarım oluşturun. "WiFi'ye Bağlan" başlığını eklemeyi unutmayın. Minimum 3x3 cm boyutunda yazdırın.

## Güvenlik Önerileri

- Misafirler için ayrı bir SSID oluşturun
- Şifrenizi belirli aralıklarla değiştirin
- Dinamik QR ile şifre değişince sadece kodu güncelleyin

LuxQr ile WiFi QR kodunuzu oluşturun ve misafir deneyimini bir üst seviyeye taşıyın!`,
        createdAt: new Date(now - 8 * day).toISOString(),
        published: true,
      },
      {
        id: 'blog-kartvizit-qr',
        title: 'Dijital Kartvizit ve QR Kod: Modern İş Ağı Oluşturmanın Yolu',
        slug: 'dijital-kartvizit-qr-kod-modern-is-agi',
        description: 'Kağıt kartvizit dönemi bitiyor. QR kod ile iş bağlantılarınızı nasıl güçlendireceğinizi öğrenin.',
        category: 'Kariyer',
        mainImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80&fm=webp',
        content: `Her yıl dünyada 10 milyardan fazla kağıt kartvizit basılır; %88'i bir hafta içinde çöpe atılır. Dijital kartvizit + QR kod kombinasyonu bu soruna zarif bir çözüm.

## Geleneksel Kartvizitlerin Sorunları

- **Güncellenemezlik:** Numara değişince tüm kartlar geçersiz
- **Sınırlı içerik:** Sosyal medya için yer kalmaz
- **Fiziksel kayıp:** Yıkanan veya unutulan kartlar
- **Çevre etkisi:** Kâğıt kaynakları tüketimi

## QR Kodlu Kartvizit Neden Daha İyi?

**Sonsuz bilgi kapasitesi:** İletişim detayları, web sitesi, sosyal medya, video tanıtım.

**Anlık güncelleme:** Şirket değiştirdiniz mi? QR bağlantısını güncelleyin.

**İzleme:** Kaç kişinin taradığını takip edin.

## vCard Formatı

LuxQr Kartvizit QR, uluslararası vCard standardını kullanır. Tarayan kişi "Kişiyi Kaydet" seçeneğiyle bilgilerinizi direkt rehberine ekler.

vCard içerebilecekler:
- Ad, soyad, unvan, şirket
- Birden fazla telefon ve e-posta
- Web sitesi, posta adresi
- Fotoğraf

## Kullanım Senaryoları

**Fuarlar:** Rol-up standınıza QR ekleyin; yüzlerce kişiye kâğıtsız ulaşın.

**LinkedIn Entegrasyonu:** E-posta imzanız ve profilinizde aynı QR kodu kullanın.

**Satış profesyonelleri:** Toplantıdan çıkarken müşteriniz kodu tarasın.

## LuxQr ile Oluşturma

1. **Kartvizit QR** seçin
2. Bilgilerinizi girin
3. İsteğe bağlı fotoğraf ekleyin
4. İndirin ve Canva/Photoshop'ta karta ekleyin

Hem geleneksel hem dijital dünyaya hitap eden profesyonel bir kartvizit!`,
        createdAt: new Date(now - 7 * day).toISOString(),
        published: true,
      },
      {
        id: 'blog-sosyal-medya-qr',
        title: 'Sosyal Medya Pazarlamada QR Kod: Takipçi Kazanmanın Akıllı Yolu',
        slug: 'sosyal-medya-pazarlamada-qr-kod-kullanimi',
        description: 'Instagram, TikTok ve YouTube\'da takipçi artırmak için QR kodları nasıl kullanırsınız? Strateji ve örnekler.',
        category: 'Pazarlama',
        mainImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&fm=webp',
        content: `Fiziksel dünyadan dijital platforma köprü kurmak, organik büyüme için kritik bir stratejidir. QR kodlar bu köprünün en etkili bileşenidir.

## Neden QR Kod ile Sosyal Medya?

Tabelada "Instagram: @kafemiz" yazan ile QR kod koyan arasındaki dönüşüm farkı %300'e kadar çıkabilir. QR tarama tek tıkla takiple sonuçlanır; kullanıcı hesabı aramaz.

## Platform Bazlı Stratejiler

### Instagram
- Masalara QR koyun: "Yemeğinizi paylaşın, bizi etiketleyin"
- Deneme kabinlerine: "Bu stili giyen müşterileri görün"
- Etkinlik posterlerine: Anlık story erişimi

### TikTok
- Ürün kutularına QR → kanal aboneliği
- Outdoor reklamlarda güçlü CTA
- Influencer işbirliklerinde özel kampanya sayfası

### YouTube
- Kullanım kılavuzlarına: "Kurulum videosunu izleyin"
- Blog yazılarına: "Video anlatımı için tarayın"

## Kampanya Fikirleri

**"Tarayın, Kazanın":** QR tarayanlar çekilişe katılır.

**Çapraz Platform Büyüme:** Instagram takipçilerinize TikTok'u tanıtın.

**Sadakat Programı:** QR tarayanlara özel indirim kodu.

## Tasarım İpuçları

- Marka renklerinizle uyumlu gradient QR (LuxQr'da mevcut)
- "Instagram'da takip edin" gibi açık CTA metni
- Minimum 2.5 x 2.5 cm boyut
- Farklı cihazlarla test edin

## Ölçüm

- Tarama sayısını takip edin
- Lokasyon bazlı analiz yapın
- Kampanya tarihleriyle takipçi artışını karşılaştırın

LuxQr ile sosyal medya QR kodlarınızı oluşturun, takipçi büyümenizi hızlandırın!`,
        createdAt: new Date(now - 6 * day).toISOString(),
        published: true,
      },
      {
        id: 'blog-isletme-qr-10-kullanim',
        title: 'İşletmeler için QR Kodun 10 Yaratıcı Kullanım Alanı',
        slug: 'isletmeler-icin-qr-kodun-10-yaratici-kullanim-alani',
        description: 'Her sektörde QR kod kullanımını artıracak 10 pratik fikir ve gerçek hayattan örnekler.',
        category: 'İşletme',
        mainImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&fm=webp',
        content: `QR kodlar yalnızca "web sitesi linki" için değildir. Başarılı işletmeler bu teknolojiyi çok daha yaratıcı biçimlerde kullanıyor.

## 1. Dijital Menü
Fiyatları anında güncelleyin, alerjen bilgisi ekleyin, video tarifi sunun.

## 2. Müşteri Geri Bildirimi
Masa QR → Google Yorumları. Fiş arkası QR → Memnuniyet anketi.

## 3. Ürün Kimlik Doğrulama
Her ürüne benzersiz QR. Tarama ile orijinallik doğrulama. Kozmetik, ilaç, lüks ürünler için kritik.

## 4. Stok ve Envanter
Raf etiketleri QR ile stok girişi/çıkışı, hasar raporu, sipariş takibi.

## 5. Sadakat Programı
Kasa QR tarat → puan kazanıldı. Uygulama indirme zorunluluğu yok.

## 6. Mülk ve Vasıta Bilgisi
Kiralık mülk kapısına QR → sanal tur. Araç camına QR → sigorta ve muayene bilgisi.

## 7. Eğitim ve Onboarding
Kullanım kılavuzlarına video QR. Yeni çalışan prosedür erişimi. Sertifika doğrulama.

## 8. Etkinlik Yönetimi
QR rozetli kişisel kartvizit. Oturum geçişi kontrolü. Program ve anket entegrasyonu.

## 9. Ödeme Kolaylığı
IBAN QR ile anında havale. Bağış kampanyaları. LuxQr'ın IBAN QR özelliğini deneyin.

## 10. Sosyal Sorumluluk
Ambalaj QR → geri dönüşüm talimatları. Karbon ayak izi hesaplama. Çevre dostu marka imajı.

## Başlamak için Ne Gerekli?

Yalnızca LuxQr. Ücretsiz QR kodlarınızı oluşturun, indirin, kullanmaya başlayın!`,
        createdAt: new Date(now - 5 * day).toISOString(),
        published: true,
      },
      {
        id: 'blog-egitimde-qr',
        title: 'Eğitimde QR Kod: Öğretmenler ve Öğrenciler için Pratik Rehber',
        slug: 'egitimde-qr-kod-ogretmenler-ogrenciler-rehberi',
        description: 'Sınıf içi etkinliklerden ev ödevine, dijital içerik paylaşımından sınav sistemlerine kadar eğitimde QR kodun tüm kullanım alanları.',
        category: 'Eğitim',
        mainImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fm=webp',
        content: `Teknolojinin eğitime entegrasyonu artık zorunluluk. QR kodlar, öğretmen ve öğrencilerin dijital içeriklere anında erişimini sağlıyor.

## Öğretmenler için Kullanımlar

### Ders Materyali Dağıtımı
Fotokopi yok. Ders notları, alıştırmalar ve kaynak listeleri için QR oluşturun. Öğrenciler tabletle anında erişir.

### İnteraktif Etkinlikler
**QR Kod Avı:** Sınıfta QR kodlar yerleştirin, her kod sonraki ipucuna götürsün.

**İstasyon Rotasyonu:** Her istasyonda farklı içerik türü (video, yazı, quiz).

**Anlık Anket:** Google Forms bağlantılı QR ile sınıf değerlendirmesi.

## Öğrenciler için Kullanımlar

### Not Organizasyonu
Ders notlarını Google Drive'a yükleyin, her klasör için QR oluşturun, not defteri kapağına yapıştırın.

### Grup Projesi
Ortak doküman, toplantı notu, sunum dosyası QR ile paylaşın.

## Okul Yönetimi için

- **Kütüphane:** Her kitaba QR etiket → ödünç alma sistemi
- **Devamsızlık:** Kimlik kartı QR ile yoklama
- **Veli İletişimi:** Duyuru, randevu, karne bildirim

## Dersler Bazında Örnekler

- **Matematik:** Problem çözüm videoları, hesap makinesi bağlantısı
- **Fen:** Deney videoları, sanal müze turu
- **Tarih:** Belgesel, tarihi haritalar, birincil kaynaklar
- **Dil:** Telaffuz ses dosyaları, kelime oyunları

LuxQr ile eğitim amaçlı QR kodlar ücretsiz ve kolay. Hemen başlayın!`,
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
        content: `Türkiye'de her gün milyonlarca havale işlemi gerçekleşiyor. Kullanıcılar uzun IBAN numaralarını elle girmek zorunda kalıyor. IBAN QR kodu bu sorunu çözüyor.

## IBAN QR Kodu Nedir?

Banka hesap bilgilerinizi içeren ve bankacılık uygulamalarıyla taranabilen bir QR kodudur. Alıcı taradığında havale ekranı otomatik dolar; sadece tutar girilir.

## Kim Kullanmalı?

**Serbest çalışanlar:** Fatura yerine IBAN QR gönderin. Müşteri tarar, saniyede öder.

**Küçük işletmeler:** Resepsiyon standı, fatura altı, WhatsApp görseli, web sitesi.

**Dernekler:** Bağış toplamak için konferans, sosyal medya, basılı materyal.

**Esnaf:** Kart okuyucu olmadan dijital ödeme.

**Site yönetimi:** Her aya özel açıklamalı aidat QR.

## Güvenlik

- IBAN zaten kamuya açık bilgidir; paylaşmak güvenlidir
- Fiziksel ortamda başkasının QR'ını üstünüze yapıştırmasına dikkat
- Ödeme öncesi IBAN son 4 haneyi karşılaştırın

## LuxQr ile Oluşturma

1. **IBAN QR** seçin
2. IBAN numaranızı girin (TR ile başlayan 26 hane)
3. Alıcı adı girin
4. İsteğe bağlı: Sabit tutar, açıklama
5. Oluştur → İndir

## Banka Desteği

Türkiye'nin önde gelen bankalarının mobil uygulamaları QR havaleyi destekler:
İş Bankası, Ziraat, Garanti BBVA, Yapı Kredi, Akbank, Halkbank, VakıfBank.

"QR ile Havale" seçeneğini kullanın. IBAN QR ile ödeme almayı kolaylaştırın!`,
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
        content: `Instagram biyografinizdeki tek link alanı, dijital varlığınızın en değerli noktasıdır. Bu alandan maksimum değer elde etmenin yolu: Bio Link sayfası.

## Bio Link Nedir?

Tek bir URL altında birden fazla bağlantıyı toplayan özel bir açılış sayfasıdır. Instagram, TikTok, Twitter ve YouTube'da yalnızca bir link paylaşabilirsiniz. Bio link ile bu tek link ile tüm önemli bağlantılarınıza erişim sunarsınız.

## Neden Kullanmalısınız?

**"Link in bio" Sorunu:** İçeriklerde sık kullanılan bu ifade, her seferinde farklı bağlantıya yönlendirme yapamazsınız. Bio link bu sorunu çözer.

**Trafik Yönetimi:** Web sitesi, mağaza, podcast, YouTube ve rezervasyon sistemine tek sayfadan ulaşım.

**Analitik:** Hangi bağlantının daha fazla tıklandığını görün.

## Kim Kullanmalı?

- **İçerik üreticileri:** YouTube, Spotify, blog, Patreon tek noktada
- **Küçük işletmeler:** Web sitesi, menü, harita, rezervasyon birlikte
- **Influencer:** Affiliate linkler ve kişisel projeler
- **Müzisyenler:** Tüm platformlar + bilet satışı
- **Freelancer:** Portföy, LinkedIn, Calendly bir arada

## LuxQr Bio Link Özellikleri

- 30+ özelleştirilebilir arka plan gradyanı
- Sınırsız link ekleme
- Profil fotoğrafı / logo yükleme
- Hatırlanabilir URL (luxqrpro.site/view/markaniz-xxxx)
- QR kod ile fiziksel ortamlarda da paylaşım

## Oluşturma Adımları

1. **Bio Link** seçin
2. Başlık ve kullanıcı adı girin
3. Logo yükleyin
4. Linkleri ekleyin
5. Tema seçin → QR Oluştur

## Tasarım İpuçları

- En önemli linki en üste koyun
- "Buraya tıkla" yerine "Ders rezervasyonu yap" gibi eylem başlıkları
- Marka renkleriyle uyumlu arka plan
- Eski kampanya linklerini kaldırın

## QR Kod ile Entegrasyon

Bio link + QR kombinasyonu: kartvizit, ürün ambalajı, etkinlik rozeti, vitrin, flyer. Tek kod ile tüm dijital dünyaya erişim.

LuxQr'da Bio Link ücretsiz. Hemen oluşturun!`,
        createdAt: new Date(now - 2 * day).toISOString(),
        published: true,
      },
      {
        id: 'blog-qr-tasarim-ipuclari',
        title: 'Profesyonel QR Kod Tasarımı: Okunabilirlik ve Estetik Rehberi',
        slug: 'profesyonel-qr-kod-tasarimi-okunabilirlik-estetik',
        description: 'Görsel olarak çekici ama her cihazdan kolayca okunabilen QR kodlar nasıl tasarlanır? Renkler, boyut, logo ve daha fazlası.',
        category: 'Tasarım',
        mainImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fm=webp',
        content: `QR kodun "çirkin" olması gerektiği fikri tamamen yanlış. Modern araçlar, okunabilirliği koruyarak görsel olarak etkileyici tasarımlar oluşturmanıza imkân tanır.

## Temel Prensip: Okunabilirlik Her Şeyden Önce

Ne kadar güzel görünürse görünsün, taranamayan bir QR kod işe yaramaz. Her tasarım kararını şu soruya göre değerlendirin: "Bu kod hâlâ okunabilir mi?"

## Kontrast Oranı

Güvenli kombinasyonlar:
- Siyah kod + beyaz arka plan (en güvenilir)
- Koyu lacivert + açık gri
- Gradient kod + beyaz arka plan

Kaçının: Benzer tonlar, çok açık renkler, arka planla bütünleşen renkler.

## Logo Kullanımı

Merkeze logo eklemek mümkündür ama kurallara uyun:
- H (en yüksek) hata düzeltme seviyesi kullanın
- Logo QR alanının maksimum %30'unu kaplamalı
- Logo etrafında beyaz boşluk bırakın
- Her zaman test taraması yapın

LuxQr, logo ile gradient QR kodları otomatik olarak H seviyesiyle oluşturur.

## Boyut Standartları

| Kullanım Yeri | Minimum Boyut |
|--------------|--------------|
| Kartvizit    | 2 x 2 cm     |
| Broşür/Afiş  | 3 x 3 cm     |
| Billboard    | 10 x 10 cm   |
| Ürün etiketi | 1.5 x 1.5 cm |

## Sessiz Bölge (Quiet Zone)

QR kodun etrafında en az 4 modül genişliğinde boşluk bırakın. Bu boşluk olmadan okuyucu kodu arka plandan ayırt edemez.

## Renk Seçimi

**Gradient kullanımı:** LuxQr'ın 5 gradient teması hem görsel olarak çekici hem de yeterli kontrast sağlar.

**Kaçınılacaklar:**
- Kırmızı-yeşil kombinasyonu (renk körü erişilebilirliği)
- Çok parlak neon tonlar (ekran yansıması sorunu)
- Sarı veya açık renkli modüller

## Test Etme

Yayına almadan önce:
- En az 3 farklı telefon markasıyla test edin
- Düşük ışık koşullarında test edin
- Farklı tarama açılarında kontrol edin
- Yazdırılmış halini de test edin (dijital farklı çıkabilir)

## Çerçeve ve Metin Ekleme

Açıklayıcı metin eklemek tarama oranını artırır:
- "Menüyü gör" → "QR Menü"
- "Bizi takip et" → Instagram ikonu + QR
- "WiFi'ye bağlan" → WiFi ikonu + QR

LuxQr ile profesyonel QR tasarımınızı dakikalar içinde oluşturun. Gradient temalar, logo desteği ve yüksek çözünürlüklü indirme ile her yerde harika görünsün!`,
        createdAt: new Date(now - 1 * day).toISOString(),
        published: true,
      },
      {
        id: 'blog-qr-guvenlik',
        title: 'QR Kod Güvenliği: Sahte Kodlardan Nasıl Korunursunuz?',
        slug: 'qr-kod-guvenligi-sahte-kodlardan-korunma-rehberi',
        description: 'QR kodları tararken nelere dikkat etmeli? Güvenli olmayan sitelere yönlendirilmemek için bilmeniz gereken her şey.',
        category: 'Güvenlik',
        mainImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&fm=webp',
        content: `QR kodlar hayatımızın her alanında yer alıyor. Ancak güvenlik riskleri de beraberinde gelebilir. Sahte QR kodlarından korunmak için bilmeniz gerekenler.

## QR Kod Güvenliği Nedir?

QR kodları kendiliğinden zararlı değildir; ancak yönlendirdikleri URL'ler risk taşıyabilir. Dolandırıcılar sahte QR kodları ile kullanıcıları phishing sitelerine yönlendirebilir.

## Yaygın Saldırı Yöntemleri

**QR Sticker Değiştirme:** Meşru bir QR kodun üstüne sahte etiket yapıştırılır. Özellikle ödeme QR'larında görülür.

**Phishing QR'ları:** E-posta veya afişlerde gerçekmiş gibi görünen sahte kodlar.

**Kötü Amaçlı Uygulama İndirme:** QR kod zararlı APK veya profil indirimini tetikler.

## Korunma Yöntemleri

**1. Taramadan Önce URL'yi Kontrol Edin**
Modern QR okuyucular taramadan önce URL'yi gösterir. Tanımadığınız veya şüpheli domainlerden kaçının.

**2. Fiziksel Bütünlüğü Kontrol Edin**
Ödeme terminali veya ofis girişindeki QR'ın üstüne yapıştırılmış bir etiket olup olmadığını kontrol edin.

**3. HTTPS Kontrolü**
Yönlendirilen site HTTPS kullanıyor mu? HTTP olan sitelerde kişisel bilgi girmeyin.

**4. Güvenli Platformlar Kullanın**
LuxQr gibi şeffaf platformlarda oluşturulan kodlar reklam veya zararlı içerik barındırmaz.

**5. Resmi Kaynakları Doğrulayın**
Kamusal alanlardaki QR'ların resmi kaynaklardan geldiğinden emin olun.

## İşletmeler için Önlemler

Kendi QR kodlarınızı korumak için:
- Düzenli fiziksel kontrol yapın
- Tampering-evident (müdahale izli) etiket kullanın
- Dinamik QR ile tarama istatistiklerini takip edin
- Şüpheli tarama artışlarını inceleyin

## LuxQr ile Güvenli QR

LuxQr kullanıcı güvenliğini ön planda tutar:
- Şeffaf ve reklamsız kod oluşturma
- Güvenli URL yönlendirmeleri
- Kullanıcı verilerinin korunması
- Açık kaynak doğrulanabilir yapı

Güvenli QR kod oluşturmak için LuxQr'ı tercih edin!`,
        createdAt: new Date(now).toISOString(),
        published: true,
      },
    ];

    const results: string[] = [];
    for (const post of posts) {
      try {
        await savePost(post as any);
        results.push(`OK: ${post.id}`);
      } catch (e) {
        results.push(`ERR: ${post.id} - ${String(e)}`);
      }
    }

    // Verify: read back the list
    const { kv } = await import('@vercel/kv');
    const allIds = await kv.smembers('posts:all');

    return NextResponse.json({
      success: true,
      message: `${posts.length} blog yazısı başarıyla eklendi`,
      count: posts.length,
      slugs: posts.map(p => p.slug),
      results,
      allIdsInKv: allIds,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
