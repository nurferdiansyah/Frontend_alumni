# Prompt: Landing Page "UNUHA Alumni" (Portal Karir & Alumni Kampus)

Buatkan landing page frontend untuk portal "UNUHA Alumni" — pusat pengembangan karir dan alumni kampus, dengan struktur dan gaya desain berikut.

---

## 🎨 Design System

**Tema:** Modern, clean, institusional/kampus, dengan aksen hijau tua (dark green) sebagai warna khas almamater.

**Palet Warna:**
- Primary: Dark Green `#0F4C3A` (hijau tua pekat) — untuk navbar, hero background, section CTA, stats bar
- Accent: Mint / Light Green `#7FE0B0` (hijau muda cerah) — untuk button utama, highlight text, icon accent
- Background: White `#FFFFFF` & Light Gray `#F7F8FA` — untuk section selang-seling
- Text: Dark Gray/Black untuk heading, Gray `#6B7280` untuk deskripsi/subteks
- Card Background: White dengan border tipis / shadow halus

**Typography:**
- Font: Sans-serif modern (contoh: Inter / Poppins)
- Heading Hero: Bold, besar (32–40px), dua warna (putih untuk baris pertama, hijau mint untuk baris kedua)
- Heading Section: Bold, center-aligned, ukuran medium (24–28px)
- Body text: Regular, 14–16px, warna abu-abu

**Layout:** Container max-width ~1200px, rounded corners (`rounded-xl`) di semua card, spacing antar section cukup lega (padding vertikal besar).

---

## 🧩 Struktur Section (urut dari atas ke bawah)

### 1. Navbar
- Logo "UNUHA Alumni" (kiri) dengan icon kecil
- Menu tengah: Home, Jobs, Campus Info
- Kanan: Link "Login" + Button "Register" (hijau tua, rounded)
- Background putih, sticky, border bottom tipis

### 2. Hero Section
- Background hijau tua penuh (dark green)
- Layout 2 kolom (kiri teks, kanan gambar)
- Badge kecil di atas: "RESMI: CAREER CENTER UNUHA" (pill/badge outline)
- Headline besar 2 baris: "Membangun Karir," (putih) + "Menghubungkan Alumni." (hijau mint)
- Deskripsi singkat di bawah headline (2–3 baris, warna abu terang)
- 2 Button: "Eksplorasi Karir" (filled hijau mint) & "Tentang Kami" (outline putih)
- Gambar kanan: foto wisudawan dengan toga, dengan gedung kampus sebagai background, rounded corner besar

### 3. Section "Informasi Kampus"
- Heading center + subheading deskriptif
- Grid 3 kolom kartu kecil di baris atas:
  - Card 1 (lebih besar/lebar): "Profil Singkat UNUHA" + deskripsi + gambar foto gedung kampus di bawahnya
  - Card 2: "Kegiatan Akademik" + icon
  - Card 3: "Prestasi" + icon
- Card besar hijau tua di bawah/sebelah: "Informasi Penting" dengan icon info, deskripsi, button "Lihat Selengkapnya" (mint)

### 4. Section "Informasi Karir"
- Heading kiri + link "Semua Program Karir →" di kanan atas
- Grid 4 kartu (icon + judul + checklist 2 poin):
  1. Pengembangan Karir (icon ungu) — Konseling 1-on-1, Review CV & Portofolio
  2. Program Magang (icon hijau) — Magang BUMN, Magang Startup
  3. Pelatihan & Kursus (icon biru) — Sertifikasi IT, Public Speaking
  4. Info Pendukung (icon ungu) — Template ATS CV, Bank Soal Tes
- Background section: putih/abu muda

### 5. Section "Berita Kampus"
- Heading center dengan underline aksen
- Grid 3 card berita (card image + badge kategori di atas gambar: "Akademik/Karir/Prestasi")
  - Gambar berita di atas
  - Tanggal kecil
  - Judul berita (bold, 2 baris)
  - Link "Baca Selengkapnya →"

### 6. Stats Bar
- Full width background hijau tua
- 3 kolom dengan icon + angka besar + label:
  - 12.450+ Total Alumni
  - 8 Total Fakultas
  - 156 Lowongan Aktif

### 7. Section "Lowongan Kerja Terbaru"
- Heading kiri + button "Filter" outline & "Cari Kerja" (filled hijau tua) di kanan
- List horizontal card (3 item), tiap card:
  - Icon/logo perusahaan kotak kecil
  - Nama posisi (bold) + nama perusahaan
  - Lokasi (dengan icon pin) + deadline (dengan icon kalender, warna merah/oranye)
  - Button "Lamar Sekarang" (hijau tua, kanan)
- Border antar item / card terpisah dengan shadow tipis

### 8. CTA Banner
- Background hijau tua, rounded besar, full width dalam container
- Teks kiri: "Belum terdaftar di Portal Alumni?" (bold besar) + deskripsi
- Button kanan: "Daftar Sekarang" (hijau mint, rounded, cukup besar)

### 9. Footer
- Background abu muda
- 3 kolom:
  - Kolom 1: Logo + deskripsi singkat + icon sosial media (bulat)
  - Kolom 2: "Tautan Cepat" (Lowongan Kerja, Info Kampus, Data Alumni, Pelacakan Lulusan)
  - Kolom 3: "Kontak Kami" (alamat, email, telepon)
- Bottom bar: copyright text + link Privacy Policy, Terms of Service, Contact Us

---

## ⚙️ Technical Requirements

- Gunakan **React + TailwindCSS** (atau sesuaikan stack yang dipakai di Antigravity)
- Fully **responsive** (mobile-first), grid berubah jadi 1 kolom di mobile
- Gunakan komponen reusable: `Navbar`, `Hero`, `CardInfo`, `CardCareer`, `CardNews`, `JobListItem`, `CTASection`, `Footer`
- Icon menggunakan library seperti `lucide-react` atau `heroicons`
- Semua card memiliki border-radius konsisten (`rounded-2xl`) dan shadow halus (`shadow-sm` / `shadow-md`)
- Button utama hijau tua/mint dengan hover state (sedikit lebih gelap/terang)