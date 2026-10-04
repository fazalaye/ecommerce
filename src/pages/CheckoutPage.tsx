import { useState } from 'react';
import { MapPin, CreditCard, Check, Shield, Truck, ChevronRight, Lock } from 'lucide-react';
import { useCart } from '../store/cart';
import { formatPrice } from '../data/products';

interface CheckoutPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [paymentMethod, setPaymentMethod] = useState('wave');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: 'Dakar',
    district: '',
    landmark: '',
  });

  const shipping = totalPrice >= 25000 ? 0 : 2000;
  const total = totalPrice + shipping;

  const districts = {
    'Dakar': ['Plateau', 'Médina', 'Liberté 6', 'Almadies', 'Sacré-Cœur', 'Ouakam', 'Ngor', 'Yoff'],
    'Thiès': ['Centre', 'Mbour', 'Saly', 'Thiès Nord'],
    'Saint-Louis': ['Centre', 'Sor', 'Ndar', 'Guet Ndar'],
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    setStep('success');
    clearCart();
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">Votre panier est vide</p>
        <button
          onClick={() => onNavigate('home')}
          className="mt-4 px-6 py-2.5 bg-primary text-white rounded-lg font-medium"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée ! 🎉</h1>
        <p className="text-gray-600 mb-2">Votre commande <strong>#ORD-2026-00247</strong> a été enregistrée.</p>
        <p className="text-sm text-gray-500 mb-6">
          Vous recevrez un SMS de confirmation au {formData.phone || '+221 77 123 45 67'}
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
          <h3 className="font-semibold text-gray-800 mb-3">Récapitulatif</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Statut</span>
              <span className="text-green-600 font-medium">✓ Payé</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Livraison estimée</span>
              <span className="font-medium">24-48h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Adresse</span>
              <span className="font-medium">{formData.district || 'Dakar'}, {formData.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Paiement</span>
              <span className="font-medium">
                {paymentMethod === 'wave' ? 'Wave' : paymentMethod === 'orange_money' ? 'Orange Money' : paymentMethod === 'free_money' ? 'Free Money' : 'Carte bancaire'}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total payé</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Continuer mes achats
          </button>
          <button className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
            Suivre ma commande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[
          { id: 'info', label: 'Livraison', icon: MapPin },
          { id: 'payment', label: 'Paiement', icon: CreditCard },
        ].map((s, idx) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s.id || (idx === 0 && step === 'payment')
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step === s.id || (idx === 0 && step === 'payment') ? (
                <Check size={16} />
              ) : (
                idx + 1
              )}
            </div>
            <span className={`text-sm font-medium ${
              step === s.id ? 'text-primary' : 'text-gray-500'
            }`}>{s.label}</span>
            {idx === 0 && <ChevronRight size={16} className="text-gray-300 mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'info' && (
            <form onSubmit={handleSubmitInfo} className="space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Informations de livraison
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Aminata"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Diallo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <div className="flex">
                      <span className="px-3 py-2.5 bg-gray-100 border border-r-0 rounded-l-lg text-sm text-gray-500">+221</span>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="flex-1 px-4 py-2.5 border rounded-r-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="77 123 45 67"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="aminata@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Truck size={20} className="text-primary" />
                  Adresse de livraison
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                      <select
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                        className="w-full px-4 py-2.5 border rounded-lg focus:border-primary focus:outline-none"
                      >
                        <option value="Dakar">Dakar</option>
                        <option value="Thiès">Thiès</option>
                        <option value="Saint-Louis">Saint-Louis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quartier *</label>
                      <select
                        required
                        value={formData.district}
                        onChange={e => setFormData({...formData, district: e.target.value})}
                        className="w-full px-4 py-2.5 border rounded-lg focus:border-primary focus:outline-none"
                      >
                        <option value="">Sélectionner...</option>
                        {districts[formData.city as keyof typeof districts]?.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Point de repère</label>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={e => setFormData({...formData, landmark: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Ex: Derrière la pharmacie, en face du marché..."
                    />
                    <p className="text-xs text-gray-400 mt-1">Aidez le livreur à vous trouver facilement</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Continuer vers le paiement
                <ChevronRight size={18} />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-primary" />
                  Mode de paiement
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'wave', name: 'Wave', desc: 'Paiement instantané', color: 'bg-blue-50 border-blue-200', icon: '💙', active: 'border-blue-500 bg-blue-50' },
                    { id: 'orange_money', name: 'Orange Money', desc: 'Paiement mobile', color: 'bg-orange-50 border-orange-200', icon: '🧡', active: 'border-orange-500 bg-orange-50' },
                    { id: 'free_money', name: 'Free Money', desc: 'Paiement mobile', color: 'bg-cyan-50 border-cyan-200', icon: '💚', active: 'border-cyan-500 bg-cyan-50' },
                    { id: 'card', name: 'Carte bancaire', desc: 'Visa, Mastercard', color: 'bg-green-50 border-green-200', icon: '💳', active: 'border-green-500 bg-green-50' },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all ${
                        paymentMethod === method.id
                          ? `${method.active} shadow-sm`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">{method.name}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <Check size={18} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <Lock size={18} className="text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Paiement 100% sécurisé</p>
                  <p className="text-xs text-green-600">Vos données sont chiffrées et protégées. Transaction via Chariow.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('info')}
                  className="flex-1 py-3.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Retour
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors"
                >
                  🔒 Payer {formatPrice(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-5 sticky top-32">
            <h3 className="font-bold text-gray-800 mb-4">Récapitulatif</h3>
            
            {/* Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.image} alt="" className="w-14 h-14 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                    <p className="text-sm font-bold text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Code promo"
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:border-primary focus:outline-none"
              />
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Appliquer
              </button>
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total ({items.reduce((s, i) => s + i.quantity, 0)} articles)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className={shipping === 0 ? 'text-primary font-medium' : ''}>
                  {shipping === 0 ? 'Gratuite ✓' : formatPrice(shipping)}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-4 pt-4 border-t space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield size={14} className="text-primary" />
                <span>Paiement sécurisé par Chariow</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Truck size={14} className="text-primary" />
                <span>Livraison 24-48h à Dakar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
