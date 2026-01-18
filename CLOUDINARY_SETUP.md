# Cloudinary Configuration Guide

## 🎯 Current Configuration

Your environment is already configured with:

```
VITE_CLOUDINARY_CLOUD_NAME=dcfycfrbw
VITE_CLOUDINARY_UPLOAD_PRESET=velvel
```

## ⚠️ Important: Upload Preset Configuration

For image uploads to work, the upload preset **MUST** be configured as **Unsigned** in Cloudinary dashboard.

### Step-by-Step Setup

#### 1. Access Cloudinary Dashboard

Go to: https://console.cloudinary.com/

Login with your Cloudinary account.

#### 2. Navigate to Upload Settings

1. Click the **Settings** icon (⚙️) in the top-right corner
2. Select the **Upload** tab from the left sidebar
3. Scroll down to find **Upload presets** section

#### 3. Check if Preset Exists

Look for a preset named `velvel` in the list.

**If it exists:**
- Click on it to edit
- Proceed to step 4

**If it doesn't exist:**
- Click **Add upload preset** button
- Proceed to step 4

#### 4. Configure Upload Preset

Set the following settings:

| Setting | Value | Notes |
|---------|-------|-------|
| **Preset name** | `velvel` | Must match VITE_CLOUDINARY_UPLOAD_PRESET |
| **Signing mode** | **Unsigned** | ⚠️ CRITICAL! Must be unsigned |
| **Folder** | `itsupport-products` | Optional but recommended for organization |
| **Format** | Auto | Let system detect format |
| **Quality** | Auto | System will optimize |
| **Allowed formats** | jpg, png, webp | Image formats only |

#### 5. Save Configuration

Click **Save** button at the bottom.

---

## 🔍 Verification

### Test in Browser Console

1. Open your admin panel
2. Open browser DevTools (F12)
3. Go to Console tab
4. Try uploading an image
5. You should see:
   ```
   === CLOUDINARY UPLOAD DEBUG ===
   Cloud Name: dcfycfrbw
   Upload Preset: velvel
   Upload URL: https://api.cloudinary.com/v1_1/dcfycfrbw/image/upload
   Upload attempt 1/3
   Response Status: 200
   ✅ Cloudinary Upload Success: { url: "...", public_id: "..." }
   ```

### Common Error Messages

#### ❌ Error: "Upload preset 'velvel' not found"

**Cause**: The preset doesn't exist in Cloudinary dashboard

**Solution**:
1. Go to Cloudinary Settings > Upload > Upload presets
2. Create a new preset named exactly `velvel`
3. Make sure it's set to **Unsigned**

#### ❌ Error: "Autentikasi gagal"

**Cause**: Upload preset is set to "Signed" instead of "Unsigned"

**Solution**:
1. Go to your preset settings in Cloudinary
2. Change **Signing mode** from "Signed" to **Unsigned**
3. Save the preset

#### ❌ Error: "Failed to fetch" or Network Error

**Cause**: Internet connection issue or CORS problem

**Solution**:
1. Check your internet connection
2. Verify cloud name is correct: `dcfycfrbw`
3. Try again - the system will auto-retry 3 times

---

## 🔧 Advanced Configuration

### Folder Structure

You can organize uploads in folders. In the upload preset:

```
Folder: itsupport-products
```

This will store all images in: `https://res.cloudinary.com/dcfycfrbw/image/upload/itsupport-products/`

### File Size Limits

**Free Tier Limits:**
- Max file size: 10MB per upload
- Total storage: 25GB
- Transformations: 25,000 per month

The system automatically checks file size before upload.

### Automatic Optimization

The app automatically:
1. ✅ Converts images to WebP format (smaller size)
2. ✅ Compresses with 0.8 quality (80%)
3. ✅ Uploads to Cloudinary
4. ✅ Stores public URL in database

---

## 📊 Monitoring Usage

### Check Cloudinary Dashboard

1. Go to https://console.cloudinary.com/
2. See your usage on the homepage:
   - Storage used
   - Bandwidth used
   - Transformations used

### Upgrade if Needed

If you exceed free tier limits:
- Go to Settings > Plans
- Upgrade to paid plan
- Or delete old unused images

---

## 🔐 Security Best Practices

### Current Setup (Development)

✅ **Unsigned uploads** - Good for development and demo
- No API secret exposed to client
- Limited control over uploads
- Anyone with preset name can upload

### Production Recommendations

For production apps, consider:

1. **Signed Uploads via Edge Function**
   - Implement server-side signing
   - Full control over uploads
   - Validate file types and sizes server-side

2. **Upload Restrictions**
   - Set max file size in preset
   - Restrict allowed formats
   - Implement rate limiting

3. **Access Control**
   - Use private storage for sensitive images
   - Generate signed URLs for access control
   - Implement folder-based permissions

---

## 🆘 Support

### Cloudinary Support

- Documentation: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com/
- Community: https://community.cloudinary.com/

### Need Help?

1. Check browser console for detailed error logs
2. Verify all configuration steps above
3. Test with a small image first (< 1MB)
4. Contact Cloudinary support if configuration issues persist

---

## ✅ Quick Checklist

Before going to production, verify:

- [ ] Upload preset `velvel` exists in Cloudinary
- [ ] Preset is set to **Unsigned** mode
- [ ] Cloud name matches: `dcfycfrbw`
- [ ] Environment variables are set correctly
- [ ] Test upload works in admin panel
- [ ] Images appear in Cloudinary dashboard
- [ ] Public URLs are accessible

---

## 📝 Notes

- Current cloud name: `dcfycfrbw`
- Upload preset: `velvel`
- Folder: `itsupport-products`
- Max file size: 10MB
- Supported formats: JPG, PNG, WebP
- Automatic WebP conversion: Enabled
- Retry attempts: 3
- Region: Auto (Cloudinary CDN)

Your configuration is ready to use! 🎉
