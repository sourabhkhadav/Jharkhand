import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';
import { User, Calendar, Heart, Settings, Globe, Bell, ShieldCheck, Compass } from 'lucide-react';

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState('itineraries'); // itineraries | wishlist | bookings | settings
    const [language, setLanguage] = useState('English');
    const [notifications, setNotifications] = useState(true);

    const wishlistedPlaces = DESTINATIONS.slice(0, 3);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Profile Header */}
            <div className="bg-cream-dark rounded-3xl p-6 sm:p-8 border border-warmborder flex flex-col sm:flex-row items-center justify-between gap-6 shadow-warm-sm">
                <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-20 h-20 rounded-full bg-primary text-white font-serif font-bold text-3xl flex items-center justify-center border-4 border-white shadow-warm-md">
                        PS
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <h2 className="font-serif font-bold text-2xl text-ink">Priyanshu Sharma</h2>
                            <span className="bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                Eco Explorer
                            </span>
                        </div>
                        <p className="text-xs text-ink-light">priyanshu@traveler.com • Member since 2026</p>
                        <p className="text-[11px] text-primary font-bold">3 Trips Saved | 4 Reviews Authored</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className="bg-white border border-warmborder text-ink hover:bg-cream-dark font-bold text-xs px-4 py-2.5 rounded-full transition flex items-center gap-1.5"
                    >
                        <Settings className="w-4 h-4 text-primary" />
                        <span>Profile Settings</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white border border-warmborder p-1.5 rounded-2xl max-w-xl gap-1 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('itineraries')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'itineraries' ? 'bg-primary text-white shadow' : 'text-ink-light hover:text-ink'
                        }`}
                >
                    Saved Itineraries (2)
                </button>

                <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'wishlist' ? 'bg-primary text-white shadow' : 'text-ink-light hover:text-ink'
                        }`}
                >
                    Wishlist (3)
                </button>

                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'bookings' ? 'bg-primary text-white shadow' : 'text-ink-light hover:text-ink'
                        }`}
                >
                    Past Bookings (1)
                </button>

                <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'settings' ? 'bg-primary text-white shadow' : 'text-ink-light hover:text-ink'
                        }`}
                >
                    Settings
                </button>
            </div>

            {/* TAB 1: SAVED ITINERARIES */}
            {activeTab === 'itineraries' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                    <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                                    3 Days Circuit
                                </span>
                                <h3 className="font-serif font-bold text-xl text-ink mt-1">Ranchi Waterfalls & Netarhat Sunrise</h3>
                                <p className="text-xs text-ink-light">Created on Oct 12, 2026</p>
                            </div>
                            <Compass className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-xs text-ink-light">Hundru Falls ➔ Dassam Falls ➔ Patratu Valley ➔ Netarhat Pines ➔ Betla Safari</p>
                        <div className="pt-2 flex justify-between items-center border-t border-warmborder">
                            <span className="text-xs font-bold text-secondary">3 Destinations • 2 Stops</span>
                            <button className="bg-secondary text-white font-bold text-xs px-4 py-2 rounded-full">
                                View Timeline
                            </button>
                        </div>
                    </div>

                    <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-secondary bg-secondary/10 px-2.5 py-0.5 rounded">
                                    2 Days Spiritual
                                </span>
                                <h3 className="font-serif font-bold text-xl text-ink mt-1">Baidyanath Dham Pilgrimage</h3>
                                <p className="text-xs text-ink-light">Created on Sep 28, 2026</p>
                            </div>
                            <Compass className="w-6 h-6 text-secondary" />
                        </div>
                        <p className="text-xs text-ink-light">Deoghar Temple ➔ Trikut Ropeway ➔ Basukinath Dham</p>
                        <div className="pt-2 flex justify-between items-center border-t border-warmborder">
                            <span className="text-xs font-bold text-secondary">2 Shrines</span>
                            <button className="bg-secondary text-white font-bold text-xs px-4 py-2 rounded-full">
                                View Timeline
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: WISHLIST */}
            {activeTab === 'wishlist' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                    {wishlistedPlaces.map(dest => (
                        <DestinationCard key={dest.id} destination={dest} />
                    ))}
                </div>
            )}

            {/* TAB 3: BOOKINGS */}
            {activeTab === 'bookings' && (
                <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm max-w-2xl space-y-4 animate-fade-in">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                                Confirmed Booking
                            </span>
                            <h3 className="font-serif font-bold text-xl text-ink mt-1">Sohrai Nest Eco Cottage</h3>
                            <p className="text-xs text-ink-light">Booking Reference #JK-2026-9921</p>
                        </div>
                        <span className="font-serif font-bold text-lg text-primary">₹2,400</span>
                    </div>

                    <div className="text-xs text-ink-light space-y-1 bg-cream-dark p-3 rounded-xl">
                        <p>• Dates: Nov 14 - Nov 16, 2026 (2 Nights)</p>
                        <p>• Host: Soma & Birsa Munda</p>
                        <p>• Location: Netarhat Plateau, Latehar</p>
                    </div>
                </div>
            )}

            {/* TAB 4: SETTINGS */}
            {activeTab === 'settings' && (
                <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm max-w-2xl space-y-6 animate-fade-in">
                    <h3 className="font-serif font-bold text-xl text-ink">Preferences & Language</h3>

                    <div className="space-y-4 text-xs">
                        <div className="flex items-center justify-between p-3 bg-cream-dark rounded-xl">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                <span className="font-semibold text-ink">Portal Language</span>
                            </div>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="px-3 py-1.5 rounded-lg border border-warmborder bg-white font-semibold text-ink"
                            >
                                <option value="English">English</option>
                                <option value="Hindi">हिंदी (Hindi)</option>
                                <option value="Santhali">संथाली (Santhali)</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-cream-dark rounded-xl">
                            <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4 text-primary" />
                                <span className="font-semibold text-ink">Festival & Live Crowd SMS Alerts</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                                className="w-4 h-4 accent-primary"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
