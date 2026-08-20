import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// Types & Interfaces
// ============================================================================

export type BudgetTier = 'economy' | 'medium' | 'luxury';

export interface ItineraryRequest {
    experiences: string[];
    days: number;
    hub: string;
    hubLat?: number;
    hubLon?: number;
    budgetTier: BudgetTier;
}

export interface ItineraryStop {
    name: string;
    kind: string;
    rating: number;
    ratingSource: 'google' | 'opentripmap';
    estimatedTimeHrs: number;
    description: string;
    lat: number;
    lon: number;
}

export interface DayItinerary {
    day: number;
    title: string;
    stops: ItineraryStop[];
    estimatedBudgetINR: number;
    travelNotes: string;
}

export interface ItineraryResponse {
    days: DayItinerary[];
    totalEstimatedBudgetINR: number;
    cached?: boolean;
}

export interface PlaceCandidate {
    xid: string;
    name: string;
    lat: number;
    lon: number;
    kind: string;
    openTripMapRate: number;
    description?: string;
    image?: string;
    address?: string;
}

export interface EnrichedPlace extends PlaceCandidate {
    rating: number;
    userRatingCount?: number;
    ratingSource: 'google' | 'opentripmap';
    openingHours?: string[];
}

// ============================================================================
// In-Memory Cache (24 hours TTL)
// ============================================================================

