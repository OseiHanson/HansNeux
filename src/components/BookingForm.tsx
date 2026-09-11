import React, { useState, useEffect } from 'react';
import { Vehicle, Booking } from '../types';
import { AIRPORTS_DATA, POPULAR_DESTINATIONS, FLEET_VEHICLES, PRIMARY_DRIVER } from '../data/mockData';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Clock, 
  UserCheck, 
  Users, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Compass, 
  Info,
  Car
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface BookingFormProps {
  selectedVehicle: Vehicle;
  onSelectVehicleChange: (vehicle: Vehicle) => void;
  onInitiateBooking: (bookingData: Booking) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedVehicle,
  onSelectVehicleChange,
  onInitiateBooking,
}) => {
  // Airport state
  const [selectedAirportId, setSelectedAirportId] = useState('acc');
  const [selectedTerminalId, setSelectedTerminalId] = useState('t3');
  const [selectedPickupCurb, setSelectedPickupCurb] = useState('');
  const [flightNumber, setFlightNumber] = useState('BA 081');
  const [flightInfoMessage, setFlightInfoMessage] = useState<string | null>(null);

  // Destination & Passenger state
  const [destination, setDestination] = useState(POPULAR_DESTINATIONS[0]);
  const [customDestination, setCustomDestination] = useState('');
  const [pickupType, setPickupType] = useState<'immediate' | 'scheduled'>('immediate');
  const [scheduledDate, setScheduledDate] = useState('2026-09-11');
  const [scheduledTime, setScheduledTime] = useState('19:30');
  const [passengersCount, setPassengersCount] = useState(2);
  const [luggageCount, setLuggageCount] = useState(2);
  const [meetAndGreet, setMeetAndGreet] = useState(true);
  const [passengerName, setPassengerName] = useState('Osei Hanson');
  const [passengerPhone, setPassengerPhone] = useState('+233 20 119 4588');
  const [placardText, setPlacardText] = useState('MR. OSEI HANSON - HANS NEXUS');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);

  // Active Airport & Terminal references
  const currentAirport = AIRPORTS_DATA.find((a) => a.id === selectedAirportId) || AIRPORTS_DATA[0];
  const currentTerminal = currentAirport.terminals.find((t) => t.id === selectedTerminalId) || currentAirport.terminals[0];

  useEffect(() => {
    if (currentTerminal.pickupCurbs.length > 0) {
      setSelectedPickupCurb(currentTerminal.pickupCurbs[0]);
    }
  }, [selectedTerminalId, selectedAirportId]);

  // Flight simulation auto-checker
  useEffect(() => {
    if (flightNumber.trim().length >= 3) {
      setFlightInfoMessage(`Flight ${flightNumber.toUpperCase()} tracked: In-air, estimated touchdown in 18 min. Automated 45-min free chauffeur wait time applied.`);
    } else {
      setFlightInfoMessage(null);
    }
  }, [flightNumber]);

  // Update placard text when passenger name changes
  useEffect(() => {
    if (passengerName) {
      setPlacardText(`${passengerName.toUpperCase()} - HANS NEXUS VIP`);
    }
  }, [passengerName]);

  // Calculated estimates
  const estimatedDistanceKm = 11.8;
  const baseFare = selectedVehicle.basePrice;
  const distanceFare = Number((estimatedDistanceKm * selectedVehicle.perKmRate).toFixed(2));
  const airportTollFee = 4.0;
  const meetAndGreetFee = meetAndGreet ? 8.0 : 0.0;
  const subtotal = baseFare + distanceFare + airportTollFee + meetAndGreetFee - discountApplied;
  const tax = Number((subtotal * 0.06).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AIRPORTVIP' || promoCode.trim().toUpperCase() === 'HANSNEXUS') {
      setDiscountApplied(10);
      setPromoSuccess(true);
      playSound('success');
    } else {
      alert('Try promo code "AIRPORTVIP" or "HANSNEXUS" for $10 off!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('dispatch');

    const newBooking: Booking = {
      id: `HN-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingRef: `HN-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pickupAirport: `${currentAirport.name} (${currentAirport.code})`,
      terminal: currentTerminal.name,
      pickupZone: selectedPickupCurb,
      flightNumber: flightNumber ? flightNumber.toUpperCase() : undefined,
      flightStatus: flightInfoMessage || 'Automated flight tracker active',
      dropoffLocation: customDestination.trim() ? customDestination : destination,
      pickupTimeType: pickupType,
      scheduledTime: pickupType === 'scheduled' ? `${scheduledDate} at ${scheduledTime}` : 'Immediate upon landing',
      meetAndGreet,
      passengerName,
      passengerPhone,
      placardText: meetAndGreet ? placardText : undefined,
      passengersCount,
      luggageCount,
      vehicle: selectedVehicle,
      driver: PRIMARY_DRIVER,
      status: 'dispatching',
      fareBreakdown: {
        baseFare,
        distanceKm: estimatedDistanceKm,
        distanceFare,
        airportTollFee,
        meetAndGreetFee,
        discount: discountApplied,
        tax,
        total,
      },
      paymentMethod: 'card',
      paymentStatus: 'paid',
      etaMinutes: 4,
      receiptNumber: `REC-HN-${Date.now().toString().slice(-6)}`,
    };

    onInitiateBooking(newBooking);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl p-6 md:p-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3 h-3" />
            Automated Airport Chauffeur Dispatch
          </div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">
            Book Airport Pickup
          </h2>
        </div>

        {/* Immediate vs Scheduled toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPickupType('immediate')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              pickupType === 'immediate'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Pickup Upon Landing
          </button>
          <button
            type="button"
            onClick={() => setPickupType('scheduled')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              pickupType === 'scheduled'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Schedule Arrival
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Step 1: Airport & Terminal Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Plane className="w-4 h-4" />
            1. Airport & Terminal Arrival
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Airport Dropdown */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Airport</label>
              <select
                value={selectedAirportId}
                onChange={(e) => {
                  setSelectedAirportId(e.target.value);
                  const airport = AIRPORTS_DATA.find((a) => a.id === e.target.value);
                  if (airport && airport.terminals.length > 0) {
                    setSelectedTerminalId(airport.terminals[0].id);
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {AIRPORTS_DATA.map((airport) => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name} ({airport.code}) - {airport.city}, {airport.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Terminal Dropdown */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Arrival Terminal</label>
              <select
                value={selectedTerminalId}
                onChange={(e) => setSelectedTerminalId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {currentAirport.terminals.map((terminal) => (
                  <option key={terminal.id} value={terminal.id}>
                    {terminal.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Curbside Pickup Zone & Flight Tracker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Pickup Meeting Zone / Curb</label>
              <select
                value={selectedPickupCurb}
                onChange={(e) => setSelectedPickupCurb(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {currentTerminal.pickupCurbs.map((curb, i) => (
                  <option key={i} value={curb}>
                    {curb}
                  </option>
                ))}
              </select>
            </div>

            {/* Flight Number */}
            <div>
              <label className="text-xs text-slate-400 block mb-1 flex items-center justify-between">
                <span>Flight Number (For live delay tracking)</span>
                <span className="text-[10px] text-cyan-400 font-mono">Real-time sync</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. BA 081, DL 156, EK 787"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 uppercase"
                />
                <span className="absolute right-3 top-2.5 text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live
                </span>
              </div>
            </div>
          </div>

          {flightInfoMessage && (
            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-2.5 text-xs text-sky-200">
              <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>{flightInfoMessage}</span>
            </div>
          )}
        </div>

        {/* Scheduled time if scheduled */}
        {pickupType === 'scheduled' && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
            <div>
              <label className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Arrival Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Touchdown Time
              </label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}

        {/* Step 2: Drop-off Destination */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            2. Drop-off Destination
          </label>
          
          <div>
            <label className="text-xs text-slate-400 block mb-1">Select Hotel, Embassy or Address</label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setCustomDestination('');
              }}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {POPULAR_DESTINATIONS.map((dest, i) => (
                <option key={i} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Or enter custom street / residence address</label>
            <input
              type="text"
              placeholder="e.g. 14 Roman Ridge Close, West Airport, Accra"
              value={customDestination}
              onChange={(e) => setCustomDestination(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Step 3: Vehicle Class Selector Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              3. Selected Chauffeur Vehicle
            </label>
            <a
              href="#fleet-section"
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              Explore Full Specs & Photos <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FLEET_VEHICLES.map((vehicle) => {
              const isSelected = selectedVehicle.id === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => onSelectVehicleChange(vehicle)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white truncate">{vehicle.name}</span>
                      {vehicle.isFlagship && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mb-2 truncate">{vehicle.model}</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-300 mb-3">
                      <span className="flex items-center gap-0.5">
                        <Users className="w-3 h-3 text-cyan-400" /> {vehicle.passengers}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Briefcase className="w-3 h-3 text-cyan-400" /> {vehicle.luggage}
                      </span>
                      <span className="text-slate-400 font-mono">[{vehicle.plateNumber}]</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="font-display font-bold text-cyan-400">${vehicle.basePrice}</span>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {isSelected ? '✓ Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Passenger & Meet & Greet Settings */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            4. Passenger Details & VIP Meet & Greet
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Passenger Full Name</label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Passenger Phone (WhatsApp / Call)</label>
              <input
                type="tel"
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Passengers Count</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengersCount(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                      passengersCount === num
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Suitcase Bags Count</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setLuggageCount(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                      luggageCount === num
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VIP Meet and Greet Placard Toggle */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="meetGreet"
                  checked={meetAndGreet}
                  onChange={(e) => setMeetAndGreet(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
                <label htmlFor="meetGreet" className="text-sm font-semibold text-white cursor-pointer">
                  VIP Terminal Meet & Greet Placard Service (+ $8)
                </label>
              </div>
              <span className="text-xs text-amber-400 font-medium">Recommended for First-Time Visitors</span>
            </div>

            {meetAndGreet && (
              <div className="pl-6 space-y-2 animate-fadeIn">
                <p className="text-xs text-slate-400">
                  Chauffeur will wait inside the arrival baggage exit hall holding an executive Hans Nexus digital tablet/placard with your custom text:
                </p>
                <input
                  type="text"
                  value={placardText}
                  onChange={(e) => setPlacardText(e.target.value)}
                  placeholder="e.g. MR. OSEI HANSON - HANS NEXUS"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                />
                {/* Visual Placard Preview */}
                <div className="mt-2 p-3 rounded-lg bg-gradient-to-r from-slate-900 to-slate-950 border border-cyan-500/40 text-center shadow-inner">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Chauffeur Placard Preview</div>
                  <div className="text-sm font-display font-extrabold text-cyan-400 tracking-wider mt-0.5">
                    {placardText || 'PASSENGER NAME'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Promo Code & Fare Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Promo code (try 'AIRPORTVIP')"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 uppercase font-mono"
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Apply Promo
            </button>
          </div>

          {promoSuccess && (
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Promo code applied: $10.00 VIP Airport Discount!
            </div>
          )}

          {/* Itemized Calculation */}
          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Airport Base Pickup ({selectedVehicle.name}):</span>
              <span className="font-mono">${baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Distance ({estimatedDistanceKm} km @ ${selectedVehicle.perKmRate}/km):</span>
              <span className="font-mono">${distanceFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Airport Terminal Access & Security Fee:</span>
              <span className="font-mono">${airportTollFee.toFixed(2)}</span>
            </div>
            {meetAndGreet && (
              <div className="flex justify-between">
                <span className="text-slate-400">VIP Inside Arrival Hall Meet & Greet:</span>
                <span className="font-mono">${meetAndGreetFee.toFixed(2)}</span>
              </div>
            )}
            {discountApplied > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>VIP Airport Promo Discount:</span>
                <span className="font-mono">-${discountApplied.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Standard Service Tax (6%):</span>
              <span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
              <span className="font-display">Total Guaranteed Fare:</span>
              <span className="text-cyan-400 font-display font-black text-xl font-mono">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Security & Dispatch Button */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-black text-base md:text-lg tracking-wide shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            <span>Confirm & Dispatch Hans Nexus Chauffeur</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Automated Driver Staging
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-cyan-400" />
              Flight Delay Buffer (Free)
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Fixed Guaranteed Pricing
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
