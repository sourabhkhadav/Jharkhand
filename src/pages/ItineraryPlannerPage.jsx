import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import SectionHeader from '../components/SectionHeader';
import { Sparkles, Calendar, DollarSign, MapPin, ArrowRight, ArrowUp, ArrowDown, Trash2, CheckCircle, Save, Compass } from 'lucide-react';

export default function ItineraryPlannerPage({ onOpenBooking }) {
    const [step, setStep] = useState(1); // 1: Input form, 2: Generated result timeline
    const [selectedInterests, setSelectedInterests] = useState(['Waterfalls', 'Wildlife']);
    const [days, setDays] = useState(3);
    const [budget, setBudget] = useState('Medium (₹3,000 - ₹5,000/day)');
    const [startingPoint, setStartingPoint] = useState('Ranchi');
    const [activeDayTab, setActiveDayTab] = useState(1);

    const interestOptions = ['Waterfalls', 'Wildlife', 'Spiritual Shrines', 'Tribal Culture', 'Adventure & Valleys', 'Eco Homestays'];

    // Generated Mock Itinerary Days Structure
    const [itineraryDays, setItineraryDays] = useState([
        {
            day: 1,
            title: "Ranchi Waterfall Circuit & Tribal Refreshment",
            stops: [
                { id: 'stop-1', time: '08:30 AM', place: DESTINATIONS[0], note: 'Morning drive to 320ft Hundru Falls cascade. Take stair trail to bottom pool.' },
                { id: 'stop-2', time: '01:00 PM', place: DESTINATIONS[7], note: 'Traditional Santhal lunch & fresh coconut at Dassam Falls view deck.' },
                { id: 'stop-3', time: '04:30 PM', place: DESTINATIONS[4], note: 'Sunset mountain serpentine drive along Patratu Lake Valley.' }
            ]
        },
        {
            day: 2,
            title: "Netarhat Plateau Pines & Magnolia Sunset",
            stops: [
                { id: 'stop-4', time: '07:00 AM', place: DESTINATIONS[3], note: 'Scenic morning ascent to 3,700 ft Netarhat hill station.' },
                { id: 'stop-5', time: '02:00 PM', place: DESTINATIONS[6], note: 'Visit Hazaribagh/Latehar Sohrai mud mural painting artisan cottage.' },
                { id: 'stop-6', time: '05:30 PM', place: DESTINATIONS[3], note: 'Magnolia Point sunset view over deep Sal forest valleys.' }
            ]
        },
        {
            day: 3,
            title: "Betla Wildlife Safari & Ancient Chero Fort",
            stops: [
                { id: 'stop-7', time: '06:00 AM', place: DESTINATIONS[1], note: 'Open top 4x4 safari Jeep through Betla elephant and tiger canopy.' },
                { id: 'stop-8', time: '11:30 AM', place: DESTINATIONS[1], note: 'Explore 16th century Chero Dynasty fort ruins inside forest canopy.' },
                { id: 'stop-9', time: '03:00 PM', place: DESTINATIONS[2], note: 'Optional pilgrimage stop or return drive.' }
            ]
        }
    ]);

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        setStep(2);
    };

    // Reorder stop function
    const moveStop = (dayIdx, stopIdx, direction) => {
        const newDays = [...itineraryDays];
        const stops = [...newDays[dayIdx].stops];
        const targetIdx = direction === 'up' ? stopIdx - 1 : stopIdx + 1;
        if (targetIdx < 0 || targetIdx >= stops.length) return;

        const temp = stops[stopIdx];
        stops[stopIdx] = stops[targetIdx];
        stops[targetIdx] = temp;

        newDays[dayIdx].stops = stops;
        setItineraryDays(newDays);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <SectionHeader
                eyebrow="SMART TRAVEL ASSISTANT"
                title="AI Itinerary Planner"
                subtitle="Craft your tailored trip across Jharkhand based on your schedule, interests, and budget."
            />

            {step === 1 ? (
                /* STEP 1: INPUT FORM */
                <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-warmborder shadow-warm-md max-w-3xl mx-auto space-y-8">
                    <form onSubmit={handleGenerate} className="space-y-6">
                        {/* Interests Multi-Select */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                                1. Select Travel Interests
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {interestOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => toggleInterest(opt)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold border transition ${selectedInterests.includes(opt)
                                                ? 'bg-primary text-white border-primary shadow'
                                                : 'bg-cream-dark border-warmborder text-ink-light hover:text-ink'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stepper Days & Budget */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Number of Days</span>
                                </label>
                                <div className="flex items-center gap-4 bg-cream-dark p-2 rounded-2xl border border-warmborder">
                                    <button
                                        type="button"
                                        onClick={() => setDays(Math.max(1, days - 1))}
                                        className="w-10 h-10 rounded-xl bg-white text-ink font-bold text-lg flex items-center justify-center shadow-sm"
                                    >
                                        -
                                    </button>
                                    <span className="font-serif font-bold text-xl text-ink flex-1 text-center">{days} Days</span>
                                    <button
                                        type="button"
                                        onClick={() => setDays(Math.min(7, days + 1))}
                                        className="w-10 h-10 rounded-xl bg-white text-ink font-bold text-lg flex items-center justify-center shadow-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Starting Location</span>
                                </label>
                                <select
                                    value={startingPoint}
                                    onChange={(e) => setStartingPoint(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl bg-cream-dark border border-warmborder text-xs font-bold text-ink focus:outline-none"
                                >
                                    <option value="Ranchi">Ranchi (Capital & Airport)</option>
                                    <option value="Jamshedpur">Jamshedpur (Tatanagar)</option>
                                    <option value="Deoghar">Deoghar (Baidyanath Dham)</option>
                                    <option value="Dhanbad">Dhanbad</option>
                                </select>
                            </div>
                        </div>

                        {/* Budget Slider */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>Budget Tier: <strong className="text-ink">{budget}</strong></span>
                            </label>
                            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                                {['Economy (₹1,500/day)', 'Medium (₹3,500/day)', 'Luxury (₹7,000/day)'].map((b) => (
                                    <button
                                        key={b}
                                        type="button"
                                        onClick={() => setBudget(b)}
                                        className={`p-3 rounded-2xl border text-center transition ${budget === b ? 'bg-secondary text-white border-secondary font-bold' : 'bg-cream-dark border-warmborder text-ink-light'
                                            }`}
                                    >
                                        {b.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-sm py-4 rounded-full shadow-warm-lg transition flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-5 h-5 text-accent-light" />
                            <span>Generate Customized Itinerary</span>
                        </button>
                    </form>
                </div>
            ) : (
                /* STEP 2: GENERATED ITINERARY TIMELINE & ROUTE MAP */
                <div className="space-y-8 animate-fade-in">
                    {/* Day Tabs */}
                    <div className="flex items-center justify-between bg-cream-dark p-2 rounded-2xl border border-warmborder overflow-x-auto">
                        <div className="flex gap-2">
                            {itineraryDays.map((d) => (
                                <button
                                    key={d.day}
                                    onClick={() => setActiveDayTab(d.day)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${activeDayTab === d.day ? 'bg-primary text-white shadow-warm-sm' : 'text-ink-light hover:text-ink'
                                        }`}
                                >
                                    Day {d.day}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(1)}
                            className="text-xs font-bold text-secondary hover:underline px-3"
                        >
                            Edit Preferences
                        </button>
                    </div>

                    {/* Timeline + Map Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Timeline Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {itineraryDays.filter(d => d.day === activeDayTab).map((currentDay, dayIdx) => (
                                <div key={currentDay.day} className="space-y-4">
                                    <h3 className="font-serif font-bold text-xl text-ink border-b border-warmborder pb-2">
                                        {currentDay.title}
                                    </h3>

                                    {/* Vertical Timeline */}
                                    <div className="relative pl-6 space-y-6 border-l-2 border-primary/30">
                                        {currentDay.stops.map((stop, stopIdx) => (
                                            <div key={stop.id} className="relative group">
                                                {/* Timeline Node Icon */}
                                                <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center shadow">
                                                    {stopIdx + 1}
                                                </div>

                                                {/* Stop Card */}
                                                <div className="bg-cream-card rounded-2xl p-4 border border-warmborder shadow-warm-sm space-y-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-primary">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span>{stop.time}</span>
                                                        </div>

                                                        {/* Up / Down Reorder Controls */}
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => moveStop(dayIdx, stopIdx, 'up')}
                                                                disabled={stopIdx === 0}
                                                                className="p-1 text-ink-light hover:text-primary disabled:opacity-30 rounded hover:bg-cream-dark"
                                                                title="Move Stop Up"
                                                            >
                                                                <ArrowUp className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => moveStop(dayIdx, stopIdx, 'down')}
                                                                disabled={stopIdx === currentDay.stops.length - 1}
                                                                className="p-1 text-ink-light hover:text-primary disabled:opacity-30 rounded hover:bg-cream-dark"
                                                                title="Move Stop Down"
                                                            >
                                                                <ArrowDown className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 items-center">
                                                        <img src={stop.place.heroImage} alt="" className="w-20 h-20 object-cover rounded-xl" />
                                                        <div className="space-y-1">
                                                            <h4 className="font-serif font-bold text-base text-ink">{stop.place.name}</h4>
                                                            <p className="text-xs text-ink-light">{stop.note}</p>
                                                            <span className="text-[10px] bg-secondary-light text-secondary font-bold px-2 py-0.5 rounded">
                                                                {stop.place.district} ({stop.place.category})
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Route Map Panel (Right Column) */}
                        <div className="space-y-4">
                            <div className="bg-cream-card rounded-3xl p-5 border border-warmborder shadow-warm-sm space-y-4">
                                <h4 className="font-serif font-bold text-base text-ink">Route Map Overview</h4>
                                <div className="relative aspect-[4/3] bg-secondary-light rounded-2xl overflow-hidden border border-warmborder flex items-center justify-center p-4">
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1F5C4F_1px,transparent_1px)] [background-size:12px_12px]" />
                                    <div className="relative text-center space-y-2 text-xs font-bold text-secondary">
                                        <Compass className="w-10 h-10 mx-auto animate-spin-slow text-primary" />
                                        <p>Optimized 3-Day Circuit Map</p>
                                        <p className="text-[10px] text-ink-light font-normal">Ranchi ➔ Netarhat ➔ Betla Tiger Reserve</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between text-ink-light">
                                        <span>Total Distance:</span>
                                        <strong className="text-ink">~320 km</strong>
                                    </div>
                                    <div className="flex justify-between text-ink-light">
                                        <span>Estimated Fuel / Travel:</span>
                                        <strong className="text-ink">₹2,200</strong>
                                    </div>
                                    <div className="flex justify-between text-ink-light">
                                        <span>Eco Homestays Available:</span>
                                        <strong className="text-emerald-700">3 Verified</strong>
                                    </div>
                                </div>

                                <div className="pt-2 space-y-2">
                                    <button
                                        onClick={() => alert("Itinerary saved to your user profile!")}
                                        className="w-full bg-cream-dark hover:bg-warmborder text-ink font-bold text-xs py-3 rounded-full border border-warmborder flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-4 h-4 text-primary" />
                                        <span>Save Itinerary to Profile</span>
                                    </button>

                                    <button
                                        onClick={() => onOpenBooking(DESTINATIONS[0])}
                                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-full shadow-warm-md flex items-center justify-center gap-2"
                                    >
                                        <span>Book Entire Trip Package</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
