import React from 'react';
import { FESTIVALS } from '../data/festivals';
import SectionHeader from '../components/SectionHeader';
import { Calendar, Users, Sparkles, Music, Flame } from 'lucide-react';

export default function FestivalsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            {/* Header Banner */}
            <div className="bg-cream-dark rounded-3xl p-6 sm:p-10 border border-warmborder space-y-4">
                <SectionHeader
                    eyebrow="TRIBAL HERITAGE & FOLK TRADITIONS"
                    title="Festivals & Sacred Rhythms of Jharkhand"
                    subtitle="From Sarhul spring blossom processions to night-long Karma circle dances and Seraikela Chhau martial masks."
                />
            </div>

            {/* Festival Spotlight Cards */}
            <div className="space-y-12">
                {FESTIVALS.map((fest, idx) => (
                    <div
                        key={fest.id}
                        className={`bg-cream-card rounded-3xl border border-warmborder overflow-hidden shadow-warm-md grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                            }`}
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <img src={fest.heroImage} alt={fest.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">
                                    {fest.season}
                                </span>
                                <h3 className="font-serif font-bold text-2xl text-white mt-1">{fest.name}</h3>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 space-y-4">
                            <span className="text-xs uppercase font-bold tracking-wider text-primary flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>Celebrated by: {fest.tribe}</span>
                            </span>

                            <p className="font-serif font-bold text-lg text-ink italic">"{fest.tagline}"</p>
                            <p className="text-xs sm:text-sm text-ink-light leading-relaxed">{fest.description}</p>

                            <div className="space-y-2 pt-2 border-t border-warmborder">
                                <p className="text-xs font-bold text-ink">Key Festival Rituals:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {fest.highlights.map((h, i) => (
                                        <div key={i} className="p-2.5 bg-cream rounded-xl border border-warmborder text-xs font-semibold text-ink flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
