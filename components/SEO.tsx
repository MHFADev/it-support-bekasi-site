
import React from 'react';
import { CONTACT_INFO } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'business' | 'product';
  data?: any;
}

export const SEO: React.FC<SEOProps> = ({ type = 'business', data }) => {
  const structuredData = type === 'business' ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "IT Support Bekasi",
    "image": "https://raw.githubusercontent.com/MHFADev/asset/refs/heads/main/itsupport/1698841352722.jpg",
    "@id": "https://itsupportbekasi.vercel.app/",
    "url": "https://itsupportbekasi.vercel.app/",
    "telephone": CONTACT_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Ahmad Yani No. 123",
      "addressLocality": "Bekasi",
      "postalCode": "17141",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2383,
      "longitude": 106.9756
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  } : {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": data?.name,
    "image": data?.image,
    "description": data?.description,
    "brand": {
      "@type": "Brand",
      "name": "IT Support Bekasi"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://itsupportbekasi.vercel.app/shop",
      "priceCurrency": "IDR",
      "price": data?.price.replace(/\D/g, ''),
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};
