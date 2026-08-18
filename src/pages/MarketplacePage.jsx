import React, { useState } from 'react';
import { ARTISANS } from '../data/artisans';
import SectionHeader from '../components/SectionHeader';
import RatingStars from '../components/RatingStars';
import { ShoppingBag, Eye, X, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function MarketplacePage({ onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeModalProduct, setActiveModalProduct] = useState(null);

    const categories = ['All', 'Sohrai Painting', 'Dokra Brass Metal', 'Bamboo Craft', 'Organic Silk & Textiles'];

    const filteredProducts = selectedCategory === 'All'
        ? ARTISANS
        : ARTISANS.filter(p => p.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header Banner */}
            <div className="bg-cream-dark rounded-3xl p-6 sm:p-10 border border-warmborder space-y-4">
                <SectionHeader
                    eyebrow="TRIBAL HANDICRAFTS OF JHARKHAND"
                    title="Sohrai, Dokra & Eco Bamboo Craft"
                    subtitle="Direct GI-tagged artisan marketplace empowering indigenous Santhal, Munda, and Kurmi master craftspeople."
                />

                {/* Category Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-primary text-white shadow-warm-sm'
                                    : 'bg-white text-ink-light border border-warmborder hover:bg-warmborder'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-cream-card rounded-3xl border border-warmborder p-4 shadow-warm-sm hover:shadow-warm-md transition flex flex-col justify-between space-y-3">
                        <div>
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-cream-dark group">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <span className="absolute top-3 left-3 bg-accent-dark text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                                    {product.badge}
                                </span>

                                <button
                                    onClick={() => setActiveModalProduct(product)}
                                    className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-ink hover:text-primary shadow transition"
                                    title="Quick View Bio & Details"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>

                            <h3 className="font-serif font-bold text-sm text-ink line-clamp-1">{product.title}</h3>
                            <p className="text-xs text-ink-light">{product.artisanName}</p>
                            <p className="text-[11px] text-ink-muted">{product.village}</p>
                        </div>

                        <div className="pt-3 border-t border-warmborder flex items-center justify-between">
                            <div>
                                <span className="font-serif font-bold text-lg text-primary">₹{product.price}</span>
                            </div>

                            <button
                                onClick={() => onAddToCart(product)}
                                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow transition"
                            >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* PRODUCT DETAIL & ARTISAN BIO MODAL */}
            {activeModalProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-cream border border-warmborder rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative space-y-6">
                        <button
                            onClick={() => setActiveModalProduct(null)}
                            className="absolute top-4 right-4 p-2 text-ink-light hover:text-ink rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <img src={activeModalProduct.image} alt="" className="w-full aspect-square object-cover rounded-2xl border border-warmborder" />

                            <div className="space-y-4 text-xs">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-accent-dark bg-accent/20 px-2.5 py-0.5 rounded">
                                        {activeModalProduct.badge}
                                    </span>
                                    <h3 className="font-serif font-bold text-xl text-ink mt-2">{activeModalProduct.title}</h3>
                                    <RatingStars rating={activeModalProduct.rating} size="sm" />
                                </div>

                                <div className="p-3 bg-cream-dark rounded-xl border border-warmborder space-y-1">
                                    <p className="font-bold text-ink">Master Artisan Bio:</p>
                                    <p className="text-ink-light">Crafted by <strong>{activeModalProduct.artisanName}</strong> in <em>{activeModalProduct.village}</em>.</p>
                                </div>

                                <p className="text-ink-light leading-relaxed">{activeModalProduct.description}</p>
                                <p className="text-ink-muted">Dimensions: {activeModalProduct.dimensions}</p>

                                <div className="pt-2 flex items-center justify-between">
                                    <span className="font-serif font-bold text-2xl text-primary">₹{activeModalProduct.price}</span>
                                    <button
                                        onClick={() => { onAddToCart(activeModalProduct); setActiveModalProduct(null); }}
                                        className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
