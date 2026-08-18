import React, { useState } from 'react';
import { DESTINATION_SAFETY, USER_SAFETY_ALERTS } from '../data/safetyData';
import { ShieldCheck, AlertTriangle, ThumbsUp, CloudSun, MapPin, Plus, CheckCircle, X, Activity, Radio, Info } from 'lucide-react';

export default function SafetyPage() {
    const [alerts, setAlerts] = useState(USER_SAFETY_ALERTS);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportSubmitted, setReportSubmitted] = useState(false);
    const [newReport, setNewReport] = useState({ location: '', text: '', type: 'Caution' });

    const handleUpvote = (id) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, upvotes: a.upvotes + 1 } : a));
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        const createdAlert = {
            id: `alert-${Date.now()}`,
            author: "You (Verified Tourist)",
            location: newReport.location || "Ranchi Region",
            timestamp: "Just now",
            type: newReport.type,
            text: newReport.text,
            upvotes: 1,
            verified: false
        };
        setAlerts([createdAlert, ...alerts]);
        setReportSubmitted(true);
        setTimeout(() => {
            setReportSubmitted(false);
            setIsReportModalOpen(false);
            setNewReport({ location: '', text: '', type: 'Caution' });
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header Banner - Executive Governance Dashboard Aesthetic */}
            <div className="bg-gradient-to-r from-cream-card via-cream to-cream-dark rounded-3xl p-6 sm:p-8 border border-warmborder shadow-warm-md relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 max-w-2xl text-left">
                        <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-3.5 py-1 rounded-full text-secondary text-[11px] font-semibold tracking-wider uppercase">
                            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                            <span>Official JTDC Tourist Advisory Hub</span>
                        </div>
                        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ink tracking-tight">
                            Live Crowding & Safety Control
                        </h1>
                        <p className="text-xs sm:text-sm text-ink-light leading-relaxed font-normal">
                            Real-time monitoring across 24 districts for waterfall water levels, pilgrim queues at Baidyanath Dham, and hill weather advisories.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                        <button
                            onClick={() => setIsReportModalOpen(true)}
                            className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs px-5 py-3 rounded-full shadow-warm-md flex items-center gap-2 transition hover:scale-105"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Submit Advisory</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* WEATHER & LIVE DESTINATION STATUS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Weather Forecast Widget */}
                <div className="bg-secondary-dark text-cream rounded-3xl p-6 sm:p-7 shadow-xl border border-secondary flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[10px] uppercase font-semibold text-accent tracking-widest block mb-1">
                                    REGIONAL WEATHER
                                </span>
                                <h3 className="font-sans font-bold text-2xl text-white tracking-tight">
                                    Chotanagpur Plateau
                                </h3>
                                <p className="text-xs text-cream/70 mt-0.5">Ranchi, Latehar & Netarhat</p>
                            </div>
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                <CloudSun className="w-8 h-8 text-accent animate-pulse" />
                            </div>
                        </div>

                        <div className="py-4 border-y border-cream/15 flex items-center justify-between">
                            <div>
                                <span className="font-sans text-4xl font-extrabold text-white tracking-tight">24°C</span>
                                <p className="text-xs text-accent font-semibold mt-1">Pleasant & Sunny</p>
                            </div>
                            <div className="text-right text-xs text-cream/80 space-y-1">
                                <p><span className="text-cream/50">Humidity:</span> 58%</p>
                                <p><span className="text-cream/50">Wind Speed:</span> 12 km/h</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 flex items-start gap-3">
                        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <p className="text-xs text-cream/90 leading-relaxed font-normal">
                            Ideal season for waterfall trekking. Chilly evening breeze expected in Netarhat hills after 6:00 PM.
                        </p>
                    </div>
                </div>

                {/* Live Crowd Indicators Grid */}
                <div className="lg:col-span-2 bg-cream-card rounded-3xl p-6 sm:p-7 border border-warmborder shadow-warm-sm space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warmborder/80 pb-4">
                        <div>
                            <h3 className="font-sans font-bold text-xl text-ink tracking-tight">
                                Popular Spots Crowd Status
                            </h3>
                            <p className="text-xs text-ink-light">Real-time visitor density updated every 15 minutes</p>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Live Sensor Sync Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DESTINATION_SAFETY.map((spot) => {
                            const isGreen = spot.level === 'green';
                            const isYellow = spot.level === 'yellow';

                            return (
                                <div
                                    key={spot.id}
                                    className="p-4 bg-cream/70 rounded-2xl border border-warmborder hover:border-primary/40 transition-all space-y-2.5 text-left"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-sans font-bold text-sm text-ink truncate">
                                            {spot.name}
                                        </h4>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase shrink-0 border ${isGreen
                                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                : isYellow
                                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                                    : 'bg-rose-50 text-rose-800 border-rose-200'
                                                }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-emerald-500' : isYellow ? 'bg-amber-500' : 'bg-rose-500'
                                                    }`}
                                            />
                                            <span>{spot.status} ({spot.visitorDensity})</span>
                                        </span>
                                    </div>
                                    <p className="text-xs text-ink-light leading-relaxed font-normal">
                                        {spot.advisory}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* USER ADVISORY & ALERT FEED */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-warmborder pb-4">
                    <div>
                        <h2 className="font-serif font-bold text-2xl text-ink tracking-tight">
                            Live Traveler Alert Feed
                        </h2>
                        <p className="text-xs text-ink-light">Community-verified safety tips, road conditions, and queue updates.</p>
                    </div>

                    <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="bg-cream-dark hover:bg-warmborder text-secondary border border-secondary/30 font-semibold text-xs px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 transition shrink-0"
                    >
                        <Radio className="w-4 h-4 text-primary" />
                        <span>Post Community Alert</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className="bg-cream-card rounded-2xl p-5 border border-warmborder shadow-warm-sm hover:shadow-warm-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <div className="space-y-2 max-w-3xl text-left">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${alert.type.includes('Govt')
                                            ? 'bg-secondary text-white'
                                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                                            }`}
                                    >
                                        {alert.type}
                                    </span>
                                    <span className="text-xs font-bold text-ink">{alert.location}</span>
                                    <span className="text-[11px] text-ink-muted">• {alert.timestamp}</span>
                                </div>

                                <p className="text-xs sm:text-sm text-ink-light leading-relaxed font-normal">
                                    {alert.text}
                                </p>
                                <p className="text-[11px] font-medium text-ink-muted">
                                    Posted by: <span className="font-semibold text-ink">{alert.author}</span>
                                </p>
                            </div>

                            <button
                                onClick={() => handleUpvote(alert.id)}
                                className="flex items-center justify-center gap-2 bg-cream hover:bg-warmborder text-ink font-semibold text-xs px-4 py-2.5 rounded-full border border-warmborder transition whitespace-nowrap shrink-0 self-start sm:self-auto"
                            >
                                <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                                <span>Helpful ({alert.upvotes})</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* REPORT ISSUE MODAL */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-cream border border-warmborder rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
                        <button
                            onClick={() => setIsReportModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-ink-light hover:text-ink rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {reportSubmitted ? (
                            <div className="text-center py-8 space-y-4">
                                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                                <h3 className="font-serif font-bold text-2xl text-ink">Alert Submitted</h3>
                                <p className="text-xs text-ink-light">Thank you! Your safety alert is now live on the public feed.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                                <div>
                                    <h3 className="font-serif font-bold text-xl text-ink">Submit Tourist Safety Alert</h3>
                                    <p className="text-ink-light">Help fellow tourists with real-time crowd or weather updates.</p>
                                </div>

                                <div>
                                    <label className="block font-semibold text-ink mb-1">Destination Location</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Dassam Falls Parking or Deoghar Temple"
                                        value={newReport.location}
                                        onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-ink mb-1">Alert Category</label>
                                    <select
                                        value={newReport.type}
                                        onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="Crowd Update">Crowd Update</option>
                                        <option value="Weather / Caution">Weather / Caution</option>
                                        <option value="Road Condition">Road Condition</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold text-ink mb-1">Alert Description</label>
                                    <textarea
                                        rows="3"
                                        required
                                        placeholder="Provide details..."
                                        value={newReport.text}
                                        onChange={(e) => setNewReport({ ...newReport, text: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-xs py-3 rounded-full shadow-warm-md transition"
                                >
                                    Publish Alert to Feed
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
