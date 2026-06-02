// LuxQr AdSense Configuration
// Bu dosya tüm reklam alanlarının merkezi kontrol noktasıdır
// AdSense onayı alındığında ADS_ENABLED değerini true yapın

export const ADS_ENABLED = false;

// Reklam slotları
export const AD_SLOTS = {
  SOL_DIKEY: 'sol_dikey',
  YAZI_USTU_1: 'yazi_ustu_1',
  YAZI_USTU_2: 'yazi_ustu_2',
  YONLENDIRME_SAYFASI: 'yonlendirme_sayfasi',
} as const;

// Reklam alanı için helper fonksiyon
export function getAdClassName(baseClassName: string = ''): string {
  if (!ADS_ENABLED) {
    return 'hidden';
  }
  return baseClassName;
}

// Mobilde reklam alanı için helper fonksiyon
export function getMobileAdClassName(baseClassName: string = ''): string {
  if (!ADS_ENABLED) {
    return 'hidden md:hidden';
  }
  return baseClassName;
}
