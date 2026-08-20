import hundruImg from '../assets/hundru-waterfall.jpg';
import baidyanathImg from '../assets/baidyanath-dham.jpg';
import patratuImg from '../assets/patratu-valley.jpg';
import betlaImg from '../assets/betla-park.jpg';
import netarhatImg from '../assets/netarhat.jpg';
import patratuDamImg from '../assets/patratu-dam.png';
import parasnathImg from '../assets/parasnath.jpg';

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
        heroImage: hundruImg,
        images: [
            hundruImg,
            "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "October to March",
        entryFee: "₹20 per person",
        timings: "6:00 AM - 5:00 PM",
        crowdStatus: "Medium",
        crowdLevel: "yellow", // green | yellow | red
        coordinates: { lat: 23.4474, lng: 85.6548 },
        highlights: ["320 ft Cascade", "Tribal Handicrafts Stalls", "Natural Rock Formations", "Trekking Trails"],
        facilities: ["Parking Available", "Local Food Stalls", "Govt. Lifeguard Guarded", "Clean Restrooms"],
        history: {
            builtYear: "Geological Era (~150 Million Yrs)",
            builtBy: "Nature / Subarnarekha Faultline",
            era: "Prehistoric Chotanagpur Plateau Formation",
            architecturalStyle: "Natural Escarpment Cascade & Chotanagpur Gneiss Rocks",
            historyStory: "Formed by the vertical faulting of the Chotanagpur Plateau, Hundru Falls represents millions of years of geological erosion where the Subarnarekha River breaks through ancient metamorphic rocks.",
            originLegend: "According to local Santhal tribal lore, the Subarnarekha ('Streak of Gold') river was named after golden sands washed down from natural quartz veins. Tribal ancestors considered the roaring spray of Hundru a sacred cleansing abode of Marang Buru (Supreme Forest Spirit).",
            archivalTrivia: "British colonial surveyors in 1874 documented Hundru as one of the highest drop cascades in the Bengal Presidency, noting that local tribal hunters used vine ropes to gather rare medicinal herbs growing behind the waterfall's mist curtain.",
            audioGuideSummary: "You are standing before Hundru Falls, a 320-foot drop where the river Subarnarekha plunges into a ancient rock pool surrounded by Sal tree forests."
        }
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
        heroImage: betlaImg,
        images: [
            betlaImg,
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
        facilities: ["Govt Eco Lodges", "Safari Jeep Rental", "Certified Tribal Guides", "Canteen"],
        history: {
            builtYear: "1613 AD (Forts) / 1973 (Tiger Reserve)",
            builtBy: "Raja Medini Ray (Chero Kingdom)",
            era: "17th Century Chero Dynasty & Modern Eco-Conservation",
            architecturalStyle: "Indo-Islamic & Tribal Stone Fortress Architecture",
            historyStory: "Betla houses two massive 16th-century twin forts constructed deep inside the jungle by the Chero rulers, Medini Ray and Pratap Ray. The region served as a sovereign tribal kingdom before being integrated into Project Tiger in 1973.",
            originLegend: "Legend tells of King Medini Ray, known as the 'Just Sovereign of Palamu', who built Nagpuri gate with stone carvings that could not be breached by Mughal artillery. Local folklore holds that subterranean tunnels still connect the twin forts.",
            archivalTrivia: "The acronym B.E.T.L.A stands for Bison, Elephant, Tiger, Leopard, and Axis (Spotted Deer), coined during the inauguration of Project Tiger in 1973.",
            audioGuideSummary: "Explore Betla, where 400-year-old stone fort ruins of the Chero Dynasty emerge from dense Sal tiger reserves."
        }
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
        heroImage: baidyanathImg,
        images: [
            baidyanathImg,
            "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1621831971412-d227f425b035?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "October to March (or July-Aug for Mela)",
        entryFee: "Free Entry",
        timings: "4:00 AM - 9:00 PM",
        crowdStatus: "High",
        crowdLevel: "red",
        coordinates: { lat: 24.4925, lng: 86.6997 },
        highlights: ["12th Jyotirlinga", "Panchshool Gold Crest", "Historic Complex", "Cultural Crafts Market"],
        facilities: ["Sugam Darshan Pass", "Shoe Counters", "Prasad Stalls", "Govt Information Desk"],
        history: {
            builtYear: "1596 AD (Present Structure) / Ancient Vedic Antiquity",
            builtBy: "Raja Puran Mal of Gidhaur / Vishwakarma Mythological Lineage",
            era: "Vedic Era & 16th Century Nagara Temple Renaissance",
            architecturalStyle: "Classical North Indian Nagara Style with Gold Panchshool",
            historyStory: "The current main temple of Baidyanath was constructed in 1596 AD by Raja Puran Mal of the Gidhaur dynasty. The complex consists of 22 temples dedicated to various deities interconnected with red silk ribbons.",
            originLegend: "According to Shiva Purana, Demon King Ravana performed intense penance in the Himalayas, severing nine of his heads to Shiva. Pleased, Shiva cured Ravana's heads (hence 'Baidyanath' or Divine Physician) and granted him the Kamada Linga on condition he never set it on the ground before reaching Lanka. Lord Ganesha disguised as a cowherd held the linga when Ravana went to perform evening prayers, grounding it forever at Deoghar.",
            archivalTrivia: "Unlike all other 11 Jyotirlingas which carry a Trishul on top, Baidyanath Temple features a unique five-pronged golden 'Panchshool', which is believed to protect the holy shrine from lighting strikes.",
            audioGuideSummary: "Welcome to Baba Baidyanath Dham, a 16th-century Nagara temple housing one of India's 12 divine Jyotirlingas."
        }
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
        heroImage: netarhatImg,
        images: [
            netarhatImg,
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
        facilities: ["JTDC Prabhat Vihar Hotel", "Tea Stalls", "Trekking Trails", "Viewpoints"],
        history: {
            builtYear: "Early 20th Century (1900s) / Ancient Asur Tribal Settlement",
            builtBy: "British Governor Sir Charles Elliot / Indigenous Asur Tribe",
            era: "Colonial Hill Retreat & Ancient Metallurgy Tradition",
            architecturalStyle: "British Bungalow & Eco-Woodland Architecture",
            historyStory: "Originally an indigenous homeland of the Asur tribal artisans known for ancient iron smelting, Netarhat was developed into a summer retreat by British officials in the early 1900s due to its cool 3,700 ft altitude.",
            originLegend: "The famous 'Magnolia Point' is named after an English lady named Magnolia who fell in love with a local tribal musician named Flute Player. As legend tells, societal boundaries prevented their union, leading Magnolia to leap off the cliff on horseback.",
            archivalTrivia: "Netarhat Residential School, established in 1954, is famous as an incubator of India's top scientists, IAS officers, and scholars.",
            audioGuideSummary: "Perched at 3,700 feet, Netarhat was developed in the early 1900s amidst ancient Asur tribal iron smelting heritage."
        }
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
        heroImage: patratuDamImg,
        images: [
            patratuDamImg,
            patratuImg,
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
        ],
        bestTime: "September to March",
        entryFee: "₹30 for Dam Park",
        timings: "8:00 AM - 6:30 PM",
        crowdStatus: "Medium",
        crowdLevel: "yellow",
        coordinates: { lat: 23.6333, lng: 85.2833 },
        highlights: ["Serpentine Valley Drive", "Speedboat & Jet Ski", "Island Resort Park", "Sunset Viewpoints"],
        facilities: ["Boating Club", "Food Court", "Water Sports", "Parking"],
        history: {
            builtYear: "1962 AD (Dam & Valley Road Enginearing)",
            builtBy: "Russian Engineers & Government of India",
            era: "Post-Independence Industrial & Civil Infrastructure",
            architecturalStyle: "Modern Civil Engineering Serpentine Pass",
            historyStory: "Constructed in 1962 with Soviet collaboration to supply cooling water to the Patratu Thermal Power Station, the dam transformed the Nalkari river basin into a massive 81 sq km lake surrounded by forested ghats.",
            originLegend: "Local elders recount how the valley was once an impassable jungle inhabited by leopards and wild boar before engineers blasted 22 hairpin bends into the cliffside.",
            archivalTrivia: "The valley road cut through Chotanagpur granite features 360-degree panoramic loops that are widely used in Indian cinema automotive shoots.",
            audioGuideSummary: "Built in 1962 with Soviet engineering expertise, Patratu Dam transformed the Nalkari valley into a scenic water reservoir."
        }
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
        heroImage: parasnathImg,
        images: [
            parasnathImg,
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
        facilities: ["Palanquin (Doli) Service", "Rest Huts", "Drinking Water Stations", "Dharamshalas"],
        history: {
            builtYear: "Ancient Vedic / Jain Canon (8th Century BC)",
            builtBy: "Jain Monastic Guilds & Santhal Ancestoral Guardians",
            era: "Antiquity & Classical Jain Architectural Era",
            architecturalStyle: "White Marble Tonk Shrines & Tribal Sacred Grove Sanctuaries",
            historyStory: "Named after Lord Parshvanatha, the 23rd Tirthankara who attained nirvana here in the 8th century BC. Out of 24 Jain Tirthankaras, 20 attained ultimate spiritual liberation on these peaks.",
            originLegend: "To the indigenous Santhal people, the mountain is Marang Buru ('The Great Mountain God'). Santhals celebrate annual Baha & Sohrai rituals in the high canopy, considering the hill a sacred ancestral shield.",
            archivalTrivia: "The summit stands at 4,478 feet, making it the highest natural geographical elevation in Jharkhand state.",
            audioGuideSummary: "Ascend Parasnath Hill, the 4,478 ft sacred mountain peak where 20 Jain Tirthankaras attained nirvana."
        }
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
        facilities: ["Homestays", "Artisans Guide", "Handicrafts Shop"],
        history: {
            builtYear: "Meso-Neolithic Cave Art Era (~10,000 BC) to Present",
            builtBy: "Women Artisans of Santhal, Munda & Kurmi Tribes",
            era: "Prehistoric Rock Art Heritage & GI Tagged Tradition",
            architecturalStyle: "Clay Mud Wall Mural Art with Natural Earth Pigments",
            historyStory: "Sohrai and Khovar wall art directly traces back to the 10,000 BC Meso-Neolithic rock art paintings found in Isko and Naukeval caves of Hazaribagh. Women pass down these comb-and-fingertip mural painting styles through mother-daughter lineages.",
            originLegend: "Khovar art (derived from 'Kho' meaning cave and 'Var' meaning bridegroom) is painted inside wedding chambers to invoke fertility and harmony with forest spirits.",
            archivalTrivia: "Sohrai-Khovar art received the official Geographical Indication (GI Tag) in 2020.",
            audioGuideSummary: "Step into Hazaribagh's mud mural villages, preserving 10,000-year-old rock art traditions on cottage walls."
        }
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
        facilities: ["Parking", "Guard Railings", "Govt Canteen"],
        history: {
            builtYear: "Geological Plateau Epoch",
            builtBy: "Kanchi River System",
            era: "Chotanagpur Fluvial Epoch",
            architecturalStyle: "Multi-Tiered Escarpment Gorge",
            historyStory: "Dassam Falls cascades down 144 feet over hard granite bedrock where the Kanchi river fractures into ten distinct streams before converging into a deep canyon pool.",
            originLegend: "The name 'Da-song' comes from Mundari words: 'Da' (water) and 'Song' (pouring in ten streams). Munda villagers believe the thunderous sound announces the monsoon arrival.",
            archivalTrivia: "The mist created by Dassam's drop creates perpetual micro-rainbows visible every morning between 8 AM and 10 AM.",
            audioGuideSummary: "Experience Dassam Falls, where the Kanchi river splits into 10 streams falling 144 feet into a gorge."
        }
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
