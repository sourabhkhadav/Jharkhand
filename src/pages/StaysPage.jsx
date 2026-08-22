import React, { useState, useMemo } from 'react';
import { HOMESTAYS } from '../data/homestays';
import SectionHeader from '../components/SectionHeader';
import RatingStars from '../components/RatingStars';
import { Home, MapPin, Search, Phone, Star, ShieldCheck, Sparkles, Filter, Wifi, Coffee, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

export default function StaysPage({ onOpenBooking }) {
    const [selectedDistrict, setSelectedDistrict] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const districts = ['All', 'Ranchi', 'Latehar', 'Deoghar', 'East Singhbhum', 'Ramgarh', 'Dhanbad', 'Giridih', 'Hazaribagh'];
    const stayTypes = ['All', '5-Star Luxury Hotel', 'Eco Homestay', 'Tribal Mud Architecture', 'Forest Wooden Lodge', 'Government Hill Resort', 'Waterfront Lake Resort', 'Pilgrimage Heritage Hotel'];

    const filteredStays = useMemo(() => {
        return HOMESTAYS.filter(stay => {
            const matchesDistrict = selectedDistrict === 'All' || stay.district === selectedDistrict;
            const matchesType = selectedType === 'All' || stay.type.toLowerCase().includes(selectedType.toLowerCase());
            const matchesSearch = searchQuery.trim() === '' ||
                stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stay.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stay.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDistrict && matchesType && matchesSearch;
        });
    }, [selectedDistrict, selectedType, searchQuery]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-sans">
            {/* Hero Header Banner */}
            <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-amber-900 text-cream rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-accent/40 space-y-6">
                <div className="absolute right-0 top-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

                <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>VERIFIED JHARKHAND ACCOMMODATION DIRECTORY</span>
                </div>

                <div className="max-w-3xl space-y-3">
                    <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                        Real Hotels, Eco Resorts & Tribal Homestays
                    </h1>
                    <p className="text-sm sm:text-base text-cream/90 font-light leading-relaxed">
                        Book handpicked, verified accommodations across Ranchi, Netarhat, Betla, Deoghar, Jamshedpur, Patratu, and Hazaribagh. From 5-star luxury to authentic tribal mud cottages.
                    </p>
                </div>

                {/* Quick Search Bar */}
                <div className="pt-2 max-w-xl">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search by area, hotel name, or keyword (e.g. Netarhat, Swimming Pool, Deoghar)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-accent/30 text-ink placeholder-ink-muted text-xs sm:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <Search className="w-5 h-5 text-ink-light absolute left-4" />
                    </div>
                </div>
            </div>

            {/* AREA & CATEGORY FILTERS */}
            <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm space-y-4">
                {/* Area / District Chips */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Filter by District / Area:</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        {districts.map(dist => (
                            <button
                                key={dist}
                                onClick={() => setSelectedDistrict(dist)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap border ${selectedDistrict === dist
                                    ? 'bg-primary text-white border-primary shadow-warm-sm'
                                    : 'bg-white text-ink-light border-warmborder hover:bg-cream-dark'
                                    }`}
                            >
                                {dist === 'All' ? '📍 All Districts' : dist === 'East Singhbhum' ? 'Jamshedpur' : dist}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stay Type Chips */}
                <div className="space-y-2 pt-2 border-t border-warmborder/60">
                    <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider">
                        <Filter className="w-4 h-4 text-secondary" />
                        <span>Stay Style:</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        {stayTypes.map(st => (
                            <button
                                key={st}
                                onClick={() => setSelectedType(st)}
                                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition whitespace-nowrap ${selectedType === st
                                    ? 'bg-secondary text-white shadow-sm'
                                    : 'bg-cream-dark text-ink-light border border-warmborder hover:bg-white'
                                    }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* RESULTS STATS HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-serif font-bold text-2xl text-ink">
                        Available Accommodations ({filteredStays.length})
                    </h2>
                    <p className="text-xs text-ink-light">Showing verified hotels & homestays in Jharkhand</p>
                </div>

                {(selectedDistrict !== 'All' || selectedType !== 'All' || searchQuery) && (
                    <button
                        onClick={() => { setSelectedDistrict('All'); setSelectedType('All'); setSearchQuery(''); }}
                        className="text-xs font-bold text-primary hover:underline"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>

            {/* HOTELS & STAYS GRID */}
            {filteredStays.length === 0 ? (
                <div className="bg-cream-card rounded-3xl p-12 text-center border border-warmborder space-y-4">
                    <Home className="w-12 h-12 text-ink-muted mx-auto" />
                    <h3 className="font-serif font-bold text-xl text-ink">No Stays Found</h3>
                    <p className="text-xs text-ink-light">Try selecting a different district or clearing your search term.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredStays.map(stay => (
                        <div
                            key={stay.id}
                            className="bg-cream-card rounded-3xl border border-warmborder overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Stay Photo */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark">
                                    <img
                                        src={stay.image}
                                        alt={stay.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-bold px-3 py-1 rounded-full shadow">
                                        {stay.type}
                                    </span>
                                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-ink text-xs font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                        <span>{stay.rating}</span>
                                        <span className="text-[10px] text-ink-muted">({stay.reviewsCount})</span>
                                    </span>
                                </div>

                                {/* Content Details */}
                                <div className="p-6 space-y-3">
                                    <div className="space-y-1">
                                        <h3 className="font-serif font-bold text-xl text-ink leading-snug group-hover:text-primary transition-colors">
                                            {stay.name}
                                        </h3>
                                        <p className="text-xs font-medium text-ink-light flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span>{stay.location}</span>
                                        </p>
                                    </div>

                                    <p className="text-xs text-ink-light line-clamp-2 leading-relaxed">
                                        {stay.description}
                                    </p>

                                    {/* Amenities Badges */}
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {stay.amenities.map(a => (
                                            <span key={a} className="bg-cream-dark text-ink-light border border-warmborder text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                                                ✓ {a}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Address & Host Note */}
                                    <div className="pt-2 border-t border-warmborder/60 text-[11px] text-ink-muted space-y-0.5">
                                        <p><strong>Host / Managed by:</strong> {stay.host}</p>
                                        <p className="line-clamp-1">📍 {stay.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer Price & Action */}
                            <div className="p-6 pt-4 border-t border-warmborder bg-cream-dark/40 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] uppercase font-semibold text-ink-muted block">Starting From</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-serif font-bold text-2xl text-primary">₹{stay.pricePerNight}</span>
                                        <span className="text-[11px] text-ink-muted font-medium">/ night</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onOpenBooking(stay)}
                                    className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow-warm-md hover:shadow-warm-lg transition flex items-center gap-1.5"
                                >
                                    <span>Book Stay</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
