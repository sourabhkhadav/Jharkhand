import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Shield } from 'lucide-react';

export default function DestinationCard({ destination }) {
    const { id, name, district, category, rating, reviewsCount, distanceKm, tagline, heroImage, crowdLevel, crowdStatus } = destination;

    const crowdColors = {
        green: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        yellow: 'bg-amber-100 text-amber-800 border-amber-300',
        red: 'bg-rose-100 text-rose-800 border-rose-300',
    };

    return (
        <div className="group bg-cream-card rounded-2xl border border-warmborder overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-all duration-300 flex flex-col h-full">
            {/* Image Banner */}
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <img
                    src={heroImage}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2">
                    <span className="bg-secondary/90 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow">
                        {category}
                    </span>
                    <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border backdrop-blur-md ${crowdColors[crowdLevel] || crowdColors.green}`}>
                        Live: {crowdStatus}
                    </div>
                </div>

                {/* Distance Badge */}
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium tracking-tight flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{district} ({distanceKm} km from capital)</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-serif font-bold text-lg text-ink tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1 bg-accent/15 px-2 py-0.5 rounded text-xs font-semibold text-ink">
                            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                            <span>{rating}</span>
                        </div>
                    </div>
                    <p className="text-xs text-ink-light leading-relaxed line-clamp-2">
                        {tagline}
                    </p>
                </div>

                <div className="pt-2 border-t border-warmborder/60 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink-muted">{reviewsCount} tourist reviews</span>
                    <Link
                        to={`/place/${id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-primary group-hover:text-primary-dark transition"
                    >
                        <span>Discover more</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
