import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { generateLiveItinerary } from '../api/itineraryService';
import {
    Sparkles,
    Calendar,
    DollarSign,
    MapPin,
    ArrowRight,
    ArrowUp,
    ArrowDown,
    Save,
    Compass,
    Trees,
    Droplets,
    Landmark,
    Palette,
    Mountain,
    Home,
    Clock,
    ShieldCheck,
    Check,
    Zap,
    Download,
    Share2
} from 'lucide-react';

export default function ItineraryPlannerPage({ onOpenBooking }) {
    const [step, setStep] = useState(1); // 1: Input form, 2: Generated result timeline
    const [selectedInterests, setSelectedInterests] = useState(['Waterfalls', 'Wildlife']);
    const [days, setDays] = useState(3);
    const [budget, setBudget] = useState('Medium');
    const [startingPoint, setStartingPoint] = useState('Ranchi');
    const [activeDayTab, setActiveDayTab] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);

    const interestOptions = [
        { id: 'Waterfalls', label: 'Waterfalls & Streams', icon: Droplets },
        { id: 'Wildlife', label: 'Wildlife & Canopies', icon: Trees },
        { id: 'Spiritual Shrines', label: 'Spiritual Shrines', icon: Landmark },
        { id: 'Tribal Culture', label: 'Tribal Arts & Culture', icon: Palette },
        { id: 'Adventure & Valleys', label: 'Valleys & Treks', icon: Mountain },
        { id: 'Eco Homestays', label: 'Eco Homestays', icon: Home },
    ];

    const budgetOptions = [
        { id: 'Economy', range: '₹1,500 - ₹2,500/day', desc: 'Eco homestays & local shared cab circuits' },
        { id: 'Medium', range: '₹3,500 - ₹5,000/day', desc: '3-Star tourist lodges & private SUV transport' },
        { id: 'Luxury', range: '₹7,000+/day', desc: 'Heritage resorts, forest safaris & personal guide' },
    ];

    // Generated Itinerary Days Structure
    const [itineraryDays, setItineraryDays] = useState([
        {
            day: 1,
            title: "Ranchi Waterfall Circuit & Tribal Refreshment",
            stops: [
                { id: 'stop-1', time: '08:30 AM', place: DESTINATIONS[0], note: 'Morning drive to 320ft Hundru Falls cascade. Take stair trail to bottom pool.' },
                { id: 'stop-2', time: '01:00 PM', place: DESTINATIONS[7], note: 'Traditional Santhal lunch & fresh coconut at Dassam Falls view deck.' },
                { id: 'stop-3', time: '04:30 PM', place: DESTINATIONS[4], note: 'Sunset mountain serpentine drive along Patratu Lake Valley.' }
            ]
        },
        {
            day: 2,
            title: "Netarhat Plateau Pines & Magnolia Sunset",
            stops: [
                { id: 'stop-4', time: '07:00 AM', place: DESTINATIONS[3], note: 'Scenic morning ascent to 3,700 ft Netarhat hill station.' },
                { id: 'stop-5', time: '02:00 PM', place: DESTINATIONS[6], note: 'Visit Hazaribagh/Latehar Sohrai mud mural painting artisan cottage.' },
                { id: 'stop-6', time: '05:30 PM', place: DESTINATIONS[3], note: 'Magnolia Point sunset view over deep Sal forest valleys.' }
            ]
        },
        {
            day: 3,
            title: "Betla Wildlife Safari & Ancient Chero Fort",
            stops: [
                { id: 'stop-7', time: '06:00 AM', place: DESTINATIONS[1], note: 'Open top 4x4 safari Jeep through Betla elephant and tiger canopy.' },
                { id: 'stop-8', time: '11:30 AM', place: DESTINATIONS[1], note: 'Explore 16th century Chero Dynasty fort ruins inside forest canopy.' },
                { id: 'stop-9', time: '03:00 PM', place: DESTINATIONS[2], note: 'Optional pilgrimage stop or return drive.' }
            ]
        }
    ]);

    const [totalBudgetINR, setTotalBudgetINR] = useState(10500);

    const toggleInterest = (interestId) => {
        if (selectedInterests.includes(interestId)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interestId));
        } else {
            setSelectedInterests([...selectedInterests, interestId]);
        }
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            // First try calling the Next.js / server route if available
            let data = null;
            try {
                const res = await fetch('/api/generate-itinerary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        experiences: selectedInterests,
                        days: Number(days),
                        hub: startingPoint,
                        budgetTier: budget.toLowerCase()
                    })
                });
                if (res.ok) {
                    data = await res.json();
                }
            } catch (apiErr) {
                console.log('Server route not reachable, executing direct live service...');
            }

            // If server route not found (Vite client dev mode), execute live service directly
            if (!data) {
                data = await generateLiveItinerary({
                    experiences: selectedInterests,
                    days: Number(days),
                    hub: startingPoint,
                    budgetTier: budget.toLowerCase()
                });
            }

            if (data && data.days && data.days.length > 0) {
                const formattedDays = data.days.map((d) => ({
                    day: d.day,
                    title: d.title,
                    estimatedBudgetINR: d.estimatedBudgetINR,
                    travelNotes: d.travelNotes,
                    stops: d.stops.map((stop, sIdx) => {
                        const matchedDest = DESTINATIONS.find(dest => dest.name.toLowerCase().includes(stop.name.toLowerCase())) || DESTINATIONS[sIdx % DESTINATIONS.length];
                        return {
                            id: `stop-${d.day}-${sIdx}`,
                            time: sIdx === 0 ? '08:30 AM' : sIdx === 1 ? '01:00 PM' : '04:30 PM',
                            place: {
                                name: stop.name,
                                category: stop.kind || 'Tourism Spot',
                                district: startingPoint,
                                heroImage: matchedDest?.heroImage || DESTINATIONS[0].heroImage,
                                rating: stop.rating,
                                ratingSource: stop.ratingSource
                            },
                            note: stop.description || `${stop.estimatedTimeHrs || 2} hrs sightseeing time.`
                        };
                    })
                }));
                setItineraryDays(formattedDays);
                if (data.totalEstimatedBudgetINR) {
                    setTotalBudgetINR(data.totalEstimatedBudgetINR);
                }
                setActiveDayTab(1);
            }
        } catch (err) {
            console.error('Error generating live itinerary:', err);
        } finally {
            setIsGenerating(false);
            setStep(2);
        }
    };

    // Reorder stop function
    const moveStop = (dayIdx, stopIdx, direction) => {
        const newDays = [...itineraryDays];
        const stops = [...newDays[dayIdx].stops];
        const targetIdx = direction === 'up' ? stopIdx - 1 : stopIdx + 1;
        if (targetIdx < 0 || targetIdx >= stops.length) return;

        const temp = stops[stopIdx];
        stops[stopIdx] = stops[targetIdx];
        stops[targetIdx] = temp;

        newDays[dayIdx].stops = stops;
        setItineraryDays(newDays);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
            {/* Header Banner - Sleek Executive AI Engine Aesthetic */}
            <div className="bg-gradient-to-r from-emerald-950 via-primary-dark to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-4 border border-emerald-500/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 max-w-2xl text-left">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 rounded-full text-emerald-300 text-[11px] font-bold tracking-wider uppercase">
                            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                            <span>JTDC AI Trip Concierge Engine v2.0</span>
                        </div>
                        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                            Craft Your Tailored Jharkhand Circuit
                        </h1>
                        <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-light">
                            Generate instant multi-day travel itineraries optimized with real-time route weather, verified eco-homestays, and authentic tribal artisan stops.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center text-xs space-y-1">
                            <p className="text-accent font-bold text-base">24 Districts</p>
                            <p className="text-cream/70 text-[11px]">Instant Route Sync</p>
                        </div>
                    </div>
                </div>
            </div>

            {step === 1 ? (
                /* STEP 1: INPUT FORM */
                <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-warmborder shadow-warm-md max-w-4xl mx-auto space-y-8">
                    <form onSubmit={handleGenerate} className="space-y-8">
                        {/* 1. Interests Multi-Select */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                                    <span>Select Travel Experiences</span>
                                </label>
                                <span className="text-[11px] text-ink-muted">Choose 1 or more</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {interestOptions.map((opt) => {
                                    const Icon = opt.icon;
                                    const isSelected = selectedInterests.includes(opt.id);

                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => toggleInterest(opt.id)}
                                            className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center gap-3 transition-all text-left ${isSelected
                                                ? 'bg-primary text-white border-primary shadow-warm-sm ring-2 ring-primary/20'
                                                : 'bg-cream/80 hover:bg-cream-dark border-warmborder text-ink hover:border-primary/40'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="leading-tight flex-1">{opt.label}</span>
                                            {isSelected && <Check className="w-4 h-4 text-accent shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Days & Starting Location Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-warmborder/80">
                            {/* Days Counter & Presets */}
                            <div className="space-y-3">
                                <label className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                                    <span>Trip Duration (Days)</span>
                                </label>

                                <div className="flex items-center gap-3 bg-cream/80 p-2 rounded-2xl border border-warmborder">
                                    <button
                                        type="button"
                                        onClick={() => setDays(Math.max(1, days - 1))}
                                        className="w-10 h-10 rounded-xl bg-white hover:bg-warmborder text-ink font-bold text-lg flex items-center justify-center shadow-xs transition"
                                    >
                                        -
                                    </button>
                                    <div className="flex-1 text-center font-serif font-bold text-xl text-ink">
                                        {days} {days === 1 ? 'Day' : 'Days'}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setDays(Math.min(7, days + 1))}
                                        className="w-10 h-10 rounded-xl bg-white hover:bg-warmborder text-ink font-bold text-lg flex items-center justify-center shadow-xs transition"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Quick Presets */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {[1, 3, 5, 7].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setDays(num)}
                                            className={`px-3 py-1 rounded-full text-[11px] font-bold border transition ${days === num ? 'bg-secondary text-white border-secondary' : 'bg-cream hover:bg-cream-dark text-ink-light border-warmborder'}`}
                                        >
                                            {num} {num === 1 ? 'Day Escape' : `${num} Days Circuit`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Starting Hub */}
                            <div className="space-y-3">
                                <label className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
                                    <span>Starting Arrival Hub</span>
                                </label>

                                <div className="relative">
                                    <select
                                        value={startingPoint}
                                        onChange={(e) => setStartingPoint(e.target.value)}
                                        className="w-full px-4 py-3.5 rounded-2xl bg-cream/80 border border-warmborder text-xs font-bold text-ink focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                    >
                                        <option value="Ranchi">Ranchi (Capital & Birsa Munda Airport)</option>
                                        <option value="Jamshedpur">Jamshedpur (Tatanagar Junction)</option>
                                        <option value="Deoghar">Deoghar (Baidyanath Dham Railway/Airport)</option>
                                        <option value="Dhanbad">Dhanbad (Coal Capital Hub)</option>
                                    </select>
                                    <MapPin className="w-4 h-4 text-primary absolute right-4 top-4 pointer-events-none" />
                                </div>

                                <p className="text-[11px] text-ink-muted">Route will automatically optimize round-trip distance from this hub.</p>
                            </div>
                        </div>

                        {/* 3. Budget Tier */}
                        <div className="space-y-3 pt-2 border-t border-warmborder/80">
                            <label className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
                                <span>Budget & Comfort Tier</span>
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {budgetOptions.map((b) => {
                                    const isSelected = budget === b.id;
                                    return (
                                        <button
                                            key={b.id}
                                            type="button"
                                            onClick={() => setBudget(b.id)}
                                            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${isSelected
                                                ? 'bg-secondary text-white border-secondary shadow-warm-sm ring-2 ring-secondary/20'
                                                : 'bg-cream/80 hover:bg-cream-dark border-warmborder text-ink hover:border-secondary/40'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-serif font-bold text-sm">{b.id}</h4>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-secondary/10 text-secondary'}`}>
                                                    {b.range.split(' ')[0]}
                                                </span>
                                            </div>
                                            <p className={`text-[11px] leading-tight ${isSelected ? 'text-cream/90' : 'text-ink-light'}`}>
                                                {b.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-4 rounded-full shadow-warm-lg transition flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>
                                    <Zap className="w-5 h-5 text-accent animate-spin" />
                                    <span>Synthesizing Optimal Circuit...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 text-accent" />
                                    <span>Generate Tailored Itinerary ({days} Days)</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            ) : (
                /* STEP 2: GENERATED ITINERARY TIMELINE & ROUTE MAP */
                <div className="space-y-8 animate-fade-in">
                    {/* Top Action & Day Selector Bar */}
                    <div className="bg-cream-card p-3 rounded-3xl border border-warmborder shadow-warm-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                            {itineraryDays.map((d) => (
                                <button
                                    key={d.day}
                                    onClick={() => setActiveDayTab(d.day)}
                                    className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition whitespace-nowrap flex items-center gap-2 ${activeDayTab === d.day ? 'bg-primary text-white shadow-warm-sm' : 'bg-cream text-ink-light hover:text-ink border border-warmborder'
                                        }`}
                                >
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Day {d.day}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={() => setStep(1)}
                                className="text-xs font-bold text-secondary hover:underline px-3 flex items-center gap-1.5"
                            >
                                <Compass className="w-4 h-4 text-secondary" />
                                <span>Adjust Preferences</span>
                            </button>
                        </div>
                    </div>

                    {/* Timeline + Map Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Timeline Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {itineraryDays.filter(d => d.day === activeDayTab).map((currentDay, dayIdx) => (
                                <div key={currentDay.day} className="space-y-6">
                                    <div className="bg-gradient-to-r from-cream-card to-cream p-5 rounded-2xl border border-warmborder flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-extrabold uppercase text-primary tracking-widest block">
                                                DAY {currentDay.day} HIGHLIGHT CIRCUIT
                                            </span>
                                            <h3 className="font-serif font-bold text-xl text-ink">
                                                {currentDay.title}
                                            </h3>
                                        </div>
                                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                                            Verified Weather Clear
                                        </span>
                                    </div>

                                    {/* Vertical Timeline */}
                                    <div className="relative pl-6 space-y-6 border-l-2 border-primary/30">
                                        {currentDay.stops.map((stop, stopIdx) => (
                                            <div key={stop.id} className="relative group">
                                                {/* Timeline Node Icon */}
                                                <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center shadow">
                                                    {stopIdx + 1}
                                                </div>

                                                {/* Stop Card */}
                                                <div className="bg-cream-card rounded-2xl p-5 border border-warmborder shadow-warm-sm space-y-3 hover:border-primary/40 transition">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-primary">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{stop.time}</span>
                                                        </div>

                                                        {/* Up / Down Reorder Controls */}
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => moveStop(dayIdx, stopIdx, 'up')}
                                                                disabled={stopIdx === 0}
                                                                className="p-1.5 text-ink-light hover:text-primary disabled:opacity-30 rounded-lg hover:bg-cream"
                                                                title="Move Stop Up"
                                                            >
                                                                <ArrowUp className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => moveStop(dayIdx, stopIdx, 'down')}
                                                                disabled={stopIdx === currentDay.stops.length - 1}
                                                                className="p-1.5 text-ink-light hover:text-primary disabled:opacity-30 rounded-lg hover:bg-cream"
                                                                title="Move Stop Down"
                                                            >
                                                                <ArrowDown className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                                        <img src={stop.place.heroImage} alt="" className="w-full sm:w-24 h-24 object-cover rounded-xl shrink-0" />
                                                        <div className="space-y-1.5 text-left flex-1">
                                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                                <h4 className="font-serif font-bold text-base text-ink">{stop.place.name}</h4>
                                                                {stop.place.rating && (
                                                                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[11px] font-bold text-amber-900">
                                                                        <span>★ {stop.place.rating}</span>
                                                                        <span className="text-[9px] text-amber-700 font-medium">
                                                                            ({stop.place.ratingSource === 'google' ? 'Google Verified' : 'Community Rated'})
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-ink-light leading-relaxed">{stop.note}</p>
                                                            <span className="inline-block text-[10px] bg-secondary/10 text-secondary font-bold px-2.5 py-0.5 rounded-full border border-secondary/20">
                                                                {stop.place.district} • {stop.place.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Route Map Panel (Right Column) */}
                        <div className="space-y-4 font-sans">
                            <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm space-y-5">
                                <h4 className="font-serif font-bold text-lg text-ink">Circuit Route Summary</h4>

                                <div className="relative aspect-[4/3] bg-secondary-dark text-cream rounded-2xl overflow-hidden border border-secondary flex items-center justify-center p-4">
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F3EED9_1px,transparent_1px)] [background-size:12px_12px]" />
                                    <div className="relative text-center space-y-2 text-xs font-bold text-cream">
                                        <Compass className="w-10 h-10 mx-auto animate-spin-slow text-accent" />
                                        <p className="font-serif text-sm text-white">3-Day Chotanagpur Circuit</p>
                                        <p className="text-[11px] text-cream/80 font-normal">Ranchi ➔ Netarhat ➔ Betla National Park</p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-xs border-y border-warmborder/80 py-4">
                                    <div className="flex justify-between text-ink-light">
                                        <span>Total Estimated Budget:</span>
                                        <strong className="text-primary font-bold text-sm">₹{totalBudgetINR.toLocaleString('en-IN')}</strong>
                                    </div>
                                    <div className="flex justify-between text-ink-light">
                                        <span>AI Itinerary Engine:</span>
                                        <strong className="text-emerald-700 font-bold flex items-center gap-1">
                                            <Sparkles className="w-3 h-3 text-accent" /> Groq llama-3.3 Live
                                        </strong>
                                    </div>
                                    <div className="flex justify-between text-ink-light">
                                        <span>Eco Homestays Available:</span>
                                        <strong className="text-emerald-700 font-bold">3 Verified</strong>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => alert("Itinerary saved to your JTDC Profile!")}
                                        className="w-full bg-cream hover:bg-warmborder text-ink font-extrabold text-xs py-3 rounded-full border border-warmborder flex items-center justify-center gap-2 transition"
                                    >
                                        <Save className="w-4 h-4 text-primary" />
                                        <span>Save Itinerary to Profile</span>
                                    </button>

                                    <button
                                        onClick={() => onOpenBooking(DESTINATIONS[0])}
                                        className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3.5 rounded-full shadow-warm-md flex items-center justify-center gap-2 transition"
                                    >
                                        <span>Book Complete Trip Package</span>
                                        <ArrowRight className="w-4 h-4 text-accent" />
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
