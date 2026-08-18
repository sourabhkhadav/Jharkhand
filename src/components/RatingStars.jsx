import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5, showNumber = true, size = 'sm' }) {
    const sizeClasses = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center text-accent">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${sizeClasses[size] || sizeClasses.sm} ${star <= Math.round(rating)
                                ? 'fill-accent text-accent'
                                : 'text-warmborder fill-cream-dark'
                            }`}
                    />
                ))}
            </div>
            {showNumber && (
                <span className="text-xs font-bold text-ink ml-1">{rating.toFixed(1)}</span>
            )}
        </div>
    );
}
