import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Search, Calendar, ShoppingBag, ShieldCheck, User, Menu, X, Sparkles, Compass } from 'lucide-react';
import logoLeaf from '../assets/logo-leaf.jpg';

export default function Navbar({ cartCount = 0, onOpenCart, onOpenAuth, onOpenVoice }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const navLinks = [
        { path: '/explore', label: 'Explore Directory' },
        { path: '/arrival-guide', label: 'Station Guide' },
        { path: '/know-your-craft', label: 'Tribal Craft AI' },
        { path: '/feedback', label: 'Help & Support' },
        { path: '/lost-found', label: 'Lost & Found' },
        { path: '/planner', label: 'AI Itinerary' },
        { path: '/marketplace', label: 'Artisan Market' },
    ];

    return (
        <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-warmborder shadow-warm-sm transition-all">
            {/* Main Header Bar - Compact, Sleek & Non-Wrapping */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
                    <img
                        src={logoLeaf}
                        alt="Explore Jharkhand Logo"
                        className="w-9 h-9 rounded-full object-cover shadow-warm-sm group-hover:scale-105 transition-transform flex-shrink-0"
                    />
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-1 leading-none">
                            <span className="font-serif font-bold text-lg sm:text-xl text-ink tracking-tight whitespace-nowrap">Explore</span>
                            <span className="font-serif font-bold text-lg sm:text-xl text-primary whitespace-nowrap">Jharkhand</span>
                        </div>
                        <p className="text-[9px] tracking-widest uppercase font-semibold text-secondary-dark leading-tight mt-0.5 whitespace-nowrap">Govt Eco & Cultural Tourism</p>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-xs font-semibold tracking-wide transition-colors duration-150 relative py-1 whitespace-nowrap ${isActive
                                    ? 'text-primary font-bold'
                                    : 'text-ink-light hover:text-primary'
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions & Buttons */}
                <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
                    {/* Voice Assistant Mic Button */}
                    <button
                        onClick={onOpenVoice}
                        className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-warm-sm transition"
                        title="Open Voice Assistant (Hindi/English)"
                    >
                        <span>Voice AI</span>
                    </button>

                    {/* Cart Icon */}
                    <button
                        onClick={onOpenCart}
                        className="relative p-2 text-ink hover:text-primary transition rounded-full hover:bg-cream-dark/50 flex-shrink-0"
                        title="Tribal Marketplace Cart"
                    >
                        <ShoppingBag className="w-4.5 h-4.5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* User Sign In */}
                    <button
                        onClick={onOpenAuth}
                        className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-secondary-dark px-3.5 py-1.5 rounded-full border border-secondary/40 hover:border-secondary transition whitespace-nowrap flex-shrink-0"
                    >
                        <User className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="whitespace-nowrap">Sign In</span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-1.5 text-ink rounded-lg focus:outline-none flex-shrink-0"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-cream border-b border-warmborder px-4 pt-2 pb-6 space-y-3 animate-fade-in">
                    <form onSubmit={handleSearchSubmit} className="relative mb-3">
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-cream-dark border border-warmborder focus:outline-none focus:ring-2 focus:ring-primary text-ink"
                        />
                        <Search className="w-4 h-4 text-ink-light absolute left-3 top-2.5" />
                    </form>

                    <div className="grid grid-cols-2 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-3 py-2 text-xs font-semibold rounded-lg ${location.pathname === link.path
                                    ? 'bg-primary text-white'
                                    : 'bg-cream-dark/50 text-ink hover:bg-warmborder'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                            className="flex-1 py-2 text-center text-xs font-semibold text-secondary border border-secondary rounded-full"
                        >
                            Sign In / Register
                        </button>
                        <Link
                            to="/planner"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex-1 py-2 text-center text-xs font-semibold text-white bg-primary rounded-full"
                        >
                            Plan Trip
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
