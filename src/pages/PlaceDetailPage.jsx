import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import RatingStars from '../components/RatingStars';
import SectionHeader from '../components/SectionHeader';
import DestinationCard from '../components/DestinationCard';
import { MapPin, Clock, Ticket, Calendar, ShieldCheck, Heart, Plus, MessageSquare, ArrowLeft, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';

export default function PlaceDetailPage({ onOpenReview, onAddToItinerary }) {
    const { id } = useParams();
    const destination = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];

    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [reviewSort, setReviewSort] = useState('recent'); // recent | helpful
    const [isSaved, setIsSaved] = useState(false);

    const gallery = destination.images || [destination.heroImage];

    const initialReviews = [
        {
            id: 1,
            author: "Priyanshu Sharma",
            date: "August 2026",
            rating: 5,
            comment: "Absolutely mesmerizing! The 320ft waterfall cascade at Hundru is unmatched in Eastern India. Lifeguards are stationed everywhere, and local Santhal women sell hot bamboo-cooked snacks.",
            helpfulCount: 42,
            tags: ["Family Friendly", "Photography Spot"]
        },
        {
            id: 2,
            author: "Ananya Marandi",
            date: "July 2026",
            rating: 5,
            comment: "We visited during early morning mist. Netarhat pine trees and lower Ghaghri falls felt like a serene alpine paradise.",
            helpfulCount: 28,
            tags: ["Eco Pristine", "Easy Trek"]
        }
    ];

    const nearbySpots = DESTINATIONS.filter(d => d.id !== destination.id).slice(0, 3);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Back Button */}
            <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary transition">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Explore Directory</span>
            </Link>

            {/* SWIPEABLE IMAGE GALLERY CAROUSEL */}
            <div className="space-y-3">
                <div className="relative aspect-[21/9] sm:aspect-[21/8] bg-ink rounded-3xl overflow-hidden shadow-2xl border border-warmborder">
                    <img
                        src={gallery[activeImageIdx]}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Navigation Arrows */}
                    {gallery.length > 1 && (
                        <>
                            <button
                                onClick={() => setActiveImageIdx((activeImageIdx - 1 + gallery.length) % gallery.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setActiveImageIdx((activeImageIdx + 1) % gallery.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {destination.category}
                                </span>
                                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Live: {destination.crowdStatus}
                                </span>
                            </div>
                            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white">{destination.name}</h1>
                            <p className="text-xs sm:text-sm text-cream/90 flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-accent" />
                                <span>{destination.district} District, Jharkhand ({destination.distanceKm} km from Ranchi)</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className={`p-3 rounded-full backdrop-blur-md border transition ${isSaved ? 'bg-rose-500 text-white border-rose-500' : 'bg-white/20 text-white border-white/40 hover:bg-white/40'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                            </button>
                            <button
                                onClick={() => onAddToItinerary(destination)}
                                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow-warm-lg flex items-center gap-2 transition"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add to Itinerary</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Selector */}
                {gallery.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                        {gallery.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImageIdx(idx)}
                                className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition ${activeImageIdx === idx ? 'border-primary scale-105 shadow-md' : 'border-warmborder opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* QUICK INFO BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-cream-card rounded-3xl border border-warmborder shadow-warm-sm">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-ink-muted">Best Season</p>
                        <p className="text-xs font-bold text-ink">{destination.bestTime}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                        <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-ink-muted">Entry Fee</p>
                        <p className="text-xs font-bold text-ink">{destination.entryFee}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="p-3 bg-accent/15 text-accent-dark rounded-2xl">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-ink-muted">Timings</p>
                        <p className="text-xs font-bold text-ink">{destination.timings}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-ink-muted">Safety Status</p>
                        <p className="text-xs font-bold text-emerald-800">Lifeguard Guarded</p>
                    </div>
                </div>
            </div>

            {/* 🏛️ HISTORICAL CHRONICLES & ORIGIN STORY (FEATURE 1: SITE HISTORY & DETAILS) */}
            {destination.history && (
                <div className="bg-gradient-to-br from-[#2D1B08] via-[#1F1205] to-[#36210A] text-cream rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#D4AF37]/50 space-y-6 relative overflow-hidden">
                    {/* Background Vintage Watermark */}
                    <div className="absolute top-0 right-0 p-8 text-cream/5 text-9xl font-serif select-none pointer-events-none">🏛️</div>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4 relative z-10">
                        <div className="space-y-1">
                            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-3 py-1 rounded-full text-xs font-bold text-[#F3E5AB] uppercase tracking-widest font-sans">
                                <span>🏛️ Site History & Archival Chronicles</span>
                            </div>
                            <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#F3E5AB]">
                                Origin Legend & Heritage Story
                            </h2>
                        </div>

                        {/* Audio Narrative Guide Button */}
                        <button
                            onClick={() => {
                                if ('speechSynthesis' in window) {
                                    window.speechSynthesis.cancel();
                                    const text = destination.history.audioGuideSummary || destination.history.historyStory;
                                    const utterance = new SpeechSynthesisUtterance(text);
                                    utterance.rate = 0.95;
                                    window.speechSynthesis.speak(utterance);
                                } else {
                                    alert("Audio playback: " + (destination.history.audioGuideSummary || destination.history.historyStory));
                                }
                            }}
                            className="bg-[#D4AF37] hover:bg-[#C5A028] text-ink font-sans font-bold text-xs px-5 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition hover:scale-105 shrink-0"
                        >
                            <span>🔊 Play Audio Guide (Narrative)</span>
                        </button>
                    </div>

                    {/* Historical Metadata Pill Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans relative z-10">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-1">
                            <p className="text-[10px] uppercase font-bold text-[#D4AF37]">Est. Era / Built Year</p>
                            <p className="text-xs font-bold text-white">{destination.history.builtYear}</p>
                        </div>
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-1">
                            <p className="text-[10px] uppercase font-bold text-[#D4AF37]">Built By / Creator</p>
                            <p className="text-xs font-bold text-white">{destination.history.builtBy}</p>
                        </div>
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-1">
                            <p className="text-[10px] uppercase font-bold text-[#D4AF37]">Historical Era</p>
                            <p className="text-xs font-bold text-white">{destination.history.era}</p>
                        </div>
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-1">
                            <p className="text-[10px] uppercase font-bold text-[#D4AF37]">Architecture / Form</p>
                            <p className="text-xs font-bold text-white truncate">{destination.history.architecturalStyle}</p>
                        </div>
                    </div>

                    {/* Detailed Chronicles & Mythology Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-sans text-xs">
                        <div className="bg-black/30 p-5 rounded-2xl border border-[#D4AF37]/20 space-y-2">
                            <h3 className="font-serif font-bold text-base text-[#F3E5AB]">Historical Evolution</h3>
                            <p className="text-cream/90 leading-relaxed font-light">{destination.history.historyStory}</p>
                        </div>
                        <div className="bg-black/30 p-5 rounded-2xl border border-[#D4AF37]/20 space-y-2">
                            <h3 className="font-serif font-bold text-base text-[#F3E5AB]">Mythological / Local Lore</h3>
                            <p className="text-cream/90 leading-relaxed font-light">{destination.history.originLegend}</p>
                        </div>
                    </div>

                    {/* Archival Trivia Banner */}
                    {destination.history.archivalTrivia && (
                        <div className="p-4 bg-[#D4AF37]/15 rounded-2xl border border-[#D4AF37]/40 flex items-start gap-3 font-sans text-xs text-[#F3E5AB] relative z-10">
                            <span className="text-lg shrink-0">📜</span>
                            <p className="leading-relaxed">
                                <strong className="font-bold">Archival Trivia: </strong> {destination.history.archivalTrivia}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* DESCRIPTION & HIGHLIGHTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-3">
                        <h2 className="font-serif font-bold text-2xl text-ink">Overview & Cultural Context</h2>
                        <p className="text-xs sm:text-sm text-ink-light leading-relaxed">
                            {destination.description}
                        </p>
                    </div>

                    {/* Key Highlights Grid */}
                    <div className="space-y-3">
                        <h3 className="font-serif font-bold text-lg text-ink">Key Highlights</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {destination.highlights?.map((h, i) => (
                                <div key={i} className="p-3 bg-cream-dark rounded-xl border border-warmborder text-xs font-semibold text-ink flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    <span>{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Info Box */}
                <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm space-y-4">
                    <h3 className="font-serif font-bold text-lg text-ink">Traveler Services</h3>
                    <ul className="space-y-2 text-xs text-ink-light">
                        {destination.facilities?.map((f, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-secondary" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-2 border-t border-warmborder">
                        <button
                            onClick={() => onOpenReview(destination.name)}
                            className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Write a Review</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* NEARBY PLACES SCROLL */}
            <div className="space-y-6">
                <SectionHeader
                    eyebrow="EXPLORE FURTHER"
                    title="Nearby Attractions"
                    subtitle="Popular spots located within 30 km radius."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {nearbySpots.map((spot) => (
                        <DestinationCard key={spot.id} destination={spot} />
                    ))}
                </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-warmborder space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-warmborder pb-4">
                    <div>
                        <h3 className="font-serif font-bold text-2xl text-ink">Traveler Reviews</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <RatingStars rating={destination.rating} size="md" />
                            <span className="text-xs text-ink-light">Based on {destination.reviewsCount} verified reviews</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={reviewSort}
                            onChange={(e) => setReviewSort(e.target.value)}
                            className="px-3 py-2 rounded-full bg-cream-dark border border-warmborder text-xs font-semibold text-ink"
                        >
                            <option value="recent">Most Recent</option>
                            <option value="helpful">Most Helpful</option>
                        </select>
                        <button
                            onClick={() => onOpenReview(destination.name)}
                            className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-warm-sm transition"
                        >
                            Write Review
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {initialReviews.map((rev) => (
                        <div key={rev.id} className="p-4 bg-cream rounded-2xl border border-warmborder space-y-2 text-xs">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-ink">{rev.author}</p>
                                    <p className="text-[10px] text-ink-muted">{rev.date}</p>
                                </div>
                                <RatingStars rating={rev.rating} size="sm" />
                            </div>
                            <p className="text-ink-light leading-relaxed">{rev.comment}</p>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex gap-1.5">
                                    {rev.tags.map(t => (
                                        <span key={t} className="bg-cream-dark text-ink-light text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <button className="flex items-center gap-1 text-[11px] text-ink-muted hover:text-primary">
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    <span>Helpful ({rev.helpfulCount})</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
