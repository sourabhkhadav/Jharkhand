import React, { useState } from 'react';
import { X, User, ShieldCheck, Compass, CheckCircle } from 'lucide-react';
import logoLeaf from '../assets/logo-leaf.jpg';

export default function AuthModal({ isOpen, onClose }) {
    const [role, setRole] = useState('tourist'); // tourist | guide | artisan
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    if (!isOpen) return null;

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
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-ink-light hover:text-ink rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                        <h3 className="font-serif font-bold text-2xl text-ink">Welcome to Jharkhand!</h3>
                        <p className="text-xs text-ink-light">Your portal account has been authenticated. You can now save itineraries, bookmark destinations, and book homestays.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center space-y-1">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-2 shadow-warm-sm">
                                <img src={logoLeaf} alt="Jharkhand Tourism Emblem" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-serif font-bold text-2xl text-ink">Tourism Portal Sign In</h3>
                            <p className="text-xs text-ink-light">Access official Jharkhand eco-tourism features</p>
                        </div>

                        {/* Role Switcher */}
                        <div className="flex bg-cream-dark p-1 rounded-xl gap-1">
                            <button
                                type="button"
                                onClick={() => setRole('tourist')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${role === 'tourist' ? 'bg-primary text-white shadow' : 'text-ink-light hover:text-ink'
                                    }`}
                            >
                                Tourist
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('guide')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${role === 'guide' ? 'bg-secondary text-white shadow' : 'text-ink-light hover:text-ink'
                                    }`}
                            >
                                Local Guide
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('artisan')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${role === 'artisan' ? 'bg-accent-dark text-white shadow' : 'text-ink-light hover:text-ink'
                                    }`}
                            >
                                Tribal Artisan
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-ink mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Priyanshu Sharma"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1">Mobile Number / Email</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="+91 98765 43210 or name@domain.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {role !== 'tourist' && (
                                <div>
                                    <label className="block font-semibold text-ink mb-1">District / Santhal Pargana Region</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Netarhat, Latehar or Hazaribagh"
                                        className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink focus:outline-none focus:ring-2 focus:ring-secondary"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-full shadow-warm-md transition"
                            >
                                Sign In / Register
                            </button>
                        </form>

                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-ink-muted">
                            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                            <span>Government of Jharkhand Secure Authentication Protocol</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
