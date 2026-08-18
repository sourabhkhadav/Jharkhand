import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import logoLeaf from '../assets/logo-leaf.jpg';

export default function NotFoundPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
            <div className="bg-cream-card rounded-3xl p-8 sm:p-12 border border-warmborder shadow-warm-md max-w-md w-full space-y-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mx-auto shadow-warm-sm">
                    <img src={logoLeaf} alt="Explore Jharkhand Emblem" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Error 404</span>
                    <h1 className="font-serif font-bold text-3xl text-ink">Trail Not Found</h1>
                    <p className="text-xs text-ink-light leading-relaxed">
                        The tourism page or waterfall trail you are looking for has been moved or does not exist.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow-warm-md transition w-full"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Homepage</span>
                </Link>
            </div>
        </div>
    );
}
