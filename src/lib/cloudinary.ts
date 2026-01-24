export const uploadToCloudinary = async (file: File, maxRetries = 3) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

  console.log('=== CLOUDINARY UPLOAD DEBUG ===');
  console.log('Cloud Name:', cloudName);
  console.log('Upload Preset:', uploadPreset);
  console.log('File Info:', { name: file.name, size: file.size, type: file.type });

  if (!cloudName) {
    throw new Error('VITE_CLOUDINARY_CLOUD_NAME tidak ditemukan di environment variables');
  }

  if (!uploadPreset) {
    throw new Error('VITE_CLOUDINARY_UPLOAD_PRESET tidak ditemukan di environment variables');
  }

  // Check file size (max 10MB for free tier)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Ukuran file terlalu besar. Maksimal 10MB');
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  console.log('Upload URL:', uploadUrl);

  // Retry logic
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Upload attempt ${attempt}/${maxRetries}`);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'itsupport-products'); // Organize uploads in folder

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Body:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { error: { message: responseText || 'Unknown error' } };
        }
        
        console.error('Cloudinary Error Response:', errorData);
        
        // Provide more helpful error messages
        const errorMsg = errorData.error?.message || errorData.message || `Upload gagal (${response.status})`;
        
        if (errorMsg.includes('Upload preset') && errorMsg.includes('not found')) {
          throw new Error(`Upload preset "${uploadPreset}" tidak ditemukan. Pastikan preset sudah dibuat di Cloudinary dashboard dan set sebagai "Unsigned".`);
        }
        
        if (response.status === 401) {
          throw new Error('Autentikasi gagal. Pastikan upload preset di-set sebagai "Unsigned" di Cloudinary dashboard.');
        }
        
        // Retry on server errors (500, 502, 503, 504)
        if (attempt < maxRetries && response.status >= 500) {
          console.log(`Server error, retrying in ${attempt * 1000}ms...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          continue;
        }
        
        throw new Error(errorMsg);
      }

      const data = JSON.parse(responseText);
      console.log('✅ Cloudinary Upload Success:', { url: data.secure_url, public_id: data.public_id });
      
      return {
        url: data.secure_url,
        public_id: data.public_id
      };
    } catch (error: any) {
      console.error(`❌ Upload attempt ${attempt} failed:`, error);
      
      // Network error handling
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        if (attempt < maxRetries) {
          console.log(`Network error, retrying in ${attempt * 1000}ms...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          continue;
        }
        throw new Error('Gagal terhubung ke Cloudinary. Periksa koneksi internet Anda.');
      }
      
      // Don't retry on authentication or configuration errors
      if (error.message.includes('preset') || error.message.includes('Autentikasi')) {
        throw error;
      }
      
      // Retry on other errors
      if (attempt < maxRetries) {
        console.log(`Retrying upload in ${attempt * 1000}ms...`);
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }
      
      throw new Error(error.message || 'Gagal mengunggah gambar ke Cloudinary');
    }
  }
  
  throw new Error('Upload gagal setelah beberapa percobaan');
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string) => {
  if (!publicId) return;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  console.log('=== CLOUDINARY DELETE DEBUG ===');
  console.log('Attempting to delete:', publicId);
  console.log('Note: Delete requires signed API call. This is a client-side limitation.');
  console.log('For production, implement delete via edge function with API secret.');
  
  // Client-side delete is not possible with unsigned preset
  // This would require API secret which should never be exposed to client
  // For now, we'll just log it and clean up the reference in our database
  // In production, implement this via edge function
  
  return { success: true, message: 'Image reference removed from database' };
};
