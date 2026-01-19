import { Helmet } from 'react-helmet-async';
import { SITE_INFO } from '@/constants';

interface SEOProps {
  type?: 'business' | 'product';
  title?: string;
  description?: string;
  image?: string;
  price?: number;
}

export const SEO: React.FC<SEOProps> = ({ 
  type = 'business', 
  title, 
  description,
  image,
  price 
}) => {
  const pageTitle = title ? `${title} - ${SITE_INFO.name}` : SITE_INFO.name;
  const pageDescription = description || SITE_INFO.description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content={type === 'product' ? 'product' : 'website'} />
      {price && <meta property="product:price:amount" content={price.toString()} />}
      {price && <meta property="product:price:currency" content="IDR" />}
    </Helmet>
  );
};
