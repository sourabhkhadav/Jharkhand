import React from 'react';

export default function SectionHeader({ eyebrow, title, subtitle, centered = false }) {
    return (
        <div className={`space-y-2 mb-8 ${centered ? 'text-center' : ''}`}>
            {eyebrow && (
                <span className="text-xs uppercase font-semibold tracking-widest text-primary block">
                    {eyebrow}
                </span>
            )}
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight leading-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="text-xs sm:text-sm text-ink-light max-w-2xl leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
