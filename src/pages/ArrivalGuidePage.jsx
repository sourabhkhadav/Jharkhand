import React, { useState } from 'react';
import { ARRIVAL_STATIONS } from '../data/arrivalData';
import SectionHeader from '../components/SectionHeader';
import { Train, Bus, Car, CreditCard, Download, MapPin, Navigation, Wifi, Compass, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Phone, DollarSign, Clock } from 'lucide-react';

// Haversine formula to compute distance in KM between two lat/lng coordinates
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default function ArrivalGuidePage() {
    const [selectedStationId, setSelectedStationId] = useState(ARRIVAL_STATIONS[0].id);
    const [isOfflineMapActive, setIsOfflineMapActive] = useState(false);

    // Geolocation Nearest Station states
    const [isLocating, setIsLocating] = useState(false);
    const [nearestStation, setNearestStation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [userCoords, setUserCoords] = useState(null);

    const station = ARRIVAL_STATIONS.find(s => s.id === selectedStationId) || ARRIVAL_STATIONS[0];

    const findNearestStationFromCoords = (lat, lng, locationLabel = "Live GPS Location") => {
        let minDistance = Infinity;
        let closest = null;

        ARRIVAL_STATIONS.forEach(stn => {
            const dist = calculateDistanceKm(lat, lng, stn.coordinates.lat, stn.coordinates.lng);
            if (dist < minDistance) {
                minDistance = dist;
                closest = stn;
            }
        });

        setUserCoords({ lat, lng, label: locationLabel });
        setNearestStation({
            station: closest,
            distanceKm: minDistance.toFixed(1)
        });
        setLocationError(null);
        setIsLocating(false);
    };

    const handleDetectLiveLocation = () => {
        setIsLocating(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser. Please try simulated location below.");
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                findNearestStationFromCoords(position.coords.latitude, position.coords.longitude, "Live GPS Position");
            },
            (error) => {
                console.warn("Geolocation error:", error);
                setLocationError("Location permission denied or unavailable. You can test using simulated city presets below!");
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const handleDownloadOfflineGuide = () => {
        alert(`Downloading offline transit guide PDF for ${station.name} (${station.offlineGuide.size}). Works without internet!`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-900 via-primary-dark to-emerald-950 text-white rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-4 border-2 border-emerald-500/30">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-cream uppercase tracking-wider font-sans">
                    <Navigation className="w-4 h-4 text-accent" />
                    <span>Real-Time On-Arrival Tourist Assistance Hub</span>
                </div>
                <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                    Station Arrival & Local Transit Guide
                </h1>
                <p className="text-sm sm:text-base text-cream/90 max-w-2xl font-light leading-relaxed">
                    Just reached a railway station or bus terminal? Select your arrival point below to get immediate transit mode options, exact fare estimates, nearest verified ATMs, and offline local route support.
                </p>

                {/* Station Tabs Selector */}
                <div className="flex flex-wrap gap-2 pt-2 font-sans">
                    {ARRIVAL_STATIONS.map((stn) => (
                        <button
                            key={stn.id}
                            onClick={() => setSelectedStationId(stn.id)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2 ${selectedStationId === stn.id ? 'bg-accent text-ink scale-105 font-extrabold' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
                        >
                            <Train className="w-4 h-4" />
                            <span>{stn.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* LIVE GEOLOCATION NEAREST STATION FINDER CARD */}
            <div className="bg-gradient-to-r from-emerald-950 via-primary-dark to-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-6 font-sans relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
                            <span>GPS Live Location Station Detector</span>
                        </div>
                        <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
                            Find Nearest Railway Station to You
                        </h2>
                        <p className="text-xs text-cream/90 font-light leading-relaxed">
                            Turn on your device location to instantly identify your nearest Jharkhand transit station, exact distance, and live transit fare estimates.
                        </p>
                    </div>

                    <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                            onClick={handleDetectLiveLocation}
                            disabled={isLocating}
                            className="bg-accent hover:bg-accent-dark text-ink font-extrabold text-xs px-6 py-3.5 rounded-full shadow-lg transition flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50"
                        >
                            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                            <span>{isLocating ? "Detecting Live Coordinates..." : "Detect My Live Location"}</span>
                        </button>
                    </div>
                </div>

                {/* Quick Simulation Presets for Testing */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[11px] font-bold text-cream/70 uppercase">Quick Test Presets:</span>
                    <button
                        onClick={() => findNearestStationFromCoords(23.3441, 85.3240, "Ranchi City Center")}
                        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-cream text-[11px] font-medium transition"
                    >
                        Near Ranchi (23.34°N, 85.32°E)
                    </button>
                    <button
                        onClick={() => findNearestStationFromCoords(24.5167, 86.6500, "Deoghar Temple Zone")}
                        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-cream text-[11px] font-medium transition"
                    >
                        Near Deoghar (24.51°N, 86.65°E)
                    </button>
                    <button
                        onClick={() => findNearestStationFromCoords(23.7431, 84.4988, "Latehar Betla Gate")}
                        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-cream text-[11px] font-medium transition"
                    >
                        Near Latehar (23.74°N, 84.49°E)
                    </button>
                </div>

                {/* Nearest Station Result */}
                {nearestStation && (
                    <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-emerald-400/40 text-cream flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-inner">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="bg-emerald-500 text-ink font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-ink" />
                                    Nearest Station Found
                                </span>
                                <span className="text-xs text-emerald-300 font-semibold">
                                    Distance: <strong>{nearestStation.distanceKm} km away</strong> ({userCoords?.label})
                                </span>
                            </div>
                            <h3 className="font-serif font-bold text-xl text-white">{nearestStation.station.name}</h3>
                            <p className="text-xs text-cream/80">Located in {nearestStation.station.city} district</p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedStationId(nearestStation.station.id);
                            }}
                            className="bg-emerald-500 hover:bg-emerald-400 text-ink font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md transition flex items-center gap-1.5 shrink-0"
                        >
                            <span>Select & View Transit Modes for {nearestStation.station.city}</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* STATION SPOTLIGHT HEADER */}
            <div className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-warmborder shadow-warm-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-sans">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Active Arrival Hub: {station.city} Region</span>
                    </div>
                    <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-ink">{station.name}</h2>
                    <p className="text-xs text-ink-light">JTDC Facilitated Transport & Emergency Desk Active 24/7</p>
                </div>

                {/* Offline Mode Toggle & Download Button */}
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => setIsOfflineMapActive(!isOfflineMapActive)}
                        className={`px-4 py-2.5 rounded-full text-xs font-bold border transition flex items-center gap-2 ${isOfflineMapActive ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-cream-dark text-ink border-warmborder hover:bg-warmborder'}`}
                    >
                        <Wifi className={`w-4 h-4 ${isOfflineMapActive ? 'text-white' : 'text-emerald-600'}`} />
                        <span>{isOfflineMapActive ? "Offline Route Mode Active" : "Simulate Offline Map"}</span>
                    </button>

                    <button
                        onClick={handleDownloadOfflineGuide}
                        className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-warm-md transition flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download Offline Card ({station.offlineGuide.size})</span>
                    </button>
                </div>
            </div>

            {/* SIMULATED OFFLINE LOCAL MAP NOTICE */}
            {isOfflineMapActive && (
                <div className="p-5 bg-emerald-950 text-cream rounded-3xl border-2 border-emerald-500/50 font-sans space-y-2 animate-fade-in shadow-xl">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Offline Local Navigation Map Loaded into Device Storage!</span>
                    </div>
                    <p className="text-xs text-cream/90 font-light">
                        All transit stops, local auto stands, police outposts, and ATMs for <strong>{station.name}</strong> are cached. You can access turn-by-turn route maps even with zero internet signal.
                    </p>
                </div>
            )}

            {/* SECTION 1: POPULAR DESTINATIONS & TRANSIT MATRIX */}
            <div className="space-y-6">
                <SectionHeader
                    eyebrow="ON ARRIVAL TRANSIT MATRIX"
                    title={`Available Transport Modes from ${station.name.split(' ')[0]}`}
                    subtitle="Compare travel time, fare estimates, and recommended modes to reach major tourist spots."
                />

                <div className="space-y-6">
                    {station.popularDestinations.map((dest, idx) => (
                        <div key={idx} className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-warmborder shadow-warm-sm space-y-6 font-sans">
                            {/* Destination Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warmborder pb-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">Destination Spot</span>
                                    <h3 className="font-serif font-bold text-2xl text-ink">{dest.spotName}</h3>
                                    <p className="text-xs text-ink-light flex items-center gap-4">
                                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Distance: <strong>{dest.distanceKm} km</strong></span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> Travel Time: <strong>~{dest.travelTimeMins} mins</strong></span>
                                    </p>
                                </div>

                                <div className="bg-primary/10 border border-primary/30 p-3 rounded-2xl shrink-0 text-right">
                                    <p className="text-[10px] font-extrabold uppercase text-primary">Govt Recommended Mode</p>
                                    <p className="text-xs font-bold text-primary-dark">{dest.recommendedMode}</p>
                                </div>
                            </div>

                            {/* Modes Table / Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {dest.modes.map((mode, mIdx) => (
                                    <div key={mIdx} className="bg-white p-5 rounded-2xl border border-warmborder shadow-sm space-y-3 hover:shadow-md hover:border-primary transition group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2.5 py-1 rounded-full uppercase">
                                                {mode.badge}
                                            </span>
                                            <p className="font-serif font-extrabold text-lg text-primary">{mode.fare}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="font-bold text-ink text-sm group-hover:text-primary transition">{mode.type}</p>
                                            <p className="text-xs text-ink-light">Duration: <strong>{mode.duration}</strong></p>
                                            <p className="text-[11px] text-ink-muted">Frequency: {mode.frequency}</p>
                                        </div>

                                        <button
                                            onClick={() => alert(`Selected transport option: ${mode.type} (${mode.fare}) to ${dest.spotName}. Proceeding to station prepaid counter.`)}
                                            className="w-full bg-cream-dark hover:bg-primary hover:text-white text-ink text-xs font-bold py-2 rounded-xl border border-warmborder transition"
                                        >
                                            Select Mode & Book
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 2: NEAREST ATM FINDER & HELPLINES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
                {/* Nearest ATMs Column */}
                <div className="lg:col-span-2 bg-cream-card rounded-3xl p-6 sm:p-8 border border-warmborder shadow-warm-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-warmborder pb-4">
                        <div className="space-y-1">
                            <h3 className="font-serif font-bold text-2xl text-ink">Nearest Verified ATMs</h3>
                            <p className="text-xs text-ink-light">Live cash availability status monitored by station authorities.</p>
                        </div>
                        <CreditCard className="w-8 h-8 text-primary" />
                    </div>

                    <div className="space-y-3">
                        {station.nearestATMs.map((atm, i) => (
                            <div key={i} className="p-4 bg-white rounded-2xl border border-warmborder flex items-center justify-between gap-4 hover:border-primary transition shadow-sm">
                                <div className="space-y-1">
                                    <p className="font-bold text-ink text-sm">{atm.name}</p>
                                    <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>{atm.status}</span>
                                    </p>
                                </div>

                                <div className="text-right shrink-0">
                                    <span className="bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-full text-xs">
                                        {atm.distance} from station
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Offline Emergency & Information Card */}
                <div className="bg-gradient-to-br from-[#122A1E] to-[#0B1A12] text-cream rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 space-y-5 shadow-2xl">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Station Support Card</span>
                        <h3 className="font-serif font-bold text-xl text-white">Station Emergency Contacts</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                        {station.offlineGuide.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="p-3 bg-white/10 rounded-xl border border-white/10 space-y-0.5">
                                <p className="font-medium text-cream">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleDownloadOfflineGuide}
                            className="w-full bg-accent hover:bg-accent-dark text-ink font-bold text-xs py-3 rounded-full shadow-lg transition flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download Offline Guide Card</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
