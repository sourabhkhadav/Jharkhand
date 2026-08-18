import React, { useState } from 'react';
import { HOMESTAYS } from '../data/homestays';
import { GUIDES } from '../data/guides';
import SectionHeader from '../components/SectionHeader';
import RatingStars from '../components/RatingStars';
import { Home, Compass, FileText, Calendar, Users, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';

export default function BookingPage({ onOpenBooking }) {
    const [activeTab, setActiveTab] = useState('homestays'); // homestays | guides | permits
    const [permitSubmitted, setPermitSubmitted] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header Banner */}
            <div className="bg-cream-dark rounded-3xl p-6 sm:p-10 border border-warmborder space-y-4">
                <SectionHeader
                    eyebrow="VERIFIED LOCAL SERVICES"
                    title="Homestays, Guides & Wildlife Permits"
                    subtitle="Support local tribal families directly through government-regulated homestays and certified heritage guides."
                />

                {/* Tab Switcher */}
                <div className="flex bg-white border border-warmborder p-1.5 rounded-2xl max-w-md gap-1">
                    <button
                        onClick={() => setActiveTab('homestays')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'homestays' ? 'bg-primary text-white shadow' : 'text-ink-light hover:text-ink'
                            }`}
                    >
                        <Home className="w-4 h-4" />
                        <span>Eco Homestays</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('guides')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'guides' ? 'bg-secondary text-white shadow' : 'text-ink-light hover:text-ink'
                            }`}
                    >
                        <Compass className="w-4 h-4" />
                        <span>Certified Guides</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('permits')}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'permits' ? 'bg-accent-dark text-white shadow' : 'text-ink-light hover:text-ink'
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        <span>Forest Permits</span>
                    </button>
                </div>
            </div>

            {/* TAB 1: HOMESTAYS */}
            {activeTab === 'homestays' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
                    {HOMESTAYS.map((stay) => (
                        <div key={stay.id} className="bg-cream-card rounded-3xl border border-warmborder overflow-hidden shadow-warm-md hover:shadow-warm-lg transition flex flex-col justify-between">
                            <div>
                                <div className="relative aspect-[4/3]">
                                    <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                                    <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                        {stay.type}
                                    </span>
                                </div>

                                <div className="p-5 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-serif font-bold text-lg text-ink">{stay.name}</h3>
                                        <RatingStars rating={stay.rating} size="sm" />
                                    </div>

                                    <p className="text-xs text-ink-light flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                        <span>{stay.location}</span>
                                    </p>

                                    <p className="text-xs text-ink-light line-clamp-2">{stay.description}</p>

                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {stay.amenities.map(a => (
                                            <span key={a} className="bg-cream-dark text-ink-light text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 pt-3 border-t border-warmborder flex items-center justify-between">
                                <div>
                                    <span className="font-serif font-bold text-xl text-primary">₹{stay.pricePerNight}</span>
                                    <span className="text-[10px] text-ink-muted"> / night</span>
                                </div>

                                <button
                                    onClick={() => onOpenBooking(stay)}
                                    className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-warm-sm transition"
                                >
                                    Book Stay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB 2: LOCAL GUIDES */}
            {activeTab === 'guides' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
                    {GUIDES.map((guide) => (
                        <div key={guide.id} className="bg-cream-card rounded-3xl border border-warmborder p-5 shadow-warm-md hover:shadow-warm-lg transition space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <img src={guide.photo} alt={guide.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                            {guide.badge}
                                        </span>
                                        <h3 className="font-serif font-bold text-lg text-ink mt-1">{guide.name}</h3>
                                        <RatingStars rating={guide.rating} size="sm" />
                                    </div>
                                </div>

                                <p className="text-xs text-ink-light leading-relaxed">{guide.bio}</p>

                                <div className="space-y-1 text-xs">
                                    <p className="font-semibold text-ink">Languages Spoken:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {guide.languages.map(l => (
                                            <span key={l} className="bg-secondary-light text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                {l}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-warmborder flex items-center justify-between">
                                <div>
                                    <span className="font-serif font-bold text-lg text-secondary">₹{guide.pricePerDay}</span>
                                    <span className="text-[10px] text-ink-muted"> / day</span>
                                </div>

                                <button
                                    onClick={() => onOpenBooking(guide)}
                                    className="bg-secondary hover:bg-secondary-dark text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-warm-sm transition"
                                >
                                    Hire Guide
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB 3: FOREST PERMITS */}
            {activeTab === 'permits' && (
                <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-warmborder shadow-warm-md max-w-2xl mx-auto space-y-6 animate-fade-in">
                    {permitSubmitted ? (
                        <div className="text-center py-8 space-y-4">
                            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                            <h3 className="font-serif font-bold text-2xl text-ink">Govt Wildlife Permit Issued</h3>
                            <p className="text-xs text-ink-light">Permit Pass <strong>#BETLA-PERMIT-8842</strong> has been logged with Latehar Forest Division. Present barcode upon Betla Tiger Reserve Entry Gate.</p>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); setPermitSubmitted(true); }} className="space-y-4 text-xs">
                            <div className="space-y-1">
                                <h3 className="font-serif font-bold text-xl text-ink">Apply Betla / Saranda Wildlife Safari Permit</h3>
                                <p className="text-ink-light">Official Department of Forest, Environment & Climate Change portal.</p>
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1">Select Forest Reserve Zone</label>
                                <select className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink font-sans">
                                    <option>Betla National Park Core Safari Zone</option>
                                    <option>Saranda 700-Hills Elephant Corridor</option>
                                    <option>Palamau Tiger Reserve Buffer Zone</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-ink mb-1">Safari Visit Date</label>
                                    <input type="date" required className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink" />
                                </div>
                                <div>
                                    <label className="block font-semibold text-ink mb-1">Number of Visitors</label>
                                    <input type="number" min="1" max="6" defaultValue="2" required className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink" />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1">Lead Traveller Govt ID Number (Aadhaar / Voter ID)</label>
                                <input type="text" placeholder="XXXX - XXXX - XXXX" required className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink" />
                            </div>

                            <div className="p-3 bg-cream-dark rounded-xl border border-warmborder text-[11px] text-ink-light space-y-1">
                                <p className="font-bold text-ink">Safari Guidelines:</p>
                                <p>• Plastic bottles prohibited inside core tiger reserve.</p>
                                <p>• Safari timings: Morning 6:00 AM - 9:30 AM | Afternoon 2:30 PM - 5:30 PM.</p>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-accent-dark hover:bg-accent text-white font-bold text-xs py-3 rounded-full shadow-warm-md transition"
                            >
                                Generate Permit Pass (₹100 Fee)
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
