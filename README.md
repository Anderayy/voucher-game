# NgeGameYukz

Website demo jual beli voucher game dengan tampilan dark navy + lime, animasi interaktif, dan alur SPA multi-screen.

## Cara buka lokal

Project ini sudah memakai Node.js + Express agar kompatibel dengan hosting Node.js seperti Hostinger.

```bash
npm install
npm start
```

Lalu akses `http://localhost:3000/`.

Server akan membuat `data/db.json` otomatis saat pertama kali berjalan. File ini menyimpan user, session, transaksi, dan konfigurasi QRIS lokal.

## QC browser

Jalankan server dulu, lalu di terminal lain:

```bash
npm run qc
```

QC mengecek register/login user, session setelah pindah Topup dan reload, menu admin untuk user biasa, login admin, QRIS checkout, dan popup pembayaran berhasil.

## Akun dan pembayaran

- Register user baru: gunakan email/username dan password minimal 4 karakter.
- Admin default: `admin@ngegameyukz.com` / `1234`.
- Checkout QRIS: order dibuat `PENDING`, modal QRIS SMASIH DIGITAL ditampilkan, lalu tombol `Saya Sudah Bayar` mengubah invoice menjadi `SUCCESS`.
- QRIS merchant: SMASIH DIGITAL, MID `26070100000585`, NMID `ID1026542504703`.

## Deploy Hostinger Node.js

- Install command: `npm install`
- Start command: `npm start`
- Entry point: `server.js`
- Node version: 18 atau lebih baru
- Health check: `/health`

## Deploy AWS EC2

```bash
npm install
npm start
```

Pastikan security group membuka port aplikasi, default `3000`, atau set `PORT=80` jika dijalankan di belakang service/proxy.

## Demo fitur

- Login User: register akun baru melalui form.
- Login Admin: `admin@ngegameyukz.com` dengan password `1234`.
- User: lihat katalog topup, login/register, checkout produk, cek transaksi, leaderboard, kalkulator, dashboard akun, chat CS, dan voucher.
- Admin: dashboard performa, products, transactions, leaderboard, settings, metrik animatif, dan produk terlaris.
