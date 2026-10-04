export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Électronique', slug: 'electronique', icon: '📱', color: 'bg-blue-100 text-blue-700', productCount: 1250 },
  { id: '2', name: 'Mode & Vêtements', slug: 'mode', icon: '👗', color: 'bg-pink-100 text-pink-700', productCount: 3400 },
  { id: '3', name: 'Maison & Jardin', slug: 'maison', icon: '🏠', color: 'bg-green-100 text-green-700', productCount: 890 },
  { id: '4', name: 'Beauté & Santé', slug: 'beaute', icon: '💄', color: 'bg-purple-100 text-purple-700', productCount: 2100 },
  { id: '5', name: 'Alimentation', slug: 'alimentation', icon: '🍎', color: 'bg-orange-100 text-orange-700', productCount: 750 },
  { id: '6', name: 'Auto & Moto', slug: 'auto', icon: '🚗', color: 'bg-red-100 text-red-700', productCount: 430 },
  { id: '7', name: 'Sport & Loisirs', slug: 'sport', icon: '⚽', color: 'bg-yellow-100 text-yellow-700', productCount: 620 },
  { id: '8', name: 'Bébé & Enfant', slug: 'bebe', icon: '👶', color: 'bg-cyan-100 text-cyan-700', productCount: 980 },
  { id: '9', name: 'Livres & Papeterie', slug: 'livres', icon: '📚', color: 'bg-indigo-100 text-indigo-700', productCount: 1500 },
  { id: '10', name: 'Artisanat Local', slug: 'artisanat', icon: '🎨', color: 'bg-amber-100 text-amber-700', productCount: 340 },
];
