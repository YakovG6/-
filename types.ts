
import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  images: string[];
  alt?: string;
  description?: string;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt?: string;
}

export interface Material {
  id: string;
  name: string;
  desc: string;
  img: string;
  alt?: string;
}
