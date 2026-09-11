import React from 'react';
import { Logo } from './Logo';
import { 
  Car, 
  Navigation, 
  MessageSquare, 
  History, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Booking } from '../types';

interface NavbarProps {
  activeTab: 'book' | 'tracking' | 'chat' | 'fleet' | 'history';
  onSelectTab: (tab: 'book' | 'tracking' | 'chat' | 'fleet' | 'history') => void;
  activeBooking: Booking | null;
  unreadChatCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  activeBooking,
  unreadChatCount
}) => {
  return (
    <>
      {/* Desktop & Tablet Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectTab('book')}
            className="cursor-pointer transition-opacity hover:opacity-95"
          >
            <Logo size="md" showSubtitle={true} />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => onSelectTab('book')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'book'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Book Chauffeur</span>
            </button>

            <button
              onClick={() => onSelectTab('fleet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'fleet'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fleet & CR-V</span>
            </button>

            {activeBooking && (
              <button
                onClick={() => onSelectTab('tracking')}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'tracking'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                    : 'text-cyan-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Navigation className="w-3.5 h-3.5 animate-pulse" />
                <span>Live Tracking</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </button>
            )}

            {activeBooking && (
              <button
                onClick={() => onSelectTab('chat')}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>In-App Chat</span>
                {unreadChatCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px]">
                    {unreadChatCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => onSelectTab('history')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Past Trips & Receipts</span>
            </button>
          </nav>

          {/* Right Action: Active Trip status or 24/7 Dispatch Hotline */}
          <div className="flex items-center gap-3">
            {activeBooking ? (
              <button
                onClick={() => onSelectTab('tracking')}
                className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:border-cyan-400 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono">Trip #{activeBooking.bookingRef}</span>
                <span className="text-slate-500">|</span>
                <span className="text-white">{activeBooking.vehicle.plateNumber}</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">Airport VIP Desk:</span>
                <span className="font-mono font-bold text-white">+233 24 892 4011</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Sticky for Phones) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => onSelectTab('book')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] justify-center ${
            activeTab === 'book' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Car className="w-5 h-5" />
          <span className="text-[10px]">Book</span>
        </button>

        <button
          onClick={() => onSelectTab('fleet')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] justify-center ${
            activeTab === 'fleet' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">Fleet</span>
        </button>

        {activeBooking && (
          <button
            onClick={() => onSelectTab('tracking')}
            className={`relative flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] justify-center ${
              activeTab === 'tracking' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Navigation className="w-5 h-5" />
            <span className="text-[10px]">Tracking</span>
            <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </button>
        )}

        {activeBooking && (
          <button
            onClick={() => onSelectTab('chat')}
            className={`relative flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] justify-center ${
              activeTab === 'chat' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px]">Chat</span>
            {unreadChatCount > 0 && (
              <span className="absolute top-1 right-2 px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 font-bold text-[9px]">
                {unreadChatCount}
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => onSelectTab('history')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] justify-center ${
            activeTab === 'history' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px]">Past Trips</span>
        </button>
      </nav>
    </>
  );
};
