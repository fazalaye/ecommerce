import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product, formatPrice } from '../data/products';
import { useCart } from '../store/cart';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

export default function ProductCard({ product, onViewProduct }: ProductCardProps) {
  const { addItem } = useCart();

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="product-card bg-white rounded-xl border border-gray-100 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-accent text-white text-xs font-bold rounded-md">
            {product.badge}
          </span>
        )}
        {discount > 0 && !product.badge && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-accent text-white text-xs font-bold rounded-md">
            -{discount}%
          </span>
        )}
        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
            <Heart size={14} />
          </button>
          <button
            onClick={() => onViewProduct(product)}
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Eye size={14} />
          </button>
        </div>
        {/* Free shipping badge */}
        {product.freeShipping && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-medium rounded">
            🚚 Livraison gratuite
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Name */}
        <button
          onClick={() => onViewProduct(product)}
          className="text-sm font-medium text-gray-800 line-clamp-2 text-left hover:text-primary transition-colors mb-2"
        >
          {product.name}
        </button>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        {/* Stock indicator */}
        {product.stock <= 10 && (
          <p className="text-[11px] text-orange-600 mb-2">
            Plus que {product.stock} en stock !
          </p>
        )}

        {/* Add to cart button */}
        <button
          onClick={(e) => { e.stopPropagation(); addItem(product); }}
          className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
