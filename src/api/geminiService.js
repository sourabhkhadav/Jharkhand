import { DESTINATIONS } from '../data/destinations';
import { ARRIVAL_STATIONS } from '../data/arrivalData';
import { HOMESTAYS } from '../data/homestays';
import { FESTIVALS } from '../data/festivals';

export async function askGeminiVoiceAssistant(query, language = 'hi-IN') {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("Gemini API key is not configured in .env file.");
    }

    const isHindi = language === 'hi-IN';

    // 1. Dynamically structure available destinations & utility routes from local data files
    const destinationsContext = DESTINATIONS.map(d => {
        return `- ${d.name} (Category: ${d.category}, District: ${d.district}, Entry Fee: ${d.entryFee}, Timings: ${d.timings}): Path is "/place/${d.id}"`;
    }).join('\n');

    const homestaysContext = HOMESTAYS.map(h => {
        return `- ${h.name} Eco Stay (Location: ${h.location}, Rating: ${h.rating} stars, Host: ${h.host}, Price: ₹${h.pricePerNight} per night): Path is "/booking"`;
    }).join('\n');

    const arrivalContext = ARRIVAL_STATIONS.map(s => {
        const dests = s.popularDestinations.map(pd => {
            const fares = pd.modes.map(m => `${m.type} is ${m.fare} taking ${m.duration}`).join(', ');
            return `${pd.spotName} (recommended mode: ${pd.recommendedMode}, fares: ${fares})`;
        }).join('; ');
        return `- ${s.name} in ${s.city}. Nearest ATMs: ${s.nearestATMs.map(a => `${a.name} at ${a.distance}`).join(', ')}. Local transport/fares to spots: ${dests}. Path is "/arrival-guide"`;
    }).join('\n');

    const festivalsContext = FESTIVALS.map(f => {
        return `- ${f.name} (${f.tagline}, tribal festival by ${f.tribe} celebrated during ${f.season}): Path is "/festivals"`;
    }).join('\n');

    const systemInstructions = `
You are "Johar", the friendly voice assistant for the Jharkhand Tourism Portal.
Always respond in valid JSON format matching this schema:
{
  "response": "Brief spoken text (1-3 sentences max, warm tone, matching the user's language - standard Hindi, English, or Hinglish)",
  "redirectPath": "URL path string to navigate if user wants to see/view/book/explore or redirects are relevant, else null",
  "isStopCommand": boolean (true if user says stop, ruko, shant, bas, or quiet, else false)
}

Available search destination paths:
${destinationsContext}

Eco Homestay Bookings:
${homestaysContext}

Arrival Guides & Local Auto/Cab Transport Fares:
${arrivalContext}

Tribal Festivals:
${festivalsContext}

Other utility page paths:
- Lost & Found assistance: "/lost-found"
- Grievances / Garbage complaints / Feedback: "/feedback"
- General explore: "/explore"

Rules:
1. Keep spoken responses short (max 2-3 sentences) so the browser speech synthesis completes speaking quickly.
2. If the user indicates they want to stop, shut up, or shut down, set isStopCommand to true.
3. Respond ONLY with raw JSON (do not place it in Markdown code blocks).
`;

    const prompt = `
Language mode: ${isHindi ? 'Hindi/Hinglish preferred' : 'English preferred'}
User Query: "${query}"

Generate valid JSON output.
`;

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: systemInstructions },
                            { text: prompt }
                        ]
                    }
                ],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`Gemini API HTTP Error ${response.status}: ${errorMsg}`);
        }

        const data = await response.json();
        const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Clean JSON text (sometimes models might wrap in ```json anyway)
        const cleanedText = rawJsonText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedText);

        return {
            response: parsed.response || (isHindi ? "Kshama karein, main abhi samajh nahi paya." : "Sorry, I didn't catch that."),
            redirectPath: parsed.redirectPath || null,
            isStopCommand: !!parsed.isStopCommand
        };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error; // Rethrow to let the UI controller trigger the fallback dataset resolver
    }
}
