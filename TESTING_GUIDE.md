# Testing Guide - IT Support Bekasi

## 🧪 Complete Testing Checklist

This guide will help you test all backend functionality to ensure everything works 100%.

---

## ✅ Pre-Testing Setup

### 1. Database Setup

- [ ] Run `scripts/setup-database.sql` in Supabase SQL Editor
- [ ] Verify tables exist: `products`, `admin_users`, `admin_sessions`
- [ ] Check realtime is enabled on products table

### 2. Environment Variables

Verify in `.env.local`:
```
VITE_SUPABASE_URL=https://uriknixrbjyzlzvsdmrq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_CLOUDINARY_CLOUD_NAME=dcfycfrbw
VITE_CLOUDINARY_UPLOAD_PRESET=velvel
```

### 3. Cloudinary Upload Preset

- [ ] Login to https://console.cloudinary.com/
- [ ] Go to Settings > Upload > Upload presets
- [ ] Verify preset `velvel` exists and is **Unsigned**

---

## 🔐 Test 1: Admin Authentication

### Test Login Success

1. Navigate to `/admin/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click "Masuk ke Panel Admin"

**Expected Results:**
- ✅ Toast: "Login berhasil!"
- ✅ Redirect to `/admin` dashboard
- ✅ User info displayed in sidebar/header

### Test Login Failure

1. Navigate to `/admin/login`
2. Enter wrong credentials
3. Click "Masuk ke Panel Admin"

**Expected Results:**
- ❌ Toast: "Username atau password salah"
- ❌ Stay on login page

### Test Session Persistence

1. Login successfully
2. Refresh the page
3. Or close tab and reopen

**Expected Results:**
- ✅ Still logged in
- ✅ No redirect to login page
- ✅ Session persists for 7 days

### Test Logout

1. While logged in, click logout button
2. Verify redirect to login page

**Expected Results:**
- ✅ Toast: "Logout successful"
- ✅ Redirect to login page
- ✅ Cannot access `/admin` without login

---

## 📦 Test 2: Product CRUD Operations

### Test 2.1: Create Product (With Image)

1. Login to admin panel
2. Navigate to Products page
3. Click "Tambah Produk"
4. Fill form:
   ```
   Nama Produk: Laptop ASUS ROG Strix
   Harga: 15000000
   Deskripsi: Gaming laptop dengan RTX 3060
   Kategori: Laptop
   Status Stok: Stok Ada
   Gambar: Upload test image (JPG/PNG, < 2MB)
   ```
5. Click "Tambah Produk"

**Expected Console Logs:**
```
=== CLOUDINARY UPLOAD DEBUG ===
Cloud Name: dcfycfrbw
Upload Preset: velvel
Upload attempt 1/3
Response Status: 200
✅ Cloudinary Upload Success: { url: "...", public_id: "..." }
📡 Realtime change detected: { eventType: "INSERT", ... }
```

**Expected Results:**
- ✅ Loading toast: "Mengoptimalkan & mengunggah gambar..."
- ✅ Success toast: "Gambar berhasil diunggah"
- ✅ Success toast: "Produk berhasil ditambahkan"
- ✅ Realtime toast: "✨ Produk baru ditambahkan 📦"
- ✅ Product appears in table immediately
- ✅ Image thumbnail visible
- ✅ Modal closes automatically

**Verify in Supabase:**
1. Go to Table Editor > products
2. Find the new product
3. Verify `image_url` starts with `https://res.cloudinary.com/`
4. Verify `image_public_id` is not null

**Verify in Cloudinary:**
1. Go to Media Library
2. Find the uploaded image in `itsupport-products` folder
3. Verify it's in WebP format

### Test 2.2: Create Product (Without Image)

1. Click "Tambah Produk"
2. Fill form but DON'T upload image
3. Submit

**Expected Results:**
- ✅ Product created successfully
- ✅ No image upload process
- ✅ Product shows placeholder icon in table

### Test 2.3: Read Products (List)

1. Navigate to Products page

