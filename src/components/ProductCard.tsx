import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group h-full"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="h-full flex flex-col bg-white dark:bg-slate-900 border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-border">
            {/* Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="outline" className="font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-sm">
                {String(product.category)}
              </Badge>
            </div>

            {/* Product Image */}
            <div className="w-full h-full">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            
            {/* Overlay Actions (Desktop) */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-5">
            <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            
            {/* Specs preview if available, otherwise description snippet */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border/50">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Harga</span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              <Button 
                size="icon" 
                variant="outline"
                className="h-10 w-10 rounded-full shrink-0 border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
