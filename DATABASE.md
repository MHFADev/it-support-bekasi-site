# Database Schema & Configuration

## Products Table

Database produk untuk IT Support Bekasi telah dikonfigurasi dengan benar.

### Struktur Tabel

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  specifications JSONB DEFAULT '[]'::jsonb,
  category TEXT,
  stock_status TEXT DEFAULT 'in_stock',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### RLS Policies (Row Level Security)

Tabel products telah dikonfigurasi dengan RLS policies yang memungkinkan:

- **SELECT**: Akses publik untuk membaca produk (siapa saja dapat melihat)
- **INSERT**: Semua pengguna dapat menambah produk (untuk admin panel)
- **UPDATE**: Semua pengguna dapat mengupdate produk (untuk admin panel)
- **DELETE**: Semua pengguna dapat menghapus produk (untuk admin panel)

### Realtime

Realtime sudah diaktifkan pada tabel products, sehingga:
- Setiap INSERT akan memicu event realtime
- Setiap UPDATE akan memicu event realtime
- Setiap DELETE akan memicu event realtime

Admin panel secara otomatis akan update tampilan tanpa perlu refresh halaman.

## Troubleshooting

Jika upload produk tidak bekerja, periksa:

1. **Koneksi Supabase**: Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY ada di .env.local
2. **Cloudinary**: Pastikan VITE_CLOUDINARY_CLOUD_NAME dan VITE_CLOUDINARY_UPLOAD_PRESET sudah benar
3. **Console Browser**: Buka Developer Tools > Console untuk melihat error
4. **Network Tab**: Periksa request ke Supabase dan Cloudinary

## Status

✅ Database table created
✅ RLS policies configured
✅ Realtime enabled
✅ Insert/Update/Delete tested
✅ Ready for production use