**Expected Results:**
- ✅ All products load in table
- ✅ Images display correctly
- ✅ Prices formatted: "Rp 15.000.000"
- ✅ Categories show in badges
- ✅ Stock status shows correctly

### Test 2.4: Update Product (Change Image)

1. Click edit icon on any product
2. Change some fields
3. Upload a NEW image (replace old one)
4. Click "Simpan Perubahan"

**Expected Results:**
- ✅ Old image still in Cloudinary (not deleted)
- ✅ New image uploaded successfully
- ✅ Database updated with new image_url
- ✅ Realtime toast: "✅ Produk diperbarui 📝"
- ✅ Table updates immediately

### Test 2.5: Update Product (Keep Image)

1. Click edit icon
2. Change only text fields (don't upload new image)
3. Click "Simpan Perubahan"

**Expected Results:**
- ✅ Product updated
- ✅ Old image_url unchanged
- ✅ No new Cloudinary upload
- ✅ Realtime update works

### Test 2.6: Delete Product

1. Click trash icon on any product
2. Confirm deletion dialog

**Expected Console Logs:**
```
=== CLOUDINARY DELETE DEBUG ===
Attempting to delete: itsupport-products/abc123
Note: Delete requires signed API call...
📡 Realtime change detected: { eventType: "DELETE", ... }
```

**Expected Results:**
- ✅ Toast: "Produk berhasil dihapus"
- ✅ Realtime toast: "🗑️ Produk dihapus ✅"
- ✅ Product disappears from table immediately
- ✅ Deleted from database
- ⚠️ Image still in Cloudinary (client-side limitation)

---

## 📡 Test 3: Realtime Functionality

### Test 3.1: Multi-Window Realtime

1. Open admin panel in Browser Window A
2. Open admin panel in Browser Window B (same browser or different)
3. Login to both

**In Window A:**
- Create a new product

**Expected in Window B:**
- ✅ Product appears immediately (without refresh)
- ✅ Realtime toast notification
- ✅ Console log: "📡 Realtime change detected"

**In Window A:**
- Update a product

**Expected in Window B:**
- ✅ Product updates immediately
- ✅ Realtime toast notification

**In Window A:**
- Delete a product

**Expected in Window B:**
- ✅ Product disappears immediately
- ✅ Realtime toast notification

### Test 3.2: Realtime Connection Status

**Check Console:**
```
📡 Realtime subscription status: SUBSCRIBED
✅ Successfully subscribed to products realtime updates
```

**If you see errors:**
```
❌ Realtime subscription error
```
Then verify:
1. Supabase realtime is enabled
2. RLS policies allow SELECT
3. Run: `ALTER PUBLICATION supabase_realtime ADD TABLE products;`

---

## 🔍 Test 4: Search & Filter

### Test Search

1. Type product name in search box
2. Verify table filters in real-time

**Expected Results:**
- ✅ Only matching products show
- ✅ Search by title works
- ✅ Search by category works
- ✅ Case-insensitive search

---

## 🖼️ Test 5: Image Upload Edge Cases

### Test 5.1: Large File

1. Try uploading > 10MB file

**Expected Results:**
- ❌ Error toast: "Ukuran file terlalu besar. Maksimal 10MB"
- ❌ Upload blocked before sending to Cloudinary

### Test 5.2: Wrong File Type

1. Try uploading .txt or .pdf file

**Expected Results:**
- ✅ File rejected by input (accept="image/*")
- Or conversion fails gracefully

### Test 5.3: Network Error Simulation

1. Open DevTools > Network tab
2. Set throttling to "Offline"
3. Try uploading image

**Expected Console Logs:**
```
Upload attempt 1/3
❌ Upload attempt 1 failed: ...
Network error, retrying in 1000ms...
Upload attempt 2/3
...
```

**Expected Results:**
- ⏳ Automatic retry 3 times
- ❌ Final error: "Gagal terhubung ke Cloudinary"

### Test 5.4: WebP Conversion

1. Upload a PNG or JPG image
2. Check console for conversion log

**Expected Console Logs:**
```
WebP conversion success: {
  originalSize: 2048576,
  optimizedSize: 524288,
  originalType: "image/png",
  optimizedType: "image/webp"
}
```

**Expected Results:**
- ✅ File size reduced ~75%
- ✅ Format changed to WebP
- ✅ Quality maintained (0.8)

---

## 🚨 Test 6: Error Handling

### Test 6.1: Database Connection Error

**Simulate:** Stop Supabase (not possible, but check handling)

**If connection lost:**
- ❌ Toast: "Gagal mengambil data produk"
- ❌ Error logs in console

### Test 6.2: Invalid Upload Preset

**Simulate:** Change `VITE_CLOUDINARY_UPLOAD_PRESET` to wrong value

**Expected Results:**
- ❌ Toast: "Upload preset 'wrong_preset' tidak ditemukan..."
- ❌ Helpful error message with solution

### Test 6.3: Form Validation

1. Try submitting empty form

**Expected Results:**
- ❌ HTML5 validation errors
- ❌ Required fields highlighted
- ❌ Form not submitted

---

## 📊 Test 7: Performance

### Test Load Time

1. Add 20+ products to database
2. Navigate to products page
3. Measure load time

**Expected Results:**
- ✅ Products load in < 2 seconds
- ✅ Images lazy-load if many
- ✅ No blocking UI

### Test Upload Time

1. Upload 2MB image

**Expected Results:**
- ✅ Optimization takes < 1 second
- ✅ Upload completes in < 5 seconds
- ✅ Progress shown to user

---

## 📱 Test 8: Responsive Design

### Test Mobile View

1. Open DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device

**Test all operations on mobile:**
- [ ] Login
- [ ] View products table
- [ ] Add product with image
- [ ] Edit product
- [ ] Delete product
- [ ] Search products

**Expected Results:**
- ✅ All features work on mobile
- ✅ Table scrollable horizontally
- ✅ Modal fits screen
- ✅ Image upload works

---

## 🎯 Final Checklist

Before marking as complete, verify:

### Database
- [x] Products table created
- [x] Admin_users table created
- [x] Admin_sessions table created
- [x] RLS policies enabled
- [x] Realtime enabled
- [x] Triggers for updated_at working

### Authentication
- [x] Login works
- [x] Logout works
- [x] Session persists
- [x] Protected routes work

### Products CRUD
- [x] Create with image works
- [x] Create without image works
- [x] Read/List works
- [x] Update works
- [x] Delete works
- [x] Search/filter works

### Image Upload
- [x] Cloudinary upload works
- [x] WebP conversion works
- [x] Progress shown
- [x] Error handling works
- [x] Retry logic works
- [x] Size validation works

### Realtime
- [x] Insert updates immediately
- [x] Update updates immediately
- [x] Delete updates immediately
- [x] Multi-window sync works
- [x] Toast notifications work

### UI/UX
- [x] Loading states shown
- [x] Error messages clear
- [x] Success feedback immediate
- [x] Responsive on mobile
- [x] Icons and images display

---

## 🐛 Known Limitations

### Client-Side Image Delete

Currently, deleting images from Cloudinary requires API secret which cannot be exposed to client.

**Current Behavior:**
- ✅ Product deleted from database
- ⚠️ Image remains in Cloudinary

**Production Solution:**
- Implement delete via Supabase Edge Function
- Use Cloudinary Admin API with secret key
- Clean up unused images periodically

**Workaround:**
- Manual cleanup in Cloudinary dashboard
- Or implement scheduled cleanup job

---

## 📞 Support

If any test fails:

1. **Check Console Logs** - Detailed error info
2. **Check Network Tab** - API call responses
3. **Verify Configuration** - Follow SETUP_GUIDE.md
4. **Check Supabase** - Table Editor and logs
5. **Check Cloudinary** - Upload preset settings

---

## ✅ Success Criteria

All tests passing means:

✨ **Backend is 100% functional and production-ready!**

- Authentication works perfectly
- Database CRUD operations work
- Image uploads work reliably
- Realtime updates work instantly
- Error handling is robust
- User experience is smooth

Great job! 🎉
