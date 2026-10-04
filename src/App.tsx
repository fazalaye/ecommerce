import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CartProvider } from './store/cart';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import { Product } from './data/products';

type Page = 'home' | 'product' | 'category' | 'categories' | 'checkout' | 'account';

interface PageState {
  page: Page;
  data?: any;
}

function App() {
  const [pageState, setPageState] = useState<PageState>({ page: 'home' });
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = (page: string, data?: any) => {
    setPageState({ page: page as Page, data });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'home') setSearchQuery('');
  };

  const renderPage = () => {
    switch (pageState.page) {
      case 'product':
        return (
          <ProductPage
            product={pageState.data?.product as Product}
            onNavigate={navigate}
          />
        );
      case 'category':
        return (
          <CategoryPage
            categoryId={pageState.data?.id}
            onNavigate={navigate}
          />
        );
      case 'categories':
        return <CategoryPage onNavigate={navigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case 'account':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12 text-center animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👤</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Mon Compte</h1>
              <p className="text-gray-500 mb-6">Connectez-vous pour accéder à vos commandes et favoris</p>
              <div className="space-y-3">
                <div className="flex">
                  <span className="px-3 py-2.5 bg-gray-100 border border-r-0 rounded-l-lg text-sm text-gray-500">+221</span>
                  <input
                    type="tel"
                    className="flex-1 px-4 py-2.5 border rounded-r-lg focus:border-primary focus:outline-none"
                    placeholder="77 123 45 67"
                  />
                </div>
                <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">
                  Recevoir un code OTP
                </button>
                <p className="text-xs text-gray-400">
                  Un code de vérification sera envoyé par SMS
                </p>
              </div>
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-3">Pas encore de compte ?</p>
                <button
                  onClick={() => navigate('home')}
                  className="text-primary font-medium hover:underline"
                >
                  Créer un compte gratuitement
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            onNavigate={navigate}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-surface flex flex-col">
        <Header
          currentPage={pageState.page}
          onNavigate={navigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <main className="flex-1">
          {renderPage()}
        </main>

        <Footer />

        {/* Cart Drawer */}
        <CartDrawer onCheckout={() => navigate('checkout')} />

        {/* WhatsApp floating button */}
        <a
          href="https://wa.me/221771234567"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
          title="Contacter le support WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </CartProvider>
  );
}

export default App;
