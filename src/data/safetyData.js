export const DESTINATION_WEATHER_HAZARDS = [
    {
        id: "patratu-valley",
        name: "Patratu Valley & Dam",
        district: "Ramgarh",
        weatherTemp: "21°C",
        weatherCondition: "Fog & Light Drizzle",
        roadStatus: "Landslide Watch at Ghat Curve 4",
        hazardLevel: "Caution", // 'Clear' | 'Caution' | 'High Hazard'
        hazardType: "Landslide & Dense Fog",
        advisory: "Single-lane traffic active near hairpin turn 4 due to minor mudslide. Drive under 30 km/h with fog lights."
    },
    {
        id: "netarhat",
        name: "Netarhat Queen of Chotanagpur",
        district: "Latehar",
        weatherTemp: "16°C",
        weatherCondition: "Heavy Mist & Chilly Winds",
        roadStatus: "Ghat Trail Clear & Open",
        hazardLevel: "Clear",
        hazardType: "Low Visibility",
        advisory: "Thick fog after 5:30 PM. Drive slow on valley bends. Woolens recommended for sunset view points."
    },
    {
        id: "hundru-falls",
        name: "Hundru Waterfalls",
        district: "Ranchi",
        weatherTemp: "23°C",
        weatherCondition: "Monsoon Downpour",
        roadStatus: "Wet Stairs & High Water Current",
        hazardLevel: "Caution",
        hazardType: "Flash Current & Slippery Rock",
        advisory: "Sub-stream water surge active. Swimming restricted at lower pool. Lifeguard team deployed."
    },
    {
        id: "betla-national-park",
        name: "Betla National Park",
        district: "Latehar",
        weatherTemp: "25°C",
        weatherCondition: "Clear Forest Canopy",
        roadStatus: "All Forest Safari Routes Open",
        hazardLevel: "Clear",
        hazardType: "Normal Conditions",
        advisory: "Weather dry and clear. Forest safari tracks fully accessible for morning and evening batches."
    },
    {
        id: "baidyanath-dham",
        name: "Baidyanath Dham Temple",
        district: "Deoghar",
        weatherTemp: "26°C",
        weatherCondition: "Humid & Passing Clouds",
        roadStatus: "Temple Approach Roads Clear",
        hazardLevel: "Clear",
        hazardType: "Normal Conditions",
        advisory: "Drizzle expected in evening. Covered walking corridors active for pilgrims."
    },
    {
        id: "parasnath-hill",
        name: "Parasnath Hill & Shikharji",
        district: "Giridih",
        weatherTemp: "18°C",
        weatherCondition: "High Summit Gusts",
        roadStatus: "Trek Trail Slippery at Top",
        hazardLevel: "Caution",
        hazardType: "Strong Winds",
        advisory: "High wind warning above 3,500 ft. Trekkers advised to carry rain ponchos and hold bamboo sticks."
    }
];

export const DESTINATION_SAFETY = DESTINATION_WEATHER_HAZARDS.map(spot => ({
    id: spot.id,
    name: spot.name,
    level: spot.hazardLevel === 'Clear' ? 'green' : spot.hazardLevel === 'Caution' ? 'yellow' : 'red',
    status: spot.hazardType || spot.roadStatus
}));

export const USER_HAZARD_ALERTS = [
    {
        id: "alert-1",
        author: "Sanjay Soren (PWD Highway Inspector)",
        location: "Patratu Valley Hairpin Curve 4",
        timestamp: "15 mins ago",
        type: "Landslide / Rockfall",
        text: "Minor rockfall cleared by PWD excavator team near Curve 4. Road open for all vehicles, drive cautious.",
        upvotes: 42,
        verified: true
    },
    {
        id: "alert-2",
        author: "Rohan Gupta (Tourist)",
        location: "Netarhat Sunrise Point Road",
        timestamp: "45 mins ago",
        type: "Fog / Low Visibility",
        text: "Dense fog reduced visibility to under 10 meters near Magnolia Point. Keep hazard lights on while driving.",
        upvotes: 29,
        verified: false
    },
    {
        id: "alert-3",
        author: "Jharkhand Disaster Response Desk",
        location: "Subarnarekha River / Hundru Route",
        timestamp: "2 hours ago",
        type: "Heavy Rain / Water Level",
        text: "Water level rose 1.5 ft after upstream gate release. Safety barricades placed 50 meters from main waterfall basin.",
        upvotes: 68,
        verified: true
    }
];
