export const DESTINATIONS = [
    {
        id: "hundru-falls",
        name: "Hundru Waterfalls",
        district: "Ranchi",
        category: "Waterfalls",
        rating: 4.8,
        reviewsCount: 342,
        distanceKm: 45,
        tagline: "Jharkhand's spectacular 320 ft cascading leap over the Subarnarekha River.",
        description: "Located on the Subarnarekha River, Hundru Falls drops from a height of 98 metres (320 ft), creating one of the most breathtaking natural spectacles in Eastern India. Surrounded by dense chhatra forests, the falling water forms a serene pool at the base ideal for eco-tourists and nature lovers.",
        heroImage: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "October to March",
        entryFee: "₹20 per person",
        timings: "6:00 AM - 5:00 PM",
        crowdStatus: "Medium",
        crowdLevel: "yellow", // green | yellow | red
        coordinates: { lat: 23.4474, lng: 85.6548 },
        highlights: ["320 ft Cascade", "Tribal Handicrafts Stalls", "Natural Rock Formations", "Trekking Trails"],
        facilities: ["Parking Available", "Local Food Stalls", "Govt. Lifeguard Guarded", "Clean Restrooms"]
    },
    {
        id: "betla-national-park",
        name: "Betla National Park & Sanctuary",
        district: "Latehar",
        category: "Wildlife",
        rating: 4.9,
        reviewsCount: 512,
        distanceKm: 165,
        tagline: "One of India's earliest tiger reserves with ancient Chero Dynasty forts inside.",
        description: "Spanning over 1,000 sq km of lush sal and bamboo forests, Betla was among the first sanctuaries in India to come under Project Tiger in 1973. It is home to wild elephants, tigers, leopards, Indian bison (gaur), and over 170 bird species, with 16th-century historical fort ruins nested inside the canopy.",
        heroImage: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "November to May",
        entryFee: "₹100 (Safari extra)",
        timings: "6:00 AM - 4:30 PM",
        crowdStatus: "Low",
        crowdLevel: "green",
        coordinates: { lat: 23.8864, lng: 84.1901 },
        highlights: ["Elephant Safari", "Chero Fort Ruins", "Wild Bison Sighting", "Forest Watchtowers"],
        facilities: ["Govt Eco Lodges", "Safari Jeep Rental", "Certified Tribal Guides", "Canteen"]
    },
    {
        id: "baidyanath-dham",
        name: "Baidyanath Dham Temple",
        district: "Deoghar",
        category: "Spiritual",
        rating: 4.9,
        reviewsCount: 1240,
        distanceKm: 250,
        tagline: "Sacred 12 Jyotirlinga shrine revered by millions of pilgrims worldwide.",
        description: "Baba Baidyanath Dham in Deoghar is one of the twelve revered Jyotirlingas of Lord Shiva in India. Famous for the annual Shravani Mela, where millions of devotees carry holy Ganga water from Sultanganj barefoot to offer to the deity.",
        heroImage: "https://images.unsplash.com/photo-1609946782759-810d64f1c571?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1609946782759-810d64f1c571?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "October to March (or July-Aug for Mela)",
        entryFee: "Free Entry",
        timings: "4:00 AM - 9:00 PM",
        crowdStatus: "High",
        crowdLevel: "red",
        coordinates: { lat: 24.4925, lng: 86.6997 },
        highlights: ["12th Jyotirlinga", "Panchshool Gold Crest", "Historic Complex", "Cultural Crafts Market"],
        facilities: ["Sugam Darshan Pass", "Shoe Counters", "Prasad Stalls", "Govt Information Desk"]
    },
    {
        id: "netarhat-queen-of-chotanagpur",
        name: "Netarhat — Queen of Chotanagpur",
        district: "Latehar",
        category: "Eco Tourism",
        rating: 4.9,
        reviewsCount: 680,
        distanceKm: 156,
        tagline: "Serene hill station perched at 3,700 ft surrounded by pine and sal valleys.",
        description: "Netarhat is Jharkhand's premier hill destination, famed for its breathtaking Magnolia Sunset Point, Pine Forests, and crisp mountain breeze. Perched high on the Chotanagpur plateau, it offers an unspoiled retreat into pristine forests and tribal villages.",
        heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "Year-Round",
        entryFee: "Free",
        timings: "Open 24 hrs",
        crowdStatus: "Low",
        crowdLevel: "green",
        coordinates: { lat: 23.4833, lng: 84.2667 },
        highlights: ["Magnolia Sunset Point", "Netarhat Residential School", "Pine Forest Trails", "Lower Ghaghri Falls"],
        facilities: ["JTDC Prabhat Vihar Hotel", "Tea Stalls", "Trekking Trails", "Viewpoints"]
    },
    {
        id: "patratu-valley",
        name: "Patratu Valley & Dam Lake",
        district: "Ramgarh",
        category: "Adventure",
        rating: 4.7,
        reviewsCount: 450,
        distanceKm: 35,
        tagline: "Winding serpentine hairpin curves overlooking a sprawling emerald reservoir.",
        description: "Famous for its mesmerizing winding mountain roads reminiscent of European alpine passes, Patratu Valley leads down to a massive dam reservoir offering speedboat rides, floating restaurants, and island eco-parks.",
        heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "September to March",
        entryFee: "₹30 for Dam Park",
        timings: "8:00 AM - 6:30 PM",
        crowdStatus: "Medium",
        crowdLevel: "yellow",
        coordinates: { lat: 23.6333, lng: 85.2833 },
        highlights: ["Serpentine Valley Drive", "Speedboat & Jet Ski", "Island Resort Park", "Sunset Viewpoints"],
        facilities: ["Boating Club", "Food Court", "Water Sports", "Parking"]
    },
    {
        id: "parasnath-shikharji",
        name: "Parasnath Hill (Shikharji)",
        district: "Giridih",
        category: "Spiritual",
        rating: 4.9,
        reviewsCount: 890,
        distanceKm: 160,
        tagline: "Highest peak of Jharkhand (4,478 ft) and sacred Jain pilgrimage destination.",
        description: "Parasnath Hill is the tallest mountain peak in Jharkhand state. Revered as Shikharji, 20 out of 24 Jain Tirthankaras attained Moksha (liberation) here. The 27-km mountain trek passes through cloud forests, stone stupas, and ancient marble temples.",
        heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "October to March",
        entryFee: "Free",
        timings: "Open 24 hrs for pilgrims",
        crowdStatus: "Low",
        crowdLevel: "green",
        coordinates: { lat: 23.9625, lng: 86.1558 },
        highlights: ["4,478 ft Summit Trek", "Tonk Temple Shrines", "Cloud Valley Views", "Santhal Tribal Sacred Groves"],
        facilities: ["Palanquin (Doli) Service", "Rest Huts", "Drinking Water Stations", "Dharamshalas"]
    },
    {
        id: "sohrai-tribal-village",
        name: "Hazaribagh Sohrai Arts Village",
        district: "Hazaribagh",
        category: "Heritage",
        rating: 4.8,
        reviewsCount: 230,
        distanceKm: 95,
        tagline: "Living museum of UNESCO-acknowledged indigenous Sohrai-Khovar mud mural art.",
        description: "Enter rural villages around Hazaribagh where Santhal, Munda, and Kurmi tribal women paint mud cottage walls with natural earth pigments depicting flora, fauna, and fertility symbols during harvest season.",
        heroImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "October to February",
        entryFee: "Free (Donations to artisans welcomed)",
        timings: "9:00 AM - 5:00 PM",
        crowdStatus: "Low",
        crowdLevel: "green",
        coordinates: { lat: 23.9968, lng: 85.3644 },
        highlights: ["Live Wall Painting Workshops", "Sohrai GI Tag Exhibition", "Tribal Cuisine Experience", "Direct Artisan Purchase"],
        facilities: ["Homestays", "Artisans Guide", "Handicrafts Shop"]
    },
    {
        id: "dassam-falls",
        name: "Dassam Waterfalls",
        district: "Ranchi",
        category: "Waterfalls",
        rating: 4.7,
        reviewsCount: 310,
        distanceKm: 34,
        tagline: "144 ft roaring cascade of Kanchi river flowing into ten stream channels.",
        description: "Derived from 'Da-song' in Mundari language meaning water pouring out, Dassam Falls tumbles down 44 metres through steep rocky cliffs into a wild river gorge, surrounded by thick teak trees.",
        heroImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "October to March",
        entryFee: "₹15",
        timings: "7:00 AM - 5:00 PM",
        crowdStatus: "Medium",
        crowdLevel: "yellow",
        coordinates: { lat: 23.1428, lng: 85.4594 },
        highlights: ["Gorge Viewpoints", "Munda Tribal Snack Counters", "River Valley Trek"],
        facilities: ["Parking", "Guard Railings", "Govt Canteen"]
    }
];

export const CATEGORIES = [
    { id: "all", label: "All Experiences", icon: "Compass" },
    { id: "Waterfalls", label: "Waterfalls", icon: "Waves" },
    { id: "Wildlife", label: "Wildlife & Forests", icon: "Trees" },
    { id: "Spiritual", label: "Spiritual & Temples", icon: "Flame" },
    { id: "Eco Tourism", label: "Eco Tourism", icon: "Leaf" },
    { id: "Heritage", label: "Tribal Culture", icon: "Palette" },
    { id: "Adventure", label: "Adventure & Valleys", icon: "Mountain" }
];

export const DISTRICTS = [
    "All Districts", "Ranchi", "Latehar", "Deoghar", "Ramgarh", "Giridih", "Hazaribagh", "East Singhbhum (Jamshedpur)", "Khunti", "Gumla"
];
