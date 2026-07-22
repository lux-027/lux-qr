'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Plus, Trash2, ChevronDown, ChevronUp, Tag, Package,
  ShoppingBag, Store, Clock, ArrowRight, Loader2, CheckCircle, Zap,
  ImagePlus, X as XIcon, FileText, DollarSign, Layers, Wand2, QrCode, Percent, Pencil,
  MousePointerClick, FolderOpen, PlusCircle, Sparkles,
  MapPin, Phone, Globe, Instagram, Link2
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  discount: string;
  discountedPrice?: string;
  description: string;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  items: MenuItem[];
}

interface PriceListData {
  brandName: string;
  brandDescription: string;
  currency: string;
  logoUrl: string;
  categories: Category[];
  address: string;
  city: string;
  mapsUrl: string;
  phone: string;
  instagram: string;
  website: string;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const expirationOptions = [
  { value: '1day', label: '1 Gün' },
  { value: '1week', label: '1 Hafta' },
  { value: '1month', label: '1 Ay' },
  { value: '3months', label: '3 Ay' },
  { value: '6months', label: '6 Ay' },
  { value: '12months', label: '12 Ay' },
];

const currencyOptions = [
  { value: 'TL', label: '₺ Türk Lirası' },
  { value: 'USD', label: '$ Dolar' },
  { value: 'EUR', label: '€ Euro' },
  { value: 'GBP', label: '£ Sterlin' },
];

export default function FiyatListesiContent() {
  const router = useRouter();
  const [expiration, setExpiration] = useState('1month');
  const [note, setNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [discountModal, setDiscountModal] = useState<{ catId: string; itemId: string; tempVal: string } | null>(null);
  const [itemModal, setItemModal] = useState<{ catId: string; item: MenuItem; isNew: boolean } | null>(null);
  const [managerOpen, setManagerOpen] = useState(false);
  const [managerSelectedCatId, setManagerSelectedCatId] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const managerCatImgRef = useRef<HTMLInputElement | null>(null);
  const [pendingManagerCatId, setPendingManagerCatId] = useState<string | null>(null);
  const itemModalImgRef = useRef<HTMLInputElement | null>(null);
  const [itemModalUploading, setItemModalUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [itemUploading, setItemUploading] = useState<string | null>(null);
  const itemInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [catUploading, setCatUploading] = useState<string | null>(null);
  const catInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [priceList, setPriceList] = useState<PriceListData>({
    brandName: '',
    brandDescription: '',
    currency: 'TL',
    logoUrl: '',
    categories: [],
    address: '',
    city: '',
    mapsUrl: '',
    phone: '',
    instagram: '',
    website: '',
  });

  const demoScenarios: Array<{ brandName: string; brandDescription: string; currency: string; categories: Array<{ name: string; imageUrl: string; items: Array<{ name: string; price: string; discount: string; description: string; imageUrl: string }> }> }> = [
    {
      brandName: 'Cafe Lux',
      brandDescription: 'Taze malzemelerle hazırlanan lezzetler ve özel içecekler',
      currency: 'TL',
      categories: [
        {
          name: 'Başlangıçlar',
          imageUrl: 'https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&q=80',
          items: [
            { name: 'Mercimek Çorbası', price: '85', discount: '10', description: 'Taze sebzelerle hazırlanmış, kırmızı biber yağlı', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
            { name: 'Zeytinyağlı Yaprak Sarma', price: '110', discount: '', description: '6 adet, limon dilimiyle servis edilir', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
            { name: 'Humus', price: '95', discount: '15', description: 'Tahin ve zeytinyağı ile, pide ekmeği eşliğinde', imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80' },
          ],
        },
        {
          name: 'Ana Yemekler',
          imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
          items: [
            { name: 'Izgara Köfte', price: '220', discount: '20', description: 'Pilav ve mevsim salata ile servis edilir', imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80' },
            { name: 'Tavuk Şiş', price: '195', discount: '', description: 'Sebzeli, özel baharatlı marine', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80' },
            { name: 'Karışık Izgara', price: '320', discount: '', description: 'Et ve tavuk karışık, 2 kişilik porsiyon', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' },
          ],
        },
        {
          name: 'Tatlılar',
          imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
          items: [
            { name: 'Künefe', price: '130', discount: '', description: 'Fıstıklı, sıcak servis', imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400&q=80' },
            { name: 'Cheesecake', price: '115', discount: '25', description: 'Frambuaz soslu, ev yapımı', imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
            { name: 'Sütlaç', price: '85', discount: '', description: 'Fırında pişirilmiş, tarçınlı', imageUrl: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80' },
          ],
        },
        {
          name: 'İçecekler',
          imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
          items: [
            { name: 'Ayran', price: '45', discount: '', description: 'Ev yapımı, köpüklü', imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80' },
            { name: 'Limonata', price: '75', discount: '', description: 'Taze sıkılmış nane yapraklı', imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
            { name: 'Türk Kahvesi', price: '65', discount: '', description: 'Geleneksel pişirme, lokum ikramı', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80' },
            { name: 'Çay', price: '30', discount: '', description: 'Demlik çay, şeker seçeneğiyle', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
          ],
        },
      ],
    },
    {
      brandName: 'TeknoMart',
      brandDescription: 'Elektronik ve aksesuarda en iyi fiyatlar',
      currency: 'TL',
      categories: [
        {
          name: 'Telefonlar',
          imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
          items: [
            { name: 'Akıllı Telefon A12', price: '12999', discount: '15', description: '6.5" AMOLED, 128GB, çift kamera', imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80' },
            { name: 'Akıllı Telefon Pro', price: '21999', discount: '', description: '6.7" ekran, 256GB, 108MP kamera', imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80' },
            { name: 'Bütçe Dostu Model', price: '6499', discount: '20', description: '6.2" ekran, 64GB, uzun pil ömrü', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80' },
          ],
        },
        {
          name: 'Kulaklıklar',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
          items: [
            { name: 'Kablosuz Kulaklık', price: '1299', discount: '', description: 'Gürültü engelleme, 30 saat pil', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
            { name: 'Oyuncu Kulaklık', price: '899', discount: '10', description: '7.1 surround, RGB aydınlatma', imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80' },
            { name: 'Spor Kulakiçi', price: '549', discount: '', description: 'Su geçirmez IPX5, şarj kutusu', imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80' },
          ],
        },
        {
          name: 'Aksesuarlar',
          imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80',
          items: [
            { name: 'Hızlı Şarj Adaptörü', price: '299', discount: '', description: '65W GaN, çoklu port', imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80' },
            { name: 'Powerbank 20000mAh', price: '649', discount: '12', description: 'İki çıkış, hızlı şarj destekli', imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
            { name: 'USB-C Kablo', price: '149', discount: '', description: '2 metre, 100W güç aktarımı', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
          ],
        },
      ],
    },
    {
      brandName: 'ModaStil Butik',
      brandDescription: 'Sezonun en trend parçaları bir arada',
      currency: 'TL',
      categories: [
        {
          name: 'Üst Giyim',
          imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
          items: [
            { name: 'Basic T-Shirt', price: '299', discount: '20', description: '%100 pamuk, 5 renk seçeneği', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
            { name: 'Oversize Sweatshirt', price: '549', discount: '', description: 'Unisex, kapüşonlu', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80' },
            { name: 'Gömlek Linen', price: '749', discount: '15', description: 'Keten karışımı, yazlık', imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
          ],
        },
        {
          name: 'Alt Giyim',
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
          items: [
            { name: 'Slim Fit Jean', price: '899', discount: '', description: 'Streç denim, 3 renk', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
            { name: 'Chino Pantolon', price: '749', discount: '10', description: 'Hafif kumaş, slim kesim', imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80' },
            { name: 'Şort Bermuda', price: '449', discount: '', description: 'Plaj ve günlük kullanım', imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80' },
          ],
        },
        {
          name: 'Ayakkabı',
          imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
          items: [
            { name: 'Spor Sneaker', price: '1299', discount: '25', description: 'Hafif taban, nefes alan kumaş', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
            { name: 'Klasik Loafer', price: '1599', discount: '', description: 'Deri üst, şık görünüm', imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&q=80' },
            { name: 'Sandalet', price: '699', discount: '', description: 'Yazlık, konforlu taban', imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
          ],
        },
      ],
    },
    {
      brandName: 'GreenSpa Güzellik',
      brandDescription: 'Doğal ürünlerle profesyonel bakım hizmetleri',
      currency: 'TL',
      categories: [
        {
          name: 'Saç Bakımı',
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
          items: [
            { name: 'Saç Kesimi (Bayan)', price: '350', discount: '', description: 'Yıkama ve föhn dahil', imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
            { name: 'Keratin Bakımı', price: '1200', discount: '10', description: 'Formaldehit içermez, 3-4 ay kalıcı', imageUrl: 'https://images.unsplash.com/photo-1560066984-138daaa4e4e9?w=400&q=80' },
            { name: 'Saç Boyama', price: '800', discount: '', description: 'Kök boyama, tüm saç seçeneği', imageUrl: 'https://images.unsplash.com/photo-1522337094-1e6e7b2cbde2?w=400&q=80' },
          ],
        },
        {
          name: 'Cilt Bakımı',
          imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
          items: [
            { name: 'Klasik Cilt Bakımı', price: '550', discount: '15', description: 'Derin temizlik, nem maskesi', imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80' },
            { name: 'Anti-Aging Bakım', price: '950', discount: '', description: 'C vitamini serum, kolajen maske', imageUrl: 'https://images.unsplash.com/photo-1556228720-da9a9ce57568?w=400&q=80' },
            { name: 'Makyaj', price: '700', discount: '', description: 'Günlük veya özel gün makyajı', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80' },
          ],
        },
        {
          name: 'Masaj & Vücut',
          imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
          items: [
            { name: 'Klasik Masaj (50dk)', price: '650', discount: '20', description: 'Tam vücut rahatlama masajı', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80' },
            { name: 'Aromaterapi Masajı', price: '850', discount: '', description: 'Esansiyel yağlar ile 60 dakika', imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80' },
            { name: 'Hamam & Kese', price: '500', discount: '', description: 'Geleneksel Türk hamamı deneyimi', imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80' },
          ],
        },
      ],
    },
  ];

  const demoAddresses = ['İstiklal Caddesi No: 45', 'Atatürk Bulvarı No: 12', 'Sahil Yolu No: 8', 'Çarşı Meydanı No: 3', 'Bahçeli Sokak No: 21'];
  const demoCities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'];
  const demoInstagrams = ['cafeluxdemo', 'lux_cafe', 'kahve_duragi', 'lezzet_mekani', 'restoran_34', 'butikmenu'];
  const demoWebsites = ['https://luxqrpro.site', 'https://ornekisletme.com', 'https://menudemo.net', 'https://qrmenum.com'];
  const demoLogos = [
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
  ];
  const randomPhone = () => {
    const prefix = ['+9053', '+9054', '+9055'][Math.floor(Math.random() * 3)];
    const rest = Math.floor(1000000 + Math.random() * 9000000).toString();
    return `${prefix}${rest}`;
  };

  const fillDemo = () => {
    const scenario = demoScenarios[Math.floor(Math.random() * demoScenarios.length)];
    const city = demoCities[Math.floor(Math.random() * demoCities.length)];
    setPriceList({
      brandName: scenario.brandName,
      brandDescription: scenario.brandDescription,
      currency: scenario.currency,
      logoUrl: demoLogos[Math.floor(Math.random() * demoLogos.length)],
      address: demoAddresses[Math.floor(Math.random() * demoAddresses.length)],
      city,
      mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(city)}`,
      phone: randomPhone(),
      instagram: demoInstagrams[Math.floor(Math.random() * demoInstagrams.length)],
      website: demoWebsites[Math.floor(Math.random() * demoWebsites.length)],
      categories: scenario.categories.map((cat) => ({
        id: generateId(),
        name: cat.name,
        imageUrl: cat.imageUrl,
        items: cat.items.map((item) => ({
          id: generateId(),
          name: item.name,
          price: item.price,
          discount: item.discount ?? '',
          discountedPrice: item.discount ? String(Math.round(Number(item.price) * (1 - Number(item.discount) / 100))) : undefined,
          description: item.description,
          imageUrl: item.imageUrl,
        })),
      })),
    });
    setOpenCategories([]);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setLogoPreview(localUrl);
    setLogoUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setPriceList((p) => ({ ...p, logoUrl: data.url }));
        setLogoPreview('');
        URL.revokeObjectURL(localUrl);
      }
    } catch (err) {
      console.error('Logo upload error:', err);
    } finally {
      setLogoUploading(false);
    }
  };

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const addCategory = (name = '') => {
    const newId = generateId();
    setPriceList((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        { id: newId, name, imageUrl: '', items: [] },
      ],
    }));
    setOpenCategories((prev) => [...prev, newId]);
    return newId;
  };

  const handleCatImageUpload = async (catId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => c.id === catId ? { ...c, imageUrl: localUrl } : c),
    }));
    setCatUploading(catId);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setPriceList((prev) => ({
          ...prev,
          categories: prev.categories.map((c) => c.id === catId ? { ...c, imageUrl: data.url } : c),
        }));
        URL.revokeObjectURL(localUrl);
      }
    } catch (err) {
      console.error('Category image upload error:', err);
    } finally {
      setCatUploading(null);
    }
  };

  const removeCategory = (catId: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== catId),
    }));
  };

  const updateCategory = (catId: string, name: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === catId ? { ...c, name } : c)),
    }));
  };

  const clearCategoryImage = (catId: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === catId ? { ...c, imageUrl: '' } : c)),
    }));
  };

  const addItem = (catId: string) => {
    setOpenCategories((prev) => prev.includes(catId) ? prev : [...prev, catId]);
    setItemModal({ catId, item: { id: generateId(), name: '', price: '', discount: '', discountedPrice: undefined, description: '', imageUrl: '' }, isNew: true });
  };

  const openEditItemModal = (catId: string, item: MenuItem) => {
    setItemModal({ catId, item: { ...item }, isNew: false });
  };

  const saveItemModal = () => {
    if (!itemModal) return;
    const { catId, item, isNew } = itemModal;
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId
          ? isNew
            ? { ...c, items: [...c.items, item] }
            : { ...c, items: c.items.map((i) => (i.id === item.id ? item : i)) }
          : c
      ),
    }));
    setItemModal(null);
  };

  const handleItemModalImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const local = URL.createObjectURL(file);
    setItemModal((p) => p ? { ...p, item: { ...p.item, imageUrl: local } } : null);
    setItemModalUploading(true);
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) { setItemModal((p) => p ? { ...p, item: { ...p.item, imageUrl: data.url } } : null); URL.revokeObjectURL(local); }
    } catch { /* ignore */ } finally { setItemModalUploading(false); }
  };

  const handleItemImageUpload = async (catId: string, itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    updateItem(catId, itemId, 'imageUrl', localUrl);
    setItemUploading(itemId);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        updateItem(catId, itemId, 'imageUrl', data.url);
        URL.revokeObjectURL(localUrl);
      }
    } catch (err) {
      console.error('Item image upload error:', err);
    } finally {
      setItemUploading(null);
    }
  };

  const removeItem = (catId: string, itemId: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      ),
    }));
  };

  const updateItem = (catId: string, itemId: string, field: keyof MenuItem, value: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i)) }
          : c
      ),
    }));
  };

  const emptyNamedCategories = priceList.categories.filter((c) => c.items.length === 0);
  const isValid =
    priceList.brandName.trim() !== '' &&
    priceList.categories.length > 0 &&
    priceList.categories.some((c) => c.name.trim() !== '' && c.items.some((i) => i.name.trim() !== '' && i.price.trim() !== '')) &&
    emptyNamedCategories.length === 0;

  const handleGenerate = async () => {
    if (!isValid) return;
    setIsGenerating(true);
    try {
      const content = JSON.stringify(priceList);
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          contentType: 'price-list',
          expiration,
          note: note || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedUrl(data.viewUrl);
        router.push(`/qr/${data.id}`);
      }
    } catch (err) {
      console.error('Generate error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-8">
      <div className="max-w-6xl mx-auto">

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6 md:mb-16"
      >
        <div className="flex items-center justify-center gap-3 md:gap-5 mb-3 md:mb-6">
          <div className="relative">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40 rotate-3 hover:-rotate-3 transition-transform duration-300">
              <ShoppingBag className="w-7 h-7 md:w-10 md:h-10 text-white drop-shadow-lg" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg -rotate-12">
              <QrCode className="w-3 h-3 md:w-4 md:h-4 text-gray-900" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">Fiyat Listesi</h1>
            <p className="text-sm md:text-2xl font-semibold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">QR Kod</p>
          </div>
        </div>
        <p className="text-gray-600 text-xs md:text-lg max-w-2xl mx-auto text-center mt-1">
          Restoran menüsü, hizmet veya ürün fiyat listenizi QR koda dönüştürün
        </p>
      </motion.div>

      <div className="space-y-5 md:space-y-8">
      {/* Brand Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="card-premium p-4 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
                <ShoppingBag className="w-4 h-4 md:w-6 md:h-6 text-gray-900" />
              </div>
              <div>
                <h2 className="text-base md:text-xl font-bold text-gray-900">Marka Bilgileri</h2>
                <p className="text-gray-600 text-xs hidden md:block">Marka, kategori ve ürünlerinizi ekleyin</p>
              </div>
            </div>
            <button
              onClick={fillDemo}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all hover:-translate-y-0.5 duration-200"
              style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316,#ef4444)', boxShadow: '0 4px 14px rgba(249,115,22,0.40), inset 0 1px 0 rgba(255,255,255,0.2)' }}
            >
              <Wand2 className="w-3.5 h-3.5" />
              Demo ile Doldur
            </button>
          </div>

          {/* Brand Info */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <Store className="w-4 h-4 text-amber-400" />
                Marka / İşletme Adı *
              </label>
              <input
                type="text"
                value={priceList.brandName}
                onChange={(e) => setPriceList((p) => ({ ...p, brandName: e.target.value }))}
                placeholder="Örn: Cafe Lux, Berber Mehmet..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
              />
            </div>
            {/* Logo Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <ImagePlus className="w-4 h-4 text-pink-400" />
                İşletme Logosu (İsteğe Bağlı)
              </label>
              <div className="flex items-center gap-4">
                {(priceList.logoUrl || logoPreview) ? (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                      src={priceList.logoUrl || logoPreview}
                      alt="Logo"
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                    {logoUploading && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-gray-900 animate-spin" />
                      </div>
                    )}
                    {!logoUploading && (
                      <button
                        onClick={() => { setPriceList((p) => ({ ...p, logoUrl: '' })); setLogoPreview(''); }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
                      >
                        <XIcon className="w-3 h-3 text-white" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    disabled={logoUploading}
                    className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 hover:border-orange-500/50 rounded-xl text-gray-400 hover:text-orange-400 transition-all flex-shrink-0"
                  >
                    <ImagePlus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Yükle</span>
                  </button>
                )}
                <p className="text-gray-600 text-xs leading-relaxed">
                  PNG, JPG veya WebP formatında logo yükleyin. QR tarandığında marka başlığının yanında görünür.
                </p>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <FileText className="w-4 h-4 text-violet-400" />
                Kısa Açıklama (İsteğe Bağlı)
              </label>
              <input
                type="text"
                value={priceList.brandDescription}
                onChange={(e) => setPriceList((p) => ({ ...p, brandDescription: e.target.value }))}
                placeholder="Örn: Taze malzemelerle hazırlanan lezzetler"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
              />
            </div>

            {/* Location */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Konum (İsteğe Bağlı)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={priceList.address}
                  onChange={(e) => setPriceList((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Adres"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
                />
                <input
                  type="text"
                  value={priceList.city}
                  onChange={(e) => setPriceList((p) => ({ ...p, city: e.target.value }))}
                  placeholder="Şehir"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
                />
              </div>
              <input
                type="text"
                value={priceList.mapsUrl}
                onChange={(e) => setPriceList((p) => ({ ...p, mapsUrl: e.target.value }))}
                placeholder="Google Maps linki (isteğe bağlı)"
                className="w-full mt-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
              />
            </div>

            {/* Contact */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Phone className="w-4 h-4 text-blue-500" />
                İletişim (İsteğe Bağlı)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="tel"
                  value={priceList.phone}
                  onChange={(e) => setPriceList((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Telefon"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
                />
                <input
                  type="text"
                  value={priceList.instagram}
                  onChange={(e) => setPriceList((p) => ({ ...p, instagram: e.target.value }))}
                  placeholder="Instagram @kullanici"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
                />
                <input
                  type="text"
                  value={priceList.website}
                  onChange={(e) => setPriceList((p) => ({ ...p, website: e.target.value }))}
                  placeholder="Web sitesi"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Para Birimi
              </label>
              <select
                value={priceList.currency}
                onChange={(e) => setPriceList((p) => ({ ...p, currency: e.target.value }))}
                className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500/50 transition-all"
              >
                {currencyOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How to use — standalone 3D steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6 md:mb-8"
      >
        <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-white/95 via-white/85 to-slate-50/90 border border-white/60 shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg md:text-2xl font-black text-gray-900">Nasıl Kullanılır?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Kategori Oluştur',
                desc: 'Fiyat listenize uygun kategori ekleyin (ör. Kahvaltı, Elektronik).',
                icon: MousePointerClick,
                from: '#3b82f6',
                to: '#06b6d4',
                shadow: 'rgba(59,130,246,0.35)',
              },
              {
                step: '02',
                title: 'Kategoriyi Aç',
                desc: 'Eklediğiniz satıra tıklayarak ürün ekleme alanını açın.',
                icon: FolderOpen,
                from: '#f97316',
                to: '#f59e0b',
                shadow: 'rgba(249,115,22,0.35)',
              },
              {
                step: '03',
                title: 'Ürün Ekle',
                desc: 'Ürün adı, fiyatı, resmi ve indirimini girerek listeyi doldurun.',
                icon: PlusCircle,
                from: '#10b981',
                to: '#06b6d4',
                shadow: 'rgba(16,185,129,0.35)',
              },
              {
                step: '04',
                title: 'QR Yap & Paylaş',
                desc: 'Oluşturulan QR kodu indirin, paylaşın veya yazdırın.',
                icon: QrCode,
                from: '#a855f7',
                to: '#ec4899',
                shadow: 'rgba(168,85,247,0.35)',
              },
            ].map(({ step, title, desc, icon: Icon, from, to, shadow }) => (
              <div key={step} style={{ perspective: '1000px' }} className="group">
                <motion.div
                  className="relative h-full rounded-2xl p-5 md:p-6 bg-gradient-to-br from-white/90 to-slate-50/80 border border-white/60 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ rotateX: -6, rotateY: 6, y: -8, transition: { duration: 0.35 } }}
                >
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%)' }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 8px 24px ${shadow}` }}
                      >
                        <Icon className="w-6 h-6 text-white drop-shadow" />
                      </div>
                      <span className="text-2xl font-black text-gray-200/80">{step}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-auto">{desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Categories Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-premium p-4 md:p-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">Kategoriler ve Ürünler</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-0.5">Önce kategorileri oluşturun, ardından ürünleri ekleyin</p>
              </div>
            </div>
            <button
              onClick={() => {
                setManagerOpen(true);
                if (!managerSelectedCatId && priceList.categories.length > 0) setManagerSelectedCatId(priceList.categories[0].id);
              }}
              className="group relative overflow-hidden flex items-center gap-2 pl-3 pr-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg,#f97316,#f59e0b)',
                boxShadow: '0 4px 14px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span className="w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <Plus className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-white drop-shadow-sm">Ürünleri Ekle</span>
            </button>
          </div>

          {priceList.categories.length === 0 ? (
            <div className="text-center py-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50">
              <Package className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">Henüz kategori yok</p>
              <p className="text-xs text-gray-500 mt-1">“Ürünleri Ekle” butonuyla kategori ve ürün ekleyebilirsiniz</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {priceList.categories.map((cat) => (
                <div key={cat.id} className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 border border-gray-200 shadow-sm group">
                  {cat.imageUrl ? (
                    <img src={cat.imageUrl} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-bold text-sm leading-tight drop-shadow-md line-clamp-1">{cat.name}</p>
                    <p className="text-white/85 text-xs mt-0.5">{cat.items.length} ürün</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Expiration + Note */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="card-premium p-4 md:p-8 space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {expirationOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setExpiration(opt.value)}
                  disabled={isGenerating}
                  className={`py-2.5 rounded-xl border text-xs md:text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    expiration === opt.value
                      ? 'bg-blue-500/30 border-blue-500/50 text-gray-900 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Not (İsteğe Bağlı)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isGenerating}
              rows={2}
              placeholder="QR kod için ek not..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-gray-100 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <button
          onClick={handleGenerate}
          disabled={!isValid || isGenerating || !!itemUploading || !!catUploading || logoUploading}
          className={`btn-primary w-full py-2.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-gray-900 text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 ${
            !isValid || isGenerating || !!itemUploading || !!catUploading || logoUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {(itemUploading || catUploading || logoUploading) ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Resim Yükleniyor...
            </>
          ) : isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              QR Kod Oluşturuluyor...
            </>
          ) : (
            <>
              QR Kod Oluştur
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        {!isValid && emptyNamedCategories.length > 0 && (
          <p className="text-center text-red-400 text-sm mt-2">
            ⚠️ {emptyNamedCategories.length} {emptyNamedCategories.length === 1 ? 'kategoride' : 'kategoride'} ürün yok. Her kategoriye en az 1 ürün ekleyin veya boş kategorileri silin.
          </p>
        )}
        {!isValid && emptyNamedCategories.length === 0 && (
          <p className="text-center text-gray-600 text-sm mt-2">
            Marka adı, en az bir kategori ve ürün (ad + fiyat) giriniz
          </p>
        )}
      </motion.div>

      {/* Example Product Showcase */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <div className="card-premium p-3 md:p-8">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
            <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <ImagePlus className="w-3 h-3 md:w-4 md:h-4 text-gray-900" />
            </div>
            <div>
              <h3 className="text-sm md:text-lg font-bold text-gray-900">Örnek Ürün Görselleri</h3>
              <p className="text-gray-500 text-xs hidden md:block mt-0.5">Her sektöre uygun fiyat listesi oluşturabilirsiniz</p>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-1.5 md:gap-3">
            {[
              { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', label: 'Restoran', color: 'from-orange-500/80 to-amber-500/80' },
              { url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80', label: 'Giyim', color: 'from-blue-500/80 to-cyan-500/80' },
              { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', label: 'Elektronik', color: 'from-purple-500/80 to-pink-500/80' },
              { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80', label: 'Güzellik', color: 'from-rose-500/80 to-pink-500/80' },
              { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', label: 'Spor', color: 'from-green-500/80 to-emerald-500/80' },
              { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80', label: 'Teknoloji', color: 'from-indigo-500/80 to-blue-500/80' },
              { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', label: 'Kafe', color: 'from-amber-500/80 to-orange-500/80' },
              { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', label: 'Aksesuar', color: 'from-emerald-500/80 to-teal-500/80' },
            ].map((item, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group aspect-square">
                <img
                  src={item.url}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-gray-900 text-xs font-semibold text-center drop-shadow">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs text-center mt-4">Ürünlerinize kendi resimlerinizi ekleyerek daha profesyonel görünüm elde edin</p>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
      >
        <div className="card-premium p-3 md:p-6">
          <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-2 md:mb-4 shadow-lg">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Hızlı Paylaşım</h3>
          <p className="text-gray-600 text-xs md:text-sm hidden md:block">
            Fiyat listenizi saniyeler içinde QR koda dönüştürün.
          </p>
        </div>
        <div className="card-premium p-3 md:p-6">
          <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
            <Store className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Her İşletme</h3>
          <p className="text-gray-600 text-xs md:text-sm hidden md:block">
            Restoran, berber, mağaza; her işletme için uygun.
          </p>
        </div>
        <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
          <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Geçerlilik</h3>
          <p className="text-gray-600 text-xs md:text-sm hidden md:block">
            Belirli süre geçerli QR kod oluşturun.
          </p>
        </div>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        <div className="card-premium p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Restoran Menüsü</h3>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            Başlangıç, ana yemek, tatlı gibi kategoriler ekleyip ürün ve fiyatlarınızı girin. QR kodu masalara koyun, müşteriler telefonuyla okutarak menüye erişsin.
          </p>
        </div>
        <div className="card-premium p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Hizmet Listesi</h3>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            Berber, güzellik salonu, tamirci gibi işletmeler için hizmet kategorileri ve fiyatlarını paylaşın. Güncelleme gerektiğinde yeni QR kolayca oluşturun.
          </p>
        </div>
      </motion.div>

      {/* Detailed Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card-premium p-4 md:p-8"
      >
        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-gradient">Dijital Fiyat Listesiyle İşletmenizi Modernleştirin</h2>
        <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
          Kağıt menü ve fiyat listelerinin yerini artık dijital QR kodlar alıyor. Müşterileriniz telefonlarıyla saniyeler içinde güncel fiyat listenize ulaşabilir.
          Hem maliyet tasarrufu sağlarsınız hem de güncellemeler anında yansır.
        </p>
        <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Fiyat Listesi QR Kodunun Avantajları</h3>
        <ul className="text-gray-700 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
              <span className="text-orange-400 text-xs">✓</span>
            </div>
            <span>Kağıt menü maliyetini ortadan kaldırın</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <span className="text-amber-400 text-xs">✓</span>
            </div>
            <span>Fiyat değişikliklerini anında yansıtın</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
              <span className="text-blue-400 text-xs">✓</span>
            </div>
            <span>Sınırsız kategori ve ürün ekleyin</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
              <span className="text-purple-400 text-xs">✓</span>
            </div>
            <span>Restoran, kafe, berber, mağaza — her işletme için uygun</span>
          </li>
        </ul>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          LuxQR ile fiyat listenizi saniyeler içinde QR koda dönüştürün. Modern işletmeler için ideal dijital çözüm.
        </p>
      </motion.div>
      </div>
      </div>

      {discountModal && (
        <DiscountModalInner
          discountModal={discountModal}
          setDiscountModal={setDiscountModal as any}
          priceList={priceList}
          setPriceList={setPriceList}
        />
      )}

      {/* ── Ürün Ekle / Düzenle Modal ── */}
      <AnimatePresence>
        {itemModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setItemModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.97 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"><Package className="w-4 h-4 text-white" /></div>
                  <h3 className="text-gray-900 font-bold text-base">{itemModal.isNew ? 'Ürün Ekle' : 'Ürünü Düzenle'}</h3>
                </div>
                <button onClick={() => setItemModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"><XIcon className="w-4 h-4" /></button>
              </div>

              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" className="hidden" ref={itemModalImgRef} onChange={handleItemModalImg} />
                  {itemModal.item.imageUrl ? (
                    <div className="relative group flex-shrink-0">
                      <img src={itemModal.item.imageUrl} alt="" className="w-20 h-20 rounded-2xl object-cover border border-white/15" />
                      {itemModalUploading && <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center"><Loader2 className="w-5 h-5 text-gray-900 animate-spin" /></div>}
                      <button onClick={() => setItemModal((p) => p ? { ...p, item: { ...p.item, imageUrl: '' } } : null)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full hidden group-hover:flex items-center justify-center shadow"><XIcon className="w-3 h-3 text-white" /></button>
                    </div>
                  ) : (
                    <button onClick={() => itemModalImgRef.current?.click()} className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-400/60 flex flex-col items-center justify-center gap-1.5 text-gray-500 hover:text-orange-400 transition-all flex-shrink-0">
                      {itemModalUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><ImagePlus className="w-6 h-6" /><span className="text-[10px]">Resim ekle</span></>}
                    </button>
                  )}
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs mb-1">Ürün görseli (isteğe bağlı)</p>
                    <p className="text-gray-600 text-[11px]">JPG, PNG, WEBP desteklenir</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Ürün Adı <span className="text-red-400">*</span></label>
                  <input type="text" value={itemModal.item.name} onChange={(e) => setItemModal((p) => p ? { ...p, item: { ...p.item, name: e.target.value } } : null)}
                    placeholder="Ör: Mercimek Çorbası" autoFocus
                    className="w-full bg-gray-100 border border-gray-300 focus:border-orange-400 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-slate-600 focus:outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Açıklama</label>
                  <textarea value={itemModal.item.description} onChange={(e) => setItemModal((p) => p ? { ...p, item: { ...p.item, description: e.target.value } } : null)}
                    placeholder="Ürün hakkında kısa açıklama..." rows={2}
                    className="w-full bg-gray-100 border border-gray-300 focus:border-slate-500 rounded-xl px-4 py-2.5 text-slate-300 text-sm placeholder-slate-600 focus:outline-none transition-all resize-none" />
                </div>

                {(() => {
                  const op = Number(itemModal.item.price);
                  const dp = Number(itemModal.item.discountedPrice);
                  const discTooHigh = !!itemModal.item.discountedPrice && dp >= op && op > 0;
                  return (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Fiyat <span className="text-red-400">*</span></label>
                        <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-300 focus-within:border-amber-400 rounded-xl px-3 py-2.5 transition-all">
                          <span className="text-gray-500 text-xs font-semibold">{priceList.currency}</span>
                          <input type="text" inputMode="decimal" value={itemModal.item.price}
                            onChange={(e) => {
                              const v = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
                              if ((v.match(/\./g) || []).length <= 1) {
                                setItemModal((p) => p ? { ...p, item: { ...p.item, price: v, discount: '', discountedPrice: undefined } } : null);
                              }
                            }}
                            placeholder="0.00" className="flex-1 bg-transparent text-amber-300 text-sm font-bold placeholder-slate-600 focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">İndirimli Fiyat</label>
                        <div className={`flex items-center gap-1.5 bg-gray-100 border rounded-xl px-3 py-2.5 transition-all ${discTooHigh ? 'border-red-500/60 focus-within:border-red-400' : 'border-gray-300 focus-within:border-emerald-400'}`}>
                          <span className="text-gray-500 text-xs font-semibold">{priceList.currency}</span>
                          <input type="text" inputMode="decimal"
                            value={itemModal.item.discountedPrice || ''}
                            onChange={(e) => {
                              const v = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
                              if ((v.match(/\./g) || []).length <= 1) {
                                const dpn = Number(v);
                                const opn = Number(itemModal.item.price);
                                const pct = opn > 0 && dpn > 0 && dpn < opn ? String(Math.max(1, Math.round((1 - dpn / opn) * 100))) : '';
                                setItemModal((p) => p ? { ...p, item: { ...p.item, discountedPrice: v, discount: pct } } : null);
                              }
                            }}
                            placeholder="0.00" className="flex-1 bg-transparent text-emerald-400 text-sm font-bold placeholder-slate-600 focus:outline-none" />
                        </div>
                        {discTooHigh && (
                          <p className="text-[10px] text-red-400 mt-1 font-medium">İndirimli fiyat orijinal fiyattan düşük olmalı</p>
                        )}
                        {!discTooHigh && itemModal.item.discount && Number(itemModal.item.discount) > 0 && (
                          <p className="text-[10px] text-emerald-400 mt-1 text-center font-bold">%{itemModal.item.discount} indirim</p>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="flex gap-3 px-5 py-4 border-t border-gray-200">
                <button onClick={() => setItemModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 text-sm font-medium transition-all">İptal</button>
                <button disabled={!itemModal.item.name.trim() || !itemModal.item.price.trim() || itemModalUploading || (!!itemModal.item.discountedPrice && Number(itemModal.item.discountedPrice) >= Number(itemModal.item.price) && Number(itemModal.item.price) > 0)} onClick={saveItemModal}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-gray-900 text-sm font-bold transition-all shadow-lg shadow-orange-500/30">
                  {itemModal.isNew ? 'Ürünü Ekle' : 'Kaydet'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category / Product manager modal */}
      <CategoryManagerModal
        open={managerOpen}
        onClose={() => setManagerOpen(false)}
        priceList={priceList}
        onAddItem={addItem}
        onEditItem={openEditItemModal}
        removeItem={removeItem}
        removeCategory={removeCategory}
        updateCategory={updateCategory}
        clearCategoryImage={clearCategoryImage}
        addCategory={addCategory}
        handleCatImageUpload={handleCatImageUpload}
        catUploading={catUploading}
      />
    </div>
  );
}

function CategoryManagerModal({
  open,
  onClose,
  priceList,
  onAddItem,
  onEditItem,
  removeItem,
  removeCategory,
  updateCategory,
  clearCategoryImage,
  addCategory,
  handleCatImageUpload,
  catUploading,
}: {
  open: boolean;
  onClose: () => void;
  priceList: PriceListData;
  onAddItem: (catId: string) => void;
  onEditItem: (catId: string, item: MenuItem) => void;
  removeItem: (catId: string, itemId: string) => void;
  removeCategory: (catId: string) => void;
  updateCategory: (catId: string, name: string) => void;
  clearCategoryImage: (catId: string) => void;
  addCategory: (name?: string) => string;
  handleCatImageUpload: (catId: string, e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  catUploading: string | null;
}) {
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const catImgRef = useRef<HTMLInputElement | null>(null);
  const [pendingCatId, setPendingCatId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedCatId(null);
      setNewCatName('');
      return;
    }
    if (priceList.categories.length > 0) {
      setSelectedCatId((prev) => {
        const exists = priceList.categories.find((c) => c.id === prev);
        return exists ? prev : priceList.categories[0].id;
      });
    }
  }, [open, priceList.categories]);

  if (!open) return null;

  const selectedCat = priceList.categories.find((c) => c.id === selectedCatId);

  const handleAddCategory = () => {
    const name = newCatName.trim();
    if (!name) return;
    const id = addCategory(name);
    setSelectedCatId(id);
    setNewCatName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddCategory();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-4xl h-[85vh] md:h-[80vh] bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/20">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Kategori ve Ürün Yönetimi</h3>
              <p className="text-xs text-gray-500">Kategorileri oluşturun, ürünleri ekleyin ve düzenleyin</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Left: categories */}
          <div className="md:w-72 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Yeni kategori adı"
                  className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                />
                <button
                  onClick={handleAddCategory}
                  disabled={!newCatName.trim()}
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {priceList.categories.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-xs px-3">
                  Henüz kategori yok. Yukarıdan kategori ekleyin.
                </div>
              )}
              {priceList.categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all ${
                    selectedCatId === cat.id
                      ? 'bg-orange-50 border border-orange-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {cat.imageUrl ? (
                    <img src={cat.imageUrl} alt={cat.name} className="w-9 h-9 rounded-lg object-cover border border-gray-100" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-orange-500">
                      <Layers className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{cat.name}</p>
                    <p className="text-[10px] text-gray-500">{cat.items.length} ürün</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCategory(cat.id);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: selected category products */}
          <div className="flex-1 flex flex-col min-h-0 bg-white">
            {selectedCat ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={catImgRef}
                    onChange={(e) => {
                      if (pendingCatId) handleCatImageUpload(pendingCatId, e);
                    }}
                  />
                  <div className="flex items-center gap-3">
                    {selectedCat.imageUrl ? (
                      <div className="relative group flex-shrink-0">
                        <img src={selectedCat.imageUrl} alt={selectedCat.name} className="w-14 h-14 rounded-xl object-cover border border-gray-200" />
                        {catUploading === selectedCat.id && (
                          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                          </div>
                        )}
                        <button
                          onClick={() => clearCategoryImage(selectedCat.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full hidden group-hover:flex items-center justify-center shadow"
                        >
                          <XIcon className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setPendingCatId(selectedCat.id);
                          catImgRef.current?.click();
                        }}
                        className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-400/60 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-orange-500 transition-all flex-shrink-0"
                      >
                        {catUploading === selectedCat.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
                      </button>
                    )}
                    <input
                      type="text"
                      value={selectedCat.name}
                      onChange={(e) => updateCategory(selectedCat.id, e.target.value)}
                      placeholder="Kategori adı"
                      className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedCat.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl px-3 py-2.5 transition-all">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name || <span className="text-gray-400 italic">İsimsiz ürün</span>}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {item.price ? (
                            <span className="text-amber-600 text-xs font-bold">{priceList.currency} {item.price}</span>
                          ) : (
                            <span className="text-gray-400 text-xs">Fiyat girilmedi</span>
                          )}
                          {item.discount && Number(item.discount) > 0 && (
                            <span className="text-[10px] bg-red-100 text-red-600 border border-red-200 px-1.5 py-0.5 rounded-full font-bold">%{item.discount}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => onEditItem(selectedCat.id, item)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
                          title="Düzenle"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeItem(selectedCat.id, item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => onAddItem(selectedCat.id)}
                    className="flex items-center gap-1.5 w-full justify-center py-2.5 text-orange-600 hover:text-gray-900 text-sm font-semibold transition-all border border-orange-500/40 hover:border-orange-500 bg-orange-50 hover:bg-orange-100 rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                    Ürün Ekle
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <Layers className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-semibold">Bir kategori seçin</p>
                <p className="text-xs mt-1">Sol panelden kategori seçerek ürün ekleyebilirsiniz</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscountModalInner({ discountModal, setDiscountModal, priceList, setPriceList }: {
  discountModal: { catId: string; itemId: string; tempVal: string };
  setDiscountModal: (v: any) => void;
  priceList: any;
  setPriceList: (fn: any) => void;
}) {
  const cat = priceList.categories.find((c: any) => c.id === discountModal.catId);
  const item = cat?.items.find((i: any) => i.id === discountModal.itemId);
  if (!item) return null;
  const pct = discountModal.tempVal && Number(discountModal.tempVal) > 0 && Number(item.price) > 0
    ? Math.round((1 - Number(discountModal.tempVal) / Number(item.price)) * 100)
    : 0;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setDiscountModal(null)}>
      <div className="w-full max-w-xs bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-gray-900 font-bold text-base mb-1">İndirim Ekle</h3>
        <p className="text-gray-500 text-xs mb-4">{item.name || 'Ürün'} — Fiyat: {priceList.currency}{item.price}</p>
        <label className="text-gray-500 text-xs font-semibold block mb-1">İndirimli Fiyat</label>
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-xl px-3 py-2.5 mb-3">
          <span className="text-gray-500 text-sm font-semibold">{priceList.currency}</span>
          <input
            type="number"
            inputMode="decimal"
            autoFocus
            min="0"
            step="0.01"
            value={discountModal.tempVal}
            onChange={e => setDiscountModal({ ...discountModal, tempVal: e.target.value })}
            placeholder="0.00"
            className="flex-1 bg-transparent border-none text-emerald-400 text-lg font-bold placeholder-slate-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        {pct > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 mb-4 flex items-center justify-between">
            <span className="text-gray-500 text-xs">Hesaplanan indirim</span>
            <span className="text-red-400 font-bold text-lg">%{pct}</span>
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => setDiscountModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 text-sm font-medium transition-all">İptal</button>
          <button
            disabled={!discountModal.tempVal || pct <= 0}
            onClick={() => {
              setPriceList((prev: any) => ({
                ...prev,
                categories: prev.categories.map((c: any) =>
                  c.id === discountModal.catId
                    ? { ...c, items: c.items.map((i: any) => i.id === discountModal.itemId ? { ...i, discountedPrice: discountModal.tempVal, discount: String(pct) } : i) }
                    : c
                ),
              }));
              setDiscountModal(null);
            }}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-gray-900 text-sm font-bold transition-all"
          >Onayla</button>
        </div>
      </div>
    </div>
  );
}
