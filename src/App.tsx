/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BookingForm } from './components/BookingForm';
import { FleetShowcase } from './components/FleetShowcase';
import { LiveTracking } from './components/LiveTracking';
import { ChatModal } from './components/ChatModal';
import { DriverProfileModal } from './components/DriverProfileModal';
import { RatingModal } from './components/RatingModal';
import { ReceiptModal } from './components/ReceiptModal';
import { PaymentModal } from './components/PaymentModal';
import { HistoryDashboard } from './components/HistoryDashboard';
import { Logo } from './components/Logo';
import { 
  FLEET_VEHICLES, 
  INITIAL_BOOKINGS, 
  INITIAL_CHAT_MESSAGES, 
  PRIMARY_DRIVER 
} from './data/mockData';
import { Booking, ChatMessage, TripStatus, Vehicle } from './types';
import { 
  Sparkles, 
  ShieldCheck, 
  Plane, 
  Car, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Radar,
  PhoneCall,
  Lock
} from 'lucide-react';
import { playSound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<'book' | 'tracking' | 'chat' | 'fleet' | 'history'>('book');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(FLEET_VEHICLES[0]); // Flagship Honda CR-V EX
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [unreadChatCount, setUnreadChatCount] = useState<number>(1);

  // Dispatch Radar Animation State
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchStep, setDispatchStep] = useState(0);

  // Modals
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDriverProfileOpen, setIsDriverProfileOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [modalBooking, setModalBooking] = useState<Booking | null>(null);

  // Handle booking form submission
  const handleInitiateBooking = (newBooking: Booking) => {
    setActiveBooking(newBooking);
    setIsDispatching(true);
    setDispatchStep(1);

    // Automated Chauffeur Dispatch sequence
    setTimeout(() => {
      setDispatchStep(2);
      playSound('ping');
    }, 1200);

    setTimeout(() => {
      setDispatchStep(3);
      playSound('success');
    }, 2400);

    setTimeout(() => {
      setIsDispatching(false);
      const confirmedBooking: Booking = {
        ...newBooking,
        status: 'en_route_to_airport',
      };
      setActiveBooking(confirmedBooking);
      setBookings((prev) => [confirmedBooking, ...prev]);
      setActiveTab('tracking');
    }, 3600);
  };

  // Handle live trip status update
  const handleUpdateStatus = (newStatus: TripStatus) => {
    if (!activeBooking) return;
    const updated = { ...activeBooking, status: newStatus };
    setActiveBooking(updated);
    setBookings((prev) =>
      prev.map((b) => (b.id === activeBooking.id ? updated : b))
    );
  };

  // Handle trip completed
  const handleCompleteTrip = () => {
    if (!activeBooking) return;
    const completed = { ...activeBooking, status: 'completed' as TripStatus };
    setActiveBooking(null);
    setBookings((prev) =>
      prev.map((b) => (b.id === activeBooking.id ? completed : b))
    );
    setModalBooking(completed);
    setIsRatingOpen(true);
    playSound('success');
  };

  // Chat message send
  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'passenger',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Submit Driver Rating
  const handleSubmitRating = (
    bookingId: string,
    rating: number,
    tags: string[],
    comment: string,
    tip: number
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              rating,
              ratingTags: tags,
              ratingComment: comment,
              driverTip: tip,
            }
          : b
      )
    );
  };

  // Re-book past trip
  const handleRebook = (pastBooking: Booking) => {
    setSelectedVehicle(pastBooking.vehicle);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('ping');
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'chat') {
            setIsChatOpen(true);
            setUnreadChatCount(0);
          }
        }}
        activeBooking={activeBooking}
        unreadChatCount={unreadChatCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-12 space-y-10">
        {/* Active Booking Banner Alert if not on tracking tab */}
        {activeBooking && activeTab !== 'tracking' && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/90 via-slate-900 to-cyan-950/90 border border-cyan-500/40 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  Active Airport Transfer in Progress
                </span>
                <span className="text-sm font-bold text-white">
                  {activeBooking.vehicle.name} ({activeBooking.vehicle.plateNumber}) • {activeBooking.driver?.name}
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('tracking')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
            >
              Open Live GPS Tracker
            </button>
          </div>
        )}

        {/* Tab: Book Chauffeur */}
        {activeTab === 'book' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero Trust Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/80 border border-slate-800 p-6 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Guaranteed Flight Delay Buffer • 24/7 VIP Terminal Chauffeurs
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
                  Seamless Airport Car Booking & Instant Dispatch.
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Welcome to <strong className="text-white">Hans Nexus (HansNeux)</strong>. Experience automated chauffeur dispatch, real-time vehicle GPS tracking, verified driver profiles, and transparent receipts.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    Featured Honda CR-V EX Fleet
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    Terminal Meet & Greet Placard
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    Real-Time Flight Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form Component */}
            <BookingForm
              selectedVehicle={selectedVehicle}
              onSelectVehicleChange={setSelectedVehicle}
              onInitiateBooking={handleInitiateBooking}
            />

            {/* Fleet Section below booking */}
            <FleetShowcase
              selectedVehicleId={selectedVehicle.id}
              onSelectVehicle={(v) => {
                setSelectedVehicle(v);
                playSound('ping');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Tab: Fleet Showcase */}
        {activeTab === 'fleet' && (
          <div className="space-y-6 animate-fadeIn">
            <FleetShowcase
              selectedVehicleId={selectedVehicle.id}
              onSelectVehicle={(v) => {
                setSelectedVehicle(v);
                setActiveTab('book');
                playSound('ping');
              }}
            />
          </div>
        )}

        {/* Tab: Live GPS Tracking */}
        {activeTab === 'tracking' && (
          <div className="space-y-6 animate-fadeIn">
            {activeBooking ? (
              <LiveTracking
                booking={activeBooking}
                onUpdateStatus={handleUpdateStatus}
                onOpenChat={() => {
                  setIsChatOpen(true);
                  setUnreadChatCount(0);
                }}
                onOpenDriverProfile={() => setIsDriverProfileOpen(true)}
                onCompleteTrip={handleCompleteTrip}
              />
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <Radar className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
                <h3 className="text-xl font-display font-bold text-white">
                  No Active Airport Ride Currently
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Book an airport transfer to experience live real-time GPS vehicle tracking, automated dispatch updates, and curbside pickup coordination.
                </p>
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  Book an Airport Chauffeur
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab: Past Trips & Receipts */}
        {activeTab === 'history' && (
          <div className="animate-fadeIn">
            <HistoryDashboard
              bookings={bookings}
              onViewReceipt={(b) => {
                setModalBooking(b);
                setIsReceiptOpen(true);
              }}
              onRateDriver={(b) => {
                setModalBooking(b);
                setIsRatingOpen(true);
              }}
              onRebook={handleRebook}
            />
          </div>
        )}
      </main>

      {/* Automated Driver Dispatch Radar Modal */}
      {isDispatching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl shadow-cyan-500/20">
            {/* Animated Radar Scanning Ring */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-cyan-400/40 animate-pulse" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/40">
                <Radar className="w-10 h-10 text-white animate-spin [animation-duration:3s]" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-display font-black text-white tracking-wide">
                Automated Chauffeur Dispatch
              </h3>
              <p className="text-xs text-cyan-300 font-mono">
                HansNeux Airport Staging Telematics
              </p>
            </div>

            {/* Dispatch Steps */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-2 font-mono">
              <div className={`flex items-center gap-2 ${dispatchStep >= 1 ? 'text-cyan-400' : 'text-slate-600'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Scanning Kotoka Terminal 3 VIP fleet...</span>
              </div>
              <div className={`flex items-center gap-2 ${dispatchStep >= 2 ? 'text-cyan-400' : 'text-slate-600'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Matching nearest Honda CR-V EX ({selectedVehicle.plateNumber})...</span>
              </div>
              <div className={`flex items-center gap-2 ${dispatchStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-600'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Captain Samuel Mensah dispatched to Curbside Door B!</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              Fixed Guaranteed Pricing • Encrypted Dispatch
            </div>
          </div>
        </div>
      )}

      {/* In-App Direct Passenger-Driver Chat Modal */}
      {activeBooking && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          driver={activeBooking.driver || PRIMARY_DRIVER}
          vehicle={activeBooking.vehicle}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* Driver Profile Modal */}
      {activeBooking && activeBooking.driver && (
        <DriverProfileModal
          isOpen={isDriverProfileOpen}
          onClose={() => setIsDriverProfileOpen(false)}
          driver={activeBooking.driver}
          vehicle={activeBooking.vehicle}
          onOpenChat={() => {
            setIsDriverProfileOpen(false);
            setIsChatOpen(true);
            setUnreadChatCount(0);
          }}
        />
      )}

      {/* Secure Payment Modal */}
      {modalBooking && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          booking={modalBooking}
          onPaymentSuccess={(method) => {
            setBookings((prev) =>
              prev.map((b) => (b.id === modalBooking.id ? { ...b, paymentStatus: 'paid', paymentMethod: method } : b))
            );
          }}
        />
      )}

      {/* Driver Rating & Tip Modal */}
      {modalBooking && (
        <RatingModal
          isOpen={isRatingOpen}
          onClose={() => setIsRatingOpen(false)}
          booking={modalBooking}
          onSubmitRating={handleSubmitRating}
        />
      )}

      {/* Itemized Receipt & Tax Invoice Modal */}
      {modalBooking && (
        <ReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          booking={modalBooking}
        />
      )}

      {/* Luxury Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" showSubtitle={false} />
            <span>•</span>
            <span>Hans Nexus (HansNeux) Executive Airport Dispatch System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>24/7 Terminal Dispatch</span>
            <span>•</span>
            <span>Fixed Transparent Pricing</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">DV 9A6030 Certified Fleet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
