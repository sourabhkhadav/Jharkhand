export const GRIEVANCE_CATEGORIES = [
    { id: "cleanliness", label: "Cleanliness & Sanitation", icon: "Trash2", color: "amber" },
    { id: "safety", label: "Safety & Security Issue", icon: "ShieldAlert", color: "rose" },
    { id: "transport", label: "Transport & Fare Overcharging", icon: "Car", color: "orange" },
    { id: "infrastructure", label: "Infrastructure / Light / Railings Damage", icon: "Hammer", color: "purple" },
    { id: "guide", label: "Tour Guide / Vendor Misconduct", icon: "UserX", color: "blue" },
    { id: "medical", label: "Medical / First Aid Request", icon: "HeartPulse", color: "emerald" }
];

export const PUBLIC_GRIEVANCES = [
    {
        id: "GRV-2026-8819",
        category: "cleanliness",
        categoryLabel: "Cleanliness & Sanitation",
        spotName: "Dassam Waterfalls Main Viewpoint",
        district: "Ranchi",
        touristName: "Vikram S.",
        dateSubmitted: "2026-08-18 10:15 AM",
        description: "Plastic food wrappers and mineral water bottles overflowing near the main gorge steps.",
        status: "Resolved",
        statusStep: 4, // 1: Submitted, 2: Verified, 3: Dispatched, 4: Resolved
        slaTime: "3.5 Hours (SLA: 24h)",
        urgency: "Medium",
        assignedOfficer: "Ranchi Municipal & JTDC Eco-Clean Cell",
        resolutionDetails: "District sanitation crew dispatched with 4 waste bins. Viewpoint completely cleaned and garbage disposed at recycling depot.",
        photoBefore: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
        photoAfter: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80",
        rating: 5
    },
    {
        id: "GRV-2026-8822",
        category: "transport",
        categoryLabel: "Transport Overcharging",
        spotName: "Ranchi Junction Prepaid Auto Stand",
        district: "Ranchi",
        touristName: "Ananya M.",
        dateSubmitted: "2026-08-19 08:30 AM",
        description: "Private auto driver demanded ₹600 instead of official ₹250 prepaid rate for trip to Hundru Falls.",
        status: "In Progress",
        statusStep: 3,
        slaTime: "Under 2 Hours (Target: 4h)",
        urgency: "High",
        assignedOfficer: "Ranchi RTO & Tourist Highway Patrol",
        resolutionDetails: "Tourist Police squad reached station stand. Driver auto number JH01-BT-4412 fined ₹1,000 and tourist facilitated via official JTDC cab.",
        photoBefore: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
        photoAfter: null,
        rating: null
    },
    {
        id: "GRV-2026-8790",
        category: "infrastructure",
        categoryLabel: "Infrastructure Damage",
        spotName: "Patratu Valley Hairpin Curve 4 View Deck",
        district: "Ramgarh",
        touristName: "Rahul Verma",
        dateSubmitted: "2026-08-16 02:40 PM",
        description: "Safety railing bolt loosened near the cliffside photograph selfie spot.",
        status: "Resolved",
        statusStep: 4,
        slaTime: "5 Hours (SLA: 12h)",
        urgency: "High",
        assignedOfficer: "PWD Infrastructure Division Ramgarh",
        resolutionDetails: "High-tensile steel bolts welded and barrier reinforced with safety warning neon reflectors.",
        photoBefore: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
        photoAfter: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
        rating: 5
    }
];

export const SLA_METRICS = {
    totalResolvedThisMonth: 1248,
    avgResolutionTimeHours: "4.2 Hours",
    satisfactionRate: "98.4%",
    activeMonitoringCells: 24
};
