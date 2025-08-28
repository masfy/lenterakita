# Struktur Database Lentera Literacy System

## Overview
Sistem Lentera menggunakan Google Spreadsheet sebagai database dengan Google Apps Script sebagai backend API.

## Struktur Tabel (Sheets)

### 1. Sheet: `users`
Menyimpan data pengguna (guru dan siswa untuk login)
\`\`\`
| id | email | password | name | role | phone | address | school | createdAt | updatedAt |
\`\`\`

**Kolom:**
- `id`: ID unik pengguna
- `email`: Email untuk login
- `password`: Password (dalam implementasi nyata, gunakan hash)
- `name`: Nama lengkap
- `role`: 'guru' atau 'siswa'
- `phone`: Nomor telepon
- `address`: Alamat
- `school`: Nama sekolah
- `createdAt`: Tanggal dibuat
- `updatedAt`: Tanggal terakhir diupdate

### 2. Sheet: `classes`
Menyimpan data kelas yang dikelola guru
\`\`\`
| id | name | description | teacherId | teacherName | studentCount | createdAt | updatedAt |
\`\`\`

**Kolom:**
- `id`: ID unik kelas
- `name`: Nama kelas (contoh: "5A", "6B")
- `description`: Deskripsi kelas
- `teacherId`: ID guru yang mengajar
- `teacherName`: Nama guru
- `studentCount`: Jumlah siswa di kelas
- `createdAt`: Tanggal dibuat
- `updatedAt`: Tanggal terakhir diupdate

### 3. Sheet: `students`
Menyimpan data siswa dalam kelas
\`\`\`
| id | name | email | classId | className | nisn | phone | address | parentName | parentPhone | totalPoints | level | createdAt | updatedAt |
\`\`\`

**Kolom:**
- `id`: ID unik siswa
- `name`: Nama lengkap siswa
- `email`: Email siswa
- `classId`: ID kelas siswa
- `className`: Nama kelas
- `nisn`: Nomor Induk Siswa Nasional
- `phone`: Nomor telepon siswa
- `address`: Alamat siswa
- `parentName`: Nama orang tua
- `parentPhone`: Nomor telepon orang tua
- `totalPoints`: Total poin yang dikumpulkan
- `level`: Level berdasarkan poin
- `createdAt`: Tanggal dibuat
- `updatedAt`: Tanggal terakhir diupdate

### 4. Sheet: `activities`
Menyimpan data aktivitas literasi siswa
\`\`\`
| id | studentId | studentName | classId | className | bookTitle | author | pages | duration | summary | date | status | points | teacherNote | verifiedBy | verifiedAt | createdAt | updatedAt |
\`\`\`

**Kolom:**
- `id`: ID unik aktivitas
- `studentId`: ID siswa yang melakukan aktivitas
- `studentName`: Nama siswa
- `classId`: ID kelas siswa
- `className`: Nama kelas
- `bookTitle`: Judul buku yang dibaca
- `author`: Penulis buku
- `pages`: Jumlah halaman yang dibaca
- `duration`: Durasi membaca (menit)
- `summary`: Ringkasan bacaan
- `date`: Tanggal aktivitas
- `status`: 'pending', 'approved', 'rejected'
- `points`: Poin yang diperoleh
- `teacherNote`: Catatan dari guru
- `verifiedBy`: ID guru yang memverifikasi
- `verifiedAt`: Tanggal verifikasi
- `createdAt`: Tanggal dibuat
- `updatedAt`: Tanggal terakhir diupdate

### 5. Sheet: `settings`
Menyimpan pengaturan sistem
\`\`\`
| key | value | description | updatedAt |
\`\`\`

**Kolom:**
- `key`: Kunci pengaturan
- `value`: Nilai pengaturan
- `description`: Deskripsi pengaturan
- `updatedAt`: Tanggal terakhir diupdate

## API Endpoints

### Authentication
- `POST` - `action: 'login'` - Login pengguna
- `POST` - `action: 'register'` - Registrasi pengguna baru

### User Management
- `POST` - `action: 'getUsers'` - Ambil daftar pengguna
- `POST` - `action: 'updateUser'` - Update data pengguna

### Class Management
- `POST` - `action: 'getClasses'` - Ambil daftar kelas
- `POST` - `action: 'addClass'` - Tambah kelas baru
- `POST` - `action: 'updateClass'` - Update data kelas
- `POST` - `action: 'deleteClass'` - Hapus kelas

### Student Management
- `POST` - `action: 'getStudents'` - Ambil daftar siswa
- `POST` - `action: 'addStudent'` - Tambah siswa baru
- `POST` - `action: 'updateStudent'` - Update data siswa
- `POST` - `action: 'deleteStudent'` - Hapus siswa

### Activity Management
- `POST` - `action: 'getActivities'` - Ambil daftar aktivitas
- `POST` - `action: 'addActivity'` - Tambah aktivitas baru
- `POST` - `action: 'updateActivity'` - Update aktivitas
- `POST` - `action: 'verifyActivity'` - Verifikasi aktivitas oleh guru
- `POST` - `action: 'getActivitiesForVerification'` - Ambil aktivitas untuk verifikasi

### Leaderboard
- `POST` - `action: 'getLeaderboard'` - Ambil data leaderboard

## Cara Setup

1. **Buat Google Spreadsheet baru**
2. **Salin kode Apps Script** ke Google Apps Script Editor
3. **Ganti `SPREADSHEET_ID`** dengan ID spreadsheet Anda
4. **Deploy sebagai Web App** dengan akses untuk semua orang
5. **Jalankan fungsi `initializeDatabase()`** untuk setup awal
6. **Salin URL Web App** untuk digunakan di frontend

## Sistem Poin dan Level

- **Poin**: 1 poin per menit membaca
- **Level**: Setiap 100 poin = naik 1 level
- **Status Aktivitas**:
  - `pending`: Menunggu verifikasi guru
  - `approved`: Disetujui guru (poin ditambahkan)
  - `rejected`: Ditolak guru (tidak dapat poin)

## Keamanan

⚠️ **Penting**: Dalam implementasi production:
- Gunakan hash untuk password (bcrypt)
- Implementasi rate limiting
- Validasi input yang ketat
- Gunakan HTTPS
- Implementasi proper authentication tokens
