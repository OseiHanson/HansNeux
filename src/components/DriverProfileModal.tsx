import React from 'react';
import { Driver, Vehicle } from '../types';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Award, 
  Car, 
  Clock, 
  CheckCircle, 
  Languages, 
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';

interface DriverProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
  vehicle: Vehicle;
  onOpenChat: () => void;
}

export const DriverProfileModal: React.FC<DriverProfileModalProps> = ({
  isOpen,
  onClose,
  driver,
  vehicle,
  onOpenChat
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Banner with Ambient Gradient */}
        <div className="relative h-36 bg-gradient-to-r from-blue-900 via-slate-900 to-cyan-950 p-6 flex justify-between items-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Verified Hans Nexus VIP Chauffeur
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="px-6 -mt-14 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl"
                />
                <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-slate-950 shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-display font-extrabold text-white">{driver.name}</h3>
                <p className="text-xs text-cyan-400 font-medium">{driver.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {driver.rating}
                  </span>
                  <span className="text-xs text-slate-400">({driver.reviewCount} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick Chat/Call buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenChat();
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                Chat
              </button>
              <button
                onClick={() => alert(`Calling chauffeur at ${driver.phone}...`)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Line
              </button>
            </div>
          </div>

          {/* Key Chauffeur Metrics Bar */}
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Experience</div>
              <div className="text-sm sm:text-base font-display font-bold text-white mt-0.5">
                {driver.yearsExperience}+ Years
              </div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Punctuality</div>
              <div className="text-sm sm:text-base font-display font-bold text-emerald-400 mt-0.5">
                {driver.punctualityRate}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Airport Trips</div>
              <div className="text-sm sm:text-base font-display font-bold text-cyan-400 mt-0.5 font-mono">
                {driver.completedTrips}
              </div>
            </div>
          </div>

          {/* Bio & Philosophy */}
          <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              Chauffeur Biography & Background
            </h4>
            <p className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-300">
              {driver.bio}
            </p>
          </div>

          {/* Spoken Languages */}
          <div className="space-y-1.5 text-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              Spoken Languages
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {driver.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Badges & Clearances */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Audited Airport Clearances
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {driver.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Vehicle Preview */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Car className="w-4 h-4 text-cyan-400" />
                Assigned Vehicle: {vehicle.name} ({vehicle.model})
              </div>
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                {vehicle.plateNumber}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equipped with dual-zone AC, push-start keyless convenience, power sunroof, reverse parking camera, clean cream leather seats, and high-speed Wi-Fi.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="pb-6 pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Back to Active Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
