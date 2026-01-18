
// Fix: Added React import to resolve React namespace error for React.ReactNode
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string; // Added image for visual depth
}

export interface Product {
  id: string;
  title: string;
  price: number | string;
  description: string;
  image_url: string;
  category: string;
  stock_status?: string;
  specifications?: any[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
