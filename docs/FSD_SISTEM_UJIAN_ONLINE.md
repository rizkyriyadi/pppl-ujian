# Functional Specification Document (FSD)

## Sistem Ujian Online - SDN TUGU 1

---

## Daftar Isi

1. [Version Control](#version-control)
2. [Proses Tingkat Tinggi](#1-proses-tingkat-tinggi)
3. [Spesifikasi Teknis](#2-spesifikasi-teknis)
4. [Desain dan Struktur Database](#3-desain-dan-struktur-database)
5. [Fitur-Fitur Sistem](#4-fitur-fitur-sistem)
6. [Tanda Tangan](#tanda-tangan)

---

## Version Control

| Versi | Tanggal | Penulis | Email | Changelog |
|-------|---------|---------|-------|-----------|
| 1.0 | 2024-01-15 | Tim Developer | dev@sdntugu1.sch.id | Dokumen awal FSD Sistem Ujian Online |
| 1.1 | 2024-01-20 | Tim Developer | dev@sdntugu1.sch.id | Penambahan spesifikasi teknis dan database |

---

## 1. Proses Tingkat Tinggi

### Alur Proses Sistem Ujian Online:

1. **Login Siswa:**
   - Siswa memasukkan NISN sebagai kredensial login
   - Sistem memverifikasi NISN melalui Firebase Authentication
   - Jika valid, siswa diarahkan ke dashboard

2. **Dashboard Ujian:**
   - Sistem menampilkan daftar ujian yang tersedia dan aktif
   - Siswa dapat melihat detail ujian (mata pelajaran, durasi, jumlah soal)
   - Siswa memilih ujian yang akan dikerjakan

3. **Pelaksanaan Ujian:**
   - Sistem memuat soal-soal ujian dari database Firestore
   - Timer otomatis dimulai sesuai durasi ujian
   - Siswa menjawab soal satu per satu
   - Jawaban disimpan secara real-time ke database

4. **Penyelesaian Ujian:**
   - Ujian berakhir otomatis ketika waktu habis atau siswa submit manual
   - Sistem melakukan penilaian otomatis berdasarkan kunci jawaban
   - Hasil ujian disimpan dalam koleksi examAttempts

5. **Hasil dan Riwayat:**
   - Siswa dapat melihat hasil ujian dan riwayat ujian sebelumnya
   - Sistem menampilkan skor, status kelulusan, dan detail jawaban

### Diagram Alur Proses:

```
[Siswa] → [Login NISN] → [Verifikasi] → [Dashboard]
                                           ↓
[Hasil] ← [Penilaian] ← [Submit] ← [Pelaksanaan Ujian]
   ↓
[Riwayat Ujian]
```

---

## 2. Spesifikasi Teknis

### 2.1 Spesifikasi Mesin

**Minimum Requirements:**
- **CPU:** Intel Core i3 atau AMD Ryzen 3
- **RAM:** 4GB DDR4
- **Storage:** 10GB ruang kosong
- **Network:** Koneksi internet stabil (min. 1 Mbps)
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+

**Recommended Requirements:**
- **CPU:** Intel Core i5 atau AMD Ryzen 5
- **RAM:** 8GB DDR4
- **Storage:** 20GB ruang kosong (SSD preferred)
- **Network:** Koneksi internet stabil (min. 5 Mbps)

### 2.2 Diagram Arsitektur Sistem

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Web    │    │   Next.js App   │    │   Firebase      │
│   Browser       │◄──►│   (Frontend)    │◄──►│   Backend       │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Vercel        │    │   Firestore     │
                       │   Hosting       │    │   Database      │
                       │                 │    │                 │
                       └─────────────────┘    └─────────────────┘
```

---

## 3. Desain dan Struktur Database

### 3.1 Desain Database

Sistem menggunakan Firebase Firestore sebagai database NoSQL dengan struktur koleksi sebagai berikut:

```
Firestore Database
├── users (collection)
├── exams (collection)
├── questions (collection)
└── examAttempts (collection)
```

### 3.2 Struktur Tabel

#### Koleksi: users

| Field Name | Key | Type | Length | Allow Nulls | Default Value | Remark |
|------------|-----|------|--------|-------------|---------------|---------|
| id | PK | string | - | No | auto-generated | Document ID |
| name | - | string | 100 | No | - | Nama lengkap siswa |
| nisn | - | string | 10 | No | - | Nomor Induk Siswa Nasional |
| email | - | string | 100 | No | - | Email (format: nisn@sdntugu1.sch.id) |
| class | - | string | 10 | No | - | Kelas siswa |
| role | - | string | 20 | No | "student" | Role pengguna |
| createdAt | - | timestamp | - | No | server timestamp | Waktu pembuatan |
| updatedAt | - | timestamp | - | Yes | null | Waktu update terakhir |

#### Koleksi: exams

| Field Name | Key | Type | Length | Allow Nulls | Default Value | Remark |
|------------|-----|------|--------|-------------|---------------|---------|
| id | PK | string | - | No | auto-generated | Document ID |
| title | - | string | 200 | No | - | Judul ujian |
| description | - | string | 500 | Yes | - | Deskripsi ujian |
| subject | - | string | 50 | No | - | Mata pelajaran |
| grade | - | string | 10 | No | - | Tingkat kelas |
| duration | - | number | - | No | - | Durasi dalam menit |
| totalQuestions | - | number | - | No | - | Total jumlah soal |
| passingScore | - | number | - | No | - | Nilai minimum kelulusan |
| isActive | - | boolean | - | No | true | Status aktif ujian |
| createdBy | - | string | - | No | - | ID pembuat ujian |
| createdAt | - | timestamp | - | No | server timestamp | Waktu pembuatan |
| scheduledDate | - | timestamp | - | Yes | null | Jadwal ujian |

#### Koleksi: questions

| Field Name | Key | Type | Length | Allow Nulls | Default Value | Remark |
|------------|-----|------|--------|-------------|---------------|---------|
| id | PK | string | - | No | auto-generated | Document ID |
| examId | FK | string | - | No | - | Reference ke exam |
| questionText | - | string | 1000 | No | - | Teks soal |
| questionNumber | - | number | - | No | - | Nomor urut soal |
| options | - | array | - | No | - | Array pilihan jawaban |
| correctAnswer | - | string | 5 | No | - | Kunci jawaban benar |
| subject | - | string | 50 | No | - | Mata pelajaran |
| difficulty | - | string | 20 | Yes | "medium" | Tingkat kesulitan |
| explanation | - | string | 500 | Yes | - | Penjelasan jawaban |
| imageUrl | - | string | 200 | Yes | - | URL gambar soal |

#### Koleksi: examAttempts

| Field Name | Key | Type | Length | Allow Nulls | Default Value | Remark |
|------------|-----|------|--------|-------------|---------------|---------|
| id | PK | string | - | No | auto-generated | Document ID |
| examId | FK | string | - | No | - | Reference ke exam |
| userId | FK | string | - | No | - | Reference ke user |
| examTitle | - | string | 200 | No | - | Judul ujian |
| answers | - | map | - | No | - | Map jawaban siswa |
| score | - | number | - | No | - | Skor yang diperoleh |
| totalQuestions | - | number | - | No | - | Total soal |
| correctAnswers | - | number | - | No | - | Jumlah jawaban benar |
| isPassed | - | boolean | - | No | - | Status kelulusan |
| startTime | - | timestamp | - | No | server timestamp | Waktu mulai ujian |
| endTime | - | timestamp | - | Yes | null | Waktu selesai ujian |
| submittedAt | - | timestamp | - | No | server timestamp | Waktu submit |

---

## 4. Fitur-Fitur Sistem

### Modul Autentikasi

| Fitur | Deskripsi |
|-------|-----------|
| Login NISN | Sistem login menggunakan NISN sebagai kredensial utama |
| Verifikasi Email | Validasi format email otomatis (nisn@sdntugu1.sch.id) |
| Session Management | Pengelolaan sesi pengguna dengan Firebase Auth |
| Auto Logout | Logout otomatis setelah periode tidak aktif |

### Modul Dashboard

#### 4.1 Dashboard Siswa

##### 4.1.1 Aturan Bisnis

**Deskripsi:**
- Menu hanya dapat diakses oleh siswa yang sudah terautentikasi
- Menampilkan daftar ujian yang aktif dan sesuai dengan kelas siswa
- Siswa tidak dapat mengakses ujian yang sudah berakhir atau belum dimulai

##### 4.1.2 Antarmuka Pengguna

```
┌─────────────────────────────────────────────────────────┐
│                    Dashboard Siswa                      │
├─────────────────────────────────────────────────────────┤
│ Selamat datang, [Nama Siswa] - Kelas [Kelas]          │
│                                                         │
│ Ujian Tersedia:                                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Matematika - Kelas 6                               │ │
│ │ Durasi: 60 menit | Soal: 20 | Passing: 70         │ │
│ │ [Mulai Ujian]                                      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [Lihat Riwayat] [Logout]                              │
└─────────────────────────────────────────────────────────┘
```

##### 4.1.3 Kontrol Aksi

| Nama | Tipe | Event | Deskripsi |
|------|------|-------|-----------|
| Mulai Ujian | Button | OnClick | Memulai ujian dan redirect ke halaman ujian |
| Lihat Riwayat | Button | OnClick | Menampilkan riwayat ujian siswa |
| Logout | Button | OnClick | Keluar dari sistem dan kembali ke halaman login |

### Modul Ujian

#### 4.2 Pelaksanaan Ujian

##### 4.2.1 Aturan Bisnis

**Deskripsi:**
- Ujian hanya dapat diakses dalam waktu yang telah ditentukan
- Timer berjalan otomatis dan tidak dapat dihentikan
- Jawaban tersimpan otomatis setiap kali siswa memilih opsi
- Ujian berakhir otomatis ketika waktu habis
- Siswa tidak dapat mengakses ujian yang sama lebih dari sekali

##### 4.2.2 Antarmuka Pengguna

```
┌─────────────────────────────────────────────────────────┐
│ Matematika - Kelas 6          Waktu: 45:30            │
├─────────────────────────────────────────────────────────┤
│ Soal 1 dari 20                                         │
│                                                         │
│ Berapakah hasil dari 15 + 27?                         │
│                                                         │
│ ○ A. 40                                                │
│ ● B. 42                                                │
│ ○ C. 44                                                │
│ ○ D. 46                                                │
│                                                         │
│ [← Sebelumnya] [Selanjutnya →] [Selesai Ujian]        │
└─────────────────────────────────────────────────────────┘
```

##### 4.2.3 Kontrol Aksi

| Nama | Tipe | Event | Deskripsi |
|------|------|-------|-----------|
| Pilihan Jawaban | Radio Button | OnChange | Menyimpan jawaban siswa secara otomatis |
| Sebelumnya | Button | OnClick | Navigasi ke soal sebelumnya |
| Selanjutnya | Button | OnClick | Navigasi ke soal selanjutnya |
| Selesai Ujian | Button | OnClick | Submit ujian dan tampilkan hasil |

### Modul Hasil

#### 4.3 Hasil Ujian

##### 4.3.1 Aturan Bisnis

**Deskripsi:**
- Hasil ujian ditampilkan segera setelah submit
- Skor dihitung berdasarkan jumlah jawaban benar
- Status kelulusan ditentukan berdasarkan passing score
- Siswa dapat melihat detail jawaban benar dan salah

##### 4.3.2 Antarmuka Pengguna

```
┌─────────────────────────────────────────────────────────┐
│                    Hasil Ujian                         │
├─────────────────────────────────────────────────────────┤
│ Matematika - Kelas 6                                   │
│                                                         │
│ Skor Anda: 85/100                                     │
│ Jawaban Benar: 17/20                                  │
│ Status: LULUS ✓                                        │
│                                                         │
│ Waktu Pengerjaan: 45 menit 30 detik                   │
│ Tanggal: 15 Januari 2024, 10:30 WIB                   │
│                                                         │
│ [Lihat Detail] [Kembali ke Dashboard]                  │
└─────────────────────────────────────────────────────────┘
```

### Modul Riwayat

#### 4.4 Riwayat Ujian

##### 4.4.1 Aturan Bisnis

**Deskripsi:**
- Menampilkan semua ujian yang pernah dikerjakan siswa
- Data diurutkan berdasarkan tanggal terbaru
- Siswa dapat melihat detail hasil ujian sebelumnya

---

## Tanda Tangan

**Klien:**

SDN TUGU 1
Kepala Sekolah

_________________________
Nama: Drs. Ahmad Suryadi, M.Pd
Tanggal: _______________

**Developer:**

Tim Pengembang Sistem
PT. Teknologi Pendidikan Indonesia

_________________________
Nama: Lead Developer
Tanggal: _______________