interface CacheEntry {
    data: ItineraryResponse;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ============================================================================
// Constant Mappings & Default Data
// ============================================================================

const HUB_COORDINATES: Record<string, { lat: number; lon: number }> = {
    Ranchi: { lat: 23.3441, lon: 85.3096 },
    Jamshedpur: { lat: 22.8046, lon: 86.2029 },
    Deoghar: { lat: 24.4826, lon: 86.6963 },
    Dhanbad: { lat: 23.7957, lon: 86.4304 },
};

const EXPERIENCE_KIND_MAP: Record<string, string> = {
    'Waterfalls & Streams': 'waterfalls',
    'Waterfalls': 'waterfalls',
    'Wildlife & Canopies': 'natural,wildlife_reserves',
    'Wildlife': 'natural,wildlife_reserves',
    'Spiritual Shrines': 'religion',
    'Tribal Arts & Culture': 'museums,cultural',
    'Tribal Culture': 'museums,cultural',
    'Valleys & Treks': 'natural,geological_formations',
    'Adventure & Valleys': 'natural,geological_formations',
    'Eco Homestays': 'accommodations,guest_houses',
};

// Real, verified fallback places in Jharkhand if APIs are unavailable or sparse
const FALLBACK_JHARKHAND_PLACES: PlaceCandidate[] = [
    {
        xid: 'ranchi_hundru_01',
        name: 'Hundru Waterfall',
        lat: 23.4475,
        lon: 85.6548,
        kind: 'waterfalls',
        openTripMapRate: 3,
        description: '320 ft waterfall on the Subarnarekha River, iconic picnic & cliff side scenic spot near Ranchi.',
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
        address: 'Ranchi District, Jharkhand 835103'
    },
    {
        xid: 'ranchi_dassam_02',
        name: 'Dassam Falls',
        lat: 23.1424,
        lon: 85.4746,
        kind: 'waterfalls',
        openTripMapRate: 3,
        description: 'Natural cascade on the Kanchi River where water drops from 144 ft amidst dense Sal green cover.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        address: 'Taimara village, Bundu, Ranchi, Jharkhand 835204'
    },
    {
        xid: 'patratu_valley_03',
        name: 'Patratu Valley & Dam',
        lat: 23.6309,
        lon: 85.2936,
        kind: 'natural,geological_formations',
        openTripMapRate: 3,
        description: 'Winding serpentine mountain road with breathtaking panoramic sunset viewpoints over Patratu Reservoir.',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        address: 'Patratu, Ramgarh, Jharkhand 829119'
    },
    {
        xid: 'betla_park_04',
        name: 'Betla National Park',
        lat: 23.8876,
        lon: 84.1906,
        kind: 'natural,wildlife_reserves',
        openTripMapRate: 3,
        description: 'One of India\'s first national parks under Project Tiger, featuring wild elephant, gaur, and deer safaris.',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
        address: 'Palamu District, Jharkhand 822126'
    },
    {
        xid: 'netarhat_sunset_05',
        name: 'Netarhat Plateau & Magnolia Point',
        lat: 23.4833,
        lon: 84.2667,
        kind: 'natural,geological_formations',
        openTripMapRate: 3,
        description: 'Known as the Queen of Chotanagpur, situated at 3,700 ft with famous pine forests and sunset views.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        address: 'Netarhat, Latehar District, Jharkhand 835218'
    },
    {
        xid: 'deoghar_baidyanath_06',
        name: 'Baidyanath Dham Temple',
        lat: 24.4925,
        lon: 86.6997,
        kind: 'religion',
        openTripMapRate: 3,
        description: 'One of the 12 sacred Jyotirlingas of Lord Shiva, a major spiritual pilgrimage sanctuary.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        address: 'Deoghar, Jharkhand 814112'
    },
    {
        xid: 'tagore_hill_07',
        name: 'Tagore Hill & Ashram',
        lat: 23.3934,
        lon: 85.3341,
        kind: 'museums,cultural',
        openTripMapRate: 2,
        description: 'Historic hilltop retreat associated with Jyotirindranath Tagore and Rabindranath Tagore.',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        address: 'Morabadi, Ranchi, Jharkhand 834008'
    },
    {
        xid: 'jonha_falls_08',
        name: 'Jonha Falls (Gautamdhara)',
        lat: 23.3444,
        lon: 85.6108,
        kind: 'waterfalls',
        openTripMapRate: 2,
        description: 'Cascading waterfall named after Lord Buddha who is believed to have bathed in its waters.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
        address: 'Jonha, Ranchi District, Jharkhand 835103'
    },
    {
        xid: 'sohrai_art_cottage_09',
        name: 'Sohrai & Khovar Tribal Craft Village',
        lat: 23.9925,
        lon: 85.3637,
        kind: 'museums,cultural',
        openTripMapRate: 2,
        description: 'Indigenous village cluster preserving GI-tagged Sohrai mud wall paintings and tribal craft art.',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        address: 'Hazaribagh District, Jharkhand 825301'
    },
    {
        xid: 'dalma_wildlife_10',
        name: 'Dalma Wildlife Sanctuary',
        lat: 22.9000,
        lon: 86.2200,
        kind: 'natural,wildlife_reserves',
        openTripMapRate: 2,
        description: 'Scenic forest habitat on Dalma Hills overlooking Jamshedpur, famous for wild elephant corridors.',
        image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
        address: 'Jamshedpur, East Singhbhum, Jharkhand 831012'
    }
];

// ============================================================================
// STEP 1 — Fetch candidate places (OpenTripMap API)
// ============================================================================

export async function fetchCandidatePlaces(
    lat: number,
    lon: number,
    experiences: string[],
    initialRadius: number = 20000
): Promise<PlaceCandidate[]> {
    const apiKey = process.env.OPENTRIPMAP_API_KEY;

    // Build kinds parameter from selected experiences
    const mappedKinds = experiences
        .map(exp => EXPERIENCE_KIND_MAP[exp])
        .filter(Boolean);

    const kindsParam = mappedKinds.length > 0 ? mappedKinds.join(',') : 'interesting_places';

    if (!apiKey) {
        console.warn('[OpenTripMap] OPENTRIPMAP_API_KEY not set. Using curated Jharkhand candidate places fallback.');
        return FALLBACK_JHARKHAND_PLACES;
    }

    let radius = initialRadius;
    let candidates: PlaceCandidate[] = [];

    try {
        // Radius Fetch Function
        const getRadiusPlaces = async (searchRadius: number) => {
            const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${searchRadius}&lon=${lon}&lat=${lat}&kinds=${kindsParam}&format=json&apikey=${apiKey}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`OpenTripMap radius API returned status ${res.status}`);
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        };

        let rawPlaces = await getRadiusPlaces(radius);

        // Step 6 requirement: Auto-widen radius if < 3 places found
        if (rawPlaces.length < 3 && radius < 50000) {
            console.log(`[OpenTripMap] Found ${rawPlaces.length} places at ${radius}m radius. Auto-widening radius to 50000m.`);
            radius = 50000;
            rawPlaces = await getRadiusPlaces(radius);
        }

        // Filter rate >= 2 (well known places)
        const filtered = rawPlaces.filter((item: any) => item.rate >= 2 && item.name && item.name.trim() !== '');

        const placesToFetch = filtered.length > 0 ? filtered.slice(0, 10) : rawPlaces.slice(0, 10);

        // Fetch details for shortlisted xid items
        const detailPromises = placesToFetch.map(async (item: any): Promise<PlaceCandidate | null> => {
            try {
                const detailUrl = `https://api.opentripmap.com/0.1/en/places/xid/${item.xid}?apikey=${apiKey}`;
                const detailRes = await fetch(detailUrl);
                if (!detailRes.ok) throw new Error(`Detail fetch failed for xid ${item.xid}`);
                const detailData = await detailRes.json();

                return {
                    xid: item.xid,
                    name: detailData.name || item.name || 'Jharkhand Scenic Spot',
                    lat: detailData.point?.lat || item.point?.lat || lat,
                    lon: detailData.point?.lon || item.point?.lon || lon,
                    kind: item.kinds ? item.kinds.split(',')[0] : 'interesting_places',
                    openTripMapRate: item.rate || 2,
                    description: detailData.wikipedia_extracts?.text || detailData.info?.descr || detailData.kinds || 'A remarkable cultural & eco-tourism destination in Jharkhand.',
                    image: detailData.preview?.source || detailData.image || undefined,
                    address: detailData.address ? Object.values(detailData.address).filter(Boolean).join(', ') : undefined
                };
            } catch (err) {
                return {
                    xid: item.xid,
                    name: item.name || 'Jharkhand Sight',
                    lat: item.point?.lat || lat,
                    lon: item.point?.lon || lon,
                    kind: item.kinds ? item.kinds.split(',')[0] : 'interesting_places',
                    openTripMapRate: item.rate || 2,
                    description: 'A beautiful tourism location in Jharkhand.'
                };
            }
        });

        const results = await Promise.all(detailPromises);
        candidates = results.filter((c): c is PlaceCandidate => c !== null);

        if (candidates.length < 3) {
            console.warn('[OpenTripMap] Too few places returned from API. Merging with verified fallback places.');
            return [...candidates, ...FALLBACK_JHARKHAND_PLACES].slice(0, 12);
        }

        return candidates;
    } catch (error) {
        console.error('[OpenTripMap] Exception during fetch:', error);
        return FALLBACK_JHARKHAND_PLACES;
    }
}

