export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  categoryId: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  badge?: string;
  freeShipping: boolean;
  features: string[];
}

export interface Seller {
  id: string;
  name: string;
  slug: string;
  rating: number;
  reviewCount: number;
  city: string;
  verified: boolean;
  productCount: number;
}

export const sellers: Seller[] = [
  { id: 's1', name: 'TechDakar', slug: 'techdakar', rating: 4.8, reviewCount: 342, city: 'Dakar', verified: true, productCount: 156 },
  { id: 's2', name: 'ModeSénégal', slug: 'modesenegal', rating: 4.6, reviewCount: 891, city: 'Dakar', verified: true, productCount: 423 },
  { id: 's3', name: 'Boutique Saliou', slug: 'boutique-saliou', rating: 4.5, reviewCount: 234, city: 'Dakar', verified: true, productCount: 89 },
  { id: 's4', name: 'Maison & Déco SN', slug: 'maison-deco-sn', rating: 4.7, reviewCount: 567, city: 'Thiès', verified: true, productCount: 234 },
  { id: 's5', name: 'Beauty Africa', slug: 'beauty-africa', rating: 4.9, reviewCount: 1203, city: 'Dakar', verified: true, productCount: 312 },
  { id: 's6', name: 'Sport 221', slug: 'sport221', rating: 4.4, reviewCount: 178, city: 'Dakar', verified: false, productCount: 67 },
];

const placeholderImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop',
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max 256Go - Titane Naturel',
    slug: 'iphone-15-pro-max',
    description: 'Le dernier iPhone avec puce A17 Pro, système de caméra professionnel, et design en titane. Écran Super Retina XDR 6.7 pouces. Autonomie exceptionnelle.',
    price: 850000,
    compareAtPrice: 950000,
    image: placeholderImages[0],
    images: [placeholderImages[0], placeholderImages[1], placeholderImages[2]],
    rating: 4.8,
    reviewCount: 234,
    stock: 15,
    categoryId: '1',
    sellerId: 's1',
    sellerName: 'TechDakar',
    sellerRating: 4.8,
    badge: 'Bestseller',
    freeShipping: true,
    features: ['Puce A17 Pro', 'Caméra 48MP', 'Titane', 'USB-C', '256Go']
  },
  {
    id: 'p2',
    name: 'Samsung Galaxy S24 Ultra 512Go',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Smartphone premium avec S Pen intégré, écran Dynamic AMOLED 2X de 6.8 pouces, et caméra 200MP. Intelligence artificielle Galaxy AI.',
    price: 780000,
    compareAtPrice: 890000,
    image: placeholderImages[1],
    images: [placeholderImages[1], placeholderImages[0]],
    rating: 4.7,
    reviewCount: 189,
    stock: 8,
    categoryId: '1',
    sellerId: 's1',
    sellerName: 'TechDakar',
    sellerRating: 4.8,
    badge: 'Nouveau',
    freeShipping: true,
    features: ['Galaxy AI', 'S Pen', '200MP', '512Go', 'Titanium']
  },
  {
    id: 'p3',
    name: 'Casque Audio Sony WH-1000XM5',
    slug: 'sony-wh1000xm5',
    description: 'Casque sans fil à réduction de bruit leader du marché. Son haute résolution, 30h d\'autonomie, confort premium.',
    price: 225000,
    compareAtPrice: 275000,
    image: placeholderImages[2],
    images: [placeholderImages[2]],
    rating: 4.9,
    reviewCount: 567,
    stock: 23,
    categoryId: '1',
    sellerId: 's1',
    sellerName: 'TechDakar',
    sellerRating: 4.8,
    badge: '-18%',
    freeShipping: true,
    features: ['ANC Premium', '30h autonomie', 'Bluetooth 5.3', 'Hi-Res Audio']
  },
  {
    id: 'p4',
    name: 'Nike Air Max 90 - Édition Dakar',
    slug: 'nike-air-max-90-dakar',
    description: 'Édition limitée aux couleurs du Sénégal. Confort Air Max iconique, design unique inspiré de Dakar.',
    price: 85000,
    compareAtPrice: 110000,
    image: placeholderImages[3],
    images: [placeholderImages[3], placeholderImages[7]],
    rating: 4.6,
    reviewCount: 89,
    stock: 5,
    categoryId: '2',
    sellerId: 's2',
    sellerName: 'ModeSénégal',
    sellerRating: 4.6,
    badge: 'Édition Limitée',
    freeShipping: false,
    features: ['Air Max', 'Édition limitée', 'Cuir premium', 'Couleurs SN']
  },
  {
    id: 'p5',
    name: 'Beurre de Karité Pur Bio - 500ml',
    slug: 'beurre-karite-bio',
    description: 'Beurre de karité 100% naturel et biologique, produit artisanalement au Sénégal. Hydratant pour peau et cheveux.',
    price: 8500,
    compareAtPrice: 12000,
    image: placeholderImages[5],
    images: [placeholderImages[5]],
    rating: 4.9,
    reviewCount: 1203,
    stock: 150,
    categoryId: '4',
    sellerId: 's5',
    sellerName: 'Beauty Africa',
    sellerRating: 4.9,
    badge: 'Bio',
    freeShipping: false,
    features: ['100% Naturel', 'Bio certifié', '500ml', 'Made in Senegal']
  },
  {
    id: 'p6',
    name: 'Enceinte Bluetooth JBL Charge 5',
    slug: 'jbl-charge-5',
    description: 'Enceinte portable puissante, étanche IP67, 20h d\'autonomie. Son JBL Pro Sound avec basses profondes.',
    price: 95000,
    compareAtPrice: 120000,
    image: placeholderImages[9],
    images: [placeholderImages[9]],
    rating: 4.7,
    reviewCount: 445,
    stock: 32,
    categoryId: '1',
    sellerId: 's1',
    sellerName: 'TechDakar',
    sellerRating: 4.8,
    freeShipping: true,
    features: ['IP67', '20h autonomie', 'Powerbank', 'JBL Pro Sound']
  },
  {
    id: 'p7',
    name: 'Montre Connectée Apple Watch Series 9',
    slug: 'apple-watch-s9',
    description: 'La montre connectée la plus avancée. Écran Always-On, capteurs santé, GPS précis.',
    price: 320000,
    compareAtPrice: 380000,
    image: placeholderImages[8],
    images: [placeholderImages[8]],
    rating: 4.8,
    reviewCount: 312,
    stock: 12,
    categoryId: '1',
    sellerId: 's1',
    sellerName: 'TechDakar',
    sellerRating: 4.8,
    badge: 'Populaire',
    freeShipping: true,
    features: ['Puce S9', 'Always-On', 'GPS', 'ECG']
  },
  {
    id: 'p8',
    name: 'Robe Wax Africaine - Collection Teranga',
    slug: 'robe-wax-teranga',
    description: 'Robe élégante en tissu wax authentique, coupe moderne. Fabriquée artisanalement au Sénégal.',
    price: 35000,
    compareAtPrice: 45000,
    image: placeholderImages[4],
    images: [placeholderImages[4]],
    rating: 4.5,
    reviewCount: 67,
    stock: 28,
    categoryId: '2',
    sellerId: 's2',
    sellerName: 'ModeSénégal',
    sellerRating: 4.6,
    freeShipping: false,
    features: ['Tissu Wax', 'Fait main', 'Collection Teranga', 'Tailles S-XXL']
  },
  {
    id: 'p9',
    name: 'MacBook Air M3 - 15 pouces 256Go',
    slug: 'macbook-air-m3',
    description: 'Ordinateur portable ultra-fin avec puce M3, écran Liquid Retina 15 pouces, 18h d\'autonomie.',
    price: 1250000,
    compareAtPrice: 1400000,
    image: placeholderImages[6],
    images: [placeholderImages[6]],
    rating: 4.9,
    reviewCount: 156,
    stock: 6,
    categoryId: '1',
    sellerId: 's1',
    sellerName: 'TechDakar',
    sellerRating: 4.8,
    badge: 'Premium',
    freeShipping: true,
    features: ['Puce M3', '15 pouces', '18h batterie', '8Go RAM']
  },
  {
    id: 'p10',
    name: 'Basket Adidas Ultraboost Light',
    slug: 'adidas-ultraboost-light',
    description: 'Chaussure de running légère avec technologie Boost. Confort ultime pour la course et le quotidien.',
    price: 95000,
    compareAtPrice: 125000,
    image: placeholderImages[7],
    images: [placeholderImages[7]],
    rating: 4.6,
    reviewCount: 234,
    stock: 41,
    categoryId: '7',
    sellerId: 's6',
    sellerName: 'Sport 221',
    sellerRating: 4.4,
    freeShipping: true,
    features: ['Boost Light', 'Ultra léger', 'Primeknit', 'Continental']
  },
  {
    id: 'p11',
    name: 'Thé Bissap Bio - 1kg',
    slug: 'the-bissap-bio',
    description: 'Fleurs d\'hibiscus séchées biologiques du Sénégal. Parfait pour préparer votre jus de bissap.',
    price: 5000,
    image: placeholderImages[5],
    images: [placeholderImages[5]],
    rating: 4.8,
    reviewCount: 890,
    stock: 200,
    categoryId: '5',
    sellerId: 's3',
    sellerName: 'Boutique Saliou',
    sellerRating: 4.5,
    badge: 'Local',
    freeShipping: false,
    features: ['100% Bio', '1kg', 'Made in Senegal', 'Sans additifs']
  },
  {
    id: 'p12',
    name: 'Tableau Artisanal - Baobab Sénégal',
    slug: 'tableau-baobab',
    description: 'Peinture artisanale représentant un baobab majestueux. Peint à la main par un artiste sénégalais.',
    price: 45000,
    compareAtPrice: 60000,
    image: placeholderImages[4],
    images: [placeholderImages[4]],
    rating: 4.7,
    reviewCount: 34,
    stock: 3,
    categoryId: '10',
    sellerId: 's3',
    sellerName: 'Boutique Saliou',
    sellerRating: 4.5,
    badge: 'Artisanal',
    freeShipping: false,
    features: ['Peint à la main', '60x80cm', 'Artiste local', 'Pièce unique']
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-SN', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(price) + ' FCFA';
}
