# 🚀 Panduan Menghubungkan ke GitHub & Online lewat GitHub Pages

Panduan langkah demi langkah ini akan memandu Anda menghubungkan repositori lokal di komputer Anda ke akun **GitHub** pribadi dan mengonlinekannya secara gratis melalui **GitHub Pages**.

---

## 📋 Prasyarat
1. Anda sudah memiliki akun di [GitHub.com](https://github.com/).
2. Git sudah terpasang di komputer Anda (sudah terverifikasi).

---

## Langkah 1: Buat Repositori Baru di GitHub

1. Buka browser dan login ke akun [GitHub](https://github.com/).
2. Klik ikon **+** di pojok kanan atas, lalu pilih **New repository**.
3. Isi informasi repositori:
   - **Repository name**:
     - *Pilihan 1 (Disarankan untuk Portofolio Utama)*: Beri nama `<username-anda>.github.io` (contoh: `farhan.github.io`). Dengan nama ini, alamat website Anda akan menjadi rapi: `https://<username-anda>.github.io/`.
     - *Pilihan 2 (Sebagai sub-proyek)*: Beri nama `Portofolio` atau `personal-portfolio`. Alamat website akan menjadi `https://<username-anda>.github.io/Portofolio/`.
   - **Visibility**: Pilih **Public** (wajib Public agar fitur GitHub Pages gratis dapat aktif).
   - **PENTING**: Biarkan centang *"Add a README file"*, *"Add .gitignore"*, dan *"Choose a license"* **KOSONG / TIDAK DICENTANG** karena berkas-berkas tersebut sudah dibuat di komputer lokal Anda.
4. Klik tombol **Create repository**.

---

## Langkah 2: Hubungkan Repositori Lokal ke GitHub & Push

Buka terminal di folder proyek ini (`c:\Users\frhna\Documents\VsCode\Portofolio`) atau gunakan terminal di VS Code, lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Pastikan semua file terbaru sudah ditambahkan ke git lokal
git add .

# 2. Buat commit pertama
git commit -m "feat: inisialisasi website portofolio frontend dan backend Muhammad Farhan"

# 3. Ubah nama branch utama menjadi main
git branch -M main

# 4. Hubungkan repositori lokal ke GitHub Anda (GANTI URL DI BAWAH dengan URL repository Anda!)
git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPOSITORY.git

# 5. Push kode ke GitHub
git push -u origin main
```

*(Catatan: Saat menjalankan `git push`, browser atau jendela Git Credential Manager akan meminta Anda login/mengotorisasi akun GitHub).*

---

## Langkah 3: Mengaktifkan GitHub Pages (Website Online)

Setelah kode berhasil ter-push ke GitHub:

1. Di halaman repositori GitHub Anda, klik tab **Settings** (ikon gerigi di menu atas).
2. Pada menu sidebar sebelah kiri, klik **Pages** (di bawah kategori *Code and automation*).
3. Pada bagian **Build and deployment** -> **Source**:
   
   ### Opsi A (Otomatis via GitHub Actions - Paling Direkomendasikan):
   - Pada dropdown **Source**, pilih **GitHub Actions**.
   - Sistem akan otomatis mendeteksi file `.github/workflows/deploy.yml` yang sudah kami sediakan.
   - Buka tab **Actions** di repo Anda untuk melihat status build (hanya butuh waktu ~30 detik).

   ### Opsi B (Metode Standar Branch):
   - Pada dropdown **Source**, pilih **Deploy from a branch**.
   - Pada dropdown **Branch**, pilih **main** dan biarkan foldernya **/(root)**.
   - Klik tombol **Save**.

4. Tunggu sekitar 1–2 menit, lalu refresh halaman Settings > Pages tersebut. Anda akan melihat kotak hijau bertuliskan:
   > **"Your site is live at https://USERNAME.github.io/..."**

Klik tautan tersebut untuk membuka website portofolio Anda yang sudah online di seluruh dunia! 🎉

---

## 💡 Penjelasan Tentang Backend & GitHub Pages

- **Bagaimana GitHub Pages Bekerja?**
  GitHub Pages adalah layanan hosting statis berkecepatan tinggi dengan CDN global gratis. Ia melayani `index.html`, CSS, dan JavaScript secara instan.
- **Bagaimana dengan Formulir Kontak?**
  Website sudah dilengkapi sistem pintar:
  1. Jika dijalankan di GitHub Pages (tanpa server backend aktif), form kontak akan secara otomatis membuka aplikasi email Anda dengan parameter tujuan `farhn.mhmmad@gmail.com`, subjek, dan pesan yang sudah terisi rapi.
  2. Selain itu, pengunjung juga dapat langsung mengklik tombol **[Email Me]** atau **[WhatsApp]** untuk terhubung langsung secara real-time.
  3. Jika Anda ingin backend REST API Node.js di folder `backend/` juga online, Anda dapat men-deploy folder `backend/` secara gratis ke platform seperti **Render.com** atau **Railway.app**, lalu menyambungkan URL API-nya ke frontend.

---

## 🛠️ Menjalankan Backend Secara Lokal di Komputer Anda

Jika Anda ingin mencoba backend Express di komputer Anda:
1. Buka terminal di folder backend:
   ```bash
   cd backend
   npm start
   ```
2. Server akan aktif di `http://localhost:5000`
3. Anda dapat membuka `http://localhost:5000` di browser dan mencoba mengirim pesan lewat form untuk melihat pesan langsung masuk ke console terminal dan file `backend/logs/inquiries.json`.

