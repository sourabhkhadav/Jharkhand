import React from 'react';
import { CATEGORIES } from '../data/destinations';
import { Waves, Trees, Flame, Leaf, Palette, Mountain, Compass } from 'lucide-react';

const iconMap = {
    Compass, Waves, Trees, Flame, Leaf, Palette, Mountain
};

export default function FilterChips({ activeCategory, onSelectCategory }) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
            {CATEGORIES.map((cat) => {
                const IconComponent = iconMap[cat.icon] || Compass;
                const isActive = activeCategory === cat.id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-sm ${isActive
                                ? 'bg-primary text-white shadow-warm-md scale-105'
                                : 'bg-cream-dark/60 text-ink-light hover:bg-warmborder hover:text-ink border border-warmborder'
                            }`}
                    >
                        <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-primary'}`} />
                        <span>{cat.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
