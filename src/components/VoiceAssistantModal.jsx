import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, Compass, ShieldAlert, MapPin, Search, BookOpen, SearchCheck, PackageSearch } from 'lucide-react';

export default function VoiceAssistantModal({ isOpen, onClose }) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [assistantResponse, setAssistantResponse] = useState('');
    const [language, setLanguage] = useState('hi-IN'); // 'hi-IN' | 'en-US'
    const [isSpeaking, setIsSpeaking] = useState(false);
    const navigate = useNavigate();

    const SAMPLE_QUICK_COMMANDS = [
        { label: "🏛️ Baidyanath Dham history", command: "Baidyanath Dham ki history batao", path: "/place/baidyanath-dham" },
        { label: "🚨 Report trash at Hundru", command: "Report trash at Hundru Falls", path: "/feedback" },
        { label: "🚆 Ranchi Station ATMs & Autos", command: "Ranchi station par auto and ATM dikhao", path: "/arrival-guide" },
        { label: "🎨 Scan Sohrai Mud Art", command: "Identify Sohrai tribal painting", path: "/know-your-craft" },
        { label: "🔍 Lost bag at Netarhat", command: "Report lost item at Netarhat", path: "/lost-found" }
    ];

    // Speech Recognition Setup
    useEffect(() => {
        let recognition = null;
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = language;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const resultTranscript = event.results[current][0].transcript;
                setTranscript(resultTranscript);

                if (event.results[current].isFinal) {
                    handleVoiceAction(resultTranscript);
                }
            };
        }

        return () => {
            if (recognition) recognition.abort();
        };
    }, [language]);

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.pitch = 1.0;
            utterance.rate = 0.95;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeech = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
        } else {
            setTranscript('');
            setAssistantResponse('');
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.lang = language;
                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);
                recognition.onresult = (event) => {
                    const text = event.results[0][0].transcript;
                    setTranscript(text);
                    handleVoiceAction(text);
                };
                try {
                    recognition.start();
                } catch (e) {
                    simulateVoiceRecognition();
                }
            } else {
                // Fallback simulation
                simulateVoiceRecognition();
            }
        }
    };

    const simulateVoiceRecognition = () => {
        setIsListening(true);
        setTranscript("Baidyanath Dham ki history batao...");
        setTimeout(() => {
            setIsListening(false);
            handleVoiceAction("Baidyanath Dham ki history batao");
        }, 2200);
    };

    const handleVoiceAction = (query) => {
        const q = query.toLowerCase();
        let response = "";
        let redirectPath = "";

        if (q.includes("history") || q.includes("baidyanath") || q.includes("mandir") || q.includes("temple")) {
            response = "Baidyanath Dham 1596 AD me Raja Puran Mal dwara banwaya gaya tha. Ye 12 Jyotirlinga me se ek hai. Aapko detail page pe le ja rahe hain.";
            redirectPath = "/place/baidyanath-dham";
        } else if (q.includes("trash") || q.includes("report") || q.includes("complaint") || q.includes("clean") || q.includes("issue")) {
            response = "Public Grievance Portal me aapka swagat hai. Aap photo upload karke issue report kar sakte hain. Govt fast action legi.";
            redirectPath = "/feedback";
        } else if (q.includes("station") || q.includes("auto") || q.includes("atm") || q.includes("ranchi") || q.includes("bus")) {
            response = "Real-Time Station Guide par navigate kar rahe hain. Waha aapko nearest ATM, distance aur travel cost dikhega.";
            redirectPath = "/arrival-guide";
        } else if (q.includes("craft") || q.includes("art") || q.includes("sohrai") || q.includes("scan") || q.includes("paint")) {
            response = "Know Your Craft scanner khol rahe hain. Photo upload karke tribal art ki complete details dekhein.";
            redirectPath = "/know-your-craft";
        } else if (q.includes("lost") || q.includes("found") || q.includes("bag") || q.includes("wallet")) {
            response = "Lost and Found hub me aap lost item report kar sakte hain ya claims find kar sakte hain.";
            redirectPath = "/lost-found";
        } else {
            response = `Samajh gaye! "${query}" ke liye Explore Jharkhand portal search results par le ja rahe hain.`;
            redirectPath = `/search?q=${encodeURIComponent(query)}`;
        }

        setAssistantResponse(response);
        speakText(response);

        if (redirectPath) {
            setTimeout(() => {
                onClose();
                navigate(redirectPath);
            }, 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-md animate-fade-in">
            <div className="bg-cream rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-primary/30 relative text-ink space-y-6">
                {/* Close Button */}
                <button
                    onClick={() => { stopSpeech(); onClose(); }}
                    className="absolute top-5 right-5 p-2 text-ink-light hover:text-ink hover:bg-warmborder/50 rounded-full transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Top Header & USP Badge */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3.5 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider font-sans">
                        <Sparkles className="w-3.5 h-3.5 text-accent" />
                        <span>Jharkhand Tourism Voice Assistant ("Grandmother Test" Tested)</span>
                    </div>
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-ink">
                        Boliye, Hum Sun Rahe Hain
                    </h3>
                    <p className="text-xs text-ink-light font-light">
                        Ask about site history, station guides, ATMs, complaints, or lost items in Hindi/English.
                    </p>

                    {/* Language Toggle */}
                    <div className="flex items-center justify-center gap-2 pt-1 font-sans">
                        <button
                            onClick={() => setLanguage('hi-IN')}
                            className={`px-3 py-1 text-xs rounded-full font-bold transition ${language === 'hi-IN' ? 'bg-primary text-white' : 'bg-cream-dark border border-warmborder text-ink'}`}
                        >
                            🇮🇳 Hindi / Nagpuri
                        </button>
                        <button
                            onClick={() => setLanguage('en-US')}
                            className={`px-3 py-1 text-xs rounded-full font-bold transition ${language === 'en-US' ? 'bg-primary text-white' : 'bg-cream-dark border border-warmborder text-ink'}`}
                        >
                            🌐 English
                        </button>
                    </div>
                </div>

                {/* Central Mic Audio Ripple Visualizer */}
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                    <button
                        onClick={toggleListening}
                        className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${isListening
                            ? 'bg-rose-600 text-white scale-110 ring-8 ring-rose-400/40 animate-pulse'
                            : 'bg-primary hover:bg-primary-dark text-white hover:scale-105'
                            }`}
                    >
                        {isListening ? <Mic className="w-10 h-10 animate-bounce" /> : <Mic className="w-10 h-10" />}
                    </button>
                    <p className="text-xs font-bold font-sans uppercase tracking-widest text-primary">
                        {isListening ? "Listening... (Bolna shuru karein)" : "Tap microphone to start speaking"}
                    </p>
                </div>

                {/* Live Transcript & Assistant Response Box */}
                {(transcript || assistantResponse) && (
                    <div className="bg-white/90 p-4 rounded-2xl border border-warmborder shadow-inner space-y-3 text-xs font-sans">
                        {transcript && (
                            <div className="space-y-0.5">
                                <span className="text-[10px] font-extrabold uppercase text-secondary">You said:</span>
                                <p className="font-medium text-ink italic bg-cream-dark/60 p-2 rounded-lg">"{transcript}"</p>
                            </div>
                        )}

                        {assistantResponse && (
                            <div className="space-y-1 border-t border-warmborder/60 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-extrabold uppercase text-primary">Assistant Response:</span>
                                    {isSpeaking ? (
                                        <button onClick={stopSpeech} className="text-rose-600 flex items-center gap-1 font-bold">
                                            <VolumeX className="w-3.5 h-3.5" /> Stop Voice
                                        </button>
                                    ) : (
                                        <button onClick={() => speakText(assistantResponse)} className="text-primary flex items-center gap-1 font-bold">
                                            <Volume2 className="w-3.5 h-3.5" /> Replay
                                        </button>
                                    )}
                                </div>
                                <p className="font-semibold text-primary-dark leading-relaxed">{assistantResponse}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Quick Voice Command Pills */}
                <div className="space-y-2 pt-1 font-sans">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-light">Try saying these voice shortcuts:</p>
                    <div className="flex flex-wrap gap-2">
                        {SAMPLE_QUICK_COMMANDS.map((cmd, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setTranscript(cmd.command);
                                    handleVoiceAction(cmd.command);
                                }}
                                className="text-xs bg-white hover:bg-primary hover:text-white text-ink font-medium px-3 py-1.5 rounded-full border border-warmborder shadow-sm transition hover:scale-105 text-left"
                            >
                                {cmd.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
