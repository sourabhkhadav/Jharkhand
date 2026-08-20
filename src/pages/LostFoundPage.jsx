import React, { useState } from 'react';
import { INITIAL_LOST_FOUND_ITEMS, LOST_FOUND_CATEGORIES } from '../data/lostFoundData';
import { DESTINATIONS } from '../data/destinations';
import SectionHeader from '../components/SectionHeader';
import { Search, Plus, ShieldCheck, MapPin, Phone, CheckCircle2, Clock, Upload, Camera, AlertCircle, Sparkles, Filter, ChevronRight, User, PackageSearch } from 'lucide-react';

export default function LostFoundPage() {
    const [items, setItems] = useState(INITIAL_LOST_FOUND_ITEMS);
    const [filterType, setFilterType] = useState('all'); // 'all' | 'lost' | 'found'
    const [filterCategory, setFilterCategory] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState('');
    const [showReportModal, setShowReportModal] = useState(false);

    // Form state
    const [reportType, setReportType] = useState('lost'); // 'lost' | 'found'
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Electronics & Cameras');
    const [spotName, setSpotName] = useState(DESTINATIONS[0].name);
    const [description, setDescription] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !contactName.trim() || !contactPhone.trim()) {
            alert("Please fill in item title and your contact details.");
            return;
        }

        const newId = `LF-${Math.floor(900 + Math.random() * 100)}`;
        const newItem = {
            id: newId,
            type: reportType,
            title: title,
            category: category,
            spotName: spotName,
            district: "Local District",
            date: "Today (Live)",
            description: description,
            contactName: contactName,
            contactPhone: contactPhone,
            status: reportType === 'lost' ? "Active Search" : "Under Police Verification",
            statusColor: reportType === 'lost' ? "blue" : "amber",
            locationDetail: `${spotName} Information Counter`,
            policeDesk: "Jharkhand Tourist Police Central Desk",
            photo: photoPreview || "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
        };

        setItems([newItem, ...items]);
        setShowReportModal(false);
        alert(`Your ${reportType.toUpperCase()} item report #${newId} has been posted to the central police registry!`);

        // Reset form
        setTitle('');
        setDescription('');
        setContactName('');
        setContactPhone('');
        setPhotoPreview(null);
    };

    const filteredItems = items.filter(item => {
        const matchesType = filterType === 'all' || item.type === filterType;
        const matchesCategory = filterCategory === 'All Categories' || item.category === filterCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.spotName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-primary-dark to-slate-900 text-white rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-4 border-2 border-blue-400/30">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-cream uppercase tracking-wider font-sans">
                    <PackageSearch className="w-4 h-4 text-accent" />
                    <span>Centralized Tourist Property Registry</span>
                </div>
                <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                    Lost & Found Assistance Desk
                </h1>
                <p className="text-sm sm:text-base text-cream/90 max-w-2xl font-light leading-relaxed">
                    Lost a camera, wallet, or backpack during your trip? Or found an item at a tourist spot? Report it here to connect directly with Tourist Police and destination management counters.
                </p>

                <div className="pt-2 font-sans flex flex-wrap gap-3">
                    <button
                        onClick={() => setShowReportModal(true)}
                        className="bg-accent hover:bg-accent-dark text-ink font-extrabold text-xs px-6 py-3.5 rounded-full shadow-warm-lg transition flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Report Lost or Found Item Now</span>
                    </button>
                </div>
            </div>

            {/* FILTER & SEARCH BAR */}
            <div className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm space-y-4 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="w-4 h-4 text-ink-muted absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search item, spot name, or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    {/* Filter Type Pills */}
                    <div className="flex bg-cream-dark p-1 rounded-2xl border border-warmborder">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${filterType === 'all' ? 'bg-primary text-white shadow-sm' : 'text-ink-light'}`}
                        >
                            All ({items.length})
                        </button>
                        <button
                            onClick={() => setFilterType('lost')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${filterType === 'lost' ? 'bg-rose-600 text-white shadow-sm' : 'text-ink-light'}`}
                        >
                            Lost Items
                        </button>
                        <button
                            onClick={() => setFilterType('found')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${filterType === 'found' ? 'bg-emerald-600 text-white shadow-sm' : 'text-ink-light'}`}
                        >
                            Found Items
                        </button>
                    </div>

                    {/* Category Dropdown */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-warmborder text-ink text-xs font-bold focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                        {LOST_FOUND_CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ITEMS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                {filteredItems.map((item) => (
                    <div key={item.id} className="bg-cream-card rounded-3xl p-6 border border-warmborder shadow-warm-sm hover:shadow-warm-md transition space-y-4 flex flex-col justify-between">
                        <div className="space-y-4">
                            {/* Card Top Pill Header */}
                            <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${item.type === 'lost' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                    {item.type === 'lost' ? '🔴 REPORTED LOST' : '🟢 FOUND ITEM'}
                                </span>
                                <span className="text-[11px] font-bold text-ink-muted bg-cream-dark border border-warmborder px-3 py-1 rounded-full">
                                    ID #{item.id}
                                </span>
                            </div>

                            {/* Image & Main Info */}
                            <div className="flex gap-4">
                                <img
                                    src={item.photo}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-2xl border border-warmborder shrink-0"
                                />
                                <div className="space-y-1">
                                    <h3 className="font-serif font-bold text-lg text-ink">{item.title}</h3>
                                    <p className="text-xs font-bold text-primary flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{item.spotName} ({item.district})</span>
                                    </p>
                                    <p className="text-[11px] text-ink-muted">Category: {item.category} • Date: {item.date}</p>
                                </div>
                            </div>

                            <p className="text-xs text-ink-light leading-relaxed bg-white p-3 rounded-xl border border-warmborder">
                                {item.description}
                            </p>

                            {/* Status & Police Desk Info */}
                            <div className="p-3 bg-cream-dark rounded-xl border border-warmborder space-y-1 text-xs">
                                <p className="font-bold text-ink flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    <span>Verified Outpost: <strong className="text-primary-dark">{item.policeDesk}</strong></span>
                                </p>
                                <p className="text-[11px] text-ink-light">Desk Location: {item.locationDetail}</p>
                            </div>
                        </div>

                        {/* Claim / Contact Action Button */}
                        <div className="pt-2 border-t border-warmborder flex items-center justify-between gap-3">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-ink-muted">Contact Custodian</p>
                                <p className="text-xs font-bold text-ink">{item.contactName}</p>
                            </div>
                            <button
                                onClick={() => alert(`Call Helpline: ${item.contactPhone}\nPolice Desk: ${item.policeDesk}\nPlease produce identity proof to claim property.`)}
                                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-warm-sm transition flex items-center gap-1.5"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Claim / Contact Desk</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* REPORT MODAL */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-md animate-fade-in font-sans">
                    <div className="bg-cream rounded-[32px] max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-primary/30 relative text-ink space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-warmborder pb-3">
                            <h3 className="font-serif font-bold text-2xl text-ink">Report Property to Police Registry</h3>
                            <button onClick={() => setShowReportModal(false)} className="text-ink-light hover:text-ink font-bold text-sm">✕ Close</button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                            {/* Type Toggle */}
                            <div className="flex bg-cream-dark p-1 rounded-xl border border-warmborder">
                                <button
                                    type="button"
                                    onClick={() => setReportType('lost')}
                                    className={`flex-1 py-2.5 rounded-lg font-bold text-xs ${reportType === 'lost' ? 'bg-rose-600 text-white' : 'text-ink-light'}`}
                                >
                                    🔴 I Lost an Item
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setReportType('found')}
                                    className={`flex-1 py-2.5 rounded-lg font-bold text-xs ${reportType === 'found' ? 'bg-emerald-600 text-white' : 'text-ink-light'}`}
                                >
                                    🟢 I Found an Item
                                </button>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-ink">Item Title / Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Sony Alpha Camera Bag, Brown Wallet..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-ink">Category *</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                    >
                                        {LOST_FOUND_CATEGORIES.filter(c => c !== 'All Categories').map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-ink">Tourist Location *</label>
                                    <select
                                        value={spotName}
                                        onChange={(e) => setSpotName(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                    >
                                        {DESTINATIONS.map(d => (
                                            <option key={d.id} value={d.name}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-ink">Detailed Description</label>
                                <textarea
                                    rows={3}
                                    placeholder="Describe specific markings, contents, or location where item was left..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-ink">Your Contact Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-ink">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        value={contactPhone}
                                        onChange={(e) => setContactPhone(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-white border border-warmborder text-ink text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-1">
                                <label className="font-bold text-ink">Upload Photo (Optional)</label>
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full text-xs text-ink-light" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs py-3.5 rounded-full shadow-warm-md transition"
                            >
                                Submit Item Report to Police Registry
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
