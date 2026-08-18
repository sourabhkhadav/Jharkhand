import React, { useState } from 'react';
import { X, Calendar, Users, ShieldCheck, CheckCircle } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, item }) {
    const [step, setStep] = useState(1);
    const [guests, setGuests] = useState(2);
    const [date, setDate] = useState('2026-10-15');

    if (!isOpen || !item) return null;

    const price = item.pricePerNight || item.pricePerDay || item.price || 1500;
    const totalPrice = price * (item.pricePerNight ? 2 : 1);

    const handleConfirm = () => {
        setStep(2);
        setTimeout(() => {
            setStep(1);
            onClose();
        }, 2200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-cream border border-warmborder rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-ink-light hover:text-ink rounded-full">
                    <X className="w-5 h-5" />
                </button>

                {step === 2 ? (
                    <div className="text-center py-8 space-y-4">
                        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                        <h3 className="font-serif font-bold text-2xl text-ink">Booking Confirmed!</h3>
                        <p className="text-xs text-ink-light">Your reservation for <strong>{item.name || item.title}</strong> has been secured with official booking reference <strong>#JK-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Instant Booking</span>
                            <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink">{item.name || item.title}</h3>
                            <p className="text-xs text-ink-light">{item.location || item.district}</p>
                        </div>

                        <div className="flex gap-4 p-3 bg-cream-dark rounded-2xl border border-warmborder items-center">
                            <img src={item.image || item.photo || item.heroImage} alt="" className="w-20 h-20 object-cover rounded-xl" />
                            <div className="text-xs space-y-1">
                                <p className="font-bold text-ink">{item.type || item.specialty || item.category}</p>
                                <p className="text-ink-light">{item.host ? `Host: ${item.host}` : item.languages ? `Languages: ${item.languages.join(', ')}` : 'Govt Approved'}</p>
                                <p className="font-bold text-primary text-sm">₹{price} / {item.pricePerNight ? 'night' : 'day'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                                <label className="block font-semibold text-ink mb-1 flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                    <span>Select Date</span>
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink font-sans"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-ink mb-1 flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5 text-primary" />
                                    <span>Guests / Travelers</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 rounded-xl border border-warmborder bg-white text-ink font-sans"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-cream-card rounded-2xl border border-warmborder space-y-2 text-xs">
                            <div className="flex justify-between text-ink-light">
                                <span>Base Rate ({item.pricePerNight ? '2 nights' : '1 day'}):</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="flex justify-between text-ink-light">
                                <span>Govt Eco Tourism Cess (5%):</span>
                                <span>₹{Math.round(totalPrice * 0.05)}</span>
                            </div>
                            <div className="border-t border-warmborder pt-2 flex justify-between font-bold text-sm text-ink">
                                <span>Total Amount:</span>
                                <span className="text-primary">₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirm}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-full shadow-warm-md transition"
                        >
                            Confirm & Book Now
                        </button>

                        <div className="flex items-center justify-center gap-1 text-[10px] text-ink-muted">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Free cancellation up to 24 hours prior to travel date.</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
