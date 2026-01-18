import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function convertToWebP(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    // Only convert images
    if (!file.type.startsWith('image/')) {
      return resolve(file);
    }

    // Don't convert if already webp
    if (file.type === 'image/webp') {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
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
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image to WebP'));
            return;
          }
          const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          resolve(webpFile);
        }, 'image/webp', 0.8); // 0.8 quality
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
