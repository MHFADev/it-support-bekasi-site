-- Migration script: Move from Cloudinary to Supabase Storage
-- Run this in Supabase SQL Editor

-- 1. Add image_path column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_path TEXT;

-- 2. Add comment to clarify new field
COMMENT ON COLUMN products.image_path IS 'File path in Supabase Storage (bucket: product-images)';

-- 3. Optional: You can keep image_public_id for backward compatibility during migration
-- Or drop it if you want to fully migrate
-- ALTER TABLE products DROP COLUMN IF EXISTS image_public_id;

-- 4. Create storage bucket for product images (run via Supabase Dashboard or API)
-- This needs to be done via the Supabase Dashboard > Storage section:
-- - Bucket name: product-images
-- - Public bucket: Yes
-- - File size limit: 10MB
-- - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

-- 5. Set up storage policies for public access
-- These need to be set in Supabase Dashboard > Storage > Policies:
-- Policy 1: Allow public read
--   Name: Public read access
--   Policy: SELECT
--   Target: bucket_id = 'product-images'
--   Definition: true
--
-- Policy 2: Allow authenticated insert
--   Name: Authenticated insert
--   Policy: INSERT
--   Target: bucket_id = 'product-images'
--   Definition: true
--
-- Policy 3: Allow authenticated update
--   Name: Authenticated update
--   Policy: UPDATE
--   Target: bucket_id = 'product-images'
--   Definition: true
--
-- Policy 4: Allow authenticated delete
--   Name: Authenticated delete
--   Policy: DELETE
--   Target: bucket_id = 'product-images'
--   Definition: true

-- Migration complete!
-- Next steps:
-- 1. Create the 'product-images' bucket in Supabase Dashboard > Storage
-- 2. Set bucket to public
-- 3. Configure policies as described above
-- 4. Test upload/delete functionality in admin panel
