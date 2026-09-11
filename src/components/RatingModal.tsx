import React, { useState } from 'react';
import { Booking } from '../types';
import { Star, Heart, Check, X, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onSubmitRating: (bookingId: string, rating: number, tags: string[], comment: string, tip: number) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSubmitRating,
}) => {
  const [stars, setStars] = useState<number>(booking.rating || 5);
  const [hoverStars, setHoverStars] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(booking.ratingTags || []);
  const [comment, setComment] = useState(booking.ratingComment || '');
  const [tip, setTip] = useState<number>(booking.driverTip || 5);
  const [customTip, setCustomTip] = useState('');

  if (!isOpen) return null;

  const compliments = [
    '⭐ Pristine & Clean Car',
    '⏱️ On-Time Airport Arrival',
    '🧳 Heavy Luggage Assistance',
    '👔 Professional Meet & Greet',
    '🛡️ Safe & Smooth Driving',
    '❄️ Refreshing AC & Bottled Water',
    '💬 Great Communication',
    '🎧 Quiet & Relaxing Trip'
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTip = customTip ? parseFloat(customTip) || 0 : tip;

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    playSound('success');
    onSubmitRating(booking.id, stars, selectedTags, comment, finalTip);
    onClose();
  };

  const currentDisplayStar = hoverStars !== null ? hoverStars : stars;

  const starLabels: Record<number, string> = {
    1: 'Needs Significant Improvement',
    2: 'Below Expectations',
    3: 'Satisfactory Ride',
    4: 'Great Chauffeur Experience',
    5: 'Exceptional VIP Service!'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-cyan-400 p-0.5 bg-slate-800">
            <img
              src={booking.driver?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
              alt="Driver"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h3 className="text-xl font-display font-bold text-white">
            Rate {booking.driver?.name || 'Your Chauffeur'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Trip #{booking.bookingRef} • {booking.vehicle.name} ({booking.vehicle.plateNumber})
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleRatingSubmit} className="p-6 space-y-5">
          {/* Star Selector */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverStars(star)}
                  onMouseLeave={() => setHoverStars(null)}
                  onClick={() => {
                    setStars(star);
                    playSound('ping');
                  }}
                  className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                      star <= currentDisplayStar
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs font-semibold text-cyan-400 tracking-wide font-display h-5">
              {starLabels[currentDisplayStar]}
            </div>
          </div>

          {/* Compliment Badges */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              What went especially well?
            </label>
            <div className="flex flex-wrap gap-2">
              {compliments.map((tag, idx) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chauffeur Tip Selector */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                Add a Chauffeur Tip
              </label>
              <span className="text-[10px] text-slate-400 font-mono">100% goes to Captain Samuel</span>
            </div>

            <div className="flex items-center gap-2">
              {[0, 3, 5, 10, 15].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setTip(amount);
                    setCustomTip('');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                    tip === amount && !customTip
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {amount === 0 ? 'No tip' : `$${amount}`}
                </button>
              ))}
            </div>

            <div>
              <input
                type="number"
                placeholder="Or custom tip amount ($)"
                value={customTip}
                onChange={(e) => {
                  setCustomTip(e.target.value);
                  setTip(0);
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Written Feedback Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              Leave a note for your driver / Hans Nexus dispatch
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Captain Samuel was waiting right by Door B with my name placard. Excellent driving and the Honda CR-V was immaculate!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-black text-sm tracking-wide shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              Submit Review & Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
