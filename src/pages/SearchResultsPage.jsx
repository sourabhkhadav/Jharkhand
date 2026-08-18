import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { EXPERIENCES } from '../data/experiences';
import { ARTISANS } from '../data/artisans';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';
import { Search, Compass } from 'lucide-react';

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || searchParams.get('search') || '';

    const matchedDestinations = DESTINATIONS.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.district.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
    );

    const matchedExperiences = EXPERIENCES.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.category.toLowerCase().includes(query.toLowerCase())
    );

    const matchedArtisans = ARTISANS.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <SectionHeader
                eyebrow="GLOBAL PORTAL SEARCH"
                title={`Search Results for "${query}"`}
                subtitle={`Found ${matchedDestinations.length} destination(s), ${matchedExperiences.length} experience(s), and ${matchedArtisans.length} craft(s).`}
            />

            {matchedDestinations.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-serif font-bold text-xl text-ink">Matching Destinations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {matchedDestinations.map(d => (
                            <DestinationCard key={d.id} destination={d} />
                        ))}
                    </div>
                </div>
            )}

            {matchedDestinations.length === 0 && matchedExperiences.length === 0 && matchedArtisans.length === 0 && (
                <div className="text-center py-16 bg-cream-card rounded-3xl border border-warmborder space-y-3">
                    <Compass className="w-12 h-12 text-ink-muted mx-auto" />
                    <h3 className="font-serif font-bold text-xl text-ink">No exact matches found</h3>
                    <p className="text-xs text-ink-light">Try searching for "Hundru", "Waterfalls", "Betla", "Netarhat" or "Sohrai".</p>
                    <Link to="/explore" className="inline-block bg-primary text-white font-bold text-xs px-6 py-2.5 rounded-full">
                        Browse All Destinations
                    </Link>
                </div>
            )}
        </div>
    );
}
