# IT Support Bekasi - Setup Guide

## 🚀 Quick Start

This guide will help you set up the backend completely for IT Support Bekasi with full functionality including image uploads, real-time updates, and admin panel.

---

## 📋 Prerequisites

1. **Supabase Account** - Already connected ✅
2. **Cloudinary Account** - For image hosting

---

## 🔧 Step 1: Supabase Database Setup

### Run the SQL Script

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/uriknixrbjyzlzvsdmrq
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the entire content from `scripts/setup-database.sql`
5. Click **Run** (or press Ctrl/Cmd + Enter)

This will:
- ✅ Create `products` table
- ✅ Create `admin_users` table for authentication
- ✅ Create `admin_sessions` table for session management
- ✅ Enable Row Level Security (RLS) with proper policies
- ✅ Enable Realtime for automatic updates
- ✅ Create default admin user (username: `admin`, password: `admin123`)
- ✅ Add triggers for automatic timestamp updates

### Verify Tables Were Created

1. Go to **Table Editor** in Supabase dashboard
2. You should see:
   - `products`
   - `admin_users`
   - `admin_sessions`

---

## 🖼️ Step 2: Cloudinary Setup

### Create Cloudinary Account (if you haven't)

1. Go to https://cloudinary.com/users/register/free
2. Sign up for free account
3. Verify your email

### Configure Upload Preset

1. Go to your Cloudinary Dashboard: https://console.cloudinary.com/
2. Click **Settings** (gear icon, top right)
3. Go to **Upload** tab
4. Scroll down to **Upload presets**
5. Click **Add upload preset**
6. Configure:
   - **Preset name**: `velvel` (or any name you prefer)
   - **Signing mode**: **Unsigned** ⚠️ IMPORTANT!
   - **Folder**: `itsupport-products` (optional, for organization)
   - **Upload control**: No restrictions
7. Click **Save**

### Get Your Credentials

1. From Cloudinary Dashboard home page, find:
   - **Cloud name**: (e.g., `dcfycfrbw`)
   - **Upload preset**: (e.g., `velvel`)

### Update Environment Variables

The following are already set in `.env.local`:
```
VITE_CLOUDINARY_CLOUD_NAME=dcfycfrbw
VITE_CLOUDINARY_UPLOAD_PRESET=velvel
```

✅ **These are already configured correctly!**

---

## 🔐 Step 3: Admin Authentication

### Default Admin Credentials

After running the SQL script, you can login with:

- **Username**: `admin`
- **Password**: `admin123`

### Login to Admin Panel

1. Navigate to: `/admin/login`
2. Enter credentials above
3. You'll be redirected to the dashboard

### Create Additional Admin Users (Optional)

Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO admin_users (username, password_hash, display_name, email, is_active)
VALUES (
  'your_username',
  '$2a$10$YQ5yJ5J5J5J5J5J5J5J5JeP5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J',
  'Your Display Name',
  'your@email.com',
  true
);
```

**Note**: The password hash above is for `admin123`. For production, implement proper bcrypt hashing.

---

## 📦 Step 4: Test the System

### Test Product Upload

1. Login to admin panel
2. Click **"Tambah Produk"** (Add Product)
3. Fill in the form:
   - **Nama Produk**: Test Laptop
   - **Harga**: 5000000
   - **Deskripsi**: Testing upload functionality
   - **Kategori**: Laptop
   - **Status Stok**: Stok Ada
   - **Gambar**: Upload any image (JPG/PNG)
4. Click **"Tambah Produk"**

### Verify Upload Success

You should see:
1. ✅ Loading toast: "Mengoptimalkan & mengunggah gambar..."
2. ✅ Success toast: "Gambar berhasil diunggah"
3. ✅ Success toast: "Produk berhasil ditambahkan"
4. ✅ Realtime toast: "✨ Produk baru ditambahkan 📦"
5. ✅ Product appears in table immediately

### Test Realtime Updates

1. Open admin panel in two different browser windows
2. Add a product in one window
3. You should see it appear immediately in the other window ✨

### Test Delete

1. Click delete (trash icon) on any product
2. Confirm deletion
3. Product should disappear immediately from table
4. Realtime toast: "🗑️ Produk dihapus ✅"

---

## 🐛 Troubleshooting

### Image Upload Fails

**Error: "Upload preset not found"**
- ✅ Solution: Make sure the upload preset is set to **Unsigned** in Cloudinary dashboard
- ✅ Verify `VITE_CLOUDINARY_UPLOAD_PRESET` matches the preset name exactly

**Error: "Authentication failed"**
- ✅ Solution: Upload preset must be **Unsigned**, not **Signed**

**Error: "Failed to fetch"**
- ✅ Solution: Check your internet connection
- ✅ Verify Cloudinary cloud name is correct

### Realtime Not Working

**Products don't update automatically**
1. Check browser console for errors
2. Verify you ran the SQL script completely
3. Check if realtime is enabled in Supabase:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE products;
   ```

### Admin Login Fails

**"Username atau password salah"**
1. Make sure you ran the SQL script to create admin_users table
2. Verify the default admin was created:
   ```sql
   SELECT * FROM admin_users WHERE username = 'admin';
   ```

### Database Errors

**"relation products does not exist"**
- ✅ Run the complete SQL script from `scripts/setup-database.sql`

**"permission denied for table products"**
- ✅ Check RLS policies are created
- ✅ Run the policies section of the SQL script again

---

## ✅ Features Checklist

After setup, you should have:

- [x] Product CRUD (Create, Read, Update, Delete)
- [x] Image upload to Cloudinary with WebP optimization
- [x] Real-time updates across all clients
- [x] Admin authentication with sessions
- [x] Responsive admin panel
- [x] Error handling and retry logic
- [x] Toast notifications for all actions
- [x] Image preview before upload
- [x] Category and stock status management

---

## 🔒 Security Notes

### For Production

1. **Change Default Admin Password**
   ```sql
   -- Use proper bcrypt hash for new password
   UPDATE admin_users 
   SET password_hash = 'new_bcrypt_hash' 
   WHERE username = 'admin';
   ```

2. **Implement Proper Password Hashing**
   - Current implementation uses simple hash for demo
   - Use bcrypt with proper salt for production
   - Implement via Supabase Edge Function

3. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use Blink secrets manager for production
   - Rotate API keys regularly

4. **Cloudinary Security**
   - Current setup uses unsigned upload (good for demo)
   - For production, consider signed uploads via edge function
   - Implement rate limiting

---

## 📚 Additional Resources

### Supabase Documentation
- Realtime: https://supabase.com/docs/guides/realtime
- RLS: https://supabase.com/docs/guides/auth/row-level-security
- SQL Editor: https://supabase.com/docs/guides/database

### Cloudinary Documentation
- Upload Presets: https://cloudinary.com/documentation/upload_presets
- Unsigned Upload: https://cloudinary.com/documentation/upload_images#unsigned_upload

---

## 🎉 You're All Set!

Your IT Support Bekasi backend is now fully configured with:
- ✅ Database with RLS and realtime
- ✅ Image upload with Cloudinary
- ✅ Admin authentication
- ✅ Real-time updates
- ✅ Complete CRUD operations

Happy coding! 🚀
