import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Newsletter */}
      <div className="bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-lg font-bold">Recevez nos meilleures offres !</h3>
            <p className="text-green-100 text-sm">Inscrivez-vous et obtenez -10% sur votre première commande</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Votre email..."
              className="px-4 py-2.5 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 w-full md:w-64"
            />
            <button className="px-6 py-2.5 bg-secondary text-gray-900 font-semibold rounded-r-lg hover:bg-secondary-dark transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">SenShop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Aide</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retours & Remboursements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suivi de commande</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions générales</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Nos engagements</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Produits authentiques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Qualité garantie</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Meilleurs prix</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Service client réactif</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>+221 33 123 45 67</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span>contact@senshop.sn</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Dakar, Sénégal</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Paiements sécurisés :</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-800 rounded text-xs font-medium text-blue-400">Wave</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-xs font-medium text-orange-400">Orange Money</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-xs font-medium text-blue-300">Free Money</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-xs font-medium text-green-400">Visa/MC</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>🔒 Paiements 100% sécurisés</span>
              <span>•</span>
              <span>🚚 Livraison rapide</span>
              <span>•</span>
              <span>↩️ Retours gratuits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-500">
          © 2026 SenShop. Tous droits réservés. Votre boutique en ligne de confiance au Sénégal 🇸🇳
        </div>
      </div>
    </footer>
  );
}
