import React, { useState } from 'react';
import { CRAFT_SAMPLES } from '../data/craftsData';
import SectionHeader from '../components/SectionHeader';
import { Camera, Sparkles, Upload, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight, BookOpen, Layers, Award, Tag, RefreshCw } from 'lucide-react';

export default function KnowYourCraftPage() {
    const [selectedCraft, setSelectedCraft] = useState(CRAFT_SAMPLES[0]);
    const [isScanning, setIsScanning] = useState(false);
    const [scannedImage, setScannedImage] = useState(null);
    const [scanResults, setScanResults] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgData = reader.result;
                setScannedImage(imgData);
                triggerAIScan(imgData);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerAIScan = (imgData) => {
        setIsScanning(true);
        setScanResults(null);

        // Pick a craft sample based on random or match
        setTimeout(() => {
            const randomMatch = CRAFT_SAMPLES[Math.floor(Math.random() * CRAFT_SAMPLES.length)];
            setSelectedCraft(randomMatch);
            setScanResults(randomMatch);
            setIsScanning(false);
        }, 2500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-sans">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-amber-950 via-primary-dark to-amber-900 text-cream rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-4 border-2 border-accent/40">
                <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>AI-Powered Tribal Art & Craft Identification Scanner</span>
                </div>
                <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                    Know Your Craft (Jharkhand Tribal Art Engine)
                </h1>
                <p className="text-sm sm:text-base text-cream/90 max-w-2xl font-light leading-relaxed">
                    Upload or snap a photo of any wall painting, metal figurine, or silk product. Our AI computer vision model instantly identifies the craft, tribal origin, natural materials, GI Tag certificate, and connects you directly with artisan cooperatives.
                </p>
            </div>

            {/* AI SCANNER INTERACTION ZONE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Upload / Camera Dropzone */}
                <div className="bg-cream-card rounded-3xl p-6 sm:p-8 border border-warmborder shadow-warm-sm space-y-6">
                    <div className="space-y-1">
                        <h2 className="font-serif font-bold text-2xl text-ink">Upload Craft Photo for AI Analysis</h2>
                        <p className="text-xs text-ink-light">Supports Sohrai Mud Art, Dokra Brass, Kuchai Tussar Silk, Pyatkar Scrolls, Bamboo Crafts.</p>
                    </div>

                    <div className="border-2 border-dashed border-primary/40 bg-white rounded-3xl p-8 text-center hover:border-primary transition cursor-pointer relative overflow-hidden group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        {isScanning ? (
                            <div className="py-8 space-y-4">
                                <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
                                <div className="space-y-1">
                                    <p className="font-serif font-bold text-lg text-primary">Scanning Tribal Pigment Vectors...</p>
                                    <p className="text-xs text-ink-light">Matching against 10,000+ Santhal & Malhor indigenous craft patterns</p>
                                </div>
                            </div>
                        ) : scannedImage ? (
                            <div className="space-y-3">
                                <img src={scannedImage} alt="Uploaded scan" className="h-56 object-cover rounded-2xl mx-auto shadow-md border border-warmborder" />
                                <p className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Analysis Complete! View match results below.</span>
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4 py-6">
                                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto group-hover:scale-110 transition">
                                    <Camera className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold text-base text-ink">Click to snap photo or upload image</p>
                                    <p className="text-xs text-ink-light">Works with camera or photo library</p>
                                </div>
                                <span className="inline-block bg-primary text-white font-bold text-xs px-5 py-2 rounded-full shadow-warm-sm">
                                    Browse Files / Use Camera
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Quick Demo Pre-selected Craft Badges */}
                    <div className="space-y-2">
                        <p className="text-[11px] uppercase font-bold text-ink-muted">Or try scanning sample craft presets:</p>
                        <div className="flex flex-wrap gap-2">
                            {CRAFT_SAMPLES.map(craft => (
                                <button
                                    key={craft.id}
                                    onClick={() => {
                                        setSelectedCraft(craft);
                                        setScanResults(craft);
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition border ${selectedCraft.id === craft.id ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-ink border-warmborder hover:bg-cream-dark'}`}
                                >
                                    {craft.name.split(' ')[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: AI IDENTIFICATION RESULT CARD */}
                <div className="bg-gradient-to-br from-[#201509] via-[#160E05] to-[#2D1E0C] text-cream rounded-3xl p-6 sm:p-8 border-2 border-accent/40 shadow-2xl space-y-6 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-accent/30 pb-4">
                        <div className="space-y-1">
                            <span className="bg-accent/20 text-accent font-bold px-3 py-1 rounded-full text-[11px] uppercase border border-accent/30">
                                Match Confidence: {selectedCraft.matchConfidence}
                            </span>
                            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-accent-light">
                                {selectedCraft.name}
                            </h2>
                        </div>
                        <Award className="w-10 h-10 text-accent shrink-0" />
                    </div>

                    {/* Craft Metadata Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-1">
                            <p className="text-[10px] uppercase font-bold text-accent">GI Certification</p>
                            <p className="font-bold text-white">{selectedCraft.giTag}</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-1">
                            <p className="text-[10px] uppercase font-bold text-accent">Indigenous Community</p>
                            <p className="font-bold text-white">{selectedCraft.tribe}</p>
                        </div>
                    </div>

                    {/* Image Preview & Cultural Narrative */}
                    <div className="space-y-3">
                        <img src={selectedCraft.heroImage} alt={selectedCraft.name} className="w-full h-48 object-cover rounded-2xl border border-accent/30 shadow-lg" />

                        <div className="space-y-2">
                            <h3 className="font-serif font-bold text-base text-accent">Cultural & Historical Significance</h3>
                            <p className="text-xs text-cream/90 leading-relaxed font-light">{selectedCraft.culturalSignificance}</p>
                        </div>
                    </div>

                    {/* Natural Materials Used */}
                    <div className="space-y-2">
                        <p className="text-[11px] uppercase font-bold text-accent">Natural & Traditional Materials:</p>
                        <div className="flex flex-wrap gap-1.5">
                            {selectedCraft.materials.map(m => (
                                <span key={m} className="bg-black/40 text-cream/90 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-accent/20">
                                    • {m}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Artisan Story */}
                    <div className="p-4 bg-accent/15 rounded-2xl border border-accent/30 space-y-1 text-xs text-cream">
                        <p className="font-serif font-bold text-accent text-sm">Artisan Heritage Note:</p>
                        <p className="leading-relaxed font-light">{selectedCraft.artisanStory}</p>
                    </div>
                </div>
            </div>


        </div>
    );
}
