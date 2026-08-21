// Local offline helper logic has been deleted as requested. Voice operations are now fully handled live by Google Gemini API.
export const getVoiceResponse = (query, lang = 'hi-IN') => {
    const isHindi = lang === 'hi-IN';
    
    // Baseline offline stop command handler to ensure system accessibility
    const q = (query || "").toLowerCase();
    const stopKeywords = ["stop", "ruko", "ruk jao", "pause", "quiet", "silent", "शिट", "शांत", "बस", "रुको", "रुक", "स्टॉप"];
    if (stopKeywords.some(kw => q.includes(kw))) {
        return {
            response: isHindi ? "Ok, maine bolna band kar diya hai." : "Ok, stopping playback.",
            redirectPath: null,
            isStopCommand: true
        };
    }

    // Default offline message if Gemini is offline/unavailable
    return {
        response: isHindi
            ? "Mafi chahte hain, main offline data query nahi kar pa rahi hoon. Kripya internet ya setup check karein."
            : "Sorry, offline query lookup has been disabled. Please ensure you are online.",
        redirectPath: null,
        isStopCommand: false
    };
};
