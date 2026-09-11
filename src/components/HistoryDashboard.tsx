import React, { useState } from 'react';
import { Booking } from '../types';
import { 
  History, 
  Search, 
  FileText, 
  Star, 
  RotateCcw, 
  Plane, 
  MapPin, 
  Car, 
  CheckCircle2, 
  Calendar, 
  DollarSign, 
  Filter,
  Sparkles
} from 'lucide-react';

interface HistoryDashboardProps {
  bookings: Booking[];
  onViewReceipt: (booking: Booking) => void;
  onRateDriver: (booking: Booking) => void;
  onRebook: (booking: Booking) => void;
}

export const HistoryDashboard: React.FC<HistoryDashboardProps> = ({
  bookings,
  onViewReceipt,
  onRateDriver,
  onRebook,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'active'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? b.status === 'completed'
        : b.status !== 'completed';

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      b.bookingRef.toLowerCase().includes(q) ||
      b.dropoffLocation.toLowerCase().includes(q) ||
      b.pickupAirport.toLowerCase().includes(q) ||
      (b.driver?.name && b.driver.name.toLowerCase().includes(q)) ||
      b.vehicle.name.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const totalSpent = bookings.reduce((sum, b) => sum + b.fareBreakdown.total, 0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Header & Metrics */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5" />
              Hans Nexus Passenger Portal
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Trip History & Invoices
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Review past airport arrivals, download certified tax receipts, and rate your verified chauffeurs.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 self-stretch md:self-auto">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Transfers</span>
              <span className="text-xl font-display font-black text-white">{bookings.length}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Lifetime VIP</span>
              <span className="text-xl font-display font-black text-cyan-400 font-mono">${totalSpent.toFixed(0)}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Avg Rating</span>
              <span className="text-xl font-display font-black text-amber-400 flex items-center justify-center gap-0.5">
                <Star className="w-4 h-4 fill-amber-400" /> 5.0
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by ref, hotel, driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Trips ({bookings.length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === 'completed'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === 'active'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              In Progress / Scheduled
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <History className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white">No Bookings Found</h3>
            <p className="text-xs mt-1">Try adjusting your search or booking a new airport chauffeur transfer.</p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4"
            >
              {/* Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    Ref #{b.bookingRef}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {b.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    b.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-sky-500/20 text-sky-400 border border-sky-500/30 animate-pulse'
                  }`}>
                    {b.status === 'completed' ? '✓ Completed' : '• Active Transfer'}
                  </span>
                  <span className="font-display font-black text-white text-base font-mono">
                    ${b.fareBreakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Journey Route & Chauffeur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Route Column */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <Plane className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Pickup Origin</span>
                      <span className="font-bold text-white">{b.pickupAirport}</span>
                      <span className="text-slate-400 block">{b.terminal} — {b.pickupZone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Destination</span>
                      <span className="font-bold text-white">{b.dropoffLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Driver & Vehicle Column */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.driver?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
                      alt="Driver"
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="font-bold text-white">{b.driver?.name || 'Captain Samuel'}</div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                        <Car className="w-3 h-3 text-cyan-400" />
                        {b.vehicle.name} <span className="font-mono text-cyan-300">[{b.vehicle.plateNumber}]</span>
                      </div>
                    </div>
                  </div>

                  {b.rating ? (
                    <div className="text-right">
                      <div className="flex items-center justify-end text-amber-400">
                        {Array.from({ length: b.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500">Rated</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onRateDriver(b)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold cursor-pointer"
                    >
                      ★ Rate Driver
                    </button>
                  )}
                </div>
              </div>

              {/* Feedback Note Display if rated */}
              {b.ratingComment && (
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 italic">
                  "{b.ratingComment}"
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Paid via {b.paymentMethod.toUpperCase()}</span>
                  <span>•</span>
                  <span>Inv #{b.receiptNumber}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewReceipt(b)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Receipt / PDF</span>
                  </button>

                  <button
                    onClick={() => onRebook(b)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Book Return Trip</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
