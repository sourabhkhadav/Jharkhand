import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';
import ReviewModal from './components/ReviewModal';

import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import ItineraryPlannerPage from './pages/ItineraryPlannerPage';
import BookingPage from './pages/BookingPage';
import MarketplacePage from './pages/MarketplacePage';
import SafetyPage from './pages/SafetyPage';
import UserProfilePage from './pages/UserProfilePage';
import FestivalsPage from './pages/FestivalsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    const [cartItems, setCartItems] = useState([
        {
            title: "Original Sohrai Mud Canvas — Dancing Peacock",
            artisanName: "Parvati Devi",
            price: 3200,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80"
        }
    ]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [bookingItem, setBookingItem] = useState(null);
    const [reviewDestinationName, setReviewDestinationName] = useState(null);

    const handleAddToCart = (product) => {
        setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
        setIsCartOpen(true);
    };

    const handleRemoveCartItem = (idx) => {
        setCartItems((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleCheckout = () => {
        alert("Thank you! Your artisan order has been routed directly to Santhal/Munda craft cooperatives.");
        setCartItems([]);
        setIsCartOpen(false);
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-cream text-ink font-sans selection:bg-primary selection:text-white">
                {/* Navigation */}
                <Navbar
                    cartCount={cartItems.length}
                    onOpenCart={() => setIsCartOpen(true)}
                    onOpenAuth={() => setIsAuthOpen(true)}
                />

                {/* Main Content Router */}
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<LandingPage onOpenBooking={setBookingItem} />} />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route
                            path="/place/:id"
                            element={
                                <PlaceDetailPage
                                    onOpenReview={setReviewDestinationName}
                                    onAddToItinerary={(spot) => alert(`Added ${spot.name} to your itinerary builder!`)}
                                />
                            }
                        />
                        <Route path="/planner" element={<ItineraryPlannerPage onOpenBooking={setBookingItem} />} />
                        <Route path="/booking" element={<BookingPage onOpenBooking={setBookingItem} />} />
                        <Route path="/marketplace" element={<MarketplacePage onAddToCart={handleAddToCart} />} />
                        <Route path="/safety" element={<SafetyPage />} />
                        <Route path="/profile" element={<UserProfilePage />} />
                        <Route path="/festivals" element={<FestivalsPage />} />
                        <Route path="/search" element={<SearchResultsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />

                {/* Global Drawers & Modals */}
                <CartDrawer
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveCartItem}
                    onCheckout={handleCheckout}
                />

                <AuthModal
                    isOpen={isAuthOpen}
                    onClose={() => setIsAuthOpen(false)}
                />

                <BookingModal
                    isOpen={Boolean(bookingItem)}
                    onClose={() => setBookingItem(null)}
                    item={bookingItem}
                />

                <ReviewModal
                    isOpen={Boolean(reviewDestinationName)}
                    onClose={() => setReviewDestinationName(null)}
                    destinationName={reviewDestinationName}
                />
            </div>
        </Router>
    );
}
