import React, { useState } from 'react';
import { Vehicle } from '../types';
import { FLEET_VEHICLES } from '../data/mockData';
import { Users, Briefcase, Star, CheckCircle2, ShieldCheck, Sparkles, Key, Sun, Camera, Disc } from 'lucide-react';

interface FleetShowcaseProps {
  onSelectVehicle?: (vehicle: Vehicle) => void;
  selectedVehicleId?: string;
}

export const FleetShowcase: React.FC<FleetShowcaseProps> = ({ onSelectVehicle, selectedVehicleId }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'flagship' | 'suv' | 'sedan' | 'electric'>('all');
  const [inspectVehicle, setInspectVehicle] = useState<Vehicle | null>(null);

  const filtered = FLEET_VEHICLES.filter(v => {
    if (activeTab === 'flagship') return v.isFlagship;
    if (activeTab === 'suv') return v.category.includes('SUV');
    if (activeTab === 'sedan') return v.category.includes('Sedan');
    if (activeTab === 'electric') return v.category.includes('Eco');
    return true;
  });

  return (
    <section id="fleet-section" className="w-full py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Hans Nexus Executive Fleet
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            Curated Airport Chauffeur Vehicles
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-1 max-w-2xl">
            Inspected, sanitized, and chauffeur-driven. Featuring our flagship Honda CR-V EX, executive sedans, and presidential VIP shuttles.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'flagship', 'suv', 'sedan', 'electric'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab === 'all' && 'All Vehicles'}
              {tab === 'flagship' && '⭐ Flagship CR-V'}
              {tab === 'suv' && 'VIP SUVs'}
              {tab === 'sedan' && 'Executive Sedans'}
              {tab === 'electric' && 'Eco Premier'}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((vehicle) => {
          const isSelected = selectedVehicleId === vehicle.id;
          return (
            <div
              key={vehicle.id}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/95 to-slate-950/90 border transition-all duration-300 ${
                isSelected
                  ? 'border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400'
                  : 'border-slate-800/80 hover:border-slate-700 shadow-xl'
              }`}
            >
              {/* Flagship Badge if Honda CR-V */}
              {vehicle.isFlagship && (
                <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  FLAGSHIP AIRPORT CHAUFFEUR
                </div>
              )}

              {/* Plate Number Pill */}
              <div className="absolute top-3 right-3 z-10 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-mono font-semibold px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{vehicle.plateNumber}</span>
              </div>

              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Quick Spec Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 font-medium">
                    {vehicle.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700/60">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      {vehicle.passengers} Seats
                    </span>
                    <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700/60">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      {vehicle.luggage} Bags
                    </span>
                    <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700/60 text-amber-300 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {vehicle.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{vehicle.model}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Airport Base</div>
                    <div className="text-xl font-display font-black text-cyan-400">
                      ${vehicle.basePrice}
                      <span className="text-xs text-slate-400 font-normal"> + ${vehicle.perKmRate}/km</span>
                    </div>
                  </div>
                </div>

                {/* Specific Highlight Tags (From Flyer for CR-V) */}
                {vehicle.isFlagship ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2 text-center">
                      <Key className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-200">Push Start</div>
                      <div className="text-[9px] text-slate-400">Keyless Convenience</div>
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2 text-center">
                      <Sun className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-200">Sunroof</div>
                      <div className="text-[9px] text-slate-400">Fresh Air Flow</div>
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2 text-center">
                      <Camera className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-200">Reverse Cam</div>
                      <div className="text-[9px] text-slate-400">Airport Terminal Assist</div>
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-2 text-center">
                      <Disc className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-200">Alloy Rims</div>
                      <div className="text-[9px] text-slate-400">Smooth Luxury Ride</div>
                    </div>
                  </div>
                ) : (
                  <ul className="grid grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {vehicle.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInspectVehicle(vehicle)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  >
                    View Specs & Interior
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectVehicle?.(vehicle)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                        : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Selected for Booking
                      </>
                    ) : (
                      'Select This Chauffeur Vehicle'
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Vehicle Modal */}
      {inspectVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative h-64 bg-slate-950">
              <img
                src={inspectVehicle.interiorImage || inspectVehicle.image}
                alt={inspectVehicle.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <button
                onClick={() => setInspectVehicle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">
                  {inspectVehicle.category} • {inspectVehicle.model}
                </div>
                <h3 className="text-2xl font-display font-black text-white">
                  {inspectVehicle.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 text-sm text-slate-300">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <div className="flex-1">
                  <div className="text-xs text-slate-400">License Plate</div>
                  <div className="font-mono font-bold text-white text-base">{inspectVehicle.plateNumber}</div>
                </div>
                <div className="h-8 w-[1px] bg-slate-700" />
                <div className="flex-1">
                  <div className="text-xs text-slate-400">Seating Capacity</div>
                  <div className="font-bold text-white">{inspectVehicle.passengers} Adult Passengers</div>
                </div>
                <div className="h-8 w-[1px] bg-slate-700" />
                <div className="flex-1">
                  <div className="text-xs text-slate-400">Luggage Trunk</div>
                  <div className="font-bold text-white">{inspectVehicle.luggage} Large Suitcases</div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Vehicle Highlights & Passenger Amenities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {inspectVehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 leading-relaxed">
                <strong className="text-white block mb-1">Hans Nexus Quality Assurance:</strong>
                All vehicles in our airport fleet undergo a daily 24-point safety and cleanliness audit. Drivers arrive 15 minutes before landing with cold bottled mineral water, chilled dual AC, and personalized meet & greet service.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setInspectVehicle(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectVehicle?.(inspectVehicle);
                    setInspectVehicle(null);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Confirm This Vehicle for Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
