import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) {
    if (!isOpen) return null;

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fade-in">
            <div className="w-full max-w-md bg-cream text-ink h-full flex flex-col shadow-2xl border-l border-warmborder">
                {/* Cart Header */}
                <div className="p-5 bg-cream-dark border-b border-warmborder flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <h3 className="font-serif font-bold text-lg text-ink">Tribal Artisan Cart</h3>
                    </div>
                    <button onClick={onClose} className="p-1 text-ink-light hover:text-ink rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 space-y-3">
                            <ShoppingBag className="w-12 h-12 text-ink-muted mx-auto stroke-1" />
                            <p className="font-serif text-lg text-ink-light">Your artisan cart is empty</p>
                            <p className="text-xs text-ink-muted">Support Santhal & Munda craftsmen by adding authentic Sohrai paintings or Dokra metal sculptures.</p>
                        </div>
                    ) : (
                        cartItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-cream-card rounded-xl border border-warmborder">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-ink truncate">{item.title}</h4>
                                    <p className="text-[11px] text-ink-light">{item.artisanName}</p>
                                    <p className="text-xs font-bold text-primary mt-1">₹{item.price} x {item.quantity || 1}</p>
                                </div>
                                <button
                                    onClick={() => onRemoveItem(idx)}
                                    className="p-1.5 text-danger/80 hover:text-danger rounded-lg hover:bg-rose-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Cart Footer / Checkout */}
                {cartItems.length > 0 && (
                    <div className="p-5 bg-cream-dark border-t border-warmborder space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold text-ink">
                            <span>Total Investment:</span>
                            <span className="text-lg text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>100% of proceeds go directly to GI-tagged tribal artisans in Jharkhand.</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 shadow-warm-md"
                        >
                            <span>Proceed to Checkout</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
