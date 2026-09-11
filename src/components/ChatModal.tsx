import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Driver, Vehicle } from '../types';
import { PRESET_CHAT_CHIPS } from '../data/mockData';
import { Send, X, ShieldCheck, CheckCheck, Car, Phone } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
  vehicle: Vehicle;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  driver,
  vehicle,
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    onSendMessage(text);
    setInputText('');
    playSound('sent');

    // Simulate realistic driver reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Understood! I am monitoring your arrival from the staging bay.";

      const lower = text.toLowerCase();
      if (lower.includes('baggage') || lower.includes('luggage') || lower.includes('carousel')) {
        reply = "Take your time with the luggage carousel! I have plenty of space in the Honda CR-V trunk for all your suitcases.";
      } else if (lower.includes('plate') || lower.includes('car') || lower.includes('honda')) {
        reply = `Yes, black Honda CR-V EX, license plate ${vehicle.plateNumber}. Hazard lights are gently blinking right at the curb!`;
      } else if (lower.includes('customs') || lower.includes('immigration')) {
        reply = "Welcome through! Exit through Door B and look straight ahead—I am holding your Hans Nexus welcome placard.";
      } else if (lower.includes('door') || lower.includes('step') || lower.includes('walking') || lower.includes('see')) {
        reply = "I see passengers exiting Door B now! I am waving with your personalized placard. Let me help you with your bags!";
      } else if (lower.includes('delay') || lower.includes('late')) {
        reply = "No worries at all! Hans Nexus includes complimentary flight delay waiting time. I will be right here whenever you emerge.";
      }

      onSendMessage(reply);
      playSound('ping');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[92vh]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-11 h-11 rounded-xl object-cover border border-cyan-400/50"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{driver.name}</h3>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Chauffeur
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Car className="w-3 h-3 text-cyan-400" />
                <span>{vehicle.name}</span>
                <span className="font-mono text-cyan-300 font-bold">[{vehicle.plateNumber}]</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Calling ${driver.name} at ${driver.phone}...`);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 cursor-pointer"
              title="Call driver"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security & Meet Reminder */}
        <div className="px-4 py-2 bg-cyan-950/40 border-b border-cyan-500/20 text-[11px] text-cyan-300 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="truncate">Encrypted Hans Nexus in-app airport coordination channel</span>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-slate-950/60 to-slate-900/80">
          {messages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="bg-slate-800/80 text-slate-300 text-[11px] px-3 py-1 rounded-full border border-slate-700/60 text-center max-w-[85%]">
                    {msg.text}
                  </div>
                </div>
              );
            }

            const isPassenger = msg.sender === 'passenger';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isPassenger ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                    isPassenger
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1 px-1">
                  <span>{msg.timestamp}</span>
                  {isPassenger && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                </div>
              </div>
            );
          })}

          {/* Simulated Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-2 rounded-2xl rounded-bl-none w-fit border border-slate-700">
              <span className="text-[11px] text-cyan-300">{driver.name} is typing</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Quick Replies Carousel */}
        <div className="p-2.5 bg-slate-950/90 border-t border-slate-800 overflow-x-auto flex gap-1.5 no-scrollbar">
          {PRESET_CHAT_CHIPS.map((chip, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(chip)}
              className="text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-700 whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input Field */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type message to chauffeur..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
