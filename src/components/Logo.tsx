import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true, className = '' }) => {
  const dimensions = {
    sm: { height: 32, textScale: 'text-base', subText: 'text-[9px]' },
    md: { height: 42, textScale: 'text-xl', subText: 'text-[10px]' },
    lg: { height: 56, textScale: 'text-2xl', subText: 'text-xs' },
    xl: { height: 72, textScale: 'text-3xl', subText: 'text-sm' }
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* 3D Metallic HN Emblem with Blue Orbital Ring */}
      <div className="relative flex-shrink-0" style={{ height: dimensions.height, width: dimensions.height * 1.15 }}>
        <svg
          viewBox="0 0 160 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(0,140,255,0.45)]"
        >
          <defs>
            {/* Metallic Chrome Gradients */}
            <linearGradient id="chromeH" x1="20" y1="10" x2="90" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#d1d5db" />
              <stop offset="50%" stopColor="#9ca3af" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="90%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>

            <linearGradient id="chromeN" x1="60" y1="15" x2="135" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="30%" stopColor="#cbd5e1" />
              <stop offset="55%" stopColor="#64748b" />
              <stop offset="75%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Glowing Blue Orbit Ring Gradient */}
            <linearGradient id="blueOrbit" x1="10" y1="100" x2="150" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="40%" stopColor="#0066ff" />
              <stop offset="75%" stopColor="#38bdf8" />
              <stop offset="95%" stopColor="#ffffff" />
            </linearGradient>

            <linearGradient id="blueOrbitShadow" x1="10" y1="100" x2="150" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Flare Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Letter H & N Interlocking Blocks */}
          <g>
            {/* Left vertical pillar of H */}
            <path
              d="M 32 30 L 52 30 L 52 108 L 32 108 Z"
              fill="url(#chromeH)"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />
            {/* Horizontal crossbar of H */}
            <path
              d="M 52 60 L 80 60 L 80 78 L 52 78 Z"
              fill="url(#chromeH)"
            />
            {/* Center vertical pillar of H / N joint */}
            <path
              d="M 72 30 L 92 30 L 92 108 L 72 108 Z"
              fill="url(#chromeN)"
              stroke="#e2e8f0"
              strokeWidth="0.8"
            />
            {/* Diagonal wing of N */}
            <path
              d="M 85 45 L 126 108 L 102 108 L 78 70 Z"
              fill="url(#chromeN)"
              stroke="#94a3b8"
              strokeWidth="0.8"
            />
            {/* Right vertical pillar of N */}
            <path
              d="M 106 30 L 126 30 L 126 80 L 106 50 Z"
              fill="url(#chromeN)"
            />
          </g>

          {/* Electric Blue 3D Orbit Ring Sweeping Across */}
          <g filter="url(#glow)">
            {/* Back half of elliptical arc (subtle shadow) */}
            <path
              d="M 16 92 C 12 98, 20 106, 40 108 C 65 110, 102 96, 128 72"
              stroke="url(#blueOrbitShadow)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            {/* Front bright swooshing orbital ring */}
            <path
              d="M 18 94 C 28 106, 68 108, 104 88 C 126 76, 142 56, 145 42 C 148 30, 138 28, 126 36 C 96 56, 52 82, 18 94 Z"
              fill="url(#blueOrbit)"
            />
          </g>

          {/* Specular Star/Flare highlight on top right orbit */}
          <circle cx="138" cy="36" r="3.5" fill="#ffffff" filter="url(#glow)" />
          <path d="M 138 26 L 138 46 M 128 36 L 148 36" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-display font-black tracking-wider flex items-center gap-1.5 ${dimensions.textScale}`}>
          <span className="text-white drop-shadow-sm font-extrabold tracking-widest">HANS</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 font-extrabold tracking-widest">
            NEXUS
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-slate-400 font-medium tracking-widest uppercase ${dimensions.subText}`}>
              Airport VIP Chauffeur
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span className={`text-cyan-400/80 font-mono tracking-wider ${dimensions.subText}`}>
              HansNeux
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
