# Muhammad Farhan — Personal Portfolio Website

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)
![Stack](https://img.shields.io/badge/tech-HTML5%20%7C%20CSS3%20%7C%20JS%20%7C%20Node.js-blue.svg)

Website portofolio profesional untuk **Muhammad Farhan** (Sarjana Teknik Informatika — Universitas Pamulang, IPK 3.33) dengan fokus pada **Web Development**, **Information Systems**, dan **IT Infrastructure**.

Dirancang dengan prinsip **Modern — Minimalist — Technical**, layout editorial berdensitas tinggi, tema warna *Forest Green + Lime Accent*, serta pengalaman pengguna responsif di berbagai perangkat.

---

## ✨ Fitur Utama

- **Bilingual Interface**: Tersedia saklar bahasa instan antara **Bahasa Indonesia** dan **English**.
- **Hero & Profil Profesional**: Informasi kualifikasi akademik, almamater, IPK, dan spesifikasi bidang keahlian.
- **Kategori Keahlian Terstruktur**: Pengelompokan kompetensi teknis (Web Development, Database, IT Infrastructure, Core Skills) tanpa progress bar artifisial.
- **Studi Kasus Proyek Unggulan**: Dokumentasi teknis mendalam mengenai perancangan **Sistem Pendukung Keputusan (SPK) Penilaian Kinerja Guru SDN Lebak Bulus 04** dengan metode SAW & TOPSIS, arsitektur database relasional, autentikasi multi-peran, dan visualisasi alur komputasi keputusan.
- **Pengalaman Kerja & Pendidikan**: Riwayat profesional operasional (Lalamove, Classicalita) serta kualifikasi akademik dan sertifikasi kompetensi kejuruan (LSP BNSP Network Administrator, TOEFL Prediction).
- **Saluran Kontak Interaktif**: Formulir kontak terintegrasi serta tombol akses instan ke Email, WhatsApp, LinkedIn, dan unduhan CV PDF.
- **Dual-Mode Backend & Static**: Siap langsung di-host di GitHub Pages (statis) atau dijalankan fullstack dengan REST API Node.js / Express.

---

## 📂 Struktur Proyek

```text
Portofolio/
├── index.html                    # Berkas utama portofolio (Root untuk GitHub Pages)
├── css/
│   └── style.css                 # Sistem desain (Dark Green + Lime, editorial grid)
├── js/
│   ├── data.js                   # Basis data teks dan data profil bilingual (ID/EN)
│   └── main.js                   # Logika interaktif, modal studi kasus, dan formulir
├── assets/
│   └── docs/
│       └── CV_Muhammad_Farhan.pdf # Berkas PDF CV resmi siap diunduh
├── backend/                      # Modul REST API Backend (Node.js & Express)
│   ├── package.json              # Dependensi server
│   ├── server.js                 # Endpoint REST API (/api/health, /api/profile, /api/contact)
│   ├── .env.example              # Template variabel lingkungan
│   └── logs/                     # Log penyimpanan pesan formulir masuk
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD otomatis untuk deployment ke GitHub Pages
├── .gitignore                    # Pengabaian file build, cache, dan node_modules
├── DEPLOY_GUIDE.md               # Panduan lengkap menghubungkan ke GitHub & Online di GitHub Pages
└── README.md                     # Dokumentasi proyek
```

---

## 🚀 Panduan Memulai Cepat

### 1. Menjalankan Frontend Langsung (Tanpa Node.js)
Cukup buka file `index.html` langsung di browser favorit Anda (Google Chrome, Firefox, Edge), atau gunakan ekstensi *Live Server* di Visual Studio Code.

### 2. Menjalankan Fullstack (Frontend + Backend REST API)
Pastikan Node.js sudah terpasang di komputer Anda:

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Pasang dependensi (jika belum)
npm install

# 3. Jalankan server
npm start
```
Buka browser pada alamat:
`http://localhost:5000`

Endpoint REST API yang tersedia:
- `GET  /api/health` — Status kesehatan server
- `GET  /api/profile` — Data profil dan keahlian (`?lang=id` atau `?lang=en`)
- `GET  /api/projects` — Data studi kasus proyek
- `POST /api/contact` — Menerima pengiriman pesan dari formulir kontak

---

## 🌐 Cara Mengonlinekan ke GitHub Pages

Panduan lengkap, langkah demi langkah dengan ilustrasi dan perintah terminal, tersedia di berkas:
👉 **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)**

Ringkasan langkah cepat:
1. Buat repositori baru di GitHub (disarankan nama: `<username>.github.io`).
2. Jalankan di terminal:
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<nama-repo>.git
   git push -u origin main
   ```
3. Di GitHub, buka **Settings** > **Pages** > pilih Source **GitHub Actions** (atau **Deploy from a branch** > `main`).
4. Website portofolio Anda langsung online dan aktif secara global!

---

## 👤 Kontak Pemilik Portofolio

**Muhammad Farhan**  
- 🎓 Sarjana Teknik Informatika — Universitas Pamulang
- 📧 Email: [farhn.mhmmad@gmail.com](mailto:farhn.mhmmad@gmail.com)
- 📱 WhatsApp: [+62 895-3312-84320](https://wa.me/62895331284320)
- 📍 Lokasi: Pamulang, Tangerang Selatan, Banten
- 💼 LinkedIn: [linkedin.com/in/muhammad-farhan](https://www.linkedin.com/in/muhammad-farhan)
