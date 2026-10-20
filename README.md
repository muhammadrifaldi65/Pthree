# Pthree

Seluruh halaman memakai identitas profil komunitas yang konsisten. Foto utama `pthree-kegiatan.jpg` disimpan lokal agar tetap tampil saat host gambar eksternal gagal. Footer mengambil tahun berjalan dari `navigation.js`.

Navbar mobile seluruh halaman menggunakan panel samping dan `navigation.js`: Escape/backdrop menutup menu, fokus tetap dalam panel, posisi scroll dipulihkan, menu ditutup saat viewport mencapai 900px.

Layout mobile menyesuaikan kartu, judul, video, dan teks panjang. Panel dapat digulir pada layar pendek serta mengikuti tinggi viewport dinamis.

Pemeriksaan: buka halaman melalui server HTTP pada viewport < 900px, jalankan `await import('./mobile-check.js')` di DevTools Console. Uji juga resize ke desktop saat menu terbuka. Logo, gambar, video, dan formulir bergantung pada layanan eksternal.