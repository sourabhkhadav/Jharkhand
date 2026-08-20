import React, { useState } from 'react';
import { GRIEVANCE_CATEGORIES, PUBLIC_GRIEVANCES, SLA_METRICS } from '../data/grievanceData';
import { DESTINATIONS } from '../data/destinations';
import SectionHeader from '../components/SectionHeader';
import { AlertCircle, CheckCircle2, Clock, Upload, ShieldCheck, MapPin, Send, ThumbsUp, Camera, Sparkles, Filter, ChevronRight, User, FileText, RefreshCw } from 'lucide-react';

export default function FeedbackPage() {
    const [grievanceList, setGrievanceList] = useState(PUBLIC_GRIEVANCES);
    const [activeTab, setActiveTab] = useState('report'); // 'report' | 'tracker'
    const [selectedCategory, setSelectedCategory] = useState('cleanliness');
    const [filterCategory, setFilterCategory] = useState('all');
    const [spotName, setSpotName] = useState(DESTINATIONS[0].name);
    const [touristName, setTouristName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState('Medium');
    const [photoPreview, setPhotoPreview] = useState(null);
    const [submittedTicket, setSubmittedTicket] = useState(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitGrievance = (e) => {
        e.preventDefault();
        if (!description.trim() || !touristName.trim()) {
            alert("Please fill in your name and problem description.");
            return;
        }

        const newId = `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const catObj = GRIEVANCE_CATEGORIES.find(c => c.id === selectedCategory);

        const newTicket = {
            id: newId,
            category: selectedCategory,
            categoryLabel: catObj ? catObj.label : "General Issue",
            spotName: spotName,
            district: "Ranchi / Local District",
            touristName: touristName,
            dateSubmitted: "Just now (Live)",
            description: description,
            status: "Verified & Action Initiated",
            statusStep: 2, // 1: Submitted, 2: Verified, 3: Dispatched, 4: Resolved
            slaTime: "Estimated resolution < 4 hours",
            urgency: urgency,
            assignedOfficer: "Jharkhand Tourism District Control Cell & RTO",
            resolutionDetails: "Issue logged into Govt Central Grievance Matrix. Field inspection squad notified.",
            photoBefore: photoPreview || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
            photoAfter: null,
            rating: null
        };

        setGrievanceList([newTicket, ...grievanceList]);
        setSubmittedTicket(newTicket);
        setActiveTab('tracker');

        // Reset form
        setDescription('');
        setTouristName('');
        setPhone('');
        setPhotoPreview(null);
    };

    const filteredGrievances = filterCategory === 'all'
        ? grievanceList
        : grievanceList.filter(g => g.category === filterCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-primary-dark via-primary to-secondary text-white rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-cream uppercase tracking-wider font-sans">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Official Govt Grievance-to-Resolution Portal</span>
                </div>
                <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                    Tourist Feedback & Action Cell
                </h1>
                <p className="text-sm sm:text-base text-cream/90 max-w-2xl font-light leading-relaxed">
                    Report cleanliness, safety, transport overcharging, or infrastructure issues directly to District Tourism Officers. We guarantee fast public resolution tracking.
                </p>

                {/* SLA Statistics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20 max-w-4xl text-cream font-sans">
                    <div>
                        <p className="font-serif text-2xl font-bold text-accent">{SLA_METRICS.totalResolvedThisMonth}+</p>
                        <p className="text-[11px] uppercase font-medium text-white/80">Issues Resolved This Month</p>
                    </div>
                    <div>
                        <p className="font-serif text-2xl font-bold text-accent">{SLA_METRICS.avgResolutionTimeHours}</p>
                        <p className="text-[11px] uppercase font-medium text-white/80">Avg Public SLA Speed</p>
                    </div>
                    <div>
                        <p className="font-serif text-2xl font-bold text-accent">{SLA_METRICS.satisfactionRate}</p>
                        <p className="text-[11px] uppercase font-medium text-white/80">Tourist Rating</p>
                    </div>
                    <div>
                        <p className="font-serif text-2xl font-bold text-accent">{SLA_METRICS.activeMonitoringCells}</p>
                        <p className="text-[11px] uppercase font-medium text-white/80">District Rapid Action Teams</p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs (Report vs Tracker Feed) */}
            <div className="flex justify-center font-sans">
                <div className="bg-cream-dark p-1.5 rounded-full border border-warmborder inline-flex gap-2 shadow-sm">
                    <button
                        onClick={() => setActiveTab('report')}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${activeTab === 'report' ? 'bg-primary text-white shadow-md' : 'text-ink-light hover:text-ink'}`}
                    >
                        <FileText className="w-4 h-4" />
                        <span>File New Complaint / Feedback</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('tracker')}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${activeTab === 'tracker' ? 'bg-primary text-white shadow-md' : 'text-ink-light hover:text-ink'}`}
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Public Resolution Tracker Feed ({grievanceList.length})</span>
                    </button>
                </div>
            </div>

            {/* TAB 1: FILE COMPLAINT FORM */}
            {activeTab === 'report' && (
                <div className="bg-cream-card rounded-3xl p-6 sm:p-10 border border-warmborder shadow-warm-md max-w-4xl mx-auto space-y-8">
                    <div className="space-y-1">
                        <h2 className="font-serif font-bold text-2xl text-ink">Submit Tourist Complaint or Grievance</h2>
                        <p className="text-xs text-ink-light">Upload photo evidence and details. Your grievance ticket will generate immediately for public SLA tracking.</p>
                    </div>

                    <form onSubmit={handleSubmitGrievance} className="space-y-6 text-xs font-sans">
                        {/* Tourist Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-bold text-ink flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-primary" />
                                    <span>Your Full Name *</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Ramesh Kumar"
                                    value={touristName}
                                    onChange={(e) => setTouristName(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-ink flex items-center gap-1.5">
                                    <span>Phone Number (for SMS updates)</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Destination & Category Selector */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-bold text-ink flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span>Tourist Location / Spot *</span>
                                </label>
                                <select
                                    value={spotName}
                                    onChange={(e) => setSpotName(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none font-medium"
                                >
                                    {DESTINATIONS.map(d => (
                                        <option key={d.id} value={d.name}>{d.name} ({d.district})</option>
                                    ))}
                                    <option value="Ranchi Railway Station Stand">Ranchi Railway Station Stand</option>
                                    <option value="Deoghar Baidyanath Gate">Deoghar Baidyanath Gate</option>
                                    <option value="Patratu Valley Hairpin Bend">Patratu Valley Hairpin Bend</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-ink">Category of Issue *</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none font-medium"
                                >
                                    {GRIEVANCE_CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Urgency Radio Pills */}
                        <div className="space-y-1.5">
                            <label className="font-bold text-ink">Urgency Level</label>
                            <div className="flex gap-3">
                                {['Low', 'Medium', 'High / Emergency'].map(u => (
                                    <button
                                        type="button"
                                        key={u}
                                        onClick={() => setUrgency(u)}
                                        className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition ${urgency === u ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-ink border-warmborder hover:bg-cream-dark'}`}
                                    >
                                        {u}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description Textarea */}
                        <div className="space-y-1.5">
                            <label className="font-bold text-ink">Describe the Issue in Detail *</label>
                            <textarea
                                rows={4}
                                required
                                placeholder="Describe what happened (e.g., overflow of garbage near water pool, auto driver asking extra fare, damaged handrail...)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>

                        {/* Photo Upload Area */}
                        <div className="space-y-1.5">
                            <label className="font-bold text-ink flex items-center gap-1.5">
                                <Camera className="w-4 h-4 text-primary" />
                                <span>Upload Photo Evidence (Optional but Recommended)</span>
                            </label>

                            <div className="border-2 border-dashed border-warmborder bg-white rounded-2xl p-6 text-center hover:border-primary transition cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {photoPreview ? (
                                    <div className="flex flex-col items-center space-y-2">
                                        <img src={photoPreview} alt="Evidence preview" className="h-32 object-cover rounded-xl shadow-md" />
                                        <p className="text-emerald-700 font-bold">✓ Photo Attached Successfully</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Upload className="w-8 h-8 text-primary mx-auto" />
                                        <p className="font-bold text-ink">Click to upload photo or take picture from phone</p>
                                        <p className="text-[10px] text-ink-muted">PNG, JPG up to 10MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-4 rounded-full shadow-warm-lg transition flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                <span>Submit Grievance to Govt Action Cell</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* TAB 2: PUBLIC RESOLUTION TRACKER FEED */}
            {activeTab === 'tracker' && (
                <div className="space-y-6">
                    {/* Confirmation Banner if just submitted */}
                    {submittedTicket && (
                        <div className="p-5 bg-emerald-100 border border-emerald-300 rounded-3xl text-emerald-900 font-sans flex items-start gap-4 animate-fade-in shadow-md">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h3 className="font-bold text-base">Grievance Ticket #{submittedTicket.id} Created!</h3>
                                <p className="text-xs">Your grievance has been logged into the public tracking system. District Officer assigned: <strong>{submittedTicket.assignedOfficer}</strong>.</p>
                            </div>
                        </div>
                    )}

                    {/* Filter Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream-card p-4 rounded-2xl border border-warmborder font-sans">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-ink">Filter Complaints:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilterCategory('all')}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold ${filterCategory === 'all' ? 'bg-primary text-white' : 'bg-cream-dark border border-warmborder text-ink'}`}
                            >
                                All Issues
                            </button>
                            {GRIEVANCE_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilterCategory(cat.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${filterCategory === cat.id ? 'bg-primary text-white' : 'bg-cream-dark border border-warmborder text-ink'}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grievance Ticket Cards */}
                    <div className="space-y-6">
                        {filteredGrievances.map((item) => (
                            <div key={item.id} className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-warmborder shadow-warm-sm space-y-6 font-sans">
                                {/* Ticket Top Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warmborder pb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-xs">
                                                Ticket #{item.id}
                                            </span>
                                            <span className="bg-cream-dark border border-warmborder text-ink font-semibold px-3 py-1 rounded-full text-xs">
                                                {item.categoryLabel}
                                            </span>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                Status: {item.status}
                                            </span>
                                        </div>
                                        <h3 className="font-serif font-bold text-xl text-ink">{item.spotName}</h3>
                                        <p className="text-xs text-ink-light">Reported by {item.touristName} on {item.dateSubmitted}</p>
                                    </div>

                                    <div className="text-right space-y-1 shrink-0">
                                        <p className="text-[11px] uppercase font-bold text-ink-muted">SLA Benchmark</p>
                                        <p className="text-xs font-bold text-primary flex items-center gap-1 justify-end">
                                            <Clock className="w-3.5 h-3.5 text-primary" />
                                            <span>{item.slaTime}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Step Tracker Bar */}
                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Resolution Progress Steps:</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['1. Submitted', '2. Verified', '3. Dispatched', '4. Resolved'].map((stepName, idx) => {
                                            const isDone = item.statusStep >= idx + 1;
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`py-2 px-2 rounded-xl text-[11px] font-bold text-center border transition ${isDone ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-cream-dark text-ink-muted border-warmborder'}`}
                                                >
                                                    {stepName}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Content Grid (Problem vs Officer Action) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-white p-5 rounded-2xl border border-warmborder">
                                    {/* Left: Tourist Problem & Photo */}
                                    <div className="space-y-3">
                                        <p className="font-bold text-ink text-sm">Tourist Description:</p>
                                        <p className="text-ink-light leading-relaxed font-light">{item.description}</p>

                                        {item.photoBefore && (
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold uppercase text-ink-muted">Attached Evidence Photo:</p>
                                                <img src={item.photoBefore} alt="Before evidence" className="w-full h-44 object-cover rounded-xl border border-warmborder" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Government Officer Resolution */}
                                    <div className="space-y-3 border-t md:border-t-0 md:border-l border-warmborder pt-4 md:pt-0 md:pl-6">
                                        <p className="font-bold text-emerald-800 text-sm flex items-center gap-1.5">
                                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                            <span>Govt Action & Officer Note:</span>
                                        </p>
                                        <p className="text-xs text-ink-light font-medium">Assigned Officer: <strong className="text-ink">{item.assignedOfficer}</strong></p>
                                        <p className="text-ink-light leading-relaxed bg-cream-dark/60 p-3 rounded-xl border border-warmborder">{item.resolutionDetails}</p>

                                        {item.photoAfter && (
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold uppercase text-emerald-700">Verified Resolution Photo (Cleaned/Fixed):</p>
                                                <img src={item.photoAfter} alt="After resolution" className="w-full h-44 object-cover rounded-xl border border-emerald-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
