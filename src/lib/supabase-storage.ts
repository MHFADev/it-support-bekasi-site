import { supabase } from './supabase';

const BUCKET_NAME = 'product-images';

/**
 * Initialize storage bucket for product images
 * This should be called once during setup
 */
export const initializeStorageBucket = async () => {
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.warn('Could not list buckets (may be permission issue):', listError);
      // Bucket might already exist, proceed anyway
      return { success: true };
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      });

      if (error && !error.message?.includes('already exists')) {
        console.error('Error creating bucket:', error);
        return { success: false, error };
      }

      console.log('✅ Storage bucket created successfully');
    }

    return { success: true };
  } catch (error) {
    console.error('Storage initialization error:', error);
    // Don't fail - bucket might already exist
    return { success: true };
  }
};

/**
 * Convert image to WebP format for optimization
 */
const convertToWebP = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image'));
              return;
            }
            
            const webpFile = new File(
              [blob], 
              file.name.replace(/\.[^/.]+$/, '.webp'),
              { type: 'image/webp' }
            );
            
            resolve(webpFile);
          },
          'image/webp',
          0.85 // Quality 85%
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Upload image to Supabase Storage
 * @param file - Image file to upload
 * @param folder - Optional folder name (default: 'products')
 * @returns Public URL of uploaded image
 */
export const uploadImageToSupabase = async (
  file: File,
  folder: string = 'products'
): Promise<{ url: string; path: string }> => {
  console.log('=== SUPABASE UPLOAD DEBUG ===');
  console.log('File info:', { name: file.name, size: file.size, type: file.type });
  console.log('Bucket:', BUCKET_NAME);
  console.log('Folder:', folder);
  
  try {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Ukuran file terlalu besar. Maksimal 10MB');
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF');
    }

    // Try to convert to WebP for optimization, fallback to original if fails
    try {
      fileToUpload = await convertToWebP(file);
      extension = 'webp';
      console.log('WebP conversion success:', {
        originalSize: file.size,
        optimizedSize: fileToUpload.size,
        reduction: `${Math.round((1 - fileToUpload.size / file.size) * 100)}%`
      });
    } catch (conversionError) {
      console.warn('WebP conversion failed, using original file:', conversionError);
      fileToUpload = file;
      extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const filename = `${folder}/${timestamp}-${randomStr}.${extension}`;

    console.log('Uploading to path:', filename);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, fileToUpload, {
        cacheControl: '3600',
        upsert: true, // Allow overwriting if file exists
        contentType: fileToUpload.type
      });

    if (error) {
      console.error('Supabase upload error:', error);
      
      // Provide better error messages
      if (error.message.includes('Bucket not found')) {
        throw new Error('Storage bucket belum dibuat. Silakan hubungi admin.');
      }
      if (error.message.includes('exceeded') || error.message.includes('size')) {
        throw new Error('Ukuran file terlalu besar');
      }
      if (error.message.includes('mime') || error.message.includes('type')) {
        throw new Error('Tipe file tidak didukung');
      }
      
      throw new Error(`Upload gagal: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    console.log('✅ Upload success:', urlData.publicUrl);

    return {
      url: urlData.publicUrl,
      path: data.path
    };
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Gagal mengunggah gambar');
  }
};

/**
 * Delete image from Supabase Storage
 * @param path - File path in storage
 */
export const deleteImageFromSupabase = async (path: string): Promise<void> => {
  try {
    if (!path) return;

    // Extract path from URL if full URL is provided
    let filePath = path;
    if (path.includes(BUCKET_NAME)) {
      const urlParts = path.split(`${BUCKET_NAME}/`);
      filePath = urlParts[1] || path;
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      throw new Error(`Gagal menghapus gambar: ${error.message}`);
    }

    console.log('✅ Image deleted successfully:', filePath);
  } catch (error: any) {
    console.error('Delete error:', error);
    // Don't throw error - allow operation to continue even if delete fails
    console.warn('Image deletion failed but continuing operation');
  }
};

/**
 * List all images in a folder
 * @param folder - Folder name (default: 'products')
 */
export const listImages = async (folder: string = 'products') => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('List images error:', error);
    return [];
  }
};
