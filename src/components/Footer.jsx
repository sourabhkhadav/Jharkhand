import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, ShieldCheck, ExternalLink, Heart } from 'lucide-react';
import logoLeaf from '../assets/logo-leaf.jpg';

export default function Footer() {
    const districts = ["Ranchi", "Latehar", "Deoghar", "Ramgarh", "Giridih", "Hazaribagh", "East Singhbhum", "Khunti", "Gumla", "Chaibasa"];

    return (
        <footer className="bg-secondary-dark text-cream pt-16 pb-8 border-t-4 border-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/15">
                    {/* Brand & Govt Badge */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={logoLeaf}
                                alt="Jharkhand Eco Tourism Logo"
                                className="w-10 h-10 rounded-full object-cover shadow-warm-sm flex-shrink-0"
                            />
                            <div>
                                <span className="font-serif font-bold text-2xl text-white">Explore </span>
                                <span className="font-serif font-bold text-2xl text-accent">Jharkhand</span>
                                <p className="text-[10px] tracking-widest uppercase text-cream/70 font-semibold">Department of Tourism, Govt. of Jharkhand</p>
                            </div>
                        </div>
                        <p className="text-xs text-cream/80 leading-relaxed max-w-sm">
                            Discover Jharkhand’s pristine waterfalls, ancient sacred peaks, rich Santhal & Munda tribal traditions, and eco-homestays in Asia's largest Sal forests.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-cream/90 pt-2">
                            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                <ShieldCheck className="w-4 h-4 text-accent" />
                                <span>Verified Govt Portal</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                <ExternalLink className="w-4 h-4 text-accent" />
                                <span>SIH25032 Initiative</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Nav Links */}
                    <div className="space-y-3">
                        <h4 className="font-serif font-bold text-sm text-accent uppercase tracking-wider">Discover</h4>
                        <ul className="space-y-2 text-xs text-cream/80">
                            <li><Link to="/explore" className="hover:text-accent transition">Waterfalls & Springs</Link></li>
                            <li><Link to="/arrival-guide" className="hover:text-accent transition">Real-Time Station Guide</Link></li>
                            <li><Link to="/know-your-craft" className="hover:text-accent transition">Tribal Craft AI Scanner</Link></li>
                            <li><Link to="/feedback" className="hover:text-accent transition">Help & Support Cell</Link></li>
                            <li><Link to="/lost-found" className="hover:text-accent transition">Lost & Found Registry</Link></li>
                            <li><Link to="/marketplace" className="hover:text-accent transition">Sohrai Wall Art Marketplace</Link></li>
                        </ul>
                    </div>

                    {/* District Directory */}
                    <div className="space-y-3">
                        <h4 className="font-serif font-bold text-sm text-accent uppercase tracking-wider">Districts</h4>
                        <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-xs text-cream/80">
                            {districts.map(dist => (
                                <Link key={dist} to={`/explore?district=${encodeURIComponent(dist)}`} className="hover:text-accent transition">
                                    {dist}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-3">
                        <h4 className="font-serif font-bold text-sm text-accent uppercase tracking-wider">Stay Connected</h4>
                        <p className="text-xs text-cream/80">Subscribe for seasonal festival updates & eco-tour itineraries.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-xs rounded-md bg-white/10 text-white placeholder:text-cream/50 border border-white/20 focus:outline-none focus:border-accent"
                            />
                            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white text-xs font-semibold py-2 rounded-md transition">
                                Subscribe Updates
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cream/60 gap-4">
                    <p>© {new Date().getFullYear()} Department of Tourism, Government of Jharkhand. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer">Terms of Service</span>
                        <span className="hover:text-white cursor-pointer">Tourist Advisory</span>
                        <span className="hover:text-white cursor-pointer">Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