// ============================================================================
// STEP 2 — Enrich with real ratings (Google Places API)
// ============================================================================

export async function enrichWithGooglePlaces(candidates: PlaceCandidate[]): Promise<EnrichedPlace[]> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    const enrichPromises = candidates.map(async (place): Promise<EnrichedPlace> => {
        if (!apiKey) {
            // Graceful fallback to OpenTripMap rate
            const normalizedRating = Math.min(5.0, Math.max(3.5, 3.5 + (place.openTripMapRate * 0.4)));
            return {
                ...place,
                rating: Number(normalizedRating.toFixed(1)),
                userRatingCount: 120 * place.openTripMapRate,
                ratingSource: 'opentripmap',
                openingHours: ['08:00 AM - 06:00 PM']
            };
        }

        try {
            // Use Text Search API endpoint
            const queryStr = `${place.name} Jharkhand`;
            const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(queryStr)}&location=${place.lat},${place.lon}&radius=10000&key=${apiKey}`;

            const res = await fetch(url);
            if (!res.ok) throw new Error(`Google Places API HTTP status ${res.status}`);

            const data = await res.json();
            if (data.status === 'OK' && data.results && data.results.length > 0) {
                const match = data.results[0];

                return {
                    ...place,
                    rating: match.rating || 4.2,
                    userRatingCount: match.user_ratings_total || 250,
                    ratingSource: 'google',
                    openingHours: match.opening_hours?.weekday_text || ['08:00 AM - 06:30 PM']
                };
            } else {
                // Not found on Google Places -> Keep OpenTripMap rate
                const normalizedRating = Math.min(5.0, Math.max(3.6, 3.6 + (place.openTripMapRate * 0.3)));
                return {
                    ...place,
                    rating: Number(normalizedRating.toFixed(1)),
                    userRatingCount: 85,
                    ratingSource: 'opentripmap',
                    openingHours: ['08:30 AM - 05:30 PM']
                };
            }
        } catch (error) {
            // Quota failure / Network error -> Fall back gracefully to OpenTripMap
            console.warn(`[Google Places] Fallback for "${place.name}" due to API issue:`, error);
            const normalizedRating = Math.min(5.0, Math.max(3.8, 3.8 + (place.openTripMapRate * 0.3)));
            return {
                ...place,
                rating: Number(normalizedRating.toFixed(1)),
                userRatingCount: 95,
                ratingSource: 'opentripmap',
                openingHours: ['08:00 AM - 06:00 PM']
            };
        }
    });

    return Promise.all(enrichPromises);
}

// ============================================================================
// STEP 3 — Build the itinerary (Groq API - llama-3.3-70b-versatile)
// ============================================================================

export async function generateGroqItinerary(
    enrichedPlaces: EnrichedPlace[],
    experiences: string[],
    days: number,
    hub: string,
    budgetTier: BudgetTier
): Promise<ItineraryResponse> {
    const apiKey = process.env.GROQ_API_KEY;

    const placesContext = enrichedPlaces.map(p => ({
        name: p.name,
        kind: p.kind,
        rating: p.rating,
        ratingSource: p.ratingSource,
        lat: p.lat,
        lon: p.lon,
        description: p.description || ''
    }));

    const perDayBudgetMap: Record<BudgetTier, number> = {
        economy: 2000,
        medium: 4200,
        luxury: 8500
    };

    const dayBudget = perDayBudgetMap[budgetTier] || 4000;
    const totalBudget = dayBudget * days;

    if (!apiKey) {
        console.warn('[Groq] GROQ_API_KEY not set. Generating structured itinerary via algorithmic clustering.');
        return generateAlgorithmicFallback(enrichedPlaces, days, hub, budgetTier);
    }

    const systemPrompt = `You are an expert travel planner for Jharkhand, India. 
Your task is to build a strict, realistic ${days}-day day-wise itinerary starting from ${hub}.

USER SELECTIONS:
- Selected Experiences: ${experiences.join(', ')}
- Trip Duration: ${days} days
- Starting Hub: ${hub}
- Budget Tier: ${budgetTier} (approx. ₹${dayBudget}/day)

CANDIDATE REAL PLACES LIST (DO NOT INVENT ANY NEW PLACES, ONLY USE FROM THIS LIST):
${JSON.stringify(placesContext, null, 2)}

INSTRUCTIONS:
1. Distribute places across ${days} days.
2. Group geographically close places (similar lat/lon) into the same day to minimize travel distance.
3. Keep total sightseeing time to ~4-5 hours per day plus travel.
4. Provide a creative title for each day ("Day X — Title").
5. Return ONLY a single valid JSON object adhering strictly to this schema (no markdown, no preamble, no code fences):

{
  "days": [
    {
      "day": 1,
      "title": "string",
      "stops": [
        {
          "name": "string",
          "kind": "string",
          "rating": 4.3,
          "ratingSource": "google | opentripmap",
          "estimatedTimeHrs": 2,
          "description": "string",
          "lat": 0.0,
          "lon": 0.0
        }
      ],
      "estimatedBudgetINR": ${dayBudget},
      "travelNotes": "string"
    }
  ],
  "totalEstimatedBudgetINR": ${totalBudget}
}`;

    const callGroq = async (promptMsg: string, isRetry = false): Promise<ItineraryResponse> => {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                response_format: { type: 'json_object' },
                messages: [
                    { role: 'system', content: promptMsg },
                    { role: 'user', content: `Generate the ${days}-day JSON itinerary now.` }
                ],
                temperature: 0.2
            })
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Groq API returned HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content || '';

        try {
            // Clean potential code block fences if present
            const cleanedJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanedJson);

            if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
                return parsed as ItineraryResponse;
            }
            throw new Error('Parsed JSON does not contain valid days array');
        } catch (parseErr) {
            if (!isRetry) {
                console.warn('[Groq] JSON parse failed on first attempt. Retrying with stricter instructions...');
                const strictPrompt = `${systemPrompt}\n\nCRITICAL ERROR: Your previous response was invalid JSON. You MUST return ONLY valid raw JSON conforming strictly to the requested structure. NO MARKDOWN, NO CODE FENCES.`;
                return callGroq(strictPrompt, true);
            }
            throw parseErr;
        }
    };

    try {
        return await callGroq(systemPrompt);
    } catch (error) {
        console.error('[Groq] Failed to generate itinerary via Groq:', error);
        return generateAlgorithmicFallback(enrichedPlaces, days, hub, budgetTier);
    }
}

// Algorithmic Fallback Generator when Groq is unavailable
function generateAlgorithmicFallback(
    enrichedPlaces: EnrichedPlace[],
    days: number,
    hub: string,
    budgetTier: BudgetTier
): ItineraryResponse {
    const perDayBudgetMap: Record<BudgetTier, number> = {
        economy: 1800,
        medium: 4000,
        luxury: 7500
    };
    const estDayBudget = perDayBudgetMap[budgetTier];

    const daysResult: DayItinerary[] = [];
    const placesPerDay = Math.max(1, Math.ceil(enrichedPlaces.length / days));

    for (let i = 0; i < days; i++) {
        const dayNum = i + 1;
        const startIndex = i * placesPerDay;
        const dayPlaces = enrichedPlaces.slice(startIndex, startIndex + placesPerDay);

        const actualPlaces = dayPlaces.length > 0 ? dayPlaces : [enrichedPlaces[i % enrichedPlaces.length]];

        const stops: ItineraryStop[] = actualPlaces.map(p => ({
            name: p.name,
            kind: p.kind || 'Tourism Spot',
            rating: p.rating || 4.3,
            ratingSource: p.ratingSource || 'opentripmap',
            estimatedTimeHrs: 2,
            description: p.description || `Explore ${p.name}, a popular attraction in Jharkhand.`,
            lat: p.lat,
            lon: p.lon
        }));

        const titlePrefixes = [
            `${hub} Circuit & Eco Waterfall Exploration`,
            `Forest Canopy & Cultural Heritage Trail`,
            `Chotanagpur Valley Ascent & Scenic Heights`,
            `Spiritual Sanctuaries & Artisan Village Retreat`,
            `Wildlife Safari & Ancient Heritage Forts`,
            `Plateau Pines & Sunset Panoramic Circuit`,
            `Grand Jharkhand Eco-Tourism Finale`
        ];

        daysResult.push({
            day: dayNum,
            title: titlePrefixes[i % titlePrefixes.length],
            stops,
            estimatedBudgetINR: estDayBudget,
            travelNotes: `Day ${dayNum} covers local circuit routes from ${hub}. Scenic driving duration approx 2-3 hrs total.`
        });
    }

    return {
        days: daysResult,
        totalEstimatedBudgetINR: estDayBudget * days
    };
}

// ============================================================================
// STEP 4 — API Route (POST /api/generate-itinerary)
// ============================================================================

export async function POST(req: NextRequest) {
    try {
        const body: ItineraryRequest = await req.json();
        const { experiences = [], days = 3, hub = 'Ranchi', hubLat, hubLon, budgetTier = 'medium' } = body;

        // Determine Hub Coordinates
        const defaultCoords = HUB_COORDINATES[hub] || HUB_COORDINATES['Ranchi'];
        const lat = hubLat ?? defaultCoords.lat;
        const lon = hubLon ?? defaultCoords.lon;

        // Check In-Memory Cache (Key: hub+experiences_sorted+days+budgetTier)
        const sortedExps = [...experiences].sort().join(',');
        const cacheKey = `${hub}_${sortedExps}_${days}_${budgetTier}`;
        const now = Date.now();

        if (cache.has(cacheKey)) {
            const cachedItem = cache.get(cacheKey)!;
            if (now - cachedItem.timestamp < CACHE_TTL_MS) {
                console.log(`[Cache Hit] Returning cached itinerary for key: ${cacheKey}`);
                return NextResponse.json({
                    ...cachedItem.data,
                    cached: true
                });
            }
        }

        // Step 1: Fetch candidate places from OpenTripMap
        const candidates = await fetchCandidatePlaces(lat, lon, experiences);

        // Step 2: Enrich with Google Places ratings & metadata
        const enriched = await enrichWithGooglePlaces(candidates);

        // Step 3: Build day-wise itinerary using Groq LLM
        const itinerary = await generateGroqItinerary(enriched, experiences, days, hub, budgetTier);

        // Store in cache
        cache.set(cacheKey, {
            data: itinerary,
            timestamp: now
        });

        return NextResponse.json(itinerary);
    } catch (error: any) {
        console.error('[API Route Error] Error generating itinerary:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate itinerary.' },
            { status: 500 }
        );
    }
}
