import React, { useState } from 'react';
import { Booking } from '../types';
import { 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Lock, 
  X, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Apple, 
  Loader2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onPaymentSuccess: (method: 'card' | 'momo' | 'apple_pay' | 'cash') => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  booking,
  onPaymentSuccess
}) => {
  const [method, setMethod] = useState<'card' | 'momo' | 'apple_pay' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardHolder, setCardHolder] = useState(booking.passengerName || 'Osei Hanson');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('834');
  const [momoProvider, setMomoProvider] = useState('mtn');
  const [momoPhone, setMomoPhone] = useState(booking.passengerPhone || '+233 24 892 4011');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successState, setSuccessState] = useState(false);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    playSound('ping');

    setTimeout(() => {
      setIsProcessing(false);
      setSuccessState(true);
      playSound('success');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      setTimeout(() => {
        onPaymentSuccess(method);
        onClose();
      }, 1400);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white">
                Secure Airport Checkout
              </h3>
              <p className="text-xs text-slate-400">
                256-Bit SSL Encrypted • Hans Nexus Escrow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {successState ? (
          <div className="p-8 text-center space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-display font-black text-white">
              Payment Confirmed!
            </h4>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              ${booking.fareBreakdown.total.toFixed(2)} charged successfully. Your receipt #{booking.receiptNumber} is generated and chauffeur dispatch is confirmed!
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-5 sm:p-6 space-y-5">
            {/* Amount Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 flex items-center justify-between shadow-inner">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-mono">
                  Guaranteed Airport Fare
                </span>
                <span className="text-xs text-cyan-400">
                  {booking.vehicle.name} ({booking.vehicle.plateNumber})
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-display font-black text-white">
                  ${booking.fareBreakdown.total.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-400 block">No hidden fees</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  method === 'card'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('momo')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  method === 'momo'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile Money</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('apple_pay')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  method === 'apple_pay'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Apple className="w-4 h-4" />
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('cash')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  method === 'cash'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Pay Chauffeur</span>
              </button>
            </div>

            {/* Credit Card View */}
            {method === 'card' && (
              <div className="space-y-3.5 animate-fadeIn">
                {/* Visual Card Mockup */}
                <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-800 to-sky-900 border border-slate-700 shadow-xl text-white space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-cyan-400 font-bold">Hans Nexus VIP Pay</span>
                    <span className="font-bold tracking-widest text-slate-300">VISA / MASTERCARD</span>
                  </div>
                  <div className="font-mono text-lg tracking-widest py-1 text-slate-100">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-end text-[11px] text-slate-300">
                    <div>
                      <div className="text-[9px] uppercase text-slate-400">Cardholder</div>
                      <div className="font-semibold uppercase tracking-wider">{cardHolder || 'NAME'}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-slate-400">Expires</div>
                      <div className="font-mono font-semibold">{expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Money View */}
            {method === 'momo' && (
              <div className="space-y-3.5 animate-fadeIn p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-300 leading-relaxed">
                  Support for regional and international mobile wallets (MTN MoMo, Vodafone/Telecel Cash, AirtelTigo).
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mtn', name: 'MTN MoMo', color: 'border-yellow-500/50 text-yellow-300' },
                    { id: 'voda', name: 'Telecel Cash', color: 'border-red-500/50 text-red-300' },
                    { id: 'airtel', name: 'AirtelTigo', color: 'border-blue-500/50 text-blue-300' }
                  ].map((prov) => (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => setMomoProvider(prov.id)}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        momoProvider === prov.id
                          ? `bg-slate-800 ${prov.color} shadow-sm ring-1`
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {prov.name}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Subscriber Mobile Number</label>
                  <input
                    type="tel"
                    value={momoPhone}
                    onChange={(e) => setMomoPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    You will receive an instant approval push prompt on your smartphone.
                  </span>
                </div>
              </div>
            )}

            {/* Apple Pay View */}
            {method === 'apple_pay' && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3 animate-fadeIn">
                <Apple className="w-10 h-10 mx-auto text-white" />
                <h4 className="text-white font-bold text-sm">One-Touch Apple Pay</h4>
                <p className="text-xs text-slate-400">
                  Pay securely with Face ID or Touch ID using your default Apple Wallet card.
                </p>
              </div>
            )}

            {/* Cash View */}
            {method === 'cash' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
                <h4 className="text-white font-bold text-xs">Pay Chauffeur Upon Airport Arrival</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You can pay Captain Samuel directly in USD, EUR, GBP, or local GHS currency via cash or wireless POS terminal in the Honda CR-V.
                </p>
              </div>
            )}

            {/* Compliance Guarantee Badges */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                PCI-DSS Compliant
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Hans Nexus Escrow
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                Instant Invoice
              </span>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-black text-base shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing Airport Transfer...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Confirm & Authorize ${booking.fareBreakdown.total.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
