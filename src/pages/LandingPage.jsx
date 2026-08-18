import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { EXPERIENCES } from '../data/experiences';
import { ARTISANS } from '../data/artisans';
import { DESTINATION_SAFETY } from '../data/safetyData';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';
import FilterChips from '../components/FilterChips';
import { Search, MapPin, Sparkles, Compass, ShieldCheck, ArrowRight, Star, Heart, Calendar, Play } from 'lucide-react';
import heroSanthal from '../assets/hero-cultural-santhal.jpg';

export default function LandingPage({ onOpenBooking }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const filteredDestinations = selectedCategory === 'all'
        ? DESTINATIONS.slice(0, 6)
        : DESTINATIONS.filter(d => d.category === selectedCategory).slice(0, 6);

    return (
        <div className="pb-16">
            {/* HERO SECTION — Full Viewport (100vh) Editorial Hero with Santhal Cultural Image */}
            <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-hidden bg-ink pt-8 pb-12">
                {/* Background Image with Dark Vignette Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroSanthal}
                        alt="Santhal Tribal Dance & Cultural Heritage Jharkhand"
                        className="w-full h-full object-cover object-center scale-105 filter brightness-90 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60" />
                </div>

                {/* Hero Content Box */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 pt-6 my-auto">
                    {/* Eyebrow Badge */}
                    <div className="inline-flex items-center gap-2 bg-cream/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-cream/30 shadow-lg animate-fade-in">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-xs uppercase font-bold tracking-widest text-cream">Discover the Untamed Beauty</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-cream tracking-tight leading-tight drop-shadow-md">
                        Discover the Soul of <span className="text-primary italic">Jharkhand</span>
                    </h1>

                    {/* Search Bar & Near Me Bar */}
                    <div className="max-w-3xl mx-auto bg-cream/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl sm:rounded-full shadow-2xl border border-warmborder flex flex-col sm:flex-row items-center gap-3 text-ink">
                        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 px-3 w-full">
                            <Search className="w-5 h-5 text-primary flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Where do you want to explore? (e.g. Hundru, Netarhat, Betla)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-2 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
                            />
                        </form>

                        <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-warmborder pt-2 sm:pt-0 sm:pl-3">
                            <button
                                type="button"
                                onClick={() => navigate('/explore?near=me')}
                                className="flex items-center justify-center gap-1.5 bg-cream-dark hover:bg-warmborder text-secondary text-xs font-semibold px-4 py-3 rounded-full transition w-full sm:w-auto whitespace-nowrap"
                            >
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Near Me</span>
                            </button>

                            <button
                                onClick={handleSearchSubmit}
                                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow-warm-md transition w-full sm:w-auto whitespace-nowrap"
                            >
                                Explore Destinations
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Strip */}
                    <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-cream/80 text-xs">
                        <div className="border-r border-cream/20">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent">50+</p>
                            <p className="text-[11px] uppercase tracking-wider">Waterfalls & Springs</p>
                        </div>
                        <div className="sm:border-r border-cream/20">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent">1,000 sq km</p>
                            <p className="text-[11px] uppercase tracking-wider">Sal Forest Reserve</p>
                        </div>
                        <div className="border-r border-cream/20">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent">32 Tribes</p>
                            <p className="text-[11px] uppercase tracking-wider">Living Traditions</p>
                        </div>
                        <div>
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent">3,700 ft</p>
                            <p className="text-[11px] uppercase tracking-wider">Netarhat Plateau</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORY CHIPS STRIP — Appears Cleanly On Scroll */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-cream-card rounded-3xl p-4 sm:p-6 border border-warmborder shadow-warm-sm">
                    <FilterChips activeCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                </div>
            </section>

            {/* DESTINATIONS STORY CARDS (MIRROR INCREDIBLE INDIA) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="DESTINATIONS FOR EVERY BUCKET LIST"
                    title="Jharkhand’s Most Iconic Treasures"
                    subtitle="Handpicked eco-destinations, mountain vistas, and spiritual sanctuaries across the 24 districts."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((dest) => (
                        <DestinationCard key={dest.id} destination={dest} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        to="/explore"
                        className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-warm-md transition"
                    >
                        <span>View All 24 Districts Directory</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* EXPERIENCES SHOWCASE */}
            <section className="bg-cream-dark py-16 border-y border-warmborder">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="IMMERSIVE HERITAGE"
                        title="Living Tribal Experiences"
                        subtitle="Don't just observe — participate in centuries-old Sohrai mud wall painting, Chhau mask dancing, and forest homestays."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {EXPERIENCES.map((exp) => (
                            <div key={exp.id} className="bg-cream-card rounded-2xl border border-warmborder overflow-hidden shadow-warm-sm hover:shadow-warm-md transition flex flex-col justify-between">
                                <div>
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                                        <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                            {exp.category}
                                        </span>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <h3 className="font-serif font-bold text-base text-ink line-clamp-1">{exp.title}</h3>
                                        <p className="text-xs text-ink-light leading-relaxed line-clamp-2">{exp.description}</p>
                                    </div>
                                </div>

                                <div className="p-4 pt-0 border-t border-warmborder/60 flex items-center justify-between">
                                    <span className="text-xs font-bold text-primary">{exp.price}</span>
                                    <button
                                        onClick={() => onOpenBooking(exp)}
                                        className="text-xs font-bold text-secondary hover:text-secondary-dark transition underline"
                                    >
                                        Reserve Experience
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI ITINERARY PLANNER TEASER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-secondary text-cream rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border-4 border-accent/30">
                    <div className="space-y-4 max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-accent">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span>Smart Digital Travel Assistant</span>
                        </div>
                        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
                            Plan Your Custom Jharkhand Itinerary in Seconds
                        </h2>
                        <p className="text-xs sm:text-sm text-cream/90 leading-relaxed">
                            Choose your interests — whether waterfall trekking, Baidyanath Dham pilgrimage, or Sohrai tribal craft villages — and our AI builds a day-by-day route map with local guide recommendations.
                        </p>
                        <div className="pt-2 flex flex-wrap gap-3">
                            <Link
                                to="/planner"
                                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow-warm-md transition flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span>Launch Smart Itinerary Builder</span>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-96 bg-cream text-ink p-5 rounded-2xl border border-warmborder shadow-xl space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">Sample 3-Day Trip Preview</p>
                        <div className="space-y-2 text-xs">
                            <div className="p-2.5 bg-cream-dark rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-ink">Day 1: Hundru Falls & Jonha</p>
                                    <p className="text-[11px] text-ink-light">Waterfall cascade trek & tribal snack</p>
                                </div>
                                <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">Ranchi</span>
                            </div>
                            <div className="p-2.5 bg-cream-dark rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-ink">Day 2: Netarhat Sunrise & Pines</p>
                                    <p className="text-[11px] text-ink-light">Magnolia point & eco-homestay</p>
                                </div>
                                <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">Latehar</span>
                            </div>
                            <div className="p-2.5 bg-cream-dark rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-ink">Day 3: Betla Tiger Safari</p>
                                    <p className="text-[11px] text-ink-light">Elephant tracking & Chero fort</p>
                                </div>
                                <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">Betla</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTISAN MARKETPLACE TEASER STRIP */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow="DIRECT FROM TRIBAL ARTISANS"
                    title="Empowering Santhal & Munda Craftsmen"
                    subtitle="Every purchase supports GI-tagged Sohrai wall murals, Dokra lost-wax metal castings, and handspun Tussar silk."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ARTISANS.map((product) => (
                        <div key={product.id} className="bg-cream-card rounded-2xl border border-warmborder p-4 shadow-warm-sm hover:shadow-warm-md transition space-y-3 flex flex-col justify-between">
                            <div>
                                <img src={product.image} alt={product.title} className="w-full aspect-square object-cover rounded-xl mb-3" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark bg-accent/15 px-2 py-0.5 rounded">
                                    {product.badge}
                                </span>
                                <h4 className="font-serif font-bold text-sm text-ink mt-1.5 line-clamp-1">{product.title}</h4>
                                <p className="text-xs text-ink-light">{product.artisanName}</p>
                            </div>

                            <div className="flex items-center justify-between border-t border-warmborder pt-2">
                                <span className="font-serif font-bold text-sm text-primary">₹{product.price}</span>
                                <Link to="/marketplace" className="text-xs font-bold text-secondary hover:underline">
                                    Shop Artisans
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* LIVE SAFETY STATUS TEASER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-cream-dark rounded-3xl p-6 border border-warmborder space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Real-Time Tourist Safety</span>
                            <h3 className="font-serif font-bold text-xl text-ink">Live Destination Crowding Indicator</h3>
                        </div>
                        <Link to="/safety" className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">
                            <span>View Live Map & Advisory Feed</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {DESTINATION_SAFETY.map(spot => (
                            <div key={spot.id} className="bg-cream-card p-3 rounded-xl border border-warmborder text-xs space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-ink truncate">{spot.name}</span>
                                    <span className={`w-2.5 h-2.5 rounded-full ${spot.level === 'green' ? 'bg-emerald-500' : spot.level === 'yellow' ? 'bg-amber-500' : 'bg-rose-500'
                                        }`} />
                                </div>
                                <p className="text-[11px] text-ink-light">{spot.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
