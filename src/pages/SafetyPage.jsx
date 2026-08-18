import React, { useState } from 'react';
import { DESTINATION_SAFETY, USER_SAFETY_ALERTS } from '../data/safetyData';
import SectionHeader from '../components/SectionHeader';
import { ShieldCheck, AlertTriangle, ThumbsUp, CloudSun, MapPin, Plus, CheckCircle, X } from 'lucide-react';

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
            {/* Header Banner */}
            <div className="bg-cream-dark rounded-3xl p-6 sm:p-10 border border-warmborder space-y-4">
                <SectionHeader
                    eyebrow="SMART GOVERNANCE & SAFETY"
                    title="Live Crowding & Tourist Advisory Feed"
                    subtitle="Real-time status updates on waterfall water flows, temple pilgrim queues, and weather advisories across Jharkhand."
                />
            </div>

            {/* WEATHER & LIVE DESTINATION STATUS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weather Forecast Widget */}
                <div className="bg-secondary text-cream rounded-3xl p-6 shadow-xl border-4 border-accent/20 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-accent tracking-wider">Regional Weather Forecast</span>
                            <h3 className="font-serif font-bold text-2xl text-white">Chotanagpur Plateau</h3>
                            <p className="text-xs text-cream/80">Ranchi, Latehar & Netarhat</p>
                        </div>
                        <CloudSun className="w-10 h-10 text-accent animate-pulse" />
                    </div>

                    <div className="py-4 border-y border-cream/15 flex items-center justify-between">
                        <span className="font-serif text-4xl font-bold text-white">24°C</span>
                        <div className="text-right text-xs text-cream/90">
                            <p className="font-bold text-accent">Pleasant & Sunny</p>
                            <p>Humidity: 58% | Wind: 12 km/h</p>
                        </div>
                    </div>

                    <p className="text-xs text-cream/80 leading-relaxed">
                        Ideal season for waterfall trekking. Chilly breeze expected in Netarhat hills after 6:00 PM.
                    </p>
                </div>

                {/* Live Crowd Indicators Table */}
                <div className="lg:col-span-2 bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-warmborder pb-3">
                        <h3 className="font-serif font-bold text-lg text-ink">Popular Spots Crowd Status</h3>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                            Live Sensor Sync Active
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {DESTINATION_SAFETY.map((spot) => (
                            <div key={spot.id} className="p-3 bg-cream rounded-2xl border border-warmborder space-y-2 text-xs">
                                <div className="flex justify-between items-center font-bold text-ink">
                                    <span>{spot.name}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${spot.level === 'green' ? 'bg-emerald-100 text-emerald-800' : spot.level === 'yellow' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                                        }`}>
                                        {spot.status} ({spot.visitorDensity})
                                    </span>
                                </div>
                                <p className="text-[11px] text-ink-light leading-snug">{spot.advisory}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* USER ADVISORY & ALERT FEED */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-serif font-bold text-2xl text-ink">Live Traveler Alert Feed</h2>
                        <p className="text-xs text-ink-light">User-submitted safety tips, road updates, and queue reports.</p>
                    </div>

                    <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow-warm-md flex items-center gap-2 transition"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Report an Issue / Alert</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="bg-cream-card rounded-2xl p-5 border border-warmborder shadow-warm-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-2 max-w-3xl">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${alert.type.includes('Govt') ? 'bg-secondary text-white' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                        {alert.type}
                                    </span>
                                    <span className="text-xs font-bold text-ink">{alert.location}</span>
                                    <span className="text-[10px] text-ink-muted">• {alert.timestamp}</span>
                                </div>

                                <p className="text-xs text-ink-light leading-relaxed">{alert.text}</p>
                                <p className="text-[11px] font-semibold text-ink-muted">Posted by: {alert.author}</p>
                            </div>

                            <button
                                onClick={() => handleUpvote(alert.id)}
                                className="flex items-center gap-1.5 bg-cream-dark hover:bg-warmborder text-ink font-bold text-xs px-4 py-2 rounded-full border border-warmborder transition whitespace-nowrap"
                            >
                                <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                                <span>Upvote ({alert.upvotes})</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* REPORT ISSUE MODAL */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-cream border border-warmborder rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
                        <button onClick={() => setIsReportModalOpen(false)} className="absolute top-4 right-4 p-2 text-ink-light hover:text-ink">
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
                                        className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-ink mb-1">Alert Category</label>
                                    <select
                                        value={newReport.type}
                                        onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink font-sans"
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
                                        className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-full shadow"
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
