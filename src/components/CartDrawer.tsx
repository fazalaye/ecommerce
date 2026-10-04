import { X, Plus, Minus, ShoppingBag, Truck, Shield } from 'lucide-react';
import { useCart } from '../store/cart';
import { formatPrice } from '../data/products';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  const shipping = totalPrice >= 25000 ? 0 : 2000;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            Mon Panier ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium">Votre panier est vide</p>
              <p className="text-gray-400 text-sm mt-1">Ajoutez des produits pour commencer</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.product.name}</p>
                    <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border rounded-md hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border rounded-md hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-4 py-4 space-y-3">
            {/* Benefits */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Truck size={12} className="text-primary" />
                {shipping === 0 ? 'Livraison gratuite' : `Livraison: ${formatPrice(shipping)}`}
              </span>
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-primary" />
                Paiement sécurisé
              </span>
            </div>

            {/* Totals */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className={shipping === 0 ? 'text-primary font-medium' : ''}>
                  {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice + shipping)}</span>
              </div>
            </div>

            <button
              onClick={() => { setIsOpen(false); onCheckout(); }}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors"
            >
              Commander • {formatPrice(totalPrice + shipping)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
