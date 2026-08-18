export const DESTINATION_SAFETY = [
    { id: "hundru-falls", name: "Hundru Waterfalls", district: "Ranchi", status: "Medium", level: "yellow", visitorDensity: "65%", weatherTemp: "24°C", weatherCondition: "Pleasant & Sunny", advisory: "Waterfall flow moderate; life jackets compulsory for boating." },
    { id: "betla-national-park", name: "Betla National Park", district: "Latehar", status: "Low Crowd", level: "green", visitorDensity: "25%", weatherTemp: "22°C", weatherCondition: "Clear Forest Canopy", advisory: "Safari permits operating normally. Safari starts at 6:00 AM." },
    { id: "baidyanath-dham", name: "Baidyanath Dham Temple", district: "Deoghar", status: "High Crowd", level: "red", visitorDensity: "92%", weatherTemp: "26°C", weatherCondition: "Humid & Clear", advisory: "High footfall expected for evening Aarti. Sugam Darshan Pass recommended." },
    { id: "netarhat", name: "Netarhat Plateau", district: "Latehar", status: "Low Crowd", level: "green", visitorDensity: "30%", weatherTemp: "18°C", weatherCondition: "Misty Breezy", advisory: "Chilly evening weather; light woolens recommended." },
    { id: "patratu-valley", name: "Patratu Valley & Dam", district: "Ramgarh", status: "Medium", level: "yellow", visitorDensity: "58%", weatherTemp: "25°C", weatherCondition: "Partly Cloudy", advisory: "Valley road driving smooth. Speedboat queue under 15 mins." },
    { id: "parasnath-hill", name: "Parasnath Hill", district: "Giridih", status: "Low Crowd", level: "green", visitorDensity: "35%", weatherTemp: "19°C", weatherCondition: "Clear Summit", advisory: "Mountain trek trail clear. Water points stocked every 3 km." }
];

export const USER_SAFETY_ALERTS = [
    {
        id: "alert-1",
        author: "Rakesh Verma (Local Forest Officer)",
        location: "Hundru Falls Upper Stairs",
        timestamp: "25 mins ago",
        type: "Weather / Caution",
        text: "Light moss on lower stair steps after morning mist. Lifeguards are stationed at base pool. Please hold side railings.",
        upvotes: 24,
        verified: true
    },
    {
        id: "alert-2",
        author: "Ananya Sharma (Traveler)",
        location: "Patratu Lake Resort",
        timestamp: "1 hour ago",
        type: "Crowd Update",
        text: "Boating ticket counter queue moving fast! Speedboat ticket counter has zero waiting right now.",
        upvotes: 18,
        verified: false
    },
    {
        id: "alert-3",
        author: "Jharkhand Tourism Alert",
        location: "Deoghar Temple Complex",
        timestamp: "2 hours ago",
        type: "Govt Advisory",
        text: "Special queue management active for senior citizens near VIP gate 3. Medical kiosk ready at North gate.",
        upvotes: 56,
        verified: true
    }
];
