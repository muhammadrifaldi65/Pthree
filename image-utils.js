/**
 * Image URL Utilities - PTHREE
 * 
 * Lewat domain sendiri (/img/...) supaya tidak kena DNS ISP yang salah arah.
 * vercel.json meneruskan /img/* ke ImageKit.
 */

/**
 * Konversi URL ImageKit ke path domain sendiri (/img/...)
 * @param {string} url - URL gambar asli (ImageKit atau lainnya)
 * @param {number} [width] - Lebar gambar yang diinginkan (untuk transformasi ImageKit)
 * @returns {string} URL yang sudah dikonversi
 */
function toLocalImageUrl(url, width) {
  if (!url) return url;
  
  // Hanya proses URL ImageKit
  if (/^https?:\/\/ik\.imagekit\.io\//.test(url)) {
    // Ganti domain ImageKit dengan /img/
    let localUrl = url.replace(/^https?:\/\/ik\.imagekit\.io\/[^/]+\//, '/img/');
    
    // Tambahkan parameter transformasi jika width diberikan
    if (width) {
      localUrl = localUrl + (localUrl.includes('?') ? '&' : '?') + `tr=w-${width},q-80,f-auto`;
    }
    
    return localUrl;
  }
  
  // Untuk non-ImageURL (imgur, etc), kembalikan asli
  return url;
}

/**
 * Konversi semua gambar ImageKit di halaman ke domain sendiri
 * Dipanggil saat DOM ready
 */
function convertAllImageKitUrls() {
  const images = document.querySelectorAll('img[src*="ik.imagekit.io"]');
  images.forEach(img => {
    const originalSrc = img.getAttribute('src');
    const newSrc = toLocalImageUrl(originalSrc);
    if (newSrc !== originalSrc) {
      img.setAttribute('src', newSrc);
    }
  });
  
  // Juga proses background-image yang menggunakan ImageKit
  const elementsWithBg = document.querySelectorAll('[style*="ik.imagekit.io"]');
  elementsWithBg.forEach(el => {
    const style = el.getAttribute('style');
    const newStyle = style.replace(
      /url\(['"]?(https?:\/\/ik\.imagekit\.io\/[^'"]+?)['"]?\)/g,
      (match, url) => `url('${toLocalImageUrl(url)}')`
    );
    if (newStyle !== style) {
      el.setAttribute('style', newStyle);
    }
  });
}

// Auto-run saat DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', convertAllImageKitUrls);
} else {
  convertAllImageKitUrls();
}

// Export untuk penggunaan manual jika perlu
window.toLocalImageUrl = toLocalImageUrl;
window.convertAllImageKitUrls = convertAllImageKitUrls;
