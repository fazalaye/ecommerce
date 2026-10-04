import { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, Check, MapPin } from 'lucide-react';
import { Product, formatPrice } from '../data/products';
import { useCart } from '../store/cart';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

interface ProductPageProps {
  product: Product;
  onNavigate: (page: string, data?: any) => void;
}

export default function ProductPage({ product, onNavigate }: ProductPageProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [added, setAdded] = useState(false);

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-primary">Accueil</button>
        <ChevronRight size={14} />
        <button onClick={() => onNavigate('category', { id: product.categoryId })} className="hover:text-primary">
          Catégorie
        </button>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square mb-3">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-accent text-white text-sm font-bold rounded-lg">
                {product.badge}
              </span>
            )}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                <Heart size={18} />
              </button>
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === selectedImage ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount} avis)</span>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                  <span className="px-2 py-0.5 bg-accent/10 text-accent text-sm font-bold rounded">-{discount}%</span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Prix TTC • TVA incluse</p>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.features.map((feat, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full">
                  {feat}
                </span>
              ))}
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 mb-4">
            {product.stock > 0 ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-sm text-green-700 font-medium">En stock</span>
                {product.stock <= 10 && (
                  <span className="text-sm text-orange-600">• Plus que {product.stock} disponibles</span>
                )}
              </>
            ) : (
              <span className="text-sm text-red-600 font-medium">Rupture de stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantité :</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {added ? (
                <>
                  <Check size={18} />
                  Ajouté au panier !
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Ajouter au panier
                </>
              )}
            </button>
            <button
              onClick={() => { addItem(product, quantity); onNavigate('checkout'); }}
              className="flex-1 py-3.5 bg-secondary hover:bg-secondary-dark text-gray-900 font-bold rounded-xl transition-colors text-sm"
            >
              ⚡ Acheter maintenant
            </button>
          </div>

          {/* Payment methods */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-gray-500">Payer avec :</span>
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Wave</span>
            <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded">Orange Money</span>
            <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded">Free Money</span>
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">Carte</span>
          </div>

          {/* Delivery info */}
          <div className="border rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Truck size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Livraison à Dakar</p>
                <p className="text-xs text-gray-500">
                  {product.freeShipping
                    ? '🎉 Livraison gratuite'
                    : 'À partir de 2 000 FCFA'}
                </p>
                <p className="text-xs text-primary font-medium mt-0.5">Livraison estimée : 24-48h</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Livraison par quartier</p>
                <p className="text-xs text-gray-500">Plateau, Médina, Almadies, Sacré-Cœur...</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Garantie SenShop</p>
                <p className="text-xs text-gray-500">Produit authentique vérifié ou remboursé</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Retour gratuit</p>
                <p className="text-xs text-gray-500">Sous 7 jours après réception</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex border-b">
          {[
            { id: 'description' as const, label: 'Description' },
            { id: 'specs' as const, label: 'Caractéristiques' },
            { id: 'reviews' as const, label: `Avis (${product.reviewCount})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <p className="text-gray-600 mt-4">
                <strong>Garantie SenShop :</strong> Ce produit est soigneusement sélectionné et vérifié par notre équipe. 
                Nous garantissons l'authenticité du produit et assurons un service après-vente de qualité. 
                En cas de problème, notre support est disponible 7j/7.
              </p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Check size={16} className="text-primary" />
                  <span className="text-sm text-gray-700">{feat}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Rating summary */}
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-800">{product.rating}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{product.reviewCount} avis</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-3">{stars}</span>
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sample reviews */}
              {[
                { name: 'Aminata D.', rating: 5, date: 'Il y a 3 jours', text: 'Excellent produit ! Livraison rapide à Dakar. Je recommande.', verified: true },
                { name: 'Moussa K.', rating: 4, date: 'Il y a 1 semaine', text: 'Très bon rapport qualité-prix. Le vendeur est réactif.', verified: true },
                { name: 'Fatou S.', rating: 5, date: 'Il y a 2 semaines', text: 'Parfait ! Exactement comme décrit. Paiement Wave facile.', verified: true },
              ].map((review, idx) => (
                <div key={idx} className="p-4 border rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        {review.verified && <p className="text-[10px] text-green-600">✓ Achat vérifié</p>}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} onViewProduct={(prod) => onNavigate('product', { product: prod })} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
