import React from 'react';
import { Booking } from '../types';
import { Logo } from './Logo';
import { Printer, Download, CheckCircle2, X, Plane, MapPin, Car, ShieldCheck } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, booking }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Modal Top Actions */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold">
              OFFICIAL TAX INVOICE & TRIP RECEIPT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              Print / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Container */}
        <div id="printable-receipt" className="p-6 sm:p-8 bg-slate-900 text-slate-200 space-y-6">
          {/* Header with Logo */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-slate-800">
            <Logo size="md" />

            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> PAID IN FULL
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                Receipt #{booking.receiptNumber}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Issued: {booking.createdAt}
              </div>
            </div>
          </div>

          {/* Passenger & Chauffeur Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 uppercase font-mono block">Passenger Details</span>
              <span className="font-bold text-white text-sm block mt-0.5">{booking.passengerName}</span>
              <span className="text-slate-400 font-mono">{booking.passengerPhone}</span>
              {booking.flightNumber && (
                <div className="mt-1 text-cyan-400 font-mono">
                  Flight: {booking.flightNumber}
                </div>
              )}
            </div>

            <div>
              <span className="text-slate-500 uppercase font-mono block">Hans Nexus Chauffeur</span>
              <span className="font-bold text-white text-sm block mt-0.5">
                {booking.driver?.name || 'Captain Samuel Mensah'}
              </span>
              <span className="text-slate-400">
                {booking.vehicle.name} • <span className="font-mono text-cyan-300 font-bold">{booking.vehicle.plateNumber}</span>
              </span>
            </div>
          </div>

          {/* Route Card */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 mt-0.5">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Airport Pickup Point</span>
                <span className="font-bold text-white text-sm">{booking.pickupAirport}</span>
                <span className="text-slate-400 block">{booking.terminal} — {booking.pickupZone}</span>
              </div>
            </div>

            <div className="border-l-2 border-dashed border-slate-700 ml-3.5 h-4" />

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Drop-off Destination</span>
                <span className="font-bold text-white text-sm">{booking.dropoffLocation}</span>
                <span className="text-slate-400 block">Distance: {booking.fareBreakdown.distanceKm} km</span>
              </div>
            </div>
          </div>

          {/* Itemized Financial Breakdown Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Itemized Charges & Tax
            </div>
            <div className="rounded-2xl border border-slate-800 overflow-hidden text-xs">
              <table className="w-full">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="text-left py-2.5 px-4 font-medium">Service Item</th>
                    <th className="text-right py-2.5 px-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50 text-slate-300">
                  <tr>
                    <td className="py-2.5 px-4">
                      Airport Chauffeur Base Transfer ({booking.vehicle.name})
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium">
                      ${booking.fareBreakdown.baseFare.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4">
                      Mileage Rate ({booking.fareBreakdown.distanceKm} km @ ${booking.vehicle.perKmRate}/km)
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium">
                      ${booking.fareBreakdown.distanceFare.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4">
                      Airport Authority Access & Toll Gate Fee
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium">
                      ${booking.fareBreakdown.airportTollFee.toFixed(2)}
                    </td>
                  </tr>
                  {booking.meetAndGreet && (
                    <tr>
                      <td className="py-2.5 px-4">
                        Inside Terminal VIP Meet & Greet Name Placard Service
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-medium">
                        ${booking.fareBreakdown.meetAndGreetFee.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {booking.fareBreakdown.discount > 0 && (
                    <tr className="text-emerald-400">
                      <td className="py-2.5 px-4">
                        VIP Promotional Discount
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-medium">
                        -${booking.fareBreakdown.discount.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2.5 px-4 text-slate-400">
                      Service Tax (6%)
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-400">
                      ${booking.fareBreakdown.tax.toFixed(2)}
                    </td>
                  </tr>
                  {booking.driverTip && booking.driverTip > 0 && (
                    <tr className="text-cyan-300">
                      <td className="py-2.5 px-4">
                        Chauffeur Gratuity / Tip
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-medium">
                        ${booking.driverTip.toFixed(2)}
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-slate-950 font-bold text-white border-t border-slate-800">
                  <tr>
                    <td className="py-3 px-4 text-sm font-display">Total Charged</td>
                    <td className="py-3 px-4 text-right text-base text-cyan-400 font-mono font-black">
                      ${(booking.fareBreakdown.total + (booking.driverTip || 0)).toFixed(2)} USD
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Method Footnote */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Settled via {booking.paymentMethod.toUpperCase()} • Auth Code #HN-{Math.floor(100000 + Math.random()*900000)}
            </span>
            <span className="font-mono text-emerald-400 font-semibold">100% Tax Compliant</span>
          </div>

          {/* Thank You Note */}
          <div className="text-center text-xs text-slate-500 pt-2">
            Thank you for choosing Hans Nexus (HansNeux) Executive Airport Transportation. For inquiries, dispatch support, or corporate bookings, contact support@hansnexus.com.
          </div>
        </div>
      </div>
    </div>
  );
};
