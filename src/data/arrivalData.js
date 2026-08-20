export const ARRIVAL_STATIONS = [
    {
        id: "ranchi-jn",
        name: "Ranchi Junction Railway Station (RNC)",
        city: "Ranchi",
        coordinates: { lat: 23.3441, lng: 85.3240 },
        popularDestinations: [
            {
                spotId: "hundru-falls",
                spotName: "Hundru Waterfalls",
                distanceKm: 45,
                travelTimeMins: 65,
                recommendedMode: "Shared Auto / Prepaid Cab",
                modes: [
                    { type: "Govt Bus (JTDC)", fare: "₹45", duration: "1h 30m", frequency: "Every 30 mins", badge: "Budget Pick" },
                    { type: "Shared Auto Trekker", fare: "₹60", duration: "1h 15m", frequency: "Continuous", badge: "Most Popular" },
                    { type: "Prepaid Tourist Taxi", fare: "₹850", duration: "55 mins", frequency: "Instant at Gate 1", badge: "Fastest & Comfortable" },
                    { type: "Self-Drive Rental Scooter", fare: "₹350 / day", duration: "1h 00m", frequency: "24/7 Desk", badge: "Solo Explorer" }
                ]
            },
            {
                spotId: "patratu-valley",
                spotName: "Patratu Valley & Dam",
                distanceKm: 35,
                travelTimeMins: 50,
                recommendedMode: "Prepaid Tourist Taxi",
                modes: [
                    { type: "Prepaid Tourist Taxi", fare: "₹750", duration: "45 mins", frequency: "24/7 Gate 2", badge: "Recommended" },
                    { type: "Govt Express Bus", fare: "₹40", duration: "1h 10m", frequency: "Every 45 mins", badge: "Budget Pick" },
                    { type: "Shared Taxi", fare: "₹80", duration: "55 mins", frequency: "Every 15 mins", badge: "Frequent" }
                ]
            },
            {
                spotId: "dassam-falls",
                spotName: "Dassam Waterfalls",
                distanceKm: 34,
                travelTimeMins: 50,
                recommendedMode: "Prepaid Taxi",
                modes: [
                    { type: "Prepaid Tourist Taxi", fare: "₹700", duration: "45 mins", frequency: "Gate 1", badge: "Recommended" },
                    { type: "Local Bus (Taimara Stop)", fare: "₹35", duration: "1h 05m", frequency: "Hourly", badge: "Budget Pick" }
                ]
            }
        ],
        nearestATMs: [
            { name: "SBI ATM - Station Platform 1", distance: "50m", status: "Cash Available (24/7 Guarded)", icon: "CreditCard" },
            { name: "Bank of India ATM - Main Exit Gate 1", distance: "120m", status: "Cash Available", icon: "CreditCard" },
            { name: "HDFC Bank ATM - Overbridge Road", distance: "300m", status: "Cash Available (UPI Cash Out Ready)", icon: "CreditCard" }
        ],
        offlineGuide: {
            title: "Ranchi Junction Tourist Survival Map",
            size: "1.2 MB PDF",
            highlights: ["Prepaid Counter Contact: +91-651-2460077", "Free Wi-Fi: RailWire_RNC", "JTDC Tourist Info Desk: Platform 1 Main Concourse"]
        }
    },
    {
        id: "jasidih-jn",
        name: "Jasidih / Deoghar Railway Station (JSME)",
        city: "Deoghar",
        coordinates: { lat: 24.5167, lng: 86.6500 },
        popularDestinations: [
            {
                spotId: "baidyanath-dham",
                spotName: "Baidyanath Dham Temple",
                distanceKm: 7.5,
                travelTimeMins: 20,
                recommendedMode: "Electric E-Rickshaw",
                modes: [
                    { type: "Electric E-Rickshaw", fare: "₹20", duration: "20 mins", frequency: "Continuous", badge: "Green & Recommended" },
                    { type: "Shared Auto", fare: "₹15", duration: "25 mins", frequency: "Continuous", badge: "Budget Pick" },
                    { type: "JTDC Pilgrim Shuttle Bus", fare: "₹10", duration: "20 mins", frequency: "Every 10 mins during Shravani", badge: "Govt Facilitated" }
                ]
            }
        ],
        nearestATMs: [
            { name: "State Bank of India - Jasidih Station Road", distance: "80m", status: "Cash Available", icon: "CreditCard" },
            { name: "Punjab National Bank ATM", distance: "250m", status: "Cash Available", icon: "CreditCard" }
        ],
        offlineGuide: {
            title: "Baidyanath Pilgrim Entry Map & Sugam Pass Guide",
            size: "1.8 MB PDF",
            highlights: ["Sugam Darshan Desk: Temple West Gate", "Pilgrim Helpline: 1800-345-6577"]
        }
    },
    {
        id: "latehar-jn",
        name: "Latehar Railway Station (LTHR)",
        city: "Latehar",
        coordinates: { lat: 23.7431, lng: 84.4988 },
        popularDestinations: [
            {
                spotId: "betla-national-park",
                spotName: "Betla National Park & Sanctuary",
                distanceKm: 28,
                travelTimeMins: 45,
                recommendedMode: "Forest Safari Jeep Shuttle",
                modes: [
                    { type: "JTDC Forest Safari Jeep", fare: "₹450", duration: "40 mins", frequency: "On Booking / Arrival", badge: "Best for Safari" },
                    { type: "Shared Commander Jeep", fare: "₹50", duration: "50 mins", frequency: "Every 30 mins", badge: "Budget Pick" }
                ]
            },
            {
                spotId: "netarhat-queen-of-chotanagpur",
                spotName: "Netarhat Plateau",
                distanceKm: 110,
                travelTimeMins: 2.5,
                recommendedMode: "JTDC Hill Express Bus / Private Cab",
                modes: [
                    { type: "JTDC Hill Express Bus", fare: "₹120", duration: "2h 45m", frequency: "Daily 8 AM & 2 PM", badge: "Scenic Route" },
                    { type: "Private SUV Cab", fare: "₹2,200", duration: "2h 15m", frequency: "On Demand", badge: "Comfort Pick" }
                ]
            }
        ],
        nearestATMs: [
            { name: "SBI Latehar Station Branch ATM", distance: "100m", status: "Cash Available", icon: "CreditCard" },
            { name: "Bank of Baroda - Main Bazaar", distance: "800m", status: "Cash Available", icon: "CreditCard" }
        ],
        offlineGuide: {
            title: "Betla Tiger Reserve & Netarhat Forest Route Card",
            size: "1.5 MB PDF",
            highlights: ["Forest Permit Counter: Betla Gate", "Night Safari Helpline: +91-6562-222041"]
        }
    }
];
