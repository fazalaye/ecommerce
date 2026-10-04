import { TrendingUp, Truck, Shield, Clock, ArrowRight } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { products, Product } from '../data/products';
import { categories } from '../data/categories';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
  searchQuery: string;
}

export default function HomePage({ onNavigate, searchQuery }: HomePageProps) {
  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const featuredProducts = filteredProducts.slice(0, 8);
  const dealProducts = filteredProducts.filter(p => p.compareAtPrice).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <HeroBanner />
      </section>

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Truck, title: 'Livraison rapide', desc: '24h à Dakar', color: 'text-primary' },
            { icon: Shield, title: 'Paiement sécurisé', desc: 'Wave, OM, CB', color: 'text-blue-600' },
            { icon: Clock, title: 'Support 7j/7', desc: 'WhatsApp & Téléphone', color: 'text-orange-600' },
            { icon: TrendingUp, title: 'Meilleurs prix', desc: 'Garantie prix bas', color: 'text-purple-600' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <item.icon size={24} className={item.color} />
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">Catégories populaires</h2>
          <button
            onClick={() => onNavigate('categories')}
            className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          >
            Voir tout <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onNavigate('category', { id: cat.id })}
              className="category-card flex flex-col items-center p-3 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md"
            >
              <span className="text-3xl mb-1.5">{cat.icon}</span>
              <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      {dealProducts.length > 0 && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="bg-gradient-to-r from-accent to-red-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <h2 className="text-xl font-bold text-white">Offres du moment</h2>
                <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                  Se termine dans 05:23:41
                </span>
              </div>
              <button className="text-white text-sm font-medium hover:underline flex items-center gap-1">
                Voir tout <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dealProducts.map(product => (
                <ProductCard key={product.id} product={product} onViewProduct={(p) => onNavigate('product', { product: p })} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {searchQuery ? `Résultats pour "${searchQuery}"` : '🛍️ Nos produits'}
          </h2>
          {!searchQuery && (
            <button
              onClick={() => onNavigate('categories')}
              className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
            >
              Voir tout <ArrowRight size={14} />
            </button>
          )}
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé pour "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Essayez avec d'autres mots-clés</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={(p) => onNavigate('product', { product: p })}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why choose us */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">💚 Pourquoi nous faire confiance ?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '✅', title: 'Produits 100% authentiques', desc: 'Tous nos produits sont soigneusement sélectionnés et vérifiés.' },
              { emoji: '🚀', title: 'Livraison ultra-rapide', desc: 'Recevez vos commandes en 24h à Dakar, 48-72h dans les autres villes.' },
              { emoji: '💰', title: 'Meilleurs prix garantis', desc: 'Nous négocions les meilleurs prix pour vous offrir des tarifs imbattables.' },
              { emoji: '🔒', title: 'Paiement sécurisé', desc: 'Payez en toute confiance avec Wave, Orange Money, Free Money ou CB.' },
              { emoji: '↩️', title: 'Retours faciles', desc: 'Pas satisfait ? Retournez votre produit gratuitement sous 7 jours.' },
              { emoji: '💬', title: 'Support réactif', desc: 'Notre équipe est disponible 7j/7 par WhatsApp et téléphone.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* App Download Banner */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">📱 Restez informé de nos offres</h3>
              <p className="text-gray-400">Inscrivez-vous à notre newsletter et recevez nos meilleures promotions en avant-première.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre email..."
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
              />
              <button className="px-5 py-3 bg-secondary text-gray-900 rounded-xl font-bold text-sm hover:bg-secondary-dark transition-colors">
                S'inscrire ✉️
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
