# 📸 Tools Absensi - Jogiia

## 🎯 Deskripsi
Aplikasi web sederhana untuk absensi dengan fitur:
- **Live Geolocation**: Tracking koordinat GPS realtime + alamat lengkap
- **Camera Capture**: Ambil foto dengan tekan SPACE atau klik tombol
- **Auto Download**: Foto otomatis tersimpan ke folder `~/Downloads/`

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
```bash
# Cara 1: Buka langsung dari Finder
# Double-click file: absensi-tool.html

# Cara 2: Buka dari Terminal
open absensi-tool.html

# Cara 3: Buka di browser
# Drag & drop file absensi-tool.html ke browser (Chrome/Safari/Firefox)
```

### 2. Izinkan Akses
Saat pertama kali buka, browser akan minta izin:
- ✅ **Kamera**: Klik "Izinkan" / "Allow"
- ✅ **Lokasi**: Klik "Izinkan" / "Allow"

**PENTING**: Aplikasi harus dibuka via `file://` atau `https://` (bukan `http://`)

### 3. Absen!
1. Tunggu sampai status menjadi "✅ Siap untuk absen!"
2. Pastikan wajah terlihat di kamera
3. Tekan **SPACE** atau klik tombol "Tekan SPACE atau klik untuk Absen"
4. Foto otomatis tersimpan ke `~/Downloads/` dengan format:
   ```
   absensi_2025-11-05_14-30-45.jpg
   ```

## 📋 Informasi yang Tercatat

Setiap foto absensi akan memiliki overlay informasi:
- 📅 **Tanggal & Waktu**: Timestamp lengkap
- 📍 **Koordinat GPS**: Latitude, Longitude, Akurasi (±meter)
- 📍 **Alamat Lengkap**: Dari reverse geocoding (OpenStreetMap)

## 🔧 Teknologi yang Digunakan

### API & Dependencies:
- **HTML5 Geolocation API** - Tracking GPS realtime
- **getUserMedia() API** - Akses webcam
- **Canvas API** - Capture frame video
- **Nominatim (OpenStreetMap)** - Reverse geocoding (GRATIS, no API key)
- **Blob API** - Convert image to file
- **Download attribute** - Auto download ke ~/Downloads/

### Browser Support:
- ✅ Google Chrome 47+ (Recommended)
- ✅ Safari 11+
- ✅ Firefox 36+
- ✅ Edge 12+

**Catatan**: Harus HTTPS atau file:// untuk akses kamera

## 📝 Format Output File

```
Nama File: absensi_YYYY-MM-DD_HH-MM-SS.jpg
Contoh: absensi_2025-11-05_14-30-45.jpg

Lokasi: ~/Downloads/
         atau /Users/[username]/Downloads/
```

## 🎨 Fitur Lengkap

✅ Live video preview (mirror mode)
✅ Realtime GPS tracking
✅ Automatic address lookup
✅ Space bar shortcut
✅ Timestamp overlay pada foto
✅ Location info overlay pada foto
✅ Auto-download ke Downloads folder
✅ Flash effect saat capture
✅ Responsive design
✅ Simple & clean UI

## ⚠️ Troubleshooting

### Kamera tidak muncul?
- Pastikan browser memiliki izin akses kamera
- Cek di Settings > Privacy > Camera
- Tutup aplikasi lain yang menggunakan kamera
- Refresh halaman dan izinkan ulang

### GPS tidak aktif?
- Pastikan Location Services aktif di sistem
- Berikan izin lokasi ke browser
- Tunggu beberapa detik untuk GPS lock
- Pastikan berada di area terbuka (untuk GPS lebih akurat)

### Alamat tidak muncul?
- Pastikan terkoneksi internet
- API Nominatim membutuhkan koneksi internet
- Koordinat tetap akan tercatat meski alamat gagal

### Foto tidak terdownload?
- Cek permission Downloads folder
- Coba browser berbeda (Chrome recommended)
- Pastikan tidak ada popup blocker aktif

## 🔐 Privacy & Security

- ✅ **No Server**: Semua proses berjalan di browser (client-side)
- ✅ **No Data Upload**: Foto hanya tersimpan lokal di Downloads
- ✅ **No Tracking**: Tidak ada pengiriman data ke server
- ✅ **Open Source**: Code bisa diperiksa di file HTML

## 📞 Support

Jika ada masalah, cek:
1. Browser console (F12) untuk error messages
2. Browser compatibility
3. Permission settings

## 📄 License

MIT License - Free to use and modify

---

**Dibuat untuk**: Jogiia Absensi System
**Version**: 1.0.0
**Tech Stack**: Pure HTML/CSS/JavaScript (No Framework)
**Author**: Gos (fafaghaws@live.com)
