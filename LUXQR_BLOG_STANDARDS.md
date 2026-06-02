# LuxQr Yayıncılık Standartları

Bu doküman, LuxQr blogunda yayınlanacak tüm yazıların uyması gereken tasarım ve içerik standartlarını belirler.

## 📝 Tipografi ve Boşluk (Okunabilirlik)

### Temel Kurallar
- **Paragraflar arası boşluk:** En az `mt-8` (32px) boşluk bırakın
- **Ana metin:** `leading-relaxed` ve `text-lg` sınıflarını kullanarak satır aralarını genişletin
- **H2 başlıkları:** `text-3xl`, `font-bold`
- **H3 başlıkları:** `text-xl`, `font-bold`
- **Başlık-metin arası:** `mt-10 mb-4` boşluk

### HTML Formatı
```html
<h2>Başlık</h2>
<p>Paragraf içeriği...</p>

<h3>Alt Başlık</h2>
<p>Paragraf içeriği...</p>
```

## 🖼️ Görsel Stratejisi

### Görsel Kullanım Kuralları
- **Minimum görsel sayısı:** Bir yazıda en az 3 adet görsel kullanın
- **Görsel yerleşimi:**
  - Görselleri metne boğdurmayın
  - `float-right` veya `md:w-1/3` sınıflarıyla görselleri metnin yanına yaslayın
  - Metin blokları arasına tam genişlikte görsel "molaları" ekleyin
- **Görsel stili:** `rounded-2xl shadow-xl` efektleri
- **Caption:** Her görselin altına mutlaka kısa bir açıklama metni ekleyin

### HTML Formatı
```html
<!-- Yan yana görsel -->
<div class="flex flex-col md:flex-row gap-8 items-start">
  <div class="w-full md:w-1/3 max-w-md flex-shrink-0">
    <div class="rounded-2xl overflow-hidden shadow-xl">
      <img src="görsel-url.jpg" alt="Açıklama" className="w-full h-auto object-cover" />
      <p className="text-sm text-gray-400 mt-2">Görsel açıklaması</p>
    </div>
  </div>
  <div className="flex-1">
    <p>Metin içeriği...</p>
  </div>
</div>

<!-- Tam genişlik görsel molası -->
<div className="my-8 rounded-2xl overflow-hidden shadow-xl">
  <img src="görsel-url.jpg" alt="Açıklama" className="w-full h-auto" />
  <p className="text-sm text-gray-400 mt-2 text-center">Görsel açıklaması</p>
</div>
```

## 🎨 Düzen ve Vurgu

### İnfobox (Vurgu Kutusu)
Önemli kısımları `bg-slate-900 border-l-4 border-green-500 p-6` sınıflarıyla 'infobox' olarak sunun.

### HTML Formatı
```html
<blockquote class="bg-slate-900 border-l-4 border-green-500 p-6 rounded-r-lg my-8">
  <p>Önemli bilgi veya vurgulanacak içerik...</p>
</blockquote>
```

### Liste İkonları
Liste kullanacağınız yerlerde mutlaka Lucide React ikonlarını liste başı olarak kullanın.

### Kullanılacak İkonlar
- `CheckCircle` - Başarı/onay işaretleri
- `Zap` - Hız/enerji/önemli noktalar
- `Shield` - Güvenlik/koruma
- `Info` - Bilgi/notlar

### HTML Formatı
```html
<ul>
  <li><span class="inline-flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400 flex-shrink-0">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    Liste öğesi
  </span></li>
  <li><span class="inline-flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400 flex-shrink-0">
      <polygon points="13 2L3 14h9l-1 8 10-12h-9l1-8z"></polygon>
    </svg>
    Liste öğesi
  </span></li>
</ul>
```

## ✍️ Yazım Kuralları

### İçerik Akışı
- **Hikayeleştirme:** Metni 'düz mantık' değil, okuyucunun gözünü yormayacak bir akışta (hikayeleştirerek) yazın
- **Noktalama ve imla:** Türkçe noktalama ve imla kurallarına tam uyum
- **Akıcılık:** Paragraflar arasında mantıksal geçişler sağlayın
- **Okunabilirlik:** Uzun cümlelerden kaçının, kısa ve net cümleler kullanın

### SEO İpuçları
- **Anahtar kelime kullanımı:** Doğal ve organik anahtar kelime yerleşimi
- **Meta açıklama:** Her yazı için 150-160 karakterlik SEO uyumlu açıklama
- **Başlık optimizasyonu:** H1 ve H2 başlıklarında anahtar kelimeler

## 🔧 Teknik Uygulama

### Component Kullanımı
Tüm blog yazıları otomatik olarak `BlogContent` component'i üzerinden render edilir. Bu component, yukarıdaki tüm standartları otomatik olarak uygular.

### Prose Sınıfları
İçerik otomatik olarak şu Tailwind Prose sınıflarıyla stil verilir:
- `prose prose-invert prose-lg max-w-none`
- `prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4`
- `prose-h3:text-xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-4`
- `prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-8`
- `prose-blockquote:bg-slate-900 prose-blockquote:border-l-4 prose-blockquote:border-green-500`
- `prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8`

## 📋 Kontrol Listesi

Yazı yayınlamadan önce bu kontrol listesini kullanın:

- [ ] Paragraflar arası boşluk (mt-8)
- [ ] Ana metin leading-relaxed ve text-lg
- [ ] H2 başlıkları text-3xl font-bold
- [ ] H3 başlıkları text-xl font-bold
- [ ] Başlık-metin arası mt-10 mb-4
- [ ] En az 3 görsel
- [ ] Görseller rounded-2xl shadow-xl
- [ ] Her görselin caption'ı var
- [ ] Önemli kısımlar infobox içinde
- [ ] Listelerde ikonlar kullanılmış
- [ ] Noktalama ve imla kurallarına uyum
- [ ] Hikayeleştirme akışı
- [ ] SEO uyumlu meta açıklama
- [ ] CTA (Harekete Geçirici Mesaj) eklendi

## 🎯 Örnek Yapı

```html
<h2>Başlık</h2>
<p>Giriş paragrafı...</p>

<div class="flex flex-col md:flex-row gap-8 items-start">
  <div class="w-full md:w-1/3 max-w-md flex-shrink-0">
    <div class="rounded-2xl overflow-hidden shadow-xl">
      <img src="görsel.jpg" alt="Açıklama" className="w-full h-auto object-cover" />
      <p className="text-sm text-gray-400 mt-2">Görsel açıklaması</p>
    </div>
  </div>
  <div className="flex-1">
    <p>Metin içeriği...</p>
  </div>
</div>

<h3>Alt Başlık</h3>
<p>Paragraf...</p>

<blockquote class="bg-slate-900 border-l-4 border-green-500 p-6 rounded-r-lg my-8">
  <p>Önemli bilgi...</p>
</blockquote>

<ul>
  <li><span class="inline-flex items-center gap-2">
    <svg class="text-green-400 flex-shrink-0">...</svg>
    Liste öğesi
  </span></li>
</ul>

<div className="my-8 rounded-2xl overflow-hidden shadow-xl">
  <img src="görsel.jpg" alt="Açıklama" className="w-full h-auto" />
  <p className="text-sm text-gray-400 mt-2 text-center">Görsel açıklaması</p>
</div>

<p>Kapanış paragrafı...</p>

<p><strong>CTA:</strong> Hemen başlamak için <a href="/">LuxQr</a> ile tanışın!</p>
```

---

**Not:** Bu standartlar tüm yeni blog yazıları için zorunludur. Mevcut yazılar da mümkün olan en kısa sürede bu standartlara göre güncellenecektir.
