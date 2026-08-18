import React, { useState } from 'react';
import { X, Star, Upload, CheckCircle } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, destinationName }) {
    const [rating, setRating] = useState(5);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [tags, setTags] = useState(['Family Friendly', 'Clean']);
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const availableTags = ['Family Friendly', 'Adventurous', 'Crowded', 'Eco Pristine', 'Photography Spot', 'Easy Trek'];

    const toggleTag = (t) => {
        if (tags.includes(t)) {
            setTags(tags.filter(item => item !== t));
        } else {
            setTags([...tags, t]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 1800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-cream border border-warmborder rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-light hover:text-ink rounded-full">
                    <X className="w-5 h-5" />
                </button>

                {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                        <h3 className="font-serif font-bold text-2xl text-ink">Thank you!</h3>
                        <p className="text-xs text-ink-light">Your review for <strong>{destinationName}</strong> has been published to help fellow travelers.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Share Your Experience</span>
                            <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink">Write a Review</h3>
                            <p className="text-xs text-ink-light">{destinationName}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-ink mb-1">Your Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="p-1 focus:outline-none"
                                        >
                                            <Star className={`w-6 h-6 ${star <= rating ? 'fill-accent text-accent' : 'text-warmborder'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Suman Roy"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1">Review Comments</label>
                                <textarea
                                    rows="3"
                                    required
                                    placeholder="What made this place special? Waterfalls depth, parking availability, or local food..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1">Select Tags</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {availableTags.map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => toggleTag(t)}
                                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition ${tags.includes(t) ? 'bg-primary text-white border-primary' : 'bg-cream-dark border-warmborder text-ink-light'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1">Upload Traveler Photos (Optional)</label>
                                <div className="border-2 border-dashed border-warmborder p-3 rounded-xl text-center bg-cream-card hover:border-primary transition cursor-pointer">
                                    <Upload className="w-5 h-5 text-ink-muted mx-auto mb-1" />
                                    <span className="text-[11px] text-ink-muted">Click or drag images here</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-full shadow-warm-md transition"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
