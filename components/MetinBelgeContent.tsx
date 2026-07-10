'use client';

import { motion } from 'framer-motion';
import { Type, ImageIcon, Video, FileText, Upload, QrCode, Clock, Shield, Zap, Image as ImageIcon2, X, Timer, AlarmClock, CalendarDays, CalendarRange } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function MetinBelgeContent() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'image' | 'video' | 'file'>('image');
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const handleTypeChange = (type: 'image' | 'video' | 'file') => {
    setSelectedType(type);
    setFile(null);
    setFiles([]);
    setPreviewUrl(null);
    setPreviewUrls([]);
    setUploadStatus('');
    setShowError(false);
    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Client-side file size validation with warning
      const maxSize = selectedType === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for others
      if (selectedFile.size > maxSize) {
        const maxSizeMB = selectedType === 'video' ? '100MB' : '10MB';
        const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        showNotification(`Dosya boyutu çok büyük (${fileSizeMB}MB). Maksimum ${maxSizeMB} limiti var.`, 'error');
        return;
      }
      
      // Warning for large files (over 50MB for videos)
      if (selectedType === 'video' && selectedFile.size > 50 * 1024 * 1024) {
        const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        showNotification(`Büyük dosya (${fileSizeMB}MB). Yükleme biraz zaman alabilir.`, 'info');
      }
      
      setUploading(true);
      setUploadStatus('Dosya yükleniyor...');
      
      // Simulate upload delay
      setTimeout(() => {
        setFile(selectedFile);
        setShowError(false);
        setUploading(false);
        setUploadStatus('');
        
        // Create preview URL
        if (selectedType === 'image') {
          const url = URL.createObjectURL(selectedFile);
          setPreviewUrl(url);
        } else if (selectedType === 'video') {
          const url = URL.createObjectURL(selectedFile);
          setPreviewUrl(url);
        }
      }, 1000);
    }
  };

  const handleMultiFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      // Limit to 5 images
      if (selectedFiles.length > 5) {
        showNotification('En fazla 5 resim seçebilirsiniz', 'error');
        return;
      }
      
      // Validate all files are images
      const maxSize = 10 * 1024 * 1024; // 10MB for images
      for (const file of selectedFiles) {
        if (!file.type.startsWith('image/')) {
          showNotification('Sadece resim dosyaları seçebilirsiniz', 'error');
          return;
        }
        if (file.size > maxSize) {
          const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
          showNotification(`Dosya boyutu çok büyük (${fileSizeMB}MB). Maksimum 10MB limiti var.`, 'error');
          return;
        }
      }
      
      setUploading(true);
      setUploadStatus('Resimler yükleniyor...');
      
      // Simulate upload delay
      setTimeout(() => {
        setFiles(selectedFiles);
        setShowError(false);
        setUploading(false);
        setUploadStatus('');
        
        // Create preview URLs for all images
        const urls = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
      }, 1000);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviewUrls(newUrls);
    
    if (newFiles.length === 0) {
      setShowError(true);
    }
  };

  const handleGenerate = async () => {
    if (selectedType === 'image' && !file && files.length === 0) {
      setShowError(true);
      showNotification('Lütfen resim seçin', 'error');
      return;
    }
    if ((selectedType === 'video' || selectedType === 'file') && !file) {
      setShowError(true);
      showNotification('Lütfen dosya seçin', 'error');
      return;
    }
    if (loading) {
      showNotification('İşlem devam ediyor, lütfen bekleyin', 'error');
      return;
    }

    setLoading(true);
    setUploadStatus(selectedType === 'video' ? 'Video yükleniyor... (bu biraz zaman alabilir)' : 'QR kod oluşturuluyor...');
    try {
      let content = '';
      let contentType: 'text' | 'image' | 'video' | 'file' = selectedType as 'text' | 'image' | 'video' | 'file';
      let fileName = null;
      let filePath = null;

      if (files.length > 0 && selectedType === 'image') {
        // Multiple images - upload all files
        const uploadedFiles = [];
        
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 120000);

          setUploadStatus(`Resim yükleniyor... (${uploadedFiles.length + 1}/${files.length})`);

          try {
            const uploadResponse = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
              signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!uploadResponse.ok) {
              const errorText = await uploadResponse.text();
              console.error('Upload failed:', uploadResponse.status, errorText);
              showNotification(`Dosya yüklenemedi: ${uploadResponse.status}`, 'error');
              return;
            }

            const uploadData = await uploadResponse.json();

            if (!uploadData.success) {
              showNotification(uploadData.error || 'Dosya yüklenemedi', 'error');
              return;
            }

            uploadedFiles.push({
              name: file.name,
              url: uploadData.url
            });
          } catch (error) {
            clearTimeout(timeoutId);
            console.error('Upload error:', error);
            showNotification('Dosya yüklenirken bir hata oluştu', 'error');
            return;
          }
        }

        // Use the first file URL as the main content
        content = uploadedFiles[0].url;
        fileName = files[0].name;
        // Store all file URLs in a structured format
        filePath = JSON.stringify(uploadedFiles);
      } else if (file) {
        // Dosyayı Supabase'a yükle
        const formData = new FormData();
        formData.append('file', file);

        // Add timeout to prevent hanging - increased for video files
        const timeoutDuration = selectedType === 'video' ? 300000 : 120000; // 5 minutes for video, 2 minutes for others
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

        setUploadStatus('Dosya yükleniyor...');

        try {
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error('Upload failed:', uploadResponse.status, errorText);
            showNotification(`Dosya yüklenemedi: ${uploadResponse.status}`, 'error');
            return;
          }

          const uploadData = await uploadResponse.json();

          if (!uploadData.success) {
            showNotification(uploadData.error || 'Dosya yüklenemedi', 'error');
            return;
          }

          content = uploadData.url;
          fileName = file.name;
          filePath = uploadData.url;
        } catch (error: any) {
          clearTimeout(timeoutId);
          if (error.name === 'AbortError') {
            const timeoutMinutes = selectedType === 'video' ? '5 dakika' : '2 dakika';
            showNotification(`Dosya yüklenirken zaman aşımı oluştu (${timeoutMinutes})`, 'error');
          } else {
            console.error('Upload error:', error);
            showNotification('Dosya yüklenirken bir hata oluştu', 'error');
          }
          return;
        }
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          contentType,
          fileName,
          filePath,
          expiration,
          note,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Generate failed:', response.status, errorText);
        showNotification(`QR oluşturulamadı: ${response.status}`, 'error');
        return;
      }

      const data = await response.json();
      if (data.success) {
        router.push(`/qr/${data.id}`);
      } else {
        showNotification(data.error || 'QR kod oluşturulamadı', 'error');
      }
    } catch (error) {
      console.error('QR oluşturma hatası:', error);
      showNotification('QR kod oluşturulurken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
      setUploadStatus('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full" />
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-500/40 rotate-3 hover:-rotate-3 transition-transform duration-300">
                  <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-pink-400 to-violet-500 rounded-xl flex items-center justify-center shadow-lg -rotate-12">
                  <QrCode className="w-4 h-4 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">LuxQr</h1>
            </div>
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
            Modern <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">QR Kod Oluşturma</span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Metin, resim, video ve belge içeriğinizi QR koda dönüştürün ve paylaşın
          </p>
        </motion.div>

        {/* Content Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          <div
            onClick={() => handleTypeChange('image')}
            className={`card-premium p-6 cursor-pointer transition-all ${
              selectedType === 'image'
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-2xl shadow-blue-500/50 scale-105 ring-2 ring-blue-500/30'
                : 'hover:border-blue-500/50 opacity-70 hover:opacity-100'
            }`}
          >
            <ImageIcon className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${selectedType === 'image' ? 'text-blue-300' : 'text-blue-400'}`} />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Resim</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">Görsel dosyaları için QR kod</p>
          </div>

          <div
            onClick={() => handleTypeChange('video')}
            className={`card-premium p-6 cursor-pointer transition-all ${
              selectedType === 'video'
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-2xl shadow-blue-500/50 scale-105 ring-2 ring-blue-500/30'
                : 'hover:border-blue-500/50 opacity-70 hover:opacity-100'
            }`}
          >
            <Video className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${selectedType === 'video' ? 'text-blue-300' : 'text-blue-400'}`} />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Video</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">Video dosyaları için QR kod</p>
          </div>

          <div
            onClick={() => handleTypeChange('file')}
            className={`card-premium p-6 cursor-pointer transition-all ${
              selectedType === 'file'
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-2xl shadow-blue-500/50 scale-105 ring-2 ring-blue-500/30'
                : 'hover:border-blue-500/50 opacity-70 hover:opacity-100'
            }`}
          >
            <FileText className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${selectedType === 'file' ? 'text-blue-300' : 'text-blue-400'}`} />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Belge</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">PDF, DOCX ve diğer belgeler için QR kod</p>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <Upload className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Dosya Yükle
            </label>
              <div className="relative">
                {file && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setPreviewUrl(null);
                      setShowError(false);
                    }}
                    className="absolute top-2 right-2 z-10 bg-gray-500/60 hover:bg-gray-500/80 text-white rounded-full p-1 md:p-2 transition-colors backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
                <div className="flex gap-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex-1 border-2 border-dashed rounded-2xl p-4 md:p-8 text-center cursor-pointer transition-colors ${
                      showError ? 'border-red-500' : 'border-white/20 hover:border-blue-500/50'
                    }`}
                  >
                    {previewUrls.length > 0 && selectedType === 'image' ? (
                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative flex-shrink-0">
                            <img src={url} alt={`Preview ${index + 1}`} className="w-32 h-24 object-cover rounded-lg" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : previewUrl && (selectedType === 'image' || selectedType === 'video') ? (
                      <div className="mb-4">
                        {selectedType === 'image' ? (
                          <img src={previewUrl} alt="Preview" className="max-w-full max-h-48 mx-auto rounded-lg" />
                        ) : (
                          <video src={previewUrl} controls className="max-w-full max-h-48 mx-auto rounded-lg" />
                        )}
                      </div>
                    ) : file && selectedType === 'file' ? (
                      <div className="mb-4">
                        {file.type === 'application/pdf' && previewUrl ? (
                          <iframe
                            src={previewUrl || ''}
                            className="w-full h-48 rounded-lg"
                            title="PDF Preview"
                          />
                        ) : (
                          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <FileText className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                          </div>
                        )}
                        <p className="text-white font-medium text-sm md:text-base truncate max-w-xs mx-auto">{file.name}</p>
                        <p className="text-gray-500 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <Upload className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-4" />
                    )}
                    <p className="text-gray-400 mb-1 md:mb-2 text-sm md:text-base">
                      {files.length > 0 ? `${files.length} resim seçildi` : file ? file.name : 'Dosya seçmek için tıklayın veya sürükleyin'}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {selectedType === 'image' && 'PNG, JPG, GIF (max 10MB)'}
                      {selectedType === 'video' && 'MP4, MOV, AVI (max 100MB)'}
                      {selectedType === 'file' && 'PDF, DOCX, TXT (max 10MB)'}
                    </p>
                  </div>
                  {selectedType === 'image' && (
                    <div className="flex flex-col justify-center">
                      <button
                        onClick={() => multiFileInputRef.current?.click()}
                        disabled={uploading || loading}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all disabled:opacity-50"
                      >
                        <ImageIcon2 className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">Çoklu Resim</span>
                      </button>
                      <p className="text-gray-500 text-xs mt-2 text-center">En fazla 5 resim</p>
                    </div>
                  )}
                </div>
              </div>
              {showError && (
                <p className="text-red-400 text-xs mt-1">Lütfen dosya seçin</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept={
                  selectedType === 'image'
                    ? 'image/*'
                    : selectedType === 'video'
                    ? 'video/*,.mp4,.mov,.avi,.mkv,.webm'
                    : '.pdf,.doc,.docx,.txt'
                }
                className="hidden"
              />
              <input
                ref={multiFileInputRef}
                type="file"
                onChange={handleMultiFileSelect}
                accept="image/*"
                multiple
                className="hidden"
              />
           </div>

          {/* Note/Description Field */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Not / Açıklama
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="QR kod hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-slate-800/50 border border-white/10 rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
            />
          </div>

          {/* Expiration Selection */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { value: '1day', label: '1 Gün', icon: Timer, color: 'text-cyan-400', activeColor: 'border-cyan-500/50 bg-cyan-500/10' },
                { value: '1week', label: '1 Hafta', icon: AlarmClock, color: 'text-blue-400', activeColor: 'border-blue-500/50 bg-blue-500/10' },
                { value: '1month', label: '1 Ay', icon: CalendarDays, color: 'text-purple-400', activeColor: 'border-purple-500/50 bg-purple-500/10' },
                { value: '3months', label: '3 Ay', icon: CalendarRange, color: 'text-orange-400', activeColor: 'border-orange-500/50 bg-orange-500/10' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiration(option.value as any)}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-2xl border transition-all ${
                    expiration === option.value ? option.activeColor : 'border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <option.icon className={`w-4 h-4 md:w-5 md:h-5 ${expiration === option.value ? option.color : 'text-gray-500'}`} />
                  <span className={`text-xs md:text-sm font-medium ${expiration === option.value ? option.color : ''}`}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 md:mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading || uploading || (selectedType === 'image' ? !file && files.length === 0 : !file)}
              className="btn-primary w-full text-white font-semibold py-3 md:py-4 rounded-2xl disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? uploadStatus || 'Oluşturuluyor...' : uploading ? uploadStatus : 'QR Kod Oluştur'}
            </button>
          </div>
        </motion.div>

        {/* Informative Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı ve Kolay</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Saniyeler içinde QR kod oluşturun. Tek tıkla içeriğinizi paylaşın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Verileriniz güvende. Şifreli ve güvenli QR kod oluşturma.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <QrCode className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Çoklu Format</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Metin, resim, video ve belge için QR kod desteği.
            </p>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          {selectedType === 'image' && (
            <>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Resim QR Kodları</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Fotoğraflar, grafikler ve görsel içerikler için QR kod oluşturun. 
                  Sanat galerileri, portfolyolar ve görsel sunumlar için idealdir.
                </p>
              </div>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Yüksek Kalite</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Resimlerinizi orijinal kalitede paylaşın. 
                  Baskı materyalleri ve dijital ekranlar için optimize edilmiş.
                </p>
              </div>
            </>
          )}
          {selectedType === 'video' && (
            <>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Video QR Kodları</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Tanıtım videoları, eğitimler ve sunumlar için QR kod oluşturun. 
                  Etkinlikler, konferanslar ve eğitim materyalleri için mükemmeldir.
                </p>
              </div>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Büyük Dosya Desteği</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  100MB'a kadar video dosyalarını destekler. 
                  Yüksek kaliteli videolarınızı kolayca paylaşın.
                </p>
              </div>
            </>
          )}
          {selectedType === 'file' && (
            <>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Dosya Paylaşımı</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  PDF, DOCX, resim ve video dosyalarınızı QR kod ile paylaşın. 
                  Toplantılar, konferanslar ve eğitim materyalleri için hızlı dağıtım sağlar.
                </p>
              </div>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Çoklu Format</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Tüm dosya türlerini destekler. 
                  Dokümanlar, sunumlar ve medya dosyaları için tek çözüm.
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-4 md:p-8 md:p-12"
        >
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">PDF ve Dosya Paylaşımında QR Kodun Sağladığı Hız</h2>
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Geleneksel dosya paylaşım yöntemleri artık yetersiz kalıyor. PDF, DOCX, resim ve video dosyalarınızı QR kod ile paylaşarak saniyeler içinde binlerce kişiye ulaşabilirsiniz. 
            Özellikle toplantılar, konferanslar ve eğitim materyalleri için QR kod tabanlı dosya paylaşımı, kağıt israfını önlerken erişim hızını maksimuma çıkarır.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Dijital Dökümantasyon Rehberi</h3>
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Dijital dönüşüm çağında dokümantasyon süreçleri de evriliyor. QR kod teknolojisi ile:
          </p>
          <ul className="text-gray-400 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <span className="text-blue-400 text-xs">✓</span>
              </div>
              <span>Toplu dosya dağıtımını otomatikleştirin</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                <span className="text-purple-400 text-xs">✓</span>
              </div>
              <span>Kağıt maliyetlerinden tasarruf edin</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                <span className="text-cyan-400 text-xs">✓</span>
              </div>
              <span>Gerçek zamanlı içerik güncellemeleri yapın</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mt-0.5">
                <span className="text-pink-400 text-xs">✓</span>
              </div>
              <span>Çevre dostu sürdürülebilir çözümler uygulayın</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">1</span>
              </div>
              <span>İçeriğinizi seçin (resim, video veya belge)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">2</span>
              </div>
              <span>Geçerlilik süresini belirleyin</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">3</span>
              </div>
              <span>QR kod oluşturun</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">4</span>
              </div>
              <span>QR kodu indirin veya paylaşın</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <span className="text-blue-400 text-xs">✓</span>
              </div>
              <span>Hızlı bilgi erişimi</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                <span className="text-purple-400 text-xs">✓</span>
              </div>
              <span>Kolay paylaşım</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                <span className="text-cyan-400 text-xs">✓</span>
              </div>
              <span>Çok yönlü kullanım</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mt-0.5">
                <span className="text-pink-400 text-xs">✓</span>
              </div>
              <span>Mobil uyumlu</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
