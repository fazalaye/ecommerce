import { useState } from 'react';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, Product } from '../data/products';
import { categories } from '../data/categories';

interface CategoryPageProps {
  categoryId?: string;
  onNavigate: (page: string, data?: any) => void;
}

export default function CategoryPage({ categoryId, onNavigate }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find(c => c.id === categoryId);
  
  let filteredProducts = categoryId
    ? products.filter(p => p.categoryId === categoryId)
    : products;

  // Apply price filter
  filteredProducts = filteredProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Apply sort
  switch (sortBy) {
    case 'price-asc':
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filteredProducts = [...filteredProducts].sort((a, b) => (b.compareAtPrice ? 1 : 0) - (a.compareAtPrice ? 1 : 0));
      break;
    default:
      filteredProducts = [...filteredProducts].sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {category ? `${category.icon} ${category.name}` : '🛍️ Tous les produits'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl border p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filtres
          </button>
          <div className="hidden sm:flex items-center gap-1">
            <button className="p-2 bg-primary/10 text-primary rounded-lg">
              <Grid3X3 size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
              <List size={16} />
            </button>
          </div>
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="appearance-none px-4 py-2 pr-8 border rounded-lg text-sm font-medium focus:border-primary focus:outline-none"
          >
            <option value="popular">Plus populaires</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Meilleures notes</option>
            <option value="newest">Nouveautés</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border p-5 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Prix (FCFA)</h3>
              <div className="space-y-2">
                {[
                  { label: 'Moins de 10 000', range: [0, 10000] as [number, number] },
                  { label: '10 000 - 50 000', range: [10000, 50000] as [number, number] },
                  { label: '50 000 - 200 000', range: [50000, 200000] as [number, number] },
                  { label: 'Plus de 200 000', range: [200000, 2000000] as [number, number] },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => setPriceRange(item.range)}
                    className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      priceRange[0] === item.range[0] && priceRange[1] === item.range[1]
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setPriceRange([0, 2000000])}
                  className="text-xs text-primary hover:underline"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Marque</h3>
              <div className="space-y-2">
                {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'JBL'].map(name => (
                  <label key={name} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    {name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Options</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  Livraison gratuite
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  En stock uniquement
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  Produits authentiques
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  En promotion
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={(p) => onNavigate('product', { product: p })}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
          <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos filtres</p>
        </div>
      )}

      {/* All categories */}
      {!categoryId && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Toutes les catégories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onNavigate('category', { id: cat.id })}
                className={`flex items-center gap-3 p-4 rounded-xl border hover:shadow-md transition-all ${cat.color}`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">{cat.name}</p>
                  <p className="text-xs opacity-70">{cat.productCount} produits</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
