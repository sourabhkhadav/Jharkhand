import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { EXPERIENCES } from '../data/experiences';
import { ARTISANS } from '../data/artisans';
import { DESTINATION_SAFETY } from '../data/safetyData';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';
import FilterChips from '../components/FilterChips';
import { Search, MapPin, Sparkles, Compass, ShieldCheck, ArrowRight, Star, Heart, Calendar, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import heroSanthal from '../assets/hero-cultural-santhal.jpg';
import hundruWaterfall from '../assets/hundru-waterfall.jpg';

const TWO_DAY_ITINERARIES = [
    {
        id: 'ranchi',
        days: '2 Days',
        title: 'Ranchi',
        subtitle: 'Hundru & Dassam waterfalls exploration trail',
        image: hundruWaterfall,
        path: '/explore?district=Ranchi'
    },
    {
        id: 'netarhat',
        days: '2 Days',
        title: 'Netarhat',
        subtitle: 'Queen of Chotanagpur pine valley & sunset retreat',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        path: '/explore?district=Latehar'
    },
    {
        id: 'deoghar',
        days: '2 Days',
        title: 'Deoghar',
        subtitle: 'Baidyanath Dham 12th Jyotirlinga spiritual journey',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        path: '/explore?district=Deoghar'
    },
    {
        id: 'betla',
        days: '2 Days',
        title: 'Latehar (Betla)',
        subtitle: 'Project Tiger safari & Chero fort ruins exploration',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
        path: '/explore?district=Latehar'
    },
    {
        id: 'patratu',
        days: '2 Days',
        title: 'Patratu',
        subtitle: 'Serpentine valley drive & dam lake speedboats',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
        path: '/explore?district=Ramgarh'
    }
];

const EXQUISITE_CRAFTS = [
    {
        id: 'sohrai',
        district: 'Hazaribagh',
        title: 'Sohrai & Khovar Mud Art',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
        path: '/marketplace'
    },
    {
        id: 'dokra',
        district: 'Khunti',
        title: 'Dokra Brass Metal Casting',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        path: '/marketplace'
    },
    {
        id: 'tussar',
        district: 'Seraikela',
        title: 'Kuchai Tussar Silk Saree',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        path: '/marketplace'
    },
    {
        id: 'bamboo',
        district: 'Dumka',
        title: 'Tribal Bamboo Lattice Lamp',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        path: '/marketplace'
    },
    {
        id: 'terracotta',
        district: 'Ranchi',
        title: 'Ancient Terracotta Carvings',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
        path: '/marketplace'
    }
];

const JHARKHAND_ATTRACTIONS = [
    {
        id: 'hundru',
        name: 'Hundru Waterfalls',
        district: 'Ranchi',
        image: hundruWaterfall,
        path: '/explore?district=Ranchi'
    },
    {
        id: 'patratu',
        name: 'Patratu Valley',
        district: 'Ramgarh',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
        path: '/explore?district=Ramgarh'
    },
    {
        id: 'netarhat',
        name: 'Netarhat Sunrise',
        district: 'Latehar',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        path: '/explore?district=Latehar'
    },
    {
        id: 'baidyanath',
        name: 'Baidyanath Dham',
        district: 'Deoghar',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
        path: '/explore?district=Deoghar'
    },
    {
        id: 'betla',
        name: 'Betla National Park',
        district: 'Palamu',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80',
        path: '/explore?district=Latehar'
    },
    {
        id: 'jonha',
        name: 'Jonha Waterfalls',
        district: 'Ranchi',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
        path: '/explore?district=Ranchi'
    }
];

const TRIBAL_EXPERIENCES = [
    {
        id: 'sohrai',
        title: 'Sohrai & Khovar Mud Mural Workshop',
        subtitle: 'Learn ancient GI-tagged wall painting techniques from Santhal elder women using natural clay earth pigments.',
        location: 'Hazaribagh, Jharkhand',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
        path: '/marketplace'
    },
    {
        id: 'sarhul',
        title: 'Sarhul Spring Festival & Chhau Dance',
        subtitle: 'Witness the energetic martial moves of Seraikela Chhau dancers wearing traditional hand-carved papier-mâché masks.',
        location: 'Seraikela, Jharkhand',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
        path: '/explore?district=Seraikela'
    },
    {
        id: 'saranda',
        title: "Saranda 'Seven Hundred Hills' Forest Trail",
        subtitle: "Explore Asia's largest Sal tree forest canopy, inhabited by wild elephant herds and ancient Munda tribal hamlets.",
        location: 'West Singhbhum, Jharkhand',
        image: 'https://images.unsplash.com/photo-1511497584788-876761c11969?auto=format&fit=crop&w=1400&q=80',
        path: '/explore?district=WestSinghbhum'
    },
    {
        id: 'bamboo',
        title: 'Eco-Bamboo Weaving & Crafting Village',
        subtitle: 'Transform raw green bamboo splits into eco-friendly baskets, lampshades, and table mats with indigenous artisans.',
        location: 'Dumka, Jharkhand',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=80',
        path: '/marketplace'
    }
];

export default function LandingPage({ onOpenBooking }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [experienceIndex, setExperienceIndex] = useState(0);
    const navigate = useNavigate();
    const craftScrollRef = useRef(null);
    const itineraryScrollRef = useRef(null);
    const attractionScrollRef = useRef(null);

    const handleCraftScroll = (direction) => {
        if (craftScrollRef.current) {
            const { scrollLeft, clientWidth } = craftScrollRef.current;
            const scrollAmount = clientWidth * 0.75;
            craftScrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleItineraryScroll = (direction) => {
        if (itineraryScrollRef.current) {
            const { scrollLeft, clientWidth } = itineraryScrollRef.current;
            const scrollAmount = clientWidth * 0.75;
            itineraryScrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleAttractionScroll = (direction) => {
        if (attractionScrollRef.current) {
            const { scrollLeft, clientWidth } = attractionScrollRef.current;
            const scrollAmount = clientWidth * 0.75;
            attractionScrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

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
                    <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-cream">
                        <div className="border-r border-cream/20 pr-2">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent drop-shadow">50+</p>
                            <p className="text-[11px] uppercase font-semibold tracking-wider text-cream/90 mt-0.5">Waterfalls & Springs</p>
                        </div>
                        <div className="sm:border-r border-cream/20 pr-2">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent drop-shadow">1,000 sq km</p>
                            <p className="text-[11px] uppercase font-semibold tracking-wider text-cream/90 mt-0.5">Sal Forest Reserve</p>
                        </div>
                        <div className="border-r border-cream/20 pr-2">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent drop-shadow">32 Tribes</p>
                            <p className="text-[11px] uppercase font-semibold tracking-wider text-cream/90 mt-0.5">Living Traditions</p>
                        </div>
                        <div className="pl-2">
                            <p className="font-serif text-xl sm:text-2xl font-bold text-accent drop-shadow">3,700 ft</p>
                            <p className="text-[11px] uppercase font-semibold tracking-wider text-cream/90 mt-0.5">Netarhat Plateau</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED DESTINATIONS BY INTEREST — INTERACTIVE FILTER GRID */}
            <section className="py-14 sm:py-20 bg-cream-card border-b border-warmborder relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Section Header — Giant Font Size with Short 2-Line Text (Matching Image 1 Scale) */}
                    <div className="text-center space-y-3 mb-10 max-w-4xl mx-auto">
                        <p className="font-sans text-[#999999] font-light text-xs sm:text-sm tracking-[0.25em] uppercase flex items-center justify-center gap-3">
                            <span className="w-8 sm:w-12 h-[1px] bg-gray-300"></span>
                            <span>UNCOVER JHARKHAND</span>
                            <span className="w-8 sm:w-12 h-[1px] bg-gray-300"></span>
                        </p>
                        <h2 className="font-sans font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[#CCCCCC] leading-none drop-shadow-sm space-y-1">
                            <span className="block">EXPLORE</span>
                            <span className="block">DESTINATIONS</span>
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-ink-light leading-relaxed max-w-xl mx-auto font-normal pt-2">
                            Select a category below to discover waterfalls, ancient shrines, wildlife reserves, or tribal heritage spots.
                        </p>
                    </div>

                    {/* Filter Chips Bar */}
                    <div className="flex justify-start sm:justify-center overflow-x-auto scrollbar-none py-1">
                        <FilterChips activeCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                    </div>

                    {/* Live Filtered Destination Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
                        {filteredDestinations.map((dest) => (
                            <DestinationCard key={dest.id} destination={dest} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center pt-2">
                        <Link
                            to={`/explore${selectedCategory !== 'all' ? `?cat=${selectedCategory}` : ''}`}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-full shadow-warm-md transition hover:scale-105"
                        >
                            <span>Browse All Destinations</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* INCREDIBLE INDIA ATTRACTIONS SECTION — UNIFIED WARM LIGHT CREAM BACKGROUND */}
            <section className="py-12 sm:py-16 bg-cream relative overflow-hidden border-b border-warmborder">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2 mb-10">
                    <h2 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[#4FA8DE] drop-shadow-sm">
                        ATTRACTIONS
                    </h2>
                    <p className="font-sans text-lg sm:text-2xl font-light tracking-widest text-[#5584A6]">
                        — worth a thousand stories —
                    </p>
                </div>

                {/* Tall Portrait Full-Image Carousel — 4 CARDS PERFECTLY FITTED & SMOOTH */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={attractionScrollRef}
                        className="flex items-center justify-start lg:justify-between gap-4 sm:gap-5 lg:gap-6 overflow-x-auto scrollbar-none py-4 px-1 snap-x snap-mandatory scroll-smooth"
                    >
                        {JHARKHAND_ATTRACTIONS.map((spot) => (
                            <div
                                key={spot.id}
                                onClick={() => navigate(spot.path)}
                                className="flex-shrink-0 w-[265px] sm:w-[275px] h-[450px] sm:h-[490px] rounded-3xl overflow-hidden shadow-2xl relative cursor-pointer group border border-black/10 snap-center bg-black/10 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Full-Height Portrait Image */}
                                <img
                                    src={spot.image}
                                    alt={spot.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Dark Gradient Vignette Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                {/* White Bold Title At Bottom of Card */}
                                <h3 className="absolute bottom-6 left-4 right-4 text-center font-sans font-bold text-xl sm:text-2xl text-white drop-shadow-md leading-snug">
                                    {spot.name}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows & Discover More Red Button */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-6">
                        {/* Scroll Arrows */}
                        <div className="flex items-center justify-center gap-6 text-black/80">
                            <button
                                onClick={() => handleAttractionScroll('left')}
                                className="p-2 hover:scale-125 transition text-black font-bold"
                                aria-label="Previous Attraction"
                            >
                                <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
                            </button>
                            <button
                                onClick={() => handleAttractionScroll('right')}
                                className="p-2 hover:scale-125 transition text-black font-bold"
                                aria-label="Next Attraction"
                            >
                                <ChevronRight className="w-8 h-8 stroke-[2.5]" />
                            </button>
                        </div>

                        {/* Red Discover More Button */}
                        <Link
                            to="/explore"
                            className="bg-[#e31b23] hover:bg-[#c9151c] text-white font-sans font-bold text-sm px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105"
                        >
                            Discover more
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2-DAY ITINERARIES CAROUSEL — INCREDIBLE INDIA OVAL PILL STYLE */}
            <section className="bg-cream py-16 sm:py-20 border-b border-warmborder relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">CURATED WEEKEND GETAWAYS</span>
                        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ink">Popular 48-Hour Itineraries</h2>
                        <p className="text-sm text-ink-light font-light">Handpicked 2-day travel circuits designed for weekend explorers and culture seekers.</p>
                    </div>

                    {/* Oval Cards Grid / Slider */}
                    <div
                        ref={itineraryScrollRef}
                        className="flex items-start gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-2 px-1 snap-x snap-mandatory scroll-smooth"
                    >
                        {TWO_DAY_ITINERARIES.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className="flex-shrink-0 flex flex-col items-center group cursor-pointer snap-center"
                            >
                                {/* Oval Pill Shaped Image Card */}
                                <div className="w-[190px] sm:w-[230px] h-[310px] sm:h-[370px] rounded-[95px] sm:rounded-[115px] overflow-hidden border-2 border-warmborder/80 shadow-warm-md group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 relative bg-cream-card flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                {/* Captions Below Oval Pill */}
                                <div className="mt-4 text-center space-y-1">
                                    <span className="text-primary font-bold text-xs sm:text-sm tracking-wider uppercase block font-sans">
                                        {item.days}
                                    </span>
                                    <h3 className="font-serif font-bold text-lg sm:text-xl text-ink group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-ink-light leading-relaxed max-w-[190px] mx-auto font-light line-clamp-2 font-sans">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Centered Navigation Arrows */}
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <button
                            onClick={() => handleItineraryScroll('left')}
                            className="w-10 h-10 rounded-full border border-warmborder bg-white text-ink hover:bg-primary hover:text-white flex items-center justify-center transition shadow-warm-sm hover:scale-105"
                            aria-label="Previous Itinerary"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleItineraryScroll('right')}
                            className="w-10 h-10 rounded-full border border-warmborder bg-white text-ink hover:bg-primary hover:text-white flex items-center justify-center transition shadow-warm-sm hover:scale-105"
                            aria-label="Next Itinerary"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* INCREDIBLE INDIA LESSER KNOWN WONDERS / LIVING TRIBAL EXPERIENCES (100% MATCHING USER SCREENSHOTS) */}
            <section className="py-16 sm:py-24 bg-cream relative overflow-hidden border-b border-warmborder">
                {/* Header Banner */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1 mb-12">
                    <p className="font-sans text-primary font-bold text-lg sm:text-2xl tracking-widest uppercase">
                        Uncover Jharkhand's
                    </p>
                    <h2 className="font-sans font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[#4FA8DE] leading-none drop-shadow-sm">
                        LIVING TRIBAL EXPERIENCES
                    </h2>
                </div>

                {/* 3-Box Side-Peeking Carousel */}
                <div className="max-w-[1400px] mx-auto px-2 sm:px-4">
                    {(() => {
                        const expPrevIndex = experienceIndex === 0 ? TRIBAL_EXPERIENCES.length - 1 : experienceIndex - 1;
                        const expNextIndex = experienceIndex === TRIBAL_EXPERIENCES.length - 1 ? 0 : experienceIndex + 1;
                        const activeExp = TRIBAL_EXPERIENCES[experienceIndex];
                        const prevExp = TRIBAL_EXPERIENCES[expPrevIndex];
                        const nextExp = TRIBAL_EXPERIENCES[expNextIndex];

                        return (
                            <div className="relative flex items-center justify-center gap-4 sm:gap-6">
                                {/* LEFT PEEKING BOX (PREVIOUS EXPERIENCE — SMALLER PREVIEW) */}
                                <div
                                    onClick={() => setExperienceIndex(expPrevIndex)}
                                    className="hidden md:block w-[150px] sm:w-[190px] lg:w-[220px] h-[220px] sm:h-[270px] lg:h-[310px] rounded-[22px] sm:rounded-[28px] overflow-hidden opacity-30 hover:opacity-70 blur-[0.5px] hover:blur-none transition-all duration-500 cursor-pointer flex-shrink-0 border border-warmborder relative shadow-md group transform -translate-x-2 scale-85"
                                >
                                    <img
                                        src={prevExp.image}
                                        alt={prevExp.title}
                                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 z-10 text-white">
                                        <p className="font-sans font-extrabold text-lg text-[#F59E0B] drop-shadow">{prevExp.title.split(' ')[0]}</p>
                                        <p className="text-[10px] text-white/80 font-light truncate max-w-[130px]">{prevExp.location}</p>
                                    </div>
                                </div>

                                {/* CENTER MAIN SPOTLIGHT BOX (ACTIVE EXPERIENCE — GIGANTIC ULTRA-FOCUSED MAIN PHOTO) */}
                                <div
                                    onClick={() => navigate(activeExp.path)}
                                    className="w-full max-w-4xl lg:max-w-5xl h-[420px] sm:h-[500px] lg:h-[540px] rounded-[36px] sm:rounded-[44px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative cursor-pointer group transition-all duration-700 border-4 border-white/40 bg-ink flex-shrink-0 z-20 scale-100"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={activeExp.image}
                                        alt={activeExp.title}
                                        className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-1000"
                                    />

                                    {/* Vignette Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                                    {/* Bottom Left Title & Subtitle (Golden Title + White Text) */}
                                    <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 max-w-2xl text-white space-y-2 text-left">
                                        <h3 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-[#F59E0B] drop-shadow-xl tracking-tight leading-tight">
                                            {activeExp.title}
                                        </h3>
                                        <p className="text-xs sm:text-base text-white/95 font-light leading-relaxed drop-shadow font-sans">
                                            {activeExp.subtitle}
                                        </p>
                                    </div>

                                    {/* Bottom Right Location Pin Badge (Matches Red Pin Screenshot) */}
                                    <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-10">
                                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold border border-white/30 shadow-xl font-sans">
                                            <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
                                            <span>{activeExp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT PEEKING BOX (NEXT EXPERIENCE — SMALLER PREVIEW) */}
                                <div
                                    onClick={() => setExperienceIndex(expNextIndex)}
                                    className="hidden md:block w-[150px] sm:w-[190px] lg:w-[220px] h-[220px] sm:h-[270px] lg:h-[310px] rounded-[22px] sm:rounded-[28px] overflow-hidden opacity-30 hover:opacity-70 blur-[0.5px] hover:blur-none transition-all duration-500 cursor-pointer flex-shrink-0 border border-warmborder relative shadow-md group transform translate-x-2 scale-85"
                                >
                                    <img
                                        src={nextExp.image}
                                        alt={nextExp.title}
                                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 z-10 text-white">
                                        <p className="font-sans font-extrabold text-lg text-[#F59E0B] drop-shadow">{nextExp.title.split(' ')[0]}</p>
                                        <p className="text-[10px] text-white/80 font-light truncate max-w-[130px]">{nextExp.location}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Navigation Controls & Red Discover More Button */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-6">
                        {/* Chevron Arrows */}
                        <div className="flex items-center justify-center gap-6 text-black">
                            <button
                                onClick={() => setExperienceIndex(prev => prev === 0 ? TRIBAL_EXPERIENCES.length - 1 : prev - 1)}
                                className="p-2 hover:scale-125 transition text-black font-bold"
                                aria-label="Previous Experience"
                            >
                                <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
                            </button>
                            <button
                                onClick={() => setExperienceIndex(prev => prev === TRIBAL_EXPERIENCES.length - 1 ? 0 : prev + 1)}
                                className="p-2 hover:scale-125 transition text-black font-bold"
                                aria-label="Next Experience"
                            >
                                <ChevronRight className="w-8 h-8 stroke-[2.5]" />
                            </button>
                        </div>

                        {/* Red Discover More Button */}
                        <Link
                            to="/experiences"
                            className="bg-[#e31b23] hover:bg-[#c9151c] text-white font-sans font-bold text-sm px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105"
                        >
                            Discover more
                        </Link>
                    </div>
                </div>
            </section>

            {/* AI ITINERARY PLANNER TEASER — PERFECTLY BALANCED EMERALD & GOLD BANNER */}
            <section className="bg-cream py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-[#123927] via-[#0B2519] to-[#17432E] text-cream rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 border-2 border-[#D4AF37]/35">
                        {/* Decorative Ambient Radial Glow */}
                        <div className="absolute -top-28 -right-28 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                        {/* Left Column Content — Balanced Headline & Typography */}
                        <div className="space-y-5 max-w-xl text-left z-10">
                            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#F3E5AB] backdrop-blur-md uppercase tracking-wider">
                                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                <span>Smart Digital Travel Assistant</span>
                            </div>
                            <h2 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-5xl text-white tracking-tight leading-tight drop-shadow-md">
                                Plan Your Custom Jharkhand Itinerary in Seconds
                            </h2>
                            <p className="text-sm sm:text-base text-cream/90 font-light leading-relaxed">
                                Choose your interests — whether waterfall trekking, Baidyanath Dham pilgrimage, or Sohrai tribal craft villages — and our AI builds a day-by-day route map with local guide recommendations.
                            </p>
                            <div className="pt-3">
                                <Link
                                    to="/planner"
                                    className="inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#C5A028] text-ink font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full shadow-2xl transition-all hover:scale-105"
                                >
                                    <Sparkles className="w-4 h-4 text-ink" />
                                    <span>Launch Smart Itinerary Builder</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column — Sleek Timeline Preview Card */}
                        <div className="w-full lg:w-[420px] bg-white/95 backdrop-blur-xl text-ink p-6 sm:p-7 rounded-[28px] border border-white/80 shadow-2xl space-y-4 z-10 shrink-0">
                            <div className="flex items-center justify-between border-b border-warmborder/80 pb-3">
                                <span className="text-xs font-black uppercase tracking-wider text-primary">Sample 3-Day Trip Preview</span>
                                <span className="text-[10px] bg-secondary/15 text-secondary font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">AI Verified</span>
                            </div>
                            <div className="space-y-3 text-xs">
                                <div className="p-3 bg-cream-dark/70 rounded-2xl flex items-center justify-between border border-warmborder/60 hover:border-primary/40 transition">
                                    <div className="space-y-0.5 text-left">
                                        <p className="font-bold text-ink text-sm">Day 1: Hundru Falls & Jonha</p>
                                        <p className="text-[11px] text-ink-light font-light">Waterfall cascade trek & tribal snack</p>
                                    </div>
                                    <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full shrink-0">Ranchi</span>
                                </div>
                                <div className="p-3 bg-cream-dark/70 rounded-2xl flex items-center justify-between border border-warmborder/60 hover:border-primary/40 transition">
                                    <div className="space-y-0.5 text-left">
                                        <p className="font-bold text-ink text-sm">Day 2: Netarhat Sunrise & Pines</p>
                                        <p className="text-[11px] text-ink-light font-light">Magnolia point & eco-homestay</p>
                                    </div>
                                    <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2.5 py-1 rounded-full shrink-0">Latehar</span>
                                </div>
                                <div className="p-3 bg-cream-dark/70 rounded-2xl flex items-center justify-between border border-warmborder/60 hover:border-primary/40 transition">
                                    <div className="space-y-0.5 text-left">
                                        <p className="font-bold text-ink text-sm">Day 3: Betla Tiger Safari</p>
                                        <p className="text-[11px] text-ink-light font-light">Elephant tracking & Chero fort</p>
                                    </div>
                                    <span className="text-[10px] bg-accent/25 text-accent-dark font-bold px-2.5 py-1 rounded-full shrink-0">Betla</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INCREDIBLE INDIA EXQUISITE CRAFTS — UNIFIED LIGHT CREAM THEME */}
            <section className="relative overflow-hidden pt-12 sm:pt-16 pb-16 bg-cream border-b border-warmborder text-ink">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2 mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary block">TRIBAL HERITAGE HANDICRAFTS</span>
                    <h2 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-ink drop-shadow-sm">
                        EXQUISITE CRAFTS
                    </h2>
                    <p className="font-sans text-base sm:text-xl font-light tracking-widest text-ink-light">
                        — of timeless tradition —
                    </p>
                </div>

                {/* Craft Cards Carousel Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={craftScrollRef}
                        className="flex items-stretch gap-6 overflow-x-auto scrollbar-none py-2 px-1 snap-x snap-mandatory scroll-smooth"
                    >
                        {EXQUISITE_CRAFTS.map((craft) => (
                            <div
                                key={craft.id}
                                onClick={() => navigate(craft.path)}
                                className="flex-shrink-0 w-[270px] sm:w-[290px] bg-white rounded-2xl overflow-hidden shadow-warm-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group border border-warmborder snap-center"
                            >
                                <div>
                                    {/* Image Top Half */}
                                    <div className="w-full h-48 sm:h-52 overflow-hidden bg-cream-dark">
                                        <img
                                            src={craft.image}
                                            alt={craft.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Off-White/White Bottom Half Content */}
                                    <div className="p-6 text-left space-y-1.5 bg-white">
                                        <span className="text-primary font-bold text-xs sm:text-sm uppercase tracking-wider block font-sans">
                                            {craft.district}
                                        </span>
                                        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-ink leading-snug tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {craft.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrow Controls (Previous / Next) */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <button
                            onClick={() => handleCraftScroll('left')}
                            className="w-11 h-11 rounded-full bg-primary text-white hover:bg-primary-dark hover:scale-110 flex items-center justify-center transition shadow-lg border border-warmborder/30"
                            aria-label="Previous Crafts"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => handleCraftScroll('right')}
                            className="w-11 h-11 rounded-full bg-primary text-white hover:bg-primary-dark hover:scale-110 flex items-center justify-center transition shadow-lg border border-warmborder/30"
                            aria-label="Next Crafts"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </section>

            {/* LIVE DESTINATION CROWDING & SAFETY STATUS — CLEAN OFFICIAL TOURISM WIDGET */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-cream-dark/60 rounded-3xl p-6 sm:p-8 border border-warmborder shadow-warm-sm space-y-6">
                    {/* Header Row — Official Badge & Clean Headline */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-warmborder/70 pb-5">
                        <div className="space-y-1 text-left">
                            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-primary uppercase font-sans">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Official Tourist Safety Advisory</span>
                            </div>
                            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-ink">
                                Live Destination Crowding Status
                            </h3>
                            <p className="text-xs sm:text-sm text-ink-light font-light">
                                Monitored by Jharkhand Tourism Development Corporation (JTDC) & District Authorities.
                            </p>
                        </div>

                        <Link
                            to="/safety"
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-3 rounded-full shadow-warm-md transition hover:scale-105 shrink-0 self-start sm:self-auto font-sans"
                        >
                            <span>View Live Map & Advisory Feed</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Destination Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                        {DESTINATION_SAFETY.map((spot) => {
                            const isGreen = spot.level === 'green';
                            const isYellow = spot.level === 'yellow';

                            return (
                                <div
                                    key={spot.id}
                                    onClick={() => navigate('/safety')}
                                    className="bg-white p-3.5 sm:p-4 rounded-xl border border-warmborder shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 text-left group"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="font-sans font-bold text-ink text-sm truncate group-hover:text-primary transition-colors">
                                            {spot.name}
                                        </p>
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${isGreen ? 'bg-emerald-500' : isYellow ? 'bg-amber-500' : 'bg-rose-500'
                                                }`}
                                        />
                                    </div>
                                    <p className="text-xs text-ink-light font-medium">
                                        {spot.status}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
