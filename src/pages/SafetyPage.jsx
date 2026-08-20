import React, { useState } from 'react';
import { DESTINATION_WEATHER_HAZARDS, USER_HAZARD_ALERTS } from '../data/safetyData';
import { CloudSun, CloudRain, AlertTriangle, ShieldAlert, ShieldCheck, ThumbsUp, MapPin, Plus, CheckCircle, X, Radio, Info, Wind, Compass, Flame } from 'lucide-react';

export default function SafetyPage() {
    const [alerts, setAlerts] = useState(USER_HAZARD_ALERTS);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportSubmitted, setReportSubmitted] = useState(false);
    const [newReport, setNewReport] = useState({
        location: '',
        text: '',
        type: 'Landslide / Rockfall'
    });

    const handleUpvote = (id) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, upvotes: a.upvotes + 1 } : a));
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        const createdAlert = {
            id: `alert-${Date.now()}`,
            author: "You (Verified Traveler)",
            location: newReport.location || "Jharkhand Tourist Route",
            timestamp: "Just now (Live)",
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
            setNewReport({ location: '', text: '', type: 'Landslide / Rockfall' });
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-primary-dark to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-4 border border-emerald-500/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 font-sans">
                    <div className="space-y-2 max-w-2xl text-left">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 rounded-full text-emerald-300 text-[11px] font-bold tracking-wider uppercase">
                            <ShieldAlert className="w-4 h-4 text-accent" />
                            <span>Official Live Weather & Road Hazard Desk</span>
                        </div>
                        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                            Live Weather & Landslide Hazard Alerts
                        </h1>
                        <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-light">
                            Real-time monitoring across 24 districts for heavy rain, landslide risks, fog visibility, and mountain road conditions. Report live road hazards directly to assist fellow travelers.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                        <button
                            onClick={() => setIsReportModalOpen(true)}
                            className="bg-accent hover:bg-accent-dark text-ink font-extrabold text-xs px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 transition hover:scale-105"
                        >
                            <AlertTriangle className="w-4 h-4" />
                            <span>Report Landslide / Hazard</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* WEATHER forecast WIDGET & DESTINATION ROAD HAZARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Weather Forecast Widget */}
                <div className="bg-secondary-dark text-cream rounded-3xl p-6 sm:p-7 shadow-xl border border-secondary flex flex-col justify-between space-y-6 font-sans">
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[10px] uppercase font-extrabold text-accent tracking-widest block mb-1">
                                    REGIONAL RADAR WEATHER
                                </span>
                                <h3 className="font-serif font-bold text-2xl text-white tracking-tight">
                                    Chotanagpur Plateau
                                </h3>
                                <p className="text-xs text-cream/70 mt-0.5">Ranchi, Ramgarh, Latehar & Netarhat</p>
                            </div>
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                <CloudRain className="w-8 h-8 text-accent animate-pulse" />
                            </div>
                        </div>

                        <div className="py-4 border-y border-cream/15 flex items-center justify-between">
                            <div>
                                <span className="font-sans text-4xl font-extrabold text-white tracking-tight">21°C</span>
                                <p className="text-xs text-accent font-semibold mt-1">Passing Rain & Hill Fog</p>
                            </div>
                            <div className="text-right text-xs text-cream/80 space-y-1">
                                <p><span className="text-cream/50">Humidity:</span> 82%</p>
                                <p><span className="text-cream/50">Wind Speed:</span> 18 km/h</p>
                                <p><span className="text-cream/50">Rain Risk:</span> Moderate</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-start gap-3">
                        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <p className="text-xs text-cream/90 leading-relaxed font-normal">
                            Heavy mist reported near Patratu ghats & Netarhat valley. Drive with fog lights on. Avoid parking near loose rock slopes.
                        </p>
                    </div>
                </div>

                {/* Destination Weather & Road Hazard Cards */}
                <div className="lg:col-span-2 bg-cream-card rounded-3xl p-6 sm:p-7 border border-warmborder shadow-warm-sm space-y-5 font-sans">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warmborder/80 pb-4">
                        <div>
                            <h3 className="font-serif font-bold text-xl text-ink tracking-tight">
                                Live Destination Weather & Route Status
                            </h3>
                            <p className="text-xs text-ink-light">Monitored by District Disaster Control & Forest Outposts</p>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Weather Radar Live</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {DESTINATION_WEATHER_HAZARDS.map((spot) => {
                            const isClear = spot.hazardLevel === 'Clear';
                            const isCaution = spot.hazardLevel === 'Caution';

                            return (
                                <div
                                    key={spot.id}
                                    className="p-4 sm:p-5 bg-cream/70 rounded-2xl border border-warmborder hover:border-primary/40 transition-all space-y-2 text-left shadow-xs hover:shadow-warm-sm"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h4 className="font-serif font-bold text-base text-ink">
                                                {spot.name}
                                            </h4>
                                            <span className="text-xs text-ink-muted">({spot.district} • {spot.weatherTemp})</span>
                                        </div>

                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase shrink-0 border self-start sm:self-auto ${isClear
                                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                : isCaution
                                                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                                                    : 'bg-rose-50 text-rose-900 border-rose-300'
                                                }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${isClear ? 'bg-emerald-500' : isCaution ? 'bg-amber-500' : 'bg-rose-600 animate-pulse'
                                                    }`}
                                            />
                                            <span>{spot.hazardType}</span>
                                        </span>
                                    </div>

                                    <p className="text-xs text-ink-light leading-relaxed font-medium">
                                        {spot.advisory}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* USER HAZARD ALERT FEED */}
            <div className="space-y-6 font-sans">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-warmborder pb-4">
                    <div>
                        <h2 className="font-serif font-bold text-2xl text-ink tracking-tight">
                            Live Traveler Weather & Landslide Report Feed
                        </h2>
                        <p className="text-xs text-ink-light">Community and inspector verified road blockages, mudslides, and heavy rain alerts.</p>
                    </div>

                    <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-warm-md flex items-center gap-2 transition shrink-0"
                    >
                        <AlertTriangle className="w-4 h-4 text-accent" />
                        <span>Post Weather / Landslide Report</span>
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
                                        className={`text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full flex items-center gap-1 ${alert.type.includes('Landslide')
                                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                                            : alert.type.includes('Heavy Rain')
                                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                                            }`}
                                    >
                                        <AlertTriangle className="w-3 h-3" />
                                        {alert.type}
                                    </span>
                                    <span className="text-xs font-bold text-ink flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                        {alert.location}
                                    </span>
                                    <span className="text-[11px] text-ink-muted">• {alert.timestamp}</span>
                                </div>

                                <p className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
                                    "{alert.text}"
                                </p>
                                <p className="text-[11px] text-ink-muted">
                                    Reported by: <span className="font-bold text-ink">{alert.author}</span>
                                </p>
                            </div>

                            <button
                                onClick={() => handleUpvote(alert.id)}
                                className="flex items-center justify-center gap-2 bg-cream hover:bg-warmborder text-ink font-extrabold text-xs px-5 py-2.5 rounded-full border border-warmborder transition whitespace-nowrap shrink-0 self-start sm:self-auto shadow-sm"
                            >
                                <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                                <span>Verify & Confirm ({alert.upvotes})</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* REPORT LANDSLIDE / WEATHER HAZARD MODAL */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-sans">
                    <div className="bg-cream border-2 border-warmborder rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
                        <button
                            onClick={() => setIsReportModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-ink-light hover:text-ink rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {reportSubmitted ? (
                            <div className="text-center py-8 space-y-4">
                                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                                <h3 className="font-serif font-bold text-2xl text-ink">Hazard Alert Published</h3>
                                <p className="text-xs text-ink-light">Thank you! Your weather/landslide advisory is live on the public feed to guide travelers safely.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                                <div className="space-y-1">
                                    <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                                        <span>Road Hazard & Weather Report Form</span>
                                    </div>
                                    <h3 className="font-serif font-bold text-xl text-ink">Report Live Road Hazard / Landslide</h3>
                                    <p className="text-ink-light">Inform fellow travelers about landslides, heavy rain, tree blockages, or dense fog.</p>
                                </div>

                                <div>
                                    <label className="block font-bold text-ink mb-1">Hazard Category</label>
                                    <select
                                        value={newReport.type}
                                        onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink font-sans focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                    >
                                        <option value="Landslide / Rockfall">Landslide / Rockfall</option>
                                        <option value="Heavy Rain / Water Level">Heavy Rain / Flash Water Level</option>
                                        <option value="Fog / Low Visibility">Fog / Low Visibility</option>
                                        <option value="Road Blocked / Tree Fall">Road Blocked / Fallen Tree</option>
                                        <option value="General Weather Caution">General Weather Caution</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-bold text-ink mb-1">Location / Spot Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Patratu Valley Curve 4 or Hundru Falls Ghat Road"
                                        value={newReport.location}
                                        onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-warmborder bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-ink mb-1">Hazard Description & Safety Tip</label>
                                    <textarea
                                        rows="3"
                                        required
                                        placeholder="e.g. Single line traffic due to mud slide near curve 4. Clear lane open."
                                        value={newReport.text}
                                        onChange={(e) => setNewReport({ ...newReport, text: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3.5 rounded-full shadow-warm-md transition flex items-center justify-center gap-2"
                                >
                                    <AlertTriangle className="w-4 h-4 text-accent" />
                                    <span>Publish Hazard Alert Live</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
