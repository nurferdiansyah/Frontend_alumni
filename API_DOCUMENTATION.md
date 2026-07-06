# Dokumentasi API Backend UNUHA

Dokumentasi ini memberikan informasi lengkap tentang _endpoint_ API yang tersedia di backend, metode yang digunakan, serta format _request_ dan _response_. Backend dibangun menggunakan **Laravel** dan menggunakan **Sanctum** untuk autentikasi berbasis token.

---

## 🔗 Konfigurasi Dasar

- **Base URL**: `http://localhost:8000/api` (sesuaikan dengan domain/port server backend Anda)
- **Header Autentikasi**: Untuk semua *Protected Routes*, Anda wajib menyertakan token di header HTTP:
  ```http
  Authorization: Bearer <access_token>
  Accept: application/json
  ```
  *(Catatan: Pastikan `Accept: application/json` selalu dikirimkan agar error validasi dikembalikan dalam format JSON, bukan redirect).*

---

## 🚪 1. Public Routes (Tanpa Login)

### 1.1 Autentikasi (Register & Login)

**A. Register Alumni**
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body** (JSON/Form-Data):
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@email.com",
    "password": "password123",
    "password_confirmation": "password123",
    "id_prodi": 1,
    "nim": "12345678",
    "nama_lengkap": "John Doe",
    "angkatan": "2020",
    "nomor_telepon": "08123456789", // Opsional
    "alamat": "Jl. Contoh Alamat"    // Opsional
  }
  ```
- **Response Success (201)**: Mengembalikan `access_token` yang dapat langsung digunakan untuk login.

**B. Login**
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "login": "johndoe", // Bisa menggunakan email atau username
    "password": "password123"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "message": "Login berhasil",
    "access_token": "1|abcdefghijklmnopqrstuvwxyz...",
    "token_type": "Bearer",
    "role": "alumni" // atau "admin"
  }
  ```

### 1.2 Informasi Umum Kampus

Semua endpoint di bawah ini menggunakan metode **GET** dan dapat diakses tanpa token.

- **Daftar Lowongan Pekerjaan**: `/jobs`
- **Detail Lowongan Pekerjaan**: `/jobs/{id}`
- **Daftar Berita**: `/news`
- **Detail Berita**: `/news/{id}`
- **Informasi Kampus**: `/info`
- **Pengaturan Web (Web Settings)**: `/web-settings`

---

## 🛡️ 2. Protected Routes (Wajib Login)

Semua endpoint di bawah ini membutuhkan header `Authorization: Bearer <access_token>`.

### 2.1 Global (Semua Role)

**A. Logout**
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Response Success**: `{"message": "Logout berhasil"}`

---

### 2.2 Alumni Routes (Role: `alumni`)
*Wajib memiliki role `alumni`.*

**A. Lihat Profil Dasar**
- **URL**: `/alumni/profile`
- **Method**: `GET`
- **Response**: Mengembalikan data profil alumni beserta relasi Prodi dan Fakultas.

**B. Update Profil Dasar**
- **URL**: `/alumni/profile`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "id_prodi": 2,
    "nim": "12345678",
    "nama_lengkap": "John Doe",
    "angkatan": "2020",
    "nomor_telepon": "08111222333",
    "alamat": "Jl. Baru No 123"
  }
  ```

**C. Mengisi Tracer Study**
- **URL**: `/alumni/tracer-study`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "job_status": "Bekerja", // Contoh: "Bekerja", "Mencari Kerja", "Studi Lanjut"
    "job_title": "Software Engineer", // Wajib jika status Bekerja
    "company": "PT Teknologi Terdepan", // Wajib jika status Bekerja
    "city": "Jakarta"
  }
  ```

**D. Request / Generate Surat Pengantar Ijazah**
- **URL**: `/alumni/surat-ijazah/generate`
- **Method**: `POST`

**E. Riwayat Surat Ijazah Saya**
- **URL**: `/alumni/surat-ijazah`
- **Method**: `GET`

---

### 2.3 Admin Routes (Role: `admin`)
*Wajib memiliki role `admin`.*

**A. Master Data (Fakultas & Prodi)**
- **Get Fakultas**: `GET /admin/fakultas`
- **Tambah Fakultas**: `POST /admin/fakultas` (Body: `{"nama_fakultas": "..."}`)
- **Hapus Fakultas**: `DELETE /admin/fakultas/{id}`
- **Get Prodi**: `GET /admin/prodi`
- **Tambah Prodi**: `POST /admin/prodi` (Body: `{"id_fakultas": 1, "nama_prodi": "..."}`)
- **Hapus Prodi**: `DELETE /admin/prodi/{id}`

**B. Mengelola Data Alumni**
- **Lihat Semua Alumni**: `GET /admin/alumni`

**C. Mengelola Lowongan Pekerjaan (Bursa Kerja)**
- **Tambah**: `POST /admin/jobs`
- **Update**: `PUT /admin/jobs/{id}`
- **Hapus**: `DELETE /admin/jobs/{id}`

**D. Mengelola Info Kampus & Berita**
- **Tambah Info**: `POST /admin/info`
- **Update Info**: `PUT /admin/info/{id}`
- **Hapus Info**: `DELETE /admin/info/{id}`
- **Tambah Berita**: `POST /admin/news`
- **Update Berita**: `PUT /admin/news/{id}`
- **Hapus Berita**: `DELETE /admin/news/{id}`

**E. Pengaturan Website**
- **Update Web Settings**: `PUT /admin/web-settings`

**F. Tanda Tangan Digital**
- **Upload TTD**: `POST /admin/ttd` (Gunakan `multipart/form-data` dengan field file)
- **Lihat TTD Saya**: `GET /admin/ttd`

---

## 📌 Catatan untuk Frontend Developer

1. **Handling Error 401 (Unauthorized)**: Jika API mengembalikan status 401, artinya token tidak valid, kedaluwarsa, atau tidak dikirim. Anda harus mengarahkan user kembali ke halaman **Login**.
2. **Handling Error 403 (Forbidden)**: Jika API mengembalikan status 403, artinya user mencoba mengakses _endpoint_ yang bukan miliknya (misal: Alumni mencoba mengakses _route_ Admin). Tampilkan pesan bahwa akses ditolak.
3. **Handling Error 422 (Unprocessable Entity)**: Error ini muncul saat validasi form gagal (misalnya email sudah terdaftar, atau field wajib kosong). Laravel akan mereturn JSON berisi detail _error_ di field `errors`. Anda dapat me-loop `errors` tersebut untuk ditampilkan di UI.
