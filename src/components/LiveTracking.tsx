import React, { useState, useEffect } from 'react';
import { Booking, TripStatus } from '../types';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  FastForward, 
  Sparkles, 
  CheckCircle2, 
  Car, 
  Clock, 
  Gauge, 
  ChevronRight,
  RefreshCw,
  Award
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface LiveTrackingProps {
  booking: Booking;
  onUpdateStatus: (newStatus: TripStatus) => void;
  onOpenChat: () => void;
  onOpenDriverProfile: () => void;
  onCompleteTrip: () => void;
}

export const LiveTracking: React.FC<LiveTrackingProps> = ({
  booking,
  onUpdateStatus,
  onOpenChat,
  onOpenDriverProfile,
  onCompleteTrip
}) => {
  const [progressPercent, setProgressPercent] = useState(15);
  const [speed, setSpeed] = useState(42);
  const [etaRemaining, setEtaRemaining] = useState(booking.etaMinutes || 4);
  const [isCalling, setIsCalling] = useState(false);
  const [autoSimulate, setAutoSimulate] = useState(true);

  // Status mapping
  const statusStepMap: Record<TripStatus, number> = {
    idle: 0,
    dispatching: 1,
    driver_assigned: 2,
    en_route_to_airport: 2,
    arrived_at_terminal: 3,
    passenger_onboard: 4,
    completed: 5,
    cancelled: 0
  };

  const currentStep = statusStepMap[booking.status] || 1;

  // Real-time animation loop simulation
  useEffect(() => {
    if (!autoSimulate) return;

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (booking.status === 'dispatching' || booking.status === 'en_route_to_airport') {
          if (prev >= 45) {
            onUpdateStatus('arrived_at_terminal');
            playSound('arrived');
            return 50;
          }
          return prev + 2;
        } else if (booking.status === 'passenger_onboard') {
          if (prev >= 98) {
            onCompleteTrip();
            playSound('success');
            return 100;
          }
          return prev + 3;
        }
        return prev;
      });

      // Fluctuate speed slightly for realism
      if (booking.status === 'en_route_to_airport' || booking.status === 'passenger_onboard') {
        setSpeed(Math.floor(38 + Math.random() * 18));
      } else {
        setSpeed(0);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [booking.status, autoSimulate, onUpdateStatus, onCompleteTrip]);

  // Handle manual advance step
  const handleAdvanceStep = () => {
    if (booking.status === 'dispatching' || booking.status === 'driver_assigned') {
      onUpdateStatus('en_route_to_airport');
      setProgressPercent(30);
      setEtaRemaining(3);
      playSound('ping');
    } else if (booking.status === 'en_route_to_airport') {
      onUpdateStatus('arrived_at_terminal');
      setProgressPercent(50);
      setEtaRemaining(0);
      playSound('arrived');
    } else if (booking.status === 'arrived_at_terminal') {
      onUpdateStatus('passenger_onboard');
      setProgressPercent(55);
      setEtaRemaining(14);
      playSound('dispatch');
    } else if (booking.status === 'passenger_onboard') {
      setProgressPercent(100);
      onCompleteTrip();
      playSound('success');
    }
  };

  // Helper text for current status
  const getStatusHeadline = () => {
    switch (booking.status) {
      case 'dispatching':
        return 'Dispatching Hans Nexus Chauffeur...';
      case 'driver_assigned':
      case 'en_route_to_airport':
        return 'Chauffeur En Route to Terminal Pickup';
      case 'arrived_at_terminal':
        return 'Chauffeur Waiting at Curbside Door';
      case 'passenger_onboard':
        return 'In Transit to Drop-off Destination';
      case 'completed':
        return 'Trip Completed Successfully';
      default:
        return 'Live GPS Tracking Active';
    }
  };

  const getStatusSubtext = () => {
    switch (booking.status) {
      case 'dispatching':
        return 'Matching with the closest airport staging executive chauffeur...';
      case 'driver_assigned':
      case 'en_route_to_airport':
        return `Captain Samuel is driving the Honda CR-V EX (${booking.vehicle.plateNumber}). Approaching ${booking.pickupZone}.`;
      case 'arrived_at_terminal':
        return `Your chauffeur is parked at ${booking.pickupZone}. Holding name board "${booking.placardText || booking.passengerName}".`;
      case 'passenger_onboard':
        return `Cruising comfortably towards ${booking.dropoffLocation}. High-speed Wi-Fi and climate control active.`;
      case 'completed':
        return 'You have safely arrived. Please check your receipts and rate your chauffeur!';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Tracking Card & Real-Time Map */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Status Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-950/80 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Navigation className="w-6 h-6 animate-pulse" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Booking Ref #{booking.bookingRef}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live GPS 5G Sync
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white">
                {getStatusHeadline()}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {getStatusSubtext()}
              </p>
            </div>
          </div>

          {/* Quick ETA & Speed Badges */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-center min-w-[90px]">
              <div className="text-[10px] uppercase text-slate-400 tracking-wider flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                {booking.status === 'arrived_at_terminal' ? 'Waiting' : 'ETA'}
              </div>
              <div className="text-lg font-display font-extrabold text-white">
                {booking.status === 'arrived_at_terminal' ? 'Arrived' : `${etaRemaining} min`}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-center min-w-[90px]">
              <div className="text-[10px] uppercase text-slate-400 tracking-wider flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3 text-cyan-400" /> Speed
              </div>
              <div className="text-lg font-display font-extrabold text-cyan-400 font-mono">
                {speed} <span className="text-xs text-slate-400 font-normal">km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulated Vector Map */}
        <div className="relative h-72 sm:h-96 w-full bg-slate-950 overflow-hidden select-none">
          {/* Subtle Grid Lines & Airport Topology */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(30, 41, 59, 0.4)" strokeWidth="0.8" />
              </pattern>
              {/* Route Glow */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0066ff" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Airport Runway & Taxiways Styling */}
            <g opacity="0.45">
              {/* Main Airport Runway */}
              <rect x="20" y="30" width="220" height="34" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <line x1="30" y1="47" x2="230" y2="47" stroke="#94a3b8" strokeWidth="2" strokeDasharray="12,8" />
              <text x="35" y="42" fill="#64748b" fontSize="9" fontFamily="monospace">RUNWAY 21L (ACC)</text>

              {/* Terminal 3 Complex Building Outline */}
              <path d="M 160 85 L 340 85 L 310 160 L 190 160 Z" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
              <text x="210" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                TERMINAL 3
              </text>
              <text x="215" y="140" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
                International Arrivals
              </text>
            </g>

            {/* Curbside Pickup Bay Arc */}
            <path
              d="M 180 180 C 240 210, 310 200, 350 170"
              stroke="#eab308"
              strokeWidth="4"
              strokeDasharray="6,4"
              fill="none"
              opacity="0.8"
            />

            {/* Highway Route Path to Destination */}
            <path
              id="travelRoute"
              d="M 140 250 C 220 220, 260 185, 340 175 C 420 165, 490 210, 560 190 C 650 160, 720 120, 800 130"
              stroke="url(#routeGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="8 4"
            />

            {/* Highway Route Ambient Glow */}
            <path
              d="M 140 250 C 220 220, 260 185, 340 175 C 420 165, 490 210, 560 190 C 650 160, 720 120, 800 130"
              stroke="#38bdf8"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              opacity="0.15"
            />
          </svg>

          {/* Destination Pin Marker */}
          <div className="absolute right-12 sm:right-24 top-16 sm:top-24 flex flex-col items-center animate-bounce">
            <div className="p-2.5 rounded-full bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-500/20">
              <MapPin className="w-5 h-5 fill-slate-950" />
            </div>
            <div className="mt-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-slate-200 shadow-md whitespace-nowrap max-w-[140px] truncate">
              {booking.dropoffLocation.split(',')[0]}
            </div>
          </div>

          {/* Airport Pickup Curbside Marker */}
          <div className="absolute left-[35%] sm:left-[40%] top-[40%] sm:top-[42%] flex flex-col items-center">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-amber-400 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 shadow-lg" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-amber-950/90 border border-amber-500/40 text-[9px] font-bold text-amber-300 shadow">
              Door B Curbside
            </div>
          </div>

          {/* Dynamic Moving Chauffeur Vehicle Car Pin */}
          <div
            className="absolute transition-all duration-1000 ease-linear flex flex-col items-center pointer-events-none"
            style={{
              left: `${Math.min(Math.max(progressPercent, 12), 85)}%`,
              top: `${Math.sin((progressPercent / 100) * Math.PI) * 25 + 45}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Pulsing Radar Ring */}
            <div className="absolute w-16 h-16 rounded-full bg-cyan-400/20 animate-ping" />

            {/* Vehicle Icon Badge */}
            <div className="relative p-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/40 border-2 border-white flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>

            {/* Floating Tag over car */}
            <div className="mt-1.5 px-2 py-0.5 rounded-md bg-slate-950/90 border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-300 shadow-lg whitespace-nowrap">
              {booking.vehicle.plateNumber} • Captain Samuel
            </div>
          </div>

          {/* Live Map Watermark */}
          <div className="absolute bottom-3 left-4 text-[10px] text-slate-500 font-mono flex items-center gap-1.5 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            HansNeux Telematics System v4.2 • Kotoka Corridor
          </div>

          {/* Interactive Simulation Controls */}
          <div className="absolute bottom-3 right-4 flex items-center gap-2">
            <button
              onClick={() => setAutoSimulate(!autoSimulate)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer shadow backdrop-blur-md flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${autoSimulate ? 'animate-spin text-cyan-400' : ''}`} />
              {autoSimulate ? 'Auto Sim: ON' : 'Auto Sim: Paused'}
            </button>
            <button
              onClick={handleAdvanceStep}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer shadow-lg shadow-cyan-500/20 backdrop-blur-md flex items-center gap-1"
            >
              <FastForward className="w-3 h-3 fill-slate-950" />
              Advance Milestone
            </button>
          </div>
        </div>

        {/* Milestone Status Stepper */}
        <div className="p-4 sm:p-6 bg-slate-950/60 border-t border-slate-800">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Step 1 */}
            <div className={`p-3 rounded-xl border transition-all ${
              currentStep >= 1 ? 'bg-slate-900 border-cyan-500/40 text-white' : 'bg-slate-950/40 border-slate-800/50 text-slate-500'
            }`}>
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentStep >= 1 ? 'text-cyan-400' : 'text-slate-600'}`} />
                <span className="font-bold">1. Dispatched</span>
              </div>
              <p className="text-[11px] text-slate-400">Chauffeur assigned & staging</p>
            </div>

            {/* Step 2 */}
            <div className={`p-3 rounded-xl border transition-all ${
              currentStep >= 2 ? 'bg-slate-900 border-cyan-500/40 text-white' : 'bg-slate-950/40 border-slate-800/50 text-slate-500'
            }`}>
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentStep >= 2 ? 'text-cyan-400' : 'text-slate-600'}`} />
                <span className="font-bold">2. En Route</span>
              </div>
              <p className="text-[11px] text-slate-400">Approaching Airport Door B</p>
            </div>

            {/* Step 3 */}
            <div className={`p-3 rounded-xl border transition-all ${
              currentStep >= 3 ? 'bg-slate-900 border-cyan-500/40 text-white ring-1 ring-cyan-400/20' : 'bg-slate-950/40 border-slate-800/50 text-slate-500'
            }`}>
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentStep >= 3 ? 'text-amber-400' : 'text-slate-600'}`} />
                <span className="font-bold">3. Curbside Ready</span>
              </div>
              <p className="text-[11px] text-slate-400">Holding name board at Door B</p>
            </div>

            {/* Step 4 */}
            <div className={`p-3 rounded-xl border transition-all ${
              currentStep >= 4 ? 'bg-slate-900 border-emerald-500/40 text-white' : 'bg-slate-950/40 border-slate-800/50 text-slate-500'
            }`}>
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className={`w-3.5 h-3.5 ${currentStep >= 4 ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span className="font-bold">4. Passenger In Transit</span>
              </div>
              <p className="text-[11px] text-slate-400">Cruising to hotel destination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Profile Bar & Quick Passenger-Driver Communication */}
      {booking.driver && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Driver Avatar & Credentials */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={booking.driver.avatar}
                alt={booking.driver.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/60 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-950 border border-cyan-400 text-cyan-400 shadow">
                <Award className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-display font-bold text-white">
                  {booking.driver.name}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {booking.driver.rating} ({booking.driver.completedTrips}+ trips)
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-0.5">
                {booking.driver.title} • {booking.driver.yearsExperience} yrs VIP Airport Service
              </p>

              {/* Vehicle info tag */}
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-xs font-semibold text-cyan-300 font-mono border border-slate-700">
                  {booking.vehicle.name} ({booking.vehicle.plateNumber})
                </span>
                <span className="text-xs text-slate-400">
                  Cream Leather • Sunroof
                </span>
              </div>
            </div>
          </div>

          {/* Quick Communication & Profile Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Open In-App Chat */}
            <button
              onClick={onOpenChat}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>In-App Chat</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </button>

            {/* Call Driver */}
            <button
              onClick={() => {
                setIsCalling(true);
                playSound('ping');
              }}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Direct Call</span>
            </button>

            {/* View Full Chauffeur Profile */}
            <button
              onClick={onOpenDriverProfile}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Chauffeur Bio & Badges</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Direct Call Simulation Modal */}
      {isCalling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center shadow-2xl space-y-4">
            <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-400">
              <img src={booking.driver?.avatar} alt="Driver" className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="text-xs text-emerald-400 font-mono tracking-wider animate-pulse">
                CALLING SECURE CHAUFFEUR LINE...
              </div>
              <h4 className="text-lg font-bold text-white mt-1">{booking.driver?.name}</h4>
              <p className="text-xs text-slate-400 font-mono">{booking.driver?.phone}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 text-xs text-slate-300 border border-slate-800">
              "Connecting you directly to Captain Samuel in his Honda CR-V (DV 9A6030) via Hans Nexus hands-free encrypted car phone."
            </div>

            <button
              onClick={() => setIsCalling(false)}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
