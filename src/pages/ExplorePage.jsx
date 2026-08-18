import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DESTINATIONS, DISTRICTS } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import FilterChips from '../components/FilterChips';
import SectionHeader from '../components/SectionHeader';
import { Search, MapPin, Map, Grid, SlidersHorizontal, Compass } from 'lucide-react';

export default function ExplorePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
    const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'All Districts');
    const [viewMode, setViewMode] = useState('grid'); // grid | map
    const [nearMeActive, setNearMeActive] = useState(searchParams.get('near') === 'me');

    const filteredDestinations = useMemo(() => {
        return DESTINATIONS.filter((item) => {
            const matchesSearch = !searchQuery ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tagline.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesDist = selectedDistrict === 'All Districts' || item.district === selectedDistrict;

            return matchesSearch && matchesCat && matchesDist;
        });
    }, [searchQuery, selectedCategory, selectedDistrict]);

    const handleNearMeToggle = () => {
        setNearMeActive(!nearMeActive);
        if (!nearMeActive) {
            setSelectedDistrict('Ranchi'); // center around capital
        } else {
            setSelectedDistrict('All Districts');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header Banner */}
            <div className="bg-cream-dark rounded-3xl p-6 sm:p-10 border border-warmborder space-y-4">
                <SectionHeader
                    eyebrow="EXPLORE JHARKHAND"
                    title="Discover Waterfalls, Shrines & Santhal Villages"
                    subtitle="Filter by interest category, district location, or toggle the interactive map view."
                />

                {/* Search & Near Me Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-ink-light absolute left-3.5 top-3.5" />
                        <input
                            type="text"
                            placeholder="Search by spot name, district, or festival..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-warmborder text-xs text-ink focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        />
                    </div>

                    <button
                        onClick={handleNearMeToggle}
                        className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm ${nearMeActive
                                ? 'bg-primary text-white'
                                : 'bg-white text-secondary border border-warmborder hover:bg-cream-dark'
                            }`}
                    >
                        <MapPin className="w-4 h-4" />
                        <span>{nearMeActive ? 'Near Me Active (GPS: Ranchi)' : 'Near Me Locator'}</span>
                    </button>

                    {/* District Dropdown */}
                    <div className="relative">
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white border border-warmborder text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        >
                            {DISTRICTS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-white border border-warmborder p-1 rounded-full text-xs font-bold">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition ${viewMode === 'grid' ? 'bg-secondary text-white' : 'text-ink-light hover:text-ink'
                                }`}
                        >
                            <Grid className="w-3.5 h-3.5" />
                            <span>Grid</span>
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition ${viewMode === 'map' ? 'bg-secondary text-white' : 'text-ink-light hover:text-ink'
                                }`}
                        >
                            <Map className="w-3.5 h-3.5" />
                            <span>Map View</span>
                        </button>
                    </div>
                </div>

                {/* Category Chips */}
                <FilterChips activeCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </div>

            {/* Main Grid View */}
            {viewMode === 'grid' ? (
                <div>
                    <div className="flex items-center justify-between mb-4 text-xs text-ink-light font-semibold">
                        <span>Showing {filteredDestinations.length} destination(s) found</span>
                        {(selectedCategory !== 'all' || selectedDistrict !== 'All Districts' || searchQuery) && (
                            <button
                                onClick={() => { setSelectedCategory('all'); setSelectedDistrict('All Districts'); setSearchQuery(''); setNearMeActive(false); }}
                                className="text-primary hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>

                    {filteredDestinations.length === 0 ? (
                        <div className="text-center py-16 bg-cream-card rounded-3xl border border-warmborder space-y-3">
                            <Compass className="w-12 h-12 text-ink-muted mx-auto stroke-1" />
                            <h3 className="font-serif font-bold text-xl text-ink">No destinations found</h3>
                            <p className="text-xs text-ink-light">Try searching for "Waterfalls", "Betla", "Netarhat" or clear filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredDestinations.map((dest) => (
                                <DestinationCard key={dest.id} destination={dest} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* Styled Mock Interactive Map View Panel */
                <div className="bg-cream-card rounded-3xl border border-warmborder overflow-hidden shadow-warm-md grid grid-cols-1 lg:grid-cols-3 min-h-[550px]">
                    {/* Left Places List */}
                    <div className="p-4 overflow-y-auto space-y-3 border-r border-warmborder max-h-[550px]">
                        <h4 className="font-serif font-bold text-sm text-ink mb-2">Destinations on Map ({filteredDestinations.length})</h4>
                        {filteredDestinations.map(item => (
                            <div key={item.id} className="p-3 bg-cream rounded-xl border border-warmborder hover:border-primary cursor-pointer text-xs space-y-1">
                                <div className="flex justify-between items-center font-bold text-ink">
                                    <span>{item.name}</span>
                                    <span className="text-primary">★ {item.rating}</span>
                                </div>
                                <p className="text-[11px] text-ink-light">{item.district} ({item.distanceKm} km)</p>
                            </div>
                        ))}
                    </div>

                    {/* Right Map Canvas Simulation */}
                    <div className="lg:col-span-2 relative bg-secondary-light p-6 flex flex-col justify-between overflow-hidden">
                        {/* Top Map Controls Overlay */}
                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow border border-warmborder flex items-center justify-between text-xs">
                            <span className="font-bold text-ink">Jharkhand Tourism Geo Spatial Map</span>
                            <span className="text-[10px] text-secondary font-semibold">Live GPS Active</span>
                        </div>

                        {/* Map Pins Simulation */}
                        <div className="relative h-96 w-full flex items-center justify-center">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1F5C4F_1px,transparent_1px)] [background-size:16px_16px]" />
                            {filteredDestinations.map((item, idx) => (
                                <div
                                    key={item.id}
                                    style={{
                                        top: `${20 + (idx * 25) % 60}%`,
                                        left: `${15 + (idx * 30) % 70}%`
                                    }}
                                    className="absolute group cursor-pointer"
                                >
                                    <div className="bg-primary text-white p-2 rounded-full shadow-lg group-hover:scale-125 transition-transform flex items-center justify-center">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ink text-cream p-2 rounded-lg text-[10px] whitespace-nowrap shadow-xl z-20">
                                        <p className="font-bold text-white">{item.name}</p>
                                        <p className="text-accent">{item.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl text-center text-xs text-ink-light">
                            Interactive map Pins populated for all {filteredDestinations.length} matching locations.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
