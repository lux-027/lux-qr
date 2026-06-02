'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown,
  Home
} from 'lucide-react';

const faqData = [
  {
    question: 'LuxQr nedir?',
    answer: 'LuxQr; dosya, metin, resim ve videolarınızı saniyeler içinde yüksek kaliteli QR kodlara dönüştüren modern bir platformdur.'
  },
  {
    question: 'Oluşturduğum QR kodlar ne kadar süre geçerli?',
    answer: 'Kullanıcılarımıza 1 gün, 1 hafta, 1 ay ve maksimum 3 ay olmak üzere farklı geçerlilik süreleri sunuyoruz. Veri güvenliği gereği 3 aydan uzun süreli saklama yapılmamaktadır.'
  },
  {
    question: 'Hangi dosya türlerini yükleyebilirim?',
    answer: 'PNG, JPG, PDF, MP4 gibi popüler formatların yanı sıra düz metin ve URL paylaşımlarını da destekliyoruz.'
  },
  {
    question: 'Verilerim güvende mi?',
    answer: 'Evet. Yüklediğiniz içerikler şifreli altyapımızda saklanır ve belirlediğiniz süre sonunda sistemimizden kalıcı olarak silinir.'
  },
  {
    question: 'Hizmetiniz ücretsiz mi?',
    answer: 'LuxQr temel QR oluşturma özelliklerini tüm kullanıcılarına tamamen ücretsiz olarak sunar.'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex justify-end"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-12 h-12 text-blue-500" />
            <h1 className="text-5xl font-bold text-white">
              Sıkça Sorulan Sorular
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            LuxQr hakkında merak edilenler ve sıkça karşılaşılan sorular
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/10 transition-colors"
              >
                <h2 className="text-lg font-semibold text-white flex-1">
                  {item.question}
                </h2>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
