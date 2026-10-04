import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../store/cart';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, data?: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ currentPage, onNavigate, searchQuery, onSearchChange }: HeaderProps) {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Promos', page: 'home', badge: '🔥' },
    { label: 'Électronique', page: 'category', data: { id: '1' } },
    { label: 'Mode', page: 'category', data: { id: '2' } },
    { label: 'Maison', page: 'category', data: { id: '3' } },
    { label: 'Beauté', page: 'category', data: { id: '4' } },
    { label: 'Artisanat', page: 'category', data: { id: '10' } },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              Livraison partout au Sénégal 🇸🇳
            </span>
            <span className="hidden sm:inline">Paiement : Wave • Orange Money • Free Money • CB</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hover:text-secondary transition-colors">📞 +221 77 123 45 67</button>
            <span className="hidden sm:inline">|</span>
            <button className="hidden sm:inline hover:text-secondary transition-colors">Aide</button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-primary">Sen</span>
              <span className="text-xl font-bold text-gray-800">Shop</span>
              <p className="text-[10px] text-gray-500 -mt-1">La boutique en ligne du Sénégal</p>
            </div>
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher un produit, une marque..."
                className="w-full pl-4 pr-12 py-2.5 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none text-sm transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => onNavigate('account')}
              className="hidden md:flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
            >
              <User size={22} />
              <span className="text-[10px] mt-0.5">Compte</span>
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse-badge">
                  {totalItems}
                </span>
              )}
              <span className="text-[10px] mt-0.5">Panier</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(item.page, item.data)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 rounded-lg ${
                  currentPage === item.page ? 'text-primary bg-primary/5' : 'text-gray-700'
                }`}
              >
                {item.badge && <span className="mr-1">{item.badge}</span>}
                {item.label}
              </button>
            ))}
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg flex items-center gap-1">
              Plus <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-slide-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { onNavigate(item.page, item.data); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg"
              >
                {item.badge && <span className="mr-2">{item.badge}</span>}
                {item.label}
              </button>
            ))}
            <hr className="my-2" />
            <button className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg">
              👤 Mon Compte
            </button>
            <button className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg">
              📦 Mes Commandes
            </button>
            <button className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg">
              ❤️ Mes Favoris
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
