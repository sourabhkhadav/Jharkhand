export const LOST_FOUND_CATEGORIES = [
    "All Categories", "Electronics & Cameras", "Wallets & Identity Cards", "Bags & Backpacks", "Jewelry & Watches", "Eyewear & Accessories", "Documents & Tickets"
];

export const INITIAL_LOST_FOUND_ITEMS = [
    {
        id: "LF-901",
        type: "lost", // "lost" | "found"
        title: "Black Sony Alpha Camera Bag",
        category: "Electronics & Cameras",
        spotName: "Hundru Waterfalls",
        district: "Ranchi",
        date: "2026-08-18",
        description: "Black canvas camera bag containing Sony A6400 camera body and 50mm prime lens. Left near lower tea stall rock seating area around 2 PM.",
        contactName: "Arnav Sharma",
        contactPhone: "+91 98765 43210",
        status: "Matching Item Found", // "Active Search" | "Matching Item Found" | "Recovered & Handed Over" | "Under Police Verification"
        statusColor: "emerald",
        locationDetail: "Lower Waterfall Tea Stall #3",
        policeDesk: "Ranchi Tourist Police Outpost - Subarnarekha Beat",
        photo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "LF-902",
        type: "found",
        title: "Brown Leather Wallet with Aadhaar Card",
        category: "Wallets & Identity Cards",
        spotName: "Baidyanath Dham Temple Gate 2",
        district: "Deoghar",
        date: "2026-08-19",
        description: "Found brown Wildhorn wallet containing SBI ATM card and Aadhaar card under name 'Suresh Kumar Singh'. Handed over to Deoghar Police Control Room.",
        contactName: "JTDC Pilgrim Service Counter",
        contactPhone: "1800-345-6577",
        status: "Under Police Verification",
        statusColor: "amber",
        locationDetail: "Deoghar Temple West Gate Counter",
        policeDesk: "Deoghar Temple Tourist Police Squad",
        photo: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "LF-903",
        type: "lost",
        title: "Blue Decathlon Trekking Backpack (40L)",
        category: "Bags & Backpacks",
        spotName: "Netarhat Magnolia Sunset Point",
        district: "Latehar",
        date: "2026-08-17",
        description: "Quechua 40L blue backpack containing red raincoat, powerbank, and Netarhat resort booking receipt.",
        contactName: "Priyanka Dey",
        contactPhone: "+91 91234 56789",
        status: "Active Search",
        statusColor: "blue",
        locationDetail: "Magnolia Point Wooden Bench",
        policeDesk: "Netarhat Forest Beat Police Desk",
        photo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "LF-904",
        type: "found",
        title: "Ray-Ban Aviator Sunglasses in Black Case",
        category: "Eyewear & Accessories",
        spotName: "Patratu Dam Speedboat Deck",
        district: "Ramgarh",
        date: "2026-08-19",
        description: "Golden frame Ray-Ban aviators left at Boat #4 seating area.",
        contactName: "Patratu Water Sports Complex Desk",
        contactPhone: "+91 651 223344",
        status: "Recovered & Handed Over",
        statusColor: "emerald",
        locationDetail: "Patratu Dam Ticket Counter",
        policeDesk: "Patratu Lake Patrol Cell",
        photo: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    }
];